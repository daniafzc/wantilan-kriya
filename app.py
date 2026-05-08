"""
=============================================================
  WANTILAN KRIYA v2 — app.py  (Gradio / Hugging Face Spaces)

  predictor.py dan utils.py tidak perlu diubah.
=============================================================
"""

import logging
import os

import gradio as gr

from predictor import WantilanPredictor, load_predictor

# ──────────────────────────────────────────────────────────────
# LOGGING
# ──────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
log = logging.getLogger("wantilan.app")

# ──────────────────────────────────────────────────────────────
# KONFIGURASI PATH ARTIFACT
# ──────────────────────────────────────────────────────────────
ARTIFACT_PATH = os.getenv(
    "ARTIFACT_PATH",
    os.path.join(os.path.dirname(__file__), "artifacts", "wantilan_kriya_v2.joblib"),
)

# ──────────────────────────────────────────────────────────────
# LOAD PREDICTOR (sekali saat startup)
# ──────────────────────────────────────────────────────────────
log.info("🚀 Starting Wantilan Kriya API v2 (Gradio)...")
predictor: WantilanPredictor = load_predictor(ARTIFACT_PATH)
log.info("✅ Predictor siap!\n")


# ──────────────────────────────────────────────────────────────
# FUNGSI PREDIKSI (dipanggil Gradio)
# ──────────────────────────────────────────────────────────────
def predict(
    name: str,
    description: str,
    product_details: str,
    category: str,
    price: float,
    average_rating: float,
    reviews_count: int,
) -> tuple:
    """Wrapper tipis antara Gradio UI dan WantilanPredictor."""
    try:
        result = predictor.predict({
            "name"           : name,
            "description"    : description,
            "product_details": product_details,
            "category"       : category,
            "price"          : price,
            "average_rating" : average_rating,
            "reviews_count"  : reviews_count,
        })

        # ── Format detail fitur sebagai teks ─────────────────
        detail = result["detail_fitur"]
        materials_str  = ", ".join(detail["materials"]) if detail["materials"] else "—"
        detail_str = (
            f"🏝️  Produk Bali    : {'Ya' if detail['is_bali'] else 'Tidak'}\n"
            f"🪵  Material       : {materials_str}\n"
            f"⭐  Premium KW    : {detail['premium_kw']}\n"
            f"📝  Jumlah Kata   : {detail['text_words']}\n"
            f"🏷️  Tier Kategori : {detail['category_tier']}"
        )

        return (
            result["status_harga"],
            f"${result['saran_harga_usd']:.2f}",
            f"${result['harga_input_usd']:.2f}",
            f"Rp {result['harga_idr_estimasi']:,.0f}",
            result["skor_potensi_laku"],
            result["insight_bisnis"],
            detail_str,
        )

    except Exception as e:
        log.error(f"Predict error: {e}", exc_info=True)
        error_msg = f"❌ Error: {str(e)}"
        return (error_msg, "—", "—", "—", "—", error_msg, "—")


# ──────────────────────────────────────────────────────────────
# CONTOH INPUT
# ──────────────────────────────────────────────────────────────
EXAMPLES = [
    [
        "Handwoven Rattan Crossbody Bag Authentic Balinese",
        "Beautiful traditional Balinese rattan bag with premium leather strap. Perfect for summer and beach.",
        "Material: rattan, leather. Size: 30x20cm.",
        "Bags & Purses < Handbags < Shoulder Bags",
        20.00, 4.8, 45,
    ],
    [
        "Wooden Buddha Statue Desk Decor Bali Carving",
        "Small carved wood statue for meditation room. Authentic Balinese craft.",
        "Material: wood. Height: 15cm.",
        "Home & Living < Home Decor < Statues",
        120.00, 4.2, 10,
    ],
    [
        "Exclusive Masterpiece Hand Carved Teak Wood Mask",
        "Authentic luxury Balinese mask handcrafted from premium teak wood. Museum quality.",
        "Material: teak wood. Size: 40x25cm.",
        "Art & Collectibles < Sculpture",
        85.00, 5.0, 1500,
    ],
]

# ──────────────────────────────────────────────────────────────
# GRADIO UI
# ──────────────────────────────────────────────────────────────
with gr.Blocks(
    title="🌺 Wantilan Kriya — UMKM Price Predictor",
    theme=gr.themes.Soft(primary_hue="orange"),
) as demo:

    gr.Markdown(
        """
        # 🌺 Wantilan Kriya v2
        **Market Trend & Product Success Predictor untuk UMKM Bali**

        Masukkan informasi produkmu dan dapatkan estimasi harga optimal beserta insight bisnis.
        """
    )

    with gr.Row():
        # ── Kolom Input ──────────────────────────────────────
        with gr.Column(scale=1):
            gr.Markdown("### 📦 Informasi Produk")

            name = gr.Textbox(
                label="Nama Produk *",
                placeholder="Handwoven Rattan Crossbody Bag Authentic Balinese",
            )
            category = gr.Textbox(
                label="Kategori",
                placeholder="Bags & Purses < Handbags < Shoulder Bags",
                value="Uncategorized",
            )
            price = gr.Number(
                label="Harga yang Kamu Pasang (USD) *",
                minimum=0.01,
                value=45.00,
            )

            with gr.Row():
                average_rating = gr.Slider(
                    label="Rating Rata-rata",
                    minimum=0, maximum=5, step=0.1, value=0.0,
                )
                reviews_count = gr.Number(
                    label="Jumlah Ulasan",
                    minimum=0, value=0, precision=0,
                )

            description = gr.Textbox(
                label="Deskripsi Produk",
                placeholder="Beautiful traditional Balinese rattan bag...",
                lines=3,
            )
            product_details = gr.Textbox(
                label="Detail Produk (material, ukuran, dll)",
                placeholder="Material: rattan, leather. Size: 30x20cm.",
                lines=2,
            )

            btn = gr.Button("🔍 Analisis Harga", variant="primary", size="lg")

        # ── Kolom Output ─────────────────────────────────────
        with gr.Column(scale=1):
            gr.Markdown("### 📊 Hasil Analisis")

            status_harga = gr.Textbox(label="Status Harga", interactive=False)

            with gr.Row():
                saran_harga  = gr.Textbox(label="💡 Saran Harga (USD)", interactive=False)
                harga_input  = gr.Textbox(label="🏷️  Harga Inputmu (USD)", interactive=False)

            harga_idr    = gr.Textbox(label="💵 Estimasi Harga (IDR)", interactive=False)
            skor_potensi = gr.Textbox(label="🚀 Skor Potensi Laku", interactive=False)
            insight      = gr.Textbox(
                label="📝 Insight Bisnis",
                interactive=False,
                lines=3,
            )
            detail_fitur = gr.Textbox(
                label="🔬 Detail Fitur yang Terdeteksi",
                interactive=False,
                lines=6,
            )

    # ── Contoh ───────────────────────────────────────────────
    gr.Markdown("### 📌 Contoh Produk")
    gr.Examples(
        examples=EXAMPLES,
        inputs=[name, description, product_details, category, price, average_rating, reviews_count],
        label="Klik untuk isi otomatis →",
    )

    # ── Event binding ─────────────────────────────────────────
    btn.click(
        fn=predict,
        inputs=[name, description, product_details, category, price, average_rating, reviews_count],
        outputs=[status_harga, saran_harga, harga_input, harga_idr, skor_potensi, insight, detail_fitur],
    )

# ──────────────────────────────────────────────────────────────
# ENTRY POINT
# ──────────────────────────────────────────────────────────────
if __name__ == "__main__":
    demo.launch()