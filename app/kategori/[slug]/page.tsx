// app/kategori/[slug]/page.tsx
import KategoriDetailPage from "./KategoriDetailPage";

export const dynamic = "force-dynamic";

interface PageProps {
  // In Next.js 15+, params is a Promise
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <KategoriDetailPage slug={slug} />;
}