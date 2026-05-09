"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArticleCard } from "@/components/shared/ArticleCard";
import { RelatedCommunityCta } from "@/components/shared/RelatedCommunityCta";
import { CommunityModal } from "@/components/shared/CommunityModal";
import { useCommunityModal } from "@/hooks/useCommunityModal";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

/* ════════════════════════════════════════════════════════════════════════
   Backend payload shapes
   ════════════════════════════════════════════════════════════════════════ */

interface KategoriPayload {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  color: string | null;
  article_count: number;
  community_slug?: string;
}

interface ArtikelPayload {
  id: string;
  slug: string;
  title: string;
  author: string;
  author_initial: string | null;
  author_role: string | null;
  author_location: string | null;
  excerpt: string | null;
  content: string | null;
  read_time: string;
  badge: string | null;
  image_color: string | null;
  category: string | null;
  category_slug: string | null;
  published: boolean;
  created_at: string | null;
}

interface KomunitasPayload {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  members: number;
  whatsapp_link: string | null;
  color: string | null;
  rules: string[];
}

/* ════════════════════════════════════════════════════════════════════════
   Fetch status — a single source of truth replaces `loading` + `missing`
   ════════════════════════════════════════════════════════════════════════ */

type Status = "loading" | "ready" | "missing" | "error";

interface Props {
  slug: string;
}

export default function KategoriDetailPage({ slug }: Props) {
  const { community, open, showRules, closeModal } = useCommunityModal();

  const [status, setStatus] = useState<Status>("loading");
  const [category, setCategory] = useState<KategoriPayload | null>(null);
  const [articles, setArticles] = useState<ArtikelPayload[]>([]);
  const [relatedCommunity, setRelatedCommunity] =
    useState<KomunitasPayload | null>(null);

useEffect(() => {
  const controller = new AbortController();
  let cancelled = false;

  (async () => {
    try {
      setStatus("loading");
      setCategory(null);
      setArticles([]);
      setRelatedCommunity(null);

      /* ── 1. Category detail ─────────────────────────────────── */
      const catRes = await fetch(
        `${API_BASE}/kategori/${encodeURIComponent(slug)}`,
        {
          signal: controller.signal,
          cache: "no-store",
          headers: { Accept: "application/json" },
        }
      );

      if (cancelled) return;

      if (catRes.status === 404) {
        setStatus("missing");
        return;
      }
      if (!catRes.ok) throw new Error("Gagal mengambil kategori");

      const catData: KategoriPayload = await catRes.json();
      if (cancelled) return;

      /* ── 2. Articles ────────────────────────────────────────── */
      const articlesPromise: Promise<ArtikelPayload[]> = fetch(
        `${API_BASE}/artikel/?kategori=${encodeURIComponent(slug)}`,
        {
          signal: controller.signal,
          cache: "no-store",
          headers: { Accept: "application/json" },
        }
      )
        .then((r) => (r.ok ? (r.json() as Promise<ArtikelPayload[]>) : []))
        .catch(() => [] as ArtikelPayload[]);

      /* ── 3. Linked community (optional) ─────────────────────── */
      const communityPromise: Promise<KomunitasPayload | null> =
        catData.community_slug
          ? fetch(
              `${API_BASE}/komunitas/${encodeURIComponent(
                catData.community_slug
              )}`,
              {
                signal: controller.signal,
                cache: "no-store",
                headers: { Accept: "application/json" },
              }
            )
              .then((r) =>
                r.ok ? (r.json() as Promise<KomunitasPayload>) : null
              )
              .catch(() => null)
          : Promise.resolve(null);

      const [articleData, communityData] = await Promise.all([
        articlesPromise,
        communityPromise,
      ]);

      if (cancelled) return;

      setCategory(catData);
      setArticles(articleData);
      setRelatedCommunity(communityData);
      setStatus("ready");
    } catch (err) {
      if (cancelled) return;
      if ((err as Error).name === "AbortError") return;
      console.error(err);
      setStatus("error");
    }
  })();

  return () => {
    cancelled = true;
    controller.abort();
  };
}, [slug]);

  /* ── Render branches ──────────────────────────────────────────────
     Call notFound() only via useEffect-free early return. Because we
     guard against stale updates above, this will not fire for a slug
     we're navigating AWAY from.
  ─────────────────────────────────────────────────────────────────── */
  if (status === "missing") {
    notFound();
  }

  if (status === "loading") {
    return <div className="p-10">Loading...</div>;
  }

  if (status === "error" || !category) {
    return (
      <div className="p-10 text-center text-ink-muted">
        Terjadi kesalahan saat memuat kategori. Silakan coba lagi.
      </div>
    );
  }

  const hasCommunity = Boolean(relatedCommunity);

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-[#f7e8d8] to-paper pt-12 md:pt-[60px] pb-10 md:pb-[50px] border-b border-line-soft">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="text-[13px] text-ink-muted mb-3.5">
            <Link href="/" className="text-terracotta hover:underline">
              Beranda
            </Link>{" "}
            ·{" "}
            <Link href="/kategori" className="text-terracotta hover:underline">
              Kategori
            </Link>{" "}
            · {category.name}
          </div>
          <h1 className="font-serif text-3xl md:text-[48px] leading-tight mb-3">
            {category.name}
          </h1>
          <p className="text-base md:text-[17px] text-ink-soft max-w-[720px]">
            {category.description ?? ""}
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-10 md:py-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="grid lg:grid-cols-[1fr_320px] gap-10 md:gap-[60px] items-start">
            <div className="grid md:grid-cols-2 gap-6">
              {articles.length > 0 ? (
                articles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    slug={article.slug}
                    title={article.title}
                    author={article.author}
                    readTime={article.read_time}
                    imageColor={article.image_color ?? "undefined"}
                    badge={article.badge ?? undefined}
                  />
                ))
              ) : (
                <div className="col-span-2 text-center py-12 text-ink-muted">
                  Belum ada artikel dalam kategori ini.
                </div>
              )}
            </div>

            <aside className="lg:sticky lg:top-[90px] space-y-5">
              <div className="bg-white border border-line rounded-[14px] p-5 md:p-6">
                <h4 className="text-[11px] uppercase tracking-wider text-ink-muted font-bold mb-3.5">
                  Tentang Kategori
                </h4>
                <p className="text-sm text-ink-soft leading-relaxed">
                  {category.article_count} artikel berbagi cara kerja, alat,
                  dan material yang dipakai pengrajin Bali sehari-hari.
                </p>
              </div>

              {hasCommunity && relatedCommunity && (
                <RelatedCommunityCta
                  label="Komunitas WhatsApp Terkait"
                  title={relatedCommunity.name}
                  subtitle={`${relatedCommunity.members} anggota`}
                  onClick={() => showRules(relatedCommunity)}
                />
              )}
            </aside>
          </div>
        </div>
      </section>

      <CommunityModal community={community} open={open} onClose={closeModal} />
    </>
  );
}