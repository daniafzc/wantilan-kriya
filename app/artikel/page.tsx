"use client";

import { Article } from "@/types";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArticleCard } from "@/components/shared/ArticleCard";
import { cn } from "@/lib/utils";
import { IoIosSearch } from "react-icons/io";

// Map label (UI) → slug (what the backend expects)
const filters = [
  { label: "Semua",           slug: "" },
  { label: "Teknik & Bahan",  slug: "teknik" },
  { label: "Tradisi & Makna", slug: "tradisi" },
  { label: "Pasar & Bisnis",  slug: "pasar" },
  { label: "Kolaborasi",      slug: "kolaborasi" },
];

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export default function ArtikelPage() {
  const [activeSlug, setActiveSlug] = useState("");       // "" = Semua
  const [searchInput, setSearchInput] = useState("");     // raw input
  const [searchQuery, setSearchQuery] = useState("");     // debounced
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  // ── Debounce search input (300ms) ─────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setSearchQuery(searchInput.trim()), 300);
    return () => clearTimeout(t);
  }, [searchInput]);

  // ── Fetch whenever filter/search changes ──────────────────────
  useEffect(() => {
    const controller = new AbortController();

    const fetchArticles = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (activeSlug)  params.append("kategori", activeSlug);
        if (searchQuery) params.append("search", searchQuery);

        // NOTE: trailing slash matches FastAPI's prefix="/artikel" + path="/"
        const res = await fetch(
          `${API_BASE}/artikel/?${params.toString()}`,
          { signal: controller.signal, cache: "no-store" },
        );
        if (!res.ok) throw new Error("Gagal mengambil data artikel");
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error(err);
          setArticles([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
    return () => controller.abort();
  }, [activeSlug, searchQuery]);

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-[#f7e8d8] to-paper pt-12 md:pt-[60px] pb-10 md:pb-[50px] border-b border-line-soft">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="text-[13px] text-ink-muted mb-3.5">
            <Link href="/" className="text-terracotta hover:underline">
              Beranda
            </Link>{" "}
            · Artikel
          </div>
          <h1 className="font-serif text-3xl md:text-[48px] leading-tight mb-3">
            Semua Artikel
          </h1>
          <p className="text-base md:text-[17px] text-ink-soft max-w-[720px]">
            Cari pengetahuan praktis dari ratusan pengrajin Bali. Telusuri
            berdasarkan kata kunci atau saring per kategori.
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 md:py-12">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="bg-white border-[1.5px] border-line rounded-xl px-4 md:px-5 py-3 md:py-3.5 flex items-center gap-3 mb-5 focus-within:border-terracotta transition-colors">
            <IoIosSearch className="text-ink-muted text-lg" />
            <input
              type="text"
              placeholder="Cari artikel, teknik, motif, atau cerita pengrajin..."
              className="flex-1 bg-transparent text-base text-ink placeholder:text-ink-muted outline-none"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2.5 mb-8 md:mb-10">
            {filters.map((f) => (
              <button
                key={f.slug || "all"}
                onClick={() => setActiveSlug(f.slug)}
                className={cn(
                  "px-4 md:px-[18px] py-2 rounded-full text-[13.5px] transition-all",
                  activeSlug === f.slug
                    ? "bg-ink text-white border-ink"
                    : "bg-white text-ink-soft border border-line hover:border-ink",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="text-ink-muted">Memuat artikel…</p>
          ) : articles.length === 0 ? (
            <p className="text-ink-muted">
              Tidak ada artikel yang cocok dengan pencarian kamu.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  slug={article.slug}
                  title={article.title}
                  author={article.author}
                  readTime={article.read_time}
                  imageColor={article.imageColor}
                  badge={article.badge}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}