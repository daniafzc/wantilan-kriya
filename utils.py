"""
=============================================================
  WANTILAN KRIYA v2 — utils.py
  
  Berisi:
    - Konstanta stopwords & lemmatizer
    - clean_text()       → identik dengan Kaggle notebook
    - build_num_vector() → feature engineering numerik
    - price_status()     → kalkulasi status & saran harga
  
  ⚠️  CRITICAL: clean_text() di sini IDENTIK dengan yang ada
      di Kaggle notebook. Jangan modifikasi satu tanpa
      modifikasi yang lain.
=============================================================
"""

import re
import numpy as np
import nltk

for pkg in ["punkt", "punkt_tab", "averaged_perceptron_tagger",
            "averaged_perceptron_tagger_eng", "wordnet", "omw-1.4"]:
    nltk.download(pkg, quiet=True)

from nltk.stem import WordNetLemmatizer
from nltk import pos_tag, word_tokenize
from sklearn.feature_extraction.text import ENGLISH_STOP_WORDS

# ──────────────────────────────────────────────────────────────
# STOPWORDS
# ──────────────────────────────────────────────────────────────
NLTK_STOPWORDS = set("""
i me my myself we our ours ourselves you your yours yourself yourselves
he him his himself she her hers herself it its itself they them their theirs themselves
what which who whom this that these those am is are was were be been being
have has had having do does did doing a an the and but if or because as until while
of at by for with about against between into through during before after above below
to from up down in out on off over under again further then once here there when
where why how all any both each few more most other some such no nor not only own
same so than too very s t can will just don should now
""".split())

CUSTOM_STOPWORDS = {
    "quot", "amp", "nbsp", "http", "https", "www", "com",
    "etsy", "shop", "item", "listing",
    "please", "note", "use", "using",
    "available", "high", "quality", "new",
    "great", "best", "perfect", "beautiful",
    "cm", "inch", "size", "small", "large", "medium"
}

ALL_STOPWORDS = ENGLISH_STOP_WORDS.union(NLTK_STOPWORDS).union(CUSTOM_STOPWORDS)
lemmatizer    = WordNetLemmatizer()


# ──────────────────────────────────────────────────────────────
# TEXT CLEANING (IDENTIK DENGAN KAGGLE NOTEBOOK)
# ──────────────────────────────────────────────────────────────
def _keep_pos(tag: str) -> bool:
    """Simpan Noun, Adjective, dan Verb saja."""
    return tag.startswith("NN") or tag.startswith("JJ") or tag.startswith("VB")


