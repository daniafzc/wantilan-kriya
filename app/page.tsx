// app/page.tsx
import { Hero } from "@/components/sections/Hero";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { ArticleGrid } from "@/components/sections/ArticleGrid";
import { CommunitySectionWrapper } from "@/components/sections/CommunitySectionWrapper";
import type { Category, Article, Community } from "@/types";

/* ------------------------------------------------------------------ */
//  Point to your FastAPI server, NOT localhost:3000
/* ------------------------------------------------------------------ */
const API_URL = process.env.NEXT_PUBLIC_API_URL|| "http://127.0.0.1:8000"; // e.g. http://127.0.0.1:8000

async function safeFetch<T>(path: string): Promise<T[]> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: { "Accept": "application/json" },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(`[safeFetch] ${path} → ${res.status}`);
      return [];
    }
    return res.json();
  } catch (err) {
    console.error(`[safeFetch] ${path} network error:`, err);
    return [];
  }
}

export default async function HomePage() {
  const [categories, articles, communities] = await Promise.all([
    safeFetch<Category>("/kategori"),   // FastAPI routes
    safeFetch<Article>("/artikel"),
    safeFetch<Community>("/komunitas"),
  ]);

  return (
    <>
      <Hero />
      <CategoryGrid categories={categories} />
      <ArticleGrid articles={articles} />
      <CommunitySectionWrapper communities={communities} />
    </>
  );
}
