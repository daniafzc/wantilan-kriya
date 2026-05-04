"use client";

import Link from "next/link";
import { CalculatorResultDisplay } from "@/components/sections/CalculatorResultDisplay";

export default function KalkulatorHasilPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-[#f7e8d8] to-paper pt-12 md:pt-[60px] pb-10 md:pb-[50px] border-b border-line-soft">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="text-[13px] text-ink-muted mb-3.5">
            <Link href="/" className="text-terracotta hover:underline">Beranda</Link> ·{" "}
            <Link href="/kalkulator" className="text-terracotta hover:underline">Kalkulator</Link> · Hasil Estimasi
          </div>
          <h1 className="font-serif text-3xl md:text-[48px] leading-tight mb-3">Estimasi Harga</h1>
          <p className="text-base md:text-[17px] text-ink-soft max-w-[720px]">
            Berdasarkan input: <strong>Perhiasan Perak · Perak 925 · Pasar AS · Detail tinggi</strong>.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <CalculatorResultDisplay />
        </div>
      </section>
    </>
  );
}