def clean_text(text: str) -> str:
    """
    Pipeline pembersihan teks produk.

    ⚠️  FUNGSI INI IDENTIK DENGAN KAGGLE NOTEBOOK.
        Jangan modifikasi tanpa update notebook juga.

    Langkah:
        1. Lowercase
        2. Hapus karakter non-alfabetik
        3. Tokenisasi → hapus stopwords & token pendek
        4. POS-tag → filter NN / JJ / VB
        5. Lemmatisasi → dedup urutan

    Parameters
    ----------
    text : str
        Teks mentah (nama + kategori + deskripsi + detail produk).

    Returns
    -------
    str
        Teks bersih siap di-encode BERT atau di-vectorize.
    """
    text = str(text).lower()
    text = re.sub(r"[^a-zA-Z\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()

    tokens   = word_tokenize(text)
    tokens   = [w for w in tokens if w not in ALL_STOPWORDS and len(w) > 2]
    tagged   = pos_tag(tokens)
    filtered = [w for w, t in tagged if _keep_pos(t)]
    lemmas   = [lemmatizer.lemmatize(w) for w in filtered]
    lemmas   = list(dict.fromkeys(lemmas))          # dedup, jaga urutan

    return " ".join(lemmas)


# ──────────────────────────────────────────────────────────────
# FEATURE ENGINEERING
# ──────────────────────────────────────────────────────────────
def build_num_vector(
    *,
    clean_txt       : str,
    avg_rating      : float,
    reviews_count   : int,
    category        : str,
    mean_map        : dict,
    global_mean     : float,
    tier_map        : dict,
    bestseller_thr  : float,
    materials       : list[str],
    premium_words   : list[str],
    bali_keywords   : list[str],
    num_cols        : list[str],
) -> np.ndarray:
    """
    Bangun vektor fitur numerik dari teks bersih dan metadata produk.

    Mengembalikan array (1, N) yang siap di-hstack dengan BERT embedding.

    Parameters
    ----------
    clean_txt       : Output dari clean_text().
    avg_rating      : Rating rata-rata produk (0–5).
    reviews_count   : Jumlah ulasan.
    category        : String kategori produk (format "A < B < C").
    mean_map        : Dict target-encoding category → log-mean price.
    global_mean     : Fallback global log-mean price.
    tier_map        : Dict category → tier (int 1–3).
    bestseller_thr  : Threshold jumlah review untuk dianggap bestseller.
    materials       : List material keywords (binary features).
    premium_words   : List kata premium.
    bali_keywords   : List kata kunci Bali.
    num_cols        : Urutan kolom yang digunakan saat training.

    Returns
    -------
    np.ndarray  shape (1, len(num_cols))
    """
    words = clean_txt.split()

    # ── Scalar features ───────────────────────────────────────
    reviews_log     = np.log1p(reviews_count)
    trust_score     = avg_rating * reviews_log
    text_word_count = len(words)
    char_count      = len(clean_txt)
    avg_word_length = char_count / (text_word_count + 1)
    category_depth  = len(str(category).split("<"))

    is_bali         = 1 if any(w in words for w in bali_keywords) else 0
    cat_te          = float(mean_map.get(category, global_mean))
    prem_kw_count   = sum(1 for w in premium_words if w in words)
    engagement      = reviews_count * (avg_rating / 5.0)
    is_bseller      = 1 if reviews_count >= bestseller_thr else 0
    cat_tier        = int(tier_map.get(category, 2))

    # ── Material binary features ──────────────────────────────
    mat_feats = [1 if mat in words else 0 for mat in materials]

    # ── Rakit array ───────────────────────────────────────────
    vec = np.array([[
        avg_rating, reviews_log, trust_score,
        text_word_count, cat_te, is_bali, category_depth,
        char_count, avg_word_length, prem_kw_count,
        engagement, is_bseller, cat_tier,
    ] + mat_feats], dtype=np.float32)

    assert vec.shape[1] == len(num_cols), (
        f"Dimensi tidak cocok: {vec.shape[1]} vs {len(num_cols)}\n"
        f"Pastikan materials_list dan num_cols di artifact konsisten."
    )

    return vec


# ──────────────────────────────────────────────────────────────
# PRICE STATUS & BUSINESS INSIGHT
# ──────────────────────────────────────────────────────────────
def price_status(
    input_price   : float,
    pred_price    : float,
    clean_txt     : str,
    is_bali       : bool,
    mat_feats     : list[int],
    prem_kw_count : int,
) -> tuple[str, str, str, int]:
    """
    Hitung status harga, saran bisnis, dan skor potensi laku.

    Parameters
    ----------
    input_price   : Harga yang dipasang seller (USD).
    pred_price    : Harga estimasi model (USD).
    clean_txt     : Teks bersih (untuk hitung word count).
    is_bali       : Apakah produk mengandung keyword Bali.
    mat_feats     : List binary material features.
    prem_kw_count : Jumlah premium keyword yang terdeteksi.

    Returns
    -------
    tuple (status_label, status_emoji, saran, success_score)
        status_label  : "Overpriced" | "Underpriced" | "Optimal"
        status_emoji  : "🔴" | "🟡" | "🟢"
        saran         : Kalimat saran bisnis dalam Bahasa Indonesia.
        success_score : Integer 0–99.
    """
    upper = pred_price * 1.15
    lower = pred_price * 0.85

    if input_price > upper:
        label = "Overpriced"
        emoji = "🔴"
        saran = (
            f"Hargamu ${input_price:.2f} di atas estimasi pasar ${pred_price:.2f}. "
            "Coba tonjolkan bahan premium atau kurangi sedikit untuk memenangkan pembeli."
        )
    elif input_price < lower:
        label = "Underpriced"
        emoji = "🟡"
        saran = (
            f"Hargamu ${input_price:.2f} terlalu murah! "
            f"Model menyarankan ${pred_price:.2f}. Naikkan harga untuk profit maksimal."
        )
    else:
        label = "Optimal"
        emoji = "🟢"
        saran = (
            f"Hargamu ${input_price:.2f} sudah sangat kompetitif "
            f"dengan estimasi pasar ${pred_price:.2f}. Pertahankan!"
        )

    text_word_count = len(clean_txt.split())

    score = 60
    if label == "Optimal"       : score += 15
    if text_word_count > 20     : score += 10
    if is_bali                  : score +=  5
    if sum(mat_feats) > 0       : score +=  5
    if prem_kw_count > 0        : score +=  5
    success_score = min(score, 99)

    return label, emoji, saran, success_score