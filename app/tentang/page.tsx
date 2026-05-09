"use client";

import Link from "next/link";
import { AboutIntro } from "@/components/sections/AboutSection";
import { PersonaGrid } from "@/components/sections/PersonaGrid";
import { TeamGrid } from "@/components/sections/TeamGrid";

export default function TentangPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-[#f7e8d8] to-paper pt-12 md:pt-[60px] pb-10 md:pb-[50px] border-b border-line-soft">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="text-[13px] text-ink-muted mb-3.5">
            <Link href="/" className="text-terracotta hover:underline">Beranda</Link> · Tentang
          </div>
          <h1 className="font-serif text-3xl md:text-[48px] leading-tight mb-3">Tentang Wantilan Kriya</h1>
          <p className="text-base md:text-[17px] text-ink-soft max-w-[720px]">
            Ruang gotong royong digital untuk pengrajin Bali — terinspirasi dari balai komunitas tradisional Bali.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <AboutIntro />
          <PersonaGrid />
          <TeamGrid />

          <div className="mb-10">
            <h2 className="font-serif text-2xl md:text-[28px] mb-3.5">Kontak</h2>
            <p className="text-base md:text-[16px] text-ink-soft leading-relaxed">
              Hubungi admin via WhatsApp <strong>+62 812-XXXX-XXXX</strong> atau email{" "}
              <strong>halo@wantilankriya.id</strong>. Kami responsif Senin–Jumat 09:00–17:00 WITA.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
