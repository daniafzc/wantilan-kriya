# ============================================================
# main.py — Wantilan Kriya Pricing API
# Model  : all-MiniLM-L6-v2 + XGBoost (single .joblib)
# ============================================================

import re
import warnings
import uvicorn
import numpy as np
import joblib
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sentence_transformers import SentenceTransformer

warnings.filterwarnings("ignore")

# ─────────────────────────────────────────────
# CONSTANTS (must mirror training exactly)
# ─────────────────────────────────────────────
EXCHANGE_RATE   = 18_300
ARTIFACT_PATH   = "wantilan_pricing_model_v1.joblib"

# ─────────────────────────────────────────────
# GLOBAL STATE
# ─────────────────────────────────────────────
state = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("⏳ Loading artifacts from .joblib...")

    artifacts = joblib.load(ARTIFACT_PATH)

    state["model"]                = artifacts["model"]
    state["bert_model_name"]      = artifacts["bert_model_name"]
    state["mean_map"]             = artifacts["mean_map"]
    state["global_mean"]          = artifacts["global_mean"]
    state["tier_map"]             = artifacts["tier_map"]
    state["bestseller_threshold"] = artifacts["bestseller_threshold"]
    state["materials_list"]       = artifacts["materials_list"]
    state["num_cols"]             = artifacts["num_cols"]
    state["premium_words"]        = artifacts["premium_words"]
    state["price_cap_usd"]        = artifacts["price_cap_usd"]
    state["metrics"]              = artifacts["metrics"]

    # Load BERT (sentence-transformers)
    print(f"⏳ Loading BERT: {state['bert_model_name']}...")
    state["bert"] = SentenceTransformer(state["bert_model_name"])

    print("✅ All artifacts loaded!")
    print(f"   Model metrics → RMSE: ${state['metrics']['rmse']:.2f} | R²: {state['metrics']['r2']:.4f}")
    yield
    state.clear()
    print("🛑 Resources released.")


