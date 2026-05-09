"use client";

import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import { CategoryCard } from "@/components/shared/CategoryCard";

export default function KategoriPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-[#f7e8d8] to-paper pt-12 md:pt-[60px] pb-10 md:pb-[50px] border-b border-line-soft">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="text-[13px] text-ink-muted mb-3.5">
            <Link href="/" className="text-terracotta hover:underline">Beranda</Link> · Kategori
          </div>
          <h1 className="font-serif text-3xl md:text-[48px] leading-tight mb-3">Kategori Pengetahuan</h1>
          <p className="text-base md:text-[17px] text-ink-soft max-w-[720px]">
            Empat kelompok pengetahuan yang dikurasi tim Wantilan Kriya berdasarkan riset bersama pengrajin di Gianyar dan Karangasem.
          </p>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-10 md:py-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="grid md:grid-cols-2 gap-5">
            {CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.id}
                slug={cat.slug}
                name={cat.name}
                description={cat.description}
                icon={cat.icon}
                color={cat.color}
                articleCount={cat.articleCount}
                variant="list"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
