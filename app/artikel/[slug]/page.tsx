import ArtikelDetailPage from "./ArtikelDetailPage";

// Page menerima params dari Next.js
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <ArtikelDetailPage slug={slug} />;
}
