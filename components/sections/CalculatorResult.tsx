"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { InsightCard } from "@/components/shared/InsightCard";

export function CalculatorResultDisplay() {
  return (
    <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 items-start">
      {/* Result card */}
      <div className="bg-gradient-to-br from-terracotta to-terracotta-deep text-white rounded-2xl p-8 md:p-10 text-center lg:sticky lg:top-[90px]">
        <div className="text-xs uppercase tracking-wider opacity-85 font-semibold mb-2.5">
          Rentang Harga Ideal (USD)
        </div>
        <div className="font-serif text-4xl md:text-[56px] font-bold mb-2 leading-none">
          $45 — $60
        </div>
        <div className="text-sm opacity-90 mb-6">≈ Rp 720.000 — Rp 960.000</div>
        <div className="flex flex-col gap-2">
          <Link href="/submit">
            <Button className="w-full bg-white text-terracotta hover:bg-white/90 border border-white">
              Diskusikan di Kolaborasi WA →
            </Button>
          </Link>
          <Link href="/kalkulator">
            <Button className="w-full bg-white/20 text-white hover:bg-white/30 border border-white/30">
              Coba Kombinasi Lain
            </Button>
          </Link>
        </div>
      </div>

      {/* Insights */}
      <div>
        <InsightCard
          title="Insight Kepopuleran"
          content="Produk perak dengan motif Bali tradisional + finishing matte memiliki rata-rata 4× lebih banyak favorit di Etsy dibanding finishing glossy. Buyer internasional cenderung mencari karya dengan tampilan lebih artisanal."
        />
        <InsightCard
          title="Catatan Persaingan"
          content="Produk impor dari Thailand & India menargetkan rentang $25-$40 dengan volume tinggi. Posisikan produk Anda sebagai 'handmade artisan with cultural story' untuk justifikasi harga premium."
        />
        <InsightCard
          title="Saran Strategis"
          content="Sertakan cerita budaya motif dalam deskripsi produk — pembeli internasional bersedia membayar 20-30% lebih untuk karya dengan narasi kuat. Sertakan foto proses pembuatan jika memungkinkan."
        />
        <InsightCard
          title="Peringatan"
          content="Hindari menjual di bawah $30 — itu akan dianggap 'bukan handmade asli' oleh pembeli premium dan merusak posisi tawar pengrajin Bali secara umum."
        />
      </div>
    </div>
  );
}
