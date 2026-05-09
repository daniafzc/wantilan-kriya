"use client";

import Link from "next/link";
import { ARTICLES } from "@/lib/constants";
import { ArticleCard } from "@/components/shared/ArticleCard";

interface ArticleGridProps {
  title?: string;
  subtitle?: string;
  showViewAll?: boolean;
  articles?: typeof ARTICLES;
  columns?: 2 | 3;
}

export function ArticleGrid({
  title = "Artikel terbaru",
  subtitle = "Cerita dan teknik segar dari pengrajin Bali.",
  showViewAll = true,
  articles = ARTICLES,
  columns = 3,
}: ArticleGridProps) {
  return (
    <section className="py-16 md:py-20 bg-white border-y border-line-soft">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">
        <div className="flex flex-wrap justify-between items-end gap-6 mb-8 md:mb-10">
          <div>
            <h2 className="font-serif text-3xl md:text-[38px] mb-2.5 leading-tight">{title}</h2>
            <p className="text-base text-ink-soft">{subtitle}</p>
          </div>
          {showViewAll && (
            <Link href="/artikel" className="text-sm text-terracotta font-semibold hover:underline shrink-0">
              Lihat semua artikel →
            </Link>
          )}
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 ${columns === 3 ? 'lg:grid-cols-3' : ''} gap-6`}>
          {articles.map((article) => (
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
  );
}
