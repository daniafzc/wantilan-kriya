"use client";

export function CalculatorInfo() {
  return (
    <div className="bg-sand-soft border border-sand rounded-2xl p-6 md:p-7 lg:sticky lg:top-[90px]">
      <h3 className="font-serif text-[22px] mb-3">Cara kerja</h3>
      <p className="text-sm text-ink-soft leading-relaxed mb-4">
        Model machine learning ringan dilatih dari data publik Etsy & Amazon. Hasil bersifat panduan, bukan harga pasti.
      </p>
      <div className="space-y-2">
        <div className="bg-white rounded-xl p-3.5 md:p-4">
          <strong className="block text-terracotta text-lg font-serif">120,000+</strong>
          <span className="text-xs md:text-[12.5px] text-ink-muted">Listing produk handmade dianalisis</span>
        </div>
        <div className="bg-white rounded-xl p-3.5 md:p-4">
          <strong className="block text-terracotta text-lg font-serif">±15%</strong>
          <span className="text-xs md:text-[12.5px] text-ink-muted">Tingkat akurasi rata-rata estimasi</span>
        </div>
        <div className="bg-white rounded-xl p-3.5 md:p-4">
          <strong className="block text-terracotta text-lg font-serif">4 pasar</strong>
          <span className="text-xs md:text-[12.5px] text-ink-muted">AS, Eropa, Australia, Asia</span>
        </div>
      </div>
    </div>
  );
}
