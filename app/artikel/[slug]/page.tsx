// app/artikel/[slug]/page.tsx
import { ARTICLES } from "@/lib/constants";
import ArtikelDetailPage from "./ArtikelDetailPage";

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export default function Page() {
  return <ArtikelDetailPage />;
}
