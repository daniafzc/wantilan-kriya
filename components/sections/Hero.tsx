"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f7e8d8] via-[#f1e3c4] to-[#e8cfa8]">
      {/* Decorative circles */}
      <div className="absolute -top-[100px] -right-[100px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(194,85,58,0.18)_0%,transparent_65%)]" />
      <div className="absolute -bottom-[200px] -left-[100px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(74,107,72,0.15)_0%,transparent_65%)]" />

      <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-16 md:py-20">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-10 md:gap-[60px] items-center">
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-[0.15em] text-terracotta font-bold mb-4 md:mb-[18px]">
              Ruang Berbagi Pengrajin Bali
            </p>
            <h1 className="font-serif text-4xl md:text-[56px] leading-[1.05] text-ink mb-5 md:mb-6 tracking-tight">
              Pengetahuan kriya yang tumbuh bersama komunitas.
            </h1>
            <p className="text-base md:text-lg text-ink-soft leading-relaxed mb-6 md:mb-8 max-w-[540px]">
              Wantilan Kriya adalah perpustakaan cerita dan teknik dari pengrajin Bali, dilengkapi pintu masuk ke komunitas WhatsApp per topik. Tanpa daftar akun, tanpa rumit.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/submit">
                <Button size="lg">+ Bagikan Cerita Anda →</Button>
              </Link>
              <Link href="/artikel">
                <Button variant="secondary" size="lg">Telusuri Artikel</Button>
              </Link>
            </div>
          </div>

          {/* Visual tiles - desktop only */}
          <div className="hidden md:block relative h-[440px]">
            <div className="absolute top-0 left-[30px] w-[280px] h-[200px] rounded-2xl bg-gradient-to-br from-[#c9d6c4] to-green shadow-[0_12px_30px_rgba(0,0,0,0.12)] overflow-hidden group hover:-translate-y-1 transition-transform">
              <span className="absolute bottom-3.5 left-3.5 bg-white/95 px-3 py-1.5 rounded-md text-xs font-semibold">Tenun Endek</span>
            </div>
            <div className="absolute top-[60px] right-0 w-[220px] h-[220px] rounded-2xl bg-gradient-to-br from-[#e6bfb1] to-terracotta shadow-[0_12px_30px_rgba(0,0,0,0.12)] overflow-hidden group hover:-translate-y-1 transition-transform">
              <span className="absolute bottom-3.5 left-3.5 bg-white/95 px-3 py-1.5 rounded-md text-xs font-semibold">Ekspor</span>
            </div>
            <div className="absolute bottom-5 left-0 w-[200px] h-[180px] rounded-2xl bg-gradient-to-br from-[#f1e3c4] to-gold shadow-[0_12px_30px_rgba(0,0,0,0.12)] overflow-hidden group hover:-translate-y-1 transition-transform">
              <span className="absolute bottom-3.5 left-3.5 bg-white/95 px-3 py-1.5 rounded-md text-xs font-semibold">Ukir Kayu</span>
            </div>
            <div className="absolute bottom-0 right-[60px] w-[240px] h-[160px] rounded-2xl bg-gradient-to-br from-[#e0c8d4] to-plum shadow-[0_12px_30px_rgba(0,0,0,0.12)] overflow-hidden group hover:-translate-y-1 transition-transform">
              <span className="absolute bottom-3.5 left-3.5 bg-white/95 px-3 py-1.5 rounded-md text-xs font-semibold">Perak Celuk</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