# ─────────────────────────────────────────────
# APP
# ─────────────────────────────────────────────
app = FastAPI(
    title       = "Wantilan Kriya — Product Pricing API",
    description = "Prediksi harga optimal & potensi laku produk kerajinan Bali.",
    version     = "1.0.0",
    lifespan    = lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─────────────────────────────────────────────
# SCHEMA
# ─────────────────────────────────────────────
class ProductInput(BaseModel):
    name            : str   = Field(...,  example="Handwoven Rattan Crossbody Bag Authentic Balinese")
    description     : str   = Field("",   example="Beautiful traditional balinese rattan bag with leather strap.")
    category        : str   = Field(...,  example="Bags & Purses < Handbags < Shoulder Bags")
    price           : float = Field(...,  example=45.00, ge=0)
    average_rating  : float = Field(0.0,  example=4.8, ge=0, le=5)
    reviews_count   : int   = Field(0,    example=120, ge=0)


# ─────────────────────────────────────────────
# HELPER — Text Cleaning (simple, mirrors training)
# ─────────────────────────────────────────────
def clean_text_simple(text: str) -> str:
    text = str(text).lower()
    text = re.sub(r"[^a-zA-Z0-9\s]", " ", text)
    return text


# ─────────────────────────────────────────────
# CORE INFERENCE (exact mirror of wantilan_predict in training)
# ─────────────────────────────────────────────
def wantilan_predict(input_data: dict) -> dict:
    # Unpack state
    xgb_model            = state["model"]
    bert_model           = state["bert"]
    FULL_MEAN_MAP        = state["mean_map"]
    GLOBAL_MEAN          = state["global_mean"]
    CAT_TO_TIER_MAP      = state["tier_map"]
    BESTSELLER_THRESHOLD = state["bestseller_threshold"]
    MATERIALS            = state["materials_list"]
    PREMIUM_WORDS        = state["premium_words"]

    # A. Extract input
    name          = input_data.get("name", "")
    desc          = input_data.get("description", "")
    category      = input_data.get("category", "Uncategorized")
    input_price   = float(input_data.get("price", 0.0))
    avg_rating    = float(input_data.get("average_rating", 0.0))
    reviews_count = int(input_data.get("reviews_count", 0))

    # B. Text prep (same as training clean_text_simple)
    raw_text  = f"{name} {category} {desc}"
    clean_txt = clean_text_simple(raw_text)

    # C. Feature engineering — IDENTICAL to training
    reviews_log     = np.log1p(reviews_count)
    trust_score     = avg_rating * reviews_log
    text_word_count = len(clean_txt.split())
    char_count      = len(clean_txt)
    avg_word_length = char_count / (text_word_count + 1)
    category_depth  = len(str(category).split("<"))
    is_bali         = 1 if any(
        w in clean_txt for w in ["bali", "balinese", "indonesia", "ubud"]
    ) else 0

    cat_te         = float(FULL_MEAN_MAP.get(category, GLOBAL_MEAN))
    prem_kw_count  = sum(1 for w in PREMIUM_WORDS if w in clean_txt)
    engagement     = reviews_count * (avg_rating / 5.0)
    is_bseller     = 1 if reviews_count >= BESTSELLER_THRESHOLD else 0
    cat_tier       = int(CAT_TO_TIER_MAP.get(category, 2))
    mat_feats      = [1 if m in clean_txt else 0 for m in MATERIALS]

    # D. Numerical vector
    num_vec = np.array([[
        avg_rating, reviews_log, trust_score,
        text_word_count, cat_te, is_bali, category_depth,
        char_count, avg_word_length, prem_kw_count,
        engagement, is_bseller, cat_tier
    ] + mat_feats])

    # E. BERT encode
    bert_vec = bert_model.encode([clean_txt])

    # F. Predict
    input_final = np.hstack([bert_vec, num_vec])
    pred_price  = float(np.expm1(xgb_model.predict(input_final)[0]))

    # G. Price advice (rule-based)
    upper = pred_price * 1.15
    lower = pred_price * 0.85

    if input_price > upper:
        status = "🔴 Overpriced"
        saran  = (
            f"Hargamu ${input_price:.2f} di atas estimasi pasar ${pred_price:.2f}. "
            "Coba tonjolkan bahan premium atau turunkan sedikit untuk memenangkan pembeli."
        )
    elif input_price < lower:
        status = "🟡 Underpriced"
        saran  = (
            f"Hargamu ${input_price:.2f} terlalu murah! "
            f"Model menyarankan ${pred_price:.2f}. Naikkan harga untuk profit maksimal."
        )
    else:
        status = "🟢 Optimal"
        saran  = (
            f"Hargamu ${input_price:.2f} sudah sangat kompetitif "
            f"dengan estimasi pasar ${pred_price:.2f}. Pertahankan!"
        )

    # H. Success score (heuristic)
    score = 60
    if status == "🟢 Optimal" : score += 15
    if text_word_count > 20   : score += 10
    if is_bali                : score +=  5
    if sum(mat_feats) > 0     : score +=  5
    if prem_kw_count > 0      : score +=  5
    success_score = min(score, 99)

    return {
        "nama_produk"        : name,
        "saran_harga_usd"    : round(pred_price, 2),
        "harga_input_usd"    : round(input_price, 2),
        "harga_idr_estimasi" : int(pred_price * EXCHANGE_RATE),
        "status_harga"       : status,
        "insight_bisnis"     : saran,
        "skor_potensi_laku"  : f"{success_score}/100",
    }


# ─────────────────────────────────────────────
# ENDPOINTS
# ─────────────────────────────────────────────
@app.get("/", tags=["Health"])
def health_check():
    return {
        "status"  : "online",
        "version" : "1.0.0",
        "model"   : state.get("bert_model_name", "loading"),
        "metrics" : state.get("metrics", {}),
    }


@app.get("/model-info", tags=["Info"])
def model_info():
    return {
        "bert_model"          : state["bert_model_name"],
        "price_cap_usd"       : state["price_cap_usd"],
        "bestseller_threshold": state["bestseller_threshold"],
        "materials_detected"  : state["materials_list"],
        "premium_keywords"    : state["premium_words"],
        "num_categories_known": len(state["mean_map"]),
        "model_metrics"       : state["metrics"],
    }


@app.post("/predict", tags=["Prediction"])
async def predict(item: ProductInput):
    try:
        result = wantilan_predict(item.model_dump())
        return {"status": "success", **result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")


# ─────────────────────────────────────────────
# RUNNER
# ─────────────────────────────────────────────
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=7860, reload=False)