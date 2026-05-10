"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CategoryCard } from "@/components/shared/CategoryCard";
import { CATEGORY_ICONS } from "@/lib/categoryIcons";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

/** Mirrors backend schemas.KategoriResponse */
interface CategoryPayload {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  color: string | null;
  article_count: number;
}

export default function KategoriPage() {
  const [categories, setCategories] = useState<CategoryPayload[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch(`${API_BASE}/kategori/`, {
          signal: controller.signal,
          cache: "no-store",
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error("Gagal mengambil kategori");
        const data: CategoryPayload[] = await res.json();
        setCategories(data);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error(err);
          setCategories([]);
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-[#f7e8d8] to-paper pt-12 md:pt-[60px] pb-10 md:pb-[50px] border-b border-line-soft">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="text-[13px] text-ink-muted mb-3.5">
            <Link href="/" className="text-terracotta hover:underline">
              Beranda
            </Link>{" "}
            · Kategori
          </div>
          <h1 className="font-serif text-3xl md:text-[48px] leading-tight mb-3">
            Kategori Pengetahuan
          </h1>
          <p className="text-base md:text-[17px] text-ink-soft max-w-[720px]">
            Empat kelompok pengetahuan yang dikurasi tim Wantilan Kriya
            berdasarkan riset bersama pengrajin di Gianyar dan Karangasem.
          </p>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-10 md:py-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          {loading ? (
            <p className="text-ink-muted">Memuat kategori…</p>
          ) : categories.length === 0 ? (
            <p className="text-ink-muted">Belum ada kategori.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {categories.map((cat) => (
                <CategoryCard
                  key={cat.slug}
                  slug={cat.slug}
                  name={cat.name}
                  description={cat.description ?? ""}
                  icon={CATEGORY_ICONS[cat.slug] ?? "📚"}
                  color={cat.color ?? "#C9623F"}
                  articleCount={`${cat.article_count} artikel`}
                  variant="list"
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}