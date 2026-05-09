"""
routes/kalkulator.py — Craft price calculator.

POST /kalkulator → accepts CalculatorInput, returns CalculatorResult.

The algorithm is a rule-based estimate that mirrors what the frontend
already displays. In production you may replace this with an AI call.
"""

from fastapi import APIRouter
from schemas import CalculatorInput, CalculatorResult, Insight

router = APIRouter()

# ── Multiplier tables ─────────────────────────────────────────────────────────

KUALITAS_MULTIPLIER = {
    "standar": 1.0,
    "premium": 1.6,
    "eksklusif": 2.5,
}

PASAR_MULTIPLIER = {
    "lokal": 0.4,
    "nasional": 0.7,
    "internasional": 1.0,
}

KRIYA_BASE_USD_PER_JAM = {
    "tenun": 8,
    "ukir-kayu": 7,
    "perak": 12,
    "keramik": 6,
    "anyaman": 5,
}

IDR_RATE = 16_000  # 1 USD ≈ Rp 16.000 (update periodically or fetch live)


def _format_idr(amount: float) -> str:
    return f"Rp {int(amount):,}".replace(",", ".")


def _insights(data: CalculatorInput, low_usd: float, high_usd: float) -> list[Insight]:
    tips = []

    if data.target_pasar == "internasional":
        tips.append(
            Insight(
                title="Pasar Internasional",
                content=(
                    "Etsy dan Amazon Handmade menerima produk kriya Bali dengan baik. "
                    "Sertakan cerita di balik karya untuk meningkatkan nilai jual."
                ),
            )
        )

    if data.kualitas == "eksklusif":
        tips.append(
            Insight(
                title="Kualitas Eksklusif",
                content=(
                    "Produk eksklusif cocok untuk galeri atau pesanan khusus. "
                    "Pertimbangkan sertifikasi bahan untuk pasar Eropa."
                ),
            )
        )

    if data.jenis_kriya == "tenun":
        tips.append(
            Insight(
                title="Nilai Tenun Endek",
                content=(
                    "Pewarna alami dapat menaikkan harga jual 2–3× dibanding pewarna sintetis "
                    "di pasar internasional."
                ),
            )
        )

    if data.jenis_kriya == "perak":
        tips.append(
            Insight(
                title="Biaya Bahan Perak",
                content=(
                    "Harga perak fluktuatif. Pantau harga spot harian dan sesuaikan "
                    "harga jual agar margin tetap sehat."
                ),
            )
        )

    if data.jam_kerja > 20:
        tips.append(
            Insight(
                title="Jam Kerja Tinggi",
                content=(
                    f"Dengan {data.jam_kerja} jam kerja, pastikan harga mencerminkan "
                    "nilai waktu Anda. Jangan jual di bawah estimasi ini."
                ),
            )
        )

    if not tips:
        tips.append(
            Insight(
                title="Tips Penetapan Harga",
                content=(
                    "Selalu tambahkan 15–20% dari estimasi sebagai buffer biaya tak terduga "
                    "seperti ongkir, packaging, dan komisi platform."
                ),
            )
        )

    return tips


@router.post("/", response_model=CalculatorResult)
def calculate_price(data: CalculatorInput) -> CalculatorResult:
    base_rate = KRIYA_BASE_USD_PER_JAM.get(data.jenis_kriya.lower(), 6)

    kualitas_mult = KUALITAS_MULTIPLIER.get(data.kualitas, 1.0)
    pasar_mult    = PASAR_MULTIPLIER.get(data.target_pasar, 0.7)

    low_usd  = round(base_rate * data.jam_kerja * kualitas_mult * pasar_mult, 2)
    high_usd = round(low_usd * 1.8, 2)

    low_idr  = low_usd  * IDR_RATE
    high_idr = high_usd * IDR_RATE

    return CalculatorResult(
        price_range_usd=f"${low_usd:,.0f} – ${high_usd:,.0f}",
        price_range_idr=f"{_format_idr(low_idr)} – {_format_idr(high_idr)}",
        insights=_insights(data, low_usd, high_usd),
    )
