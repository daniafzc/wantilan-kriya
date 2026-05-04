"use client";

import { useState } from "react";
import Link from "next/link";
import { ARTICLES } from "@/constant/constant";
import { ArticleCard } from "@/components/shared/ArticleCard";
import { cn } from "@/lib/utils";

const filters = [
  "Semua",
  "Teknik & Bahan",
  "Tradisi & Makna",
  "Pasar & Bisnis",
  "Kolaborasi",
];

export default function ArtikelPage() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = ARTICLES.filter((article) => {
    const matchesFilter =
      activeFilter === "Semua" || article.category === activeFilter;
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
            <span className="text-ink-muted text-lg">🔍</span>
            <input
              type="text"
              placeholder="Cari artikel, teknik, motif, atau cerita pengrajin..."
              className="flex-1 bg-transparent text-base text-ink placeholder:text-ink-muted outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2.5 mb-8 md:mb-10">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-4 md:px-[18px] py-2 rounded-full text-[13.5px] transition-all",
                  activeFilter === filter
                    ? "bg-ink text-white border-ink"
                    : "bg-white text-ink-soft border border-line hover:border-ink",
                )}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                slug={article.slug}
                title={article.title}
                author={article.author}
                readTime={article.readTime}
                imageColor={article.imageColor}
                badge={article.badge}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
