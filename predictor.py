"""
=============================================================
  WANTILAN KRIYA v2 — predictor.py

  Berisi:
    - WantilanPredictor  → class singleton yang memegang
      semua artifact + BERT model
    - load_predictor()   → factory function untuk lifespan
    - get_predictor()    → dependency injection FastAPI

  ⚠️  CRITICAL: Logika inferensi di predict() di sini
      IDENTIK dengan wantilan_predict() di Kaggle notebook.
      Jangan modifikasi satu tanpa modifikasi yang lain.
=============================================================
"""

from __future__ import annotations

import hashlib
import logging
import os
import time
from typing import Optional

import joblib
import numpy as np

from sentence_transformers import SentenceTransformer

from utils import (
    clean_text,
    build_num_vector,
    price_status,
)

log = logging.getLogger("wantilan.predictor")

# ──────────────────────────────────────────────────────────────
# SINGLETON CONTAINER
# ──────────────────────────────────────────────────────────────
_predictor_instance: Optional["WantilanPredictor"] = None


# ──────────────────────────────────────────────────────────────
# PREDICTOR CLASS
# ──────────────────────────────────────────────────────────────
class WantilanPredictor:
    """
    Memegang seluruh state inference:
      - Artifact dict (model, encoder, mapping, dll)
      - SentenceTransformer BERT model

    Instansiasi lewat ``load_predictor()``, bukan langsung.
    """

    def __init__(self, artifact_path: str) -> None:
        self.artifacts  : dict                       = {}
        self.bert_model : Optional[SentenceTransformer] = None
        self._artifact_path = artifact_path

    # ── Artifact ──────────────────────────────────────────────
    def load_artifacts(self) -> None:
        """Load file .joblib ke dalam memory."""
        if not os.path.exists(self._artifact_path):
            raise FileNotFoundError(
                f"Artifact tidak ditemukan: {self._artifact_path}\n"
                "Pastikan file wantilan_kriya_v2.joblib ada di direktori artifacts/."
            )
        log.info(f"📦 Loading artifacts dari: {self._artifact_path}")
        t0 = time.time()
        self.artifacts = joblib.load(self._artifact_path)
        elapsed = time.time() - t0

        log.info(f"   ✅ Artifacts loaded dalam {elapsed:.1f}s")
        log.info(f"   Version   : {self.artifacts.get('version', 'N/A')}")
        log.info(f"   Trained at: {self.artifacts.get('trained_at', 'N/A')}")
        log.info(f"   RMSE      : ${self.artifacts['metrics']['rmse']:.2f}")
        log.info(f"   R²        : {self.artifacts['metrics']['r2']:.4f}")

    # ── BERT ──────────────────────────────────────────────────
    def load_bert(self) -> None:
        """Load SentenceTransformer; pilih GPU jika tersedia."""
        import torch
        bert_name = self.artifacts["bert_model_name"]
        device    = "cuda" if torch.cuda.is_available() else "cpu"

        log.info(f"🤖 Loading BERT model: {bert_name}")
        log.info(f"   Device: {device.upper()}")
        t0 = time.time()

        self.bert_model = SentenceTransformer(bert_name, device=device)
        log.info(f"   ✅ BERT loaded dalam {time.time()-t0:.1f}s")

    # ── Embedding validation ───────────────────────────────────
    def validate_embeddings(self) -> None:
        """
        Bandingkan hash embedding lokal vs hash yang disimpan saat training
        di Kaggle. Log warning jika ada mismatch.
        """
        val_texts  = self.artifacts.get("validation_texts",  [])
        val_hashes = self.artifacts.get("validation_hashes", [])

        if not val_texts or not val_hashes:
            log.warning("   Tidak ada data validasi di artifact.")
            return

        log.info("🔍 Validasi konsistensi embedding dengan Kaggle...")
        local_embs = self.bert_model.encode(
            val_texts,
            normalize_embeddings=self.artifacts.get("bert_normalize", True),
        )
        local_hashes = [hashlib.md5(e.tobytes()).hexdigest() for e in local_embs]
        match = sum(a == b for a, b in zip(local_hashes, val_hashes))

        log.info(f"   Embedding match: {match}/{len(val_hashes)}")
        if match < len(val_hashes):
            log.warning(
                "⚠️  Ada perbedaan embedding hash! Output mungkin sedikit berbeda.\n"
                "   Pastikan versi sentence-transformers sama dengan Kaggle."
            )

    # ── Properties shortcut ───────────────────────────────────
    @property
    def device(self) -> str:
        import torch
        return "cuda" if torch.cuda.is_available() else "cpu"

    @property
    def version(self) -> str:
        return self.artifacts.get("version", "N/A")

    @property
    def trained_at(self) -> str:
        return self.artifacts.get("trained_at", "N/A")

    @property
    def metrics(self) -> dict:
        return self.artifacts.get("metrics", {})

    # ── Core inference ────────────────────────────────────────
    def predict(self, input_data: dict) -> dict:
        """
        Pipeline prediksi lengkap: text cleaning → feature eng →
        BERT encode → model.predict → kalkulasi status harga.

        ⚠️  Logika ini IDENTIK dengan wantilan_predict() di
            Kaggle notebook. Jangan modifikasi tanpa update notebook.

        Parameters
        ----------
        input_data : dict dengan key:
            name, description, product_details, category,
            price, average_rating, reviews_count

        Returns
        -------
        dict  (sama persis dengan PredictResponse schema di app.py)
        """
        # ── Shortcut ke artifact fields ───────────────────────
        art = self.artifacts
        _mean_map    = art["mean_map"]
        _global_mean = art["global_mean"]
        _tier_map    = art["tier_map"]
        _bseller_thr = art["bestseller_threshold"]
        _materials   = art["materials_list"]
        _prem_words  = art["premium_words"]
        _bali_kw     = art["bali_keywords"]
        _num_cols    = art["num_cols"]
        _model       = art["model"]
        _xrate       = art["exchange_rate"]
        _normalize   = art.get("bert_normalize",  True)
        _batch_size  = art.get("bert_batch_size",  64)

        # ── Ekstrak input ─────────────────────────────────────
        name          = str(input_data.get("name",           ""))
        desc          = str(input_data.get("description",    ""))
        product_det   = str(input_data.get("product_details",""))
        category      = str(input_data.get("category",       "Uncategorized"))
        input_price   = float(input_data.get("price",         0.0))
        avg_rating    = float(input_data.get("average_rating",0.0))
        reviews_count = int(  input_data.get("reviews_count", 0))

        # ── Text cleaning ─────────────────────────────────────
        raw_text  = f"{name} {category} {desc} {product_det}"
        clean_txt = clean_text(raw_text)

        # ── Numeric feature vector ────────────────────────────
        num_vec = build_num_vector(
            clean_txt      = clean_txt,
            avg_rating     = avg_rating,
            reviews_count  = reviews_count,
            category       = category,
            mean_map       = _mean_map,
            global_mean    = _global_mean,
            tier_map       = _tier_map,
            bestseller_thr = _bseller_thr,
            materials      = _materials,
            premium_words  = _prem_words,
            bali_keywords  = _bali_kw,
            num_cols       = _num_cols,
        )

        # ── BERT encode ───────────────────────────────────────
        bert_vec = self.bert_model.encode(
            [clean_txt],
            normalize_embeddings=_normalize,
            batch_size=_batch_size,
        )

        # ── Prediksi ──────────────────────────────────────────
        input_final = np.hstack([bert_vec, num_vec])
        pred_price  = float(np.expm1(_model.predict(input_final)[0]))
        pred_price  = max(0.01, pred_price)

        # ── Detail fitur (untuk response) ────────────────────
        words     = clean_txt.split()
        mat_feats = [1 if mat in words else 0 for mat in _materials]
        is_bali   = 1 if any(w in words for w in _bali_kw) else 0
        prem_kw_count = sum(1 for w in _prem_words if w in words)
        cat_tier  = int(_tier_map.get(category, 2))

        # ── Status harga & saran bisnis ───────────────────────
        status_label, status_emoji, saran, success_score = price_status(
            input_price   = input_price,
            pred_price    = pred_price,
            clean_txt     = clean_txt,
            is_bali       = bool(is_bali),
            mat_feats     = mat_feats,
            prem_kw_count = prem_kw_count,
        )

        return {
            "nama_produk"        : name,
            "saran_harga_usd"    : round(pred_price, 2),
            "harga_input_usd"    : round(input_price, 2),
            "harga_idr_estimasi" : int(pred_price * _xrate),
            "status_harga"       : f"{status_emoji} {status_label}",
            "insight_bisnis"     : saran,
            "skor_potensi_laku"  : f"{success_score}/100",
            "detail_fitur"       : {
                "is_bali"      : bool(is_bali),
                "materials"    : [m for m, f in zip(_materials, mat_feats) if f],
                "premium_kw"   : prem_kw_count,
                "text_words"   : len(words),
                "category_tier": cat_tier,
            },
        }


