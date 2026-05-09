"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { ArticleHero } from "@/components/sections/ArticleHero";
import { ArticleContent } from "@/components/sections/ArticleContent";
import { ArticleSidebar, SidebarArticle } from "@/components/sections/ArticleSidebar";
import { CommunityModal } from "@/components/shared/CommunityModal";
import { useCommunityModal } from "@/hooks/useCommunityModal";
import { Article } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

/* Loose backend shape for the linked community */
interface BackendCommunity {
  id: string;
  slug?: string;
  name: string;
  members?: number;
  description?: string | null;
  deskripsi?: string | null;
  moderator?: string | null;
  color?: string | null;
  rules?: string[];
}

/* Minimal shape returned by /artikel/?kategori=... */
interface ArticleStub {
  id: string;
  slug: string;
  title: string;
  author: string;
  read_time: string;
}

interface ArtikelDetailPageProps {
  slug: string;
}

export default function ArtikelDetailPage({ slug }: ArtikelDetailPageProps) {
  const { community, open, showRules, closeModal } = useCommunityModal();

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedCommunity, setRelatedCommunity] = useState<BackendCommunity | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<SidebarArticle[]>([]);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(
          `${API_BASE}/artikel/${encodeURIComponent(slug)}`
        );

        if (!res.ok) {
          if (res.status === 404) {
            setArticle(null);
            return;
          }
          throw new Error("Gagal mengambil artikel");
        }

        const data = await res.json();

        /* ── Linked community (WhatsApp) ───────────────────────── */
        if (data.community_slug) {
          const communityRes = await fetch(
            `${API_BASE}/komunitas/${encodeURIComponent(data.community_slug)}`
          );
          if (communityRes.ok) {
            const communityData: BackendCommunity = await communityRes.json();
            setRelatedCommunity(communityData);
          }
        }

        /* ── Related articles in same category ─────────────────── */
        if (data.category_slug) {
          try {
            const relatedRes = await fetch(
              `${API_BASE}/artikel/?kategori=${encodeURIComponent(data.category_slug)}`,
              { cache: "no-store", headers: { Accept: "application/json" } }
            );
            if (relatedRes.ok) {
              const relatedData: ArticleStub[] = await relatedRes.json();
              setRelatedArticles(
                relatedData
                  .filter((a) => a.slug !== slug)
                  .slice(0, 3)
                  .map((a) => ({
                    id: a.id,
                    slug: a.slug,
                    title: a.title,
                    author: a.author,
                    readTime: a.read_time,
                  }))
              );
            }
          } catch (e) {
            console.error("Gagal mengambil artikel terkait", e);
          }
        }

        setArticle(data);
      } catch (error) {
        console.error(error);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [slug]);

  if (loading) return <div className="p-10">Loading...</div>;
  if (!article) return notFound();

  const handleCommunityClick = () => {
    if (relatedCommunity) showRules(relatedCommunity);
  };

  return (
    <>
      <ArticleHero color={article.imageColor} />
      <section className="py-0 md:py-0">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="grid lg:grid-cols-[1fr_320px] gap-10 md:gap-[60px] items-start">
            <ArticleContent
              category={article.category}
              categoryColor={article.imageColor}
              title={article.title}
              author={article.author}
              authorInitial={article.author_initial}
              authorRole={article.author_role}
              authorLocation={article.author_location}
              readTime={article.read_time}
              content={article.content ?? "Tidak ada konten?"}
              relatedCommunity={{
                label: "Lanjutkan diskusi di WhatsApp",
                title: relatedCommunity?.name ?? "Komunitas",
                subtitle: `${relatedCommunity?.members ?? 0} anggota`,
                onClick: handleCommunityClick,
              }}
            />

            <ArticleSidebar
              relatedArticles={relatedArticles}
              relatedCommunity={{
                label: "Komunitas Terkait",
                title: relatedCommunity?.name ?? "Komunitas",
                subtitle: `${relatedCommunity?.members ?? 0} anggota`,
                onClick: handleCommunityClick,
              }}
            />
          </div>
        </div>
      </section>

      <CommunityModal community={community} open={open} onClose={closeModal} />
    </>
  );
}