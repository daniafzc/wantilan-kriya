import joblib
import numpy as np
import re

from sentence_transformers import SentenceTransformer
from fastapi import FastAPI

# ============================================================
# LOAD
# ============================================================

art = joblib.load(
    "production/wantilan_pricing_model_v1.joblib"
)

model = art["model"]

bert_model = SentenceTransformer(
    "./production/bert/all-MiniLM-L6-v2"
)

NUM_COLS = art["num_cols"]

FULL_MEAN_MAP = art["mean_map"]
GLOBAL_MEAN = art["global_mean"]

CAT_TO_TIER_MAP = art["tier_map"]

BESTSELLER_THRESHOLD = art["bestseller_threshold"]

MATERIALS = art["materials_list"]

PREMIUM_WORDS = art["premium_words"]

# ============================================================
# APP
# ============================================================

app = FastAPI()

# ============================================================
# CLEAN
# ============================================================

def clean_text(text):
    text = str(text).lower()
    text = re.sub(r"[^a-zA-Z0-9\s]", " ", text)
    return text

# ============================================================
# PREDICT
# ============================================================

@app.post("/predict")
def predict(data: dict):

    name = data["name"]
    desc = data.get("description", "")
    category = data.get("category", "Uncategorized")

    price = float(data.get("price", 0))
    rating = float(data.get("average_rating", 0))
    reviews = int(data.get("reviews_count", 0))

    raw_text = f"{name} {category} {desc}"

    clean_txt = clean_text(raw_text)

    # ========================================================
    # FEATURES
    # ========================================================

    reviews_log = np.log1p(reviews)

    trust_score = rating * reviews_log

    text_word_count = len(clean_txt.split())

    char_count = len(clean_txt)

    avg_word_length = char_count / (text_word_count + 1)

    category_depth = len(category.split("<"))

    is_bali = int(
        any(
            w in clean_txt
            for w in ["bali", "balinese", "ubud", "indonesia"]
        )
    )

    cat_te = float(
        FULL_MEAN_MAP.get(category, GLOBAL_MEAN)
    )

    premium_keyword_count = sum(
        1 for w in PREMIUM_WORDS
        if w in clean_txt
    )

    engagement_rate = reviews * (rating / 5.0)

    is_bestseller = int(
        reviews >= BESTSELLER_THRESHOLD
    )

    category_tier = int(
        CAT_TO_TIER_MAP.get(category, 2)
    )

    material_features = [
        1 if m in clean_txt else 0
        for m in MATERIALS
    ]

    num_vec = np.array([[
        rating,
        reviews_log,
        trust_score,
        text_word_count,
        cat_te,
        is_bali,
        category_depth,
        char_count,
        avg_word_length,
        premium_keyword_count,
        engagement_rate,
        is_bestseller,
        category_tier
    ] + material_features])

    # ========================================================
    # BERT
    # ========================================================

    bert_vec = bert_model.encode([clean_txt])

    # ========================================================
    # FINAL
    # ========================================================

    X = np.hstack([bert_vec, num_vec])

    pred = float(
        np.expm1(model.predict(X)[0])
    )

    return {
        "predicted_price": round(pred, 2),
        "input_price": price
    }