# ──────────────────────────────────────────────────────────────
# FACTORY & DEPENDENCY INJECTION
# ──────────────────────────────────────────────────────────────
def load_predictor(artifact_path: str) -> WantilanPredictor:
    """
    Buat dan inisialisasi WantilanPredictor.
    Dipanggil satu kali saat FastAPI lifespan startup.

    Parameters
    ----------
    artifact_path : Path ke file wantilan_kriya_v2.joblib

    Returns
    -------
    WantilanPredictor  (siap dipakai untuk inference)
    """
    global _predictor_instance

    p = WantilanPredictor(artifact_path)
    p.load_artifacts()
    p.load_bert()
    p.validate_embeddings()

    _predictor_instance = p
    log.info("✅ WantilanPredictor siap!\n")
    return p


def get_predictor() -> WantilanPredictor:
    """
    FastAPI dependency — kembalikan singleton predictor.

    Contoh pemakaian di endpoint:
        from predictor import get_predictor, WantilanPredictor
        from fastapi import Depends

        @app.post("/predict")
        def predict(req: PredictRequest,
                    predictor: WantilanPredictor = Depends(get_predictor)):
            return predictor.predict(req.model_dump())
    """
    if _predictor_instance is None:
        raise RuntimeError(
            "Predictor belum diinisialisasi. "
            "Pastikan load_predictor() dipanggil di lifespan startup."
        )
    return _predictor_instance