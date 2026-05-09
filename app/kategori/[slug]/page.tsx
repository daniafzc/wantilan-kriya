// app/kategori/[slug]/page.tsx
import { CATEGORIES } from "@/lib/constants";
import KategoriDetailPage from "./KategoriDetailPage";

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ slug: cat.slug }));
}

export default function Page() {
  return <KategoriDetailPage />;
}
