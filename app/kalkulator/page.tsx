"use client";

import Link from "next/link";
import { CalculatorForm } from "@/components/sections/CalculatorForm";
import { CalculatorInfo } from "@/components/sections/CalculatorInfo";

export default function KalkulatorPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-[#f7e8d8] to-paper pt-12 md:pt-[60px] pb-10 md:pb-[50px] border-b border-line-soft">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="text-[13px] text-ink-muted mb-3.5">
            <Link href="/" className="text-terracotta hover:underline">Beranda</Link> · Kalkulator Harga
          </div>
          <h1 className="font-serif text-3xl md:text-[48px] leading-tight mb-3">Kalkulator Harga Pasar Global</h1>
          <p className="text-base md:text-[17px] text-ink-soft max-w-[720px]">
            Estimasi harga jual ideal untuk kriya Bali di pasar Etsy & Amazon, dilatih dari ratusan ribu listing produk handmade internasional.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="grid lg:grid-cols-[1fr_380px] gap-10 md:gap-12 items-start">
            <CalculatorForm />
            <CalculatorInfo />
          </div>
        </div>
      </section>
    </>
  );
}
