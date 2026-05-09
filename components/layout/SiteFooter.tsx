"use client";

import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="bg-[#1f1c18] text-sand mt-0">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="font-serif text-white text-lg mb-3">{SITE_NAME}</h4>
            <p className="text-sm text-sand/75 leading-relaxed">
              Ruang gotong royong digital untuk pengrajin Bali. Diinisiasi oleh tim Control + Craft Bali, mahasiswa Ilmu Komputer UGM 2026.
            </p>
          </div>

          {/* Explore */}
          <div>
            <p className="text-[11.5px] uppercase tracking-wider text-sand font-semibold mb-3.5">Jelajahi</p>
            <ul className="space-y-2">
              <li><Link href="/kategori" className="text-sm text-sand/85 hover:text-white transition-colors">Kategori</Link></li>
              <li><Link href="/artikel" className="text-sm text-sand/85 hover:text-white transition-colors">Artikel</Link></li>
              <li><Link href="/komunitas" className="text-sm text-sand/85 hover:text-white transition-colors">Komunitas</Link></li>
              <li><Link href="/kalkulator" className="text-sm text-sand/85 hover:text-white transition-colors">Kalkulator</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <p className="text-[11.5px] uppercase tracking-wider text-sand font-semibold mb-3.5">Tentang</p>
            <ul className="space-y-2">
              <li><Link href="/tentang" className="text-sm text-sand/85 hover:text-white transition-colors">Apa itu Wantilan Kriya</Link></li>
              <li><Link href="/tentang" className="text-sm text-sand/85 hover:text-white transition-colors">Tim & Pendamping</Link></li>
              <li><Link href="/tentang" className="text-sm text-sand/85 hover:text-white transition-colors">Nilai Budaya</Link></li>
              <li><span className="text-sm text-sand/85 cursor-pointer">Kontak Admin</span></li>
            </ul>
          </div>

          {/* Contribute */}
          <div>
            <p className="text-[11.5px] uppercase tracking-wider text-sand font-semibold mb-3.5">Kontribusi</p>
            <ul className="space-y-2">
              <li><Link href="/submit" className="text-sm text-sand/85 hover:text-white transition-colors">Bagikan Cerita</Link></li>
              <li><Link href="/submit" className="text-sm text-sand/85 hover:text-white transition-colors">Ajukan Pertanyaan</Link></li>
              <li><span className="text-sm text-sand/85 cursor-pointer">Jadi Moderator</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-sand/15 flex flex-wrap justify-between gap-3 text-xs text-sand/55">
          <span>© 2026 Control + Craft Bali · Dibuat dengan hormat pada budaya lokal.</span>
          <span>wantilankriya.id</span>
        </div>
      </div>
    </footer>
  );
}
