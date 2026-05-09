"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export function Spotlight({ className }: { className?: string }) {
  return (
    <Link
      href="/kalkulator"
      className={cn(
        "block bg-gradient-to-br from-terracotta to-terracotta-deep text-white rounded-[14px] p-8 md:p-9",
        "relative overflow-hidden h-full",
        "hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(194,85,58,0.4)] transition-all duration-200",
        className
      )}
    >
      {/* Decorative circle */}
      <div className="absolute -top-[60px] -right-[80px] w-[280px] h-[280px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18)_0%,transparent_60%)]" />

      <span className="relative z-10 inline-block bg-white/20 px-3 py-1.5 rounded text-[11px] uppercase tracking-wider font-bold mb-4">
        Baru · Harga & Tren AI
      </span>
      <h3 className="relative z-10 font-serif text-2xl md:text-[28px] leading-tight mb-3">
        Kalkulator Harga Pasar Global
      </h3>
      <p className="relative z-10 text-sm md:text-[14.5px] opacity-90 leading-relaxed mb-6">
        Estimasi harga jual ideal di Etsy & Amazon berdasarkan jenis kriya, bahan, dan target pasar internasional.
      </p>
      <span className="relative z-10 text-sm font-bold inline-flex items-center gap-1.5">
        Coba kalkulator sekarang →
      </span>
    </Link>
  );
}
