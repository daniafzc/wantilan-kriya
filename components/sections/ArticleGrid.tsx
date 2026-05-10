"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArticleCard } from "@/components/shared/ArticleCard";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

interface Article {
  id: string;
  slug: string;
  title: string;
  author: string;
  read_time: string;
  image_color: string;
  badge?: string;
}

interface ArticleGridProps {
  title?: string;
  subtitle?: string;
  showViewAll?: boolean;
  columns?: 2 | 3;
  limit?: number;
}

export function ArticleGrid({
  title = "Artikel terbaru",
  subtitle = "Cerita dan teknik segar dari pengrajin Bali.",
  showViewAll = true,
  columns = 3,
  limit = 3,
}: ArticleGridProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchArticles = async () => {
      try {
        const res = await fetch(`${API_BASE}/artikel/?limit=${limit}`, {
          signal: controller.signal,
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Gagal fetch artikel");
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
  }, [limit]);

  return (
    <section className="py-16 md:py-20 bg-white border-y border-line-soft">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">
        <div className="flex flex-wrap justify-between items-end gap-6 mb-8 md:mb-10">
          <div>
            <h2 className="font-serif text-3xl md:text-[38px] mb-2.5 leading-tight">
              {title}
            </h2>
            <p className="text-base text-ink-soft">{subtitle}</p>
          </div>
          {showViewAll && (
            <Link
              href="/artikel"
              className="text-sm text-terracotta font-semibold hover:underline shrink-0"
            >
              Lihat semua artikel →
            </Link>
          )}
        </div>

        {loading ? (
          <p className="text-ink-muted">Memuat artikel…</p>
        ) : articles.length === 0 ? (
          <p className="text-ink-muted">Belum ada artikel yang tersedia.</p>
        ) : (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 ${
              columns === 3 ? "lg:grid-cols-3" : ""
            } gap-6`}
          >
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                slug={article.slug}
                title={article.title}
                author={article.author}
                readTime={article.read_time}
                imageColor={article.image_color}
                badge={article.badge}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
