// app/artikel/[slug]/page.tsx
import { ARTICLES } from "@/lib/constants";
import ArtikelDetailPage from "./ArtikelDetailPage";

// Page menerima params dari Next.js
interface PageProps {
  params: { slug: string };
}

export default function Page({ params }: PageProps) {
  return <ArtikelDetailPage slug={params.slug} />;
}