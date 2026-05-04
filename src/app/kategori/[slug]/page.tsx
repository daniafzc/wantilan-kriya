"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { CATEGORIES, ARTICLES } from "@/constant/constant";
import { ArticleCard } from "@/components/shared/ArticleCard";
import { RelatedCommunityCta } from "@/components/shared/RelatedCommunityCta";
import { CommunityModal } from "@/components/shared/CommunityModal";
import { useCommunityModal } from "@/hooks/useCommunityModals";
import { notFound } from "next/navigation";

export default function KategoriDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { community, open, showRules, closeModal } = useCommunityModal();

  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryArticles = ARTICLES.filter((a) => a.categorySlug === slug);

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
            {category.description}
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-10 md:py-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="grid lg:grid-cols-[1fr_320px] gap-10 md:gap-[60px] items-start">
            <div className="grid md:grid-cols-2 gap-6">
              {categoryArticles.length > 0 ? (
                categoryArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    slug={article.slug}
                    title={article.title}
                    author={article.author}
                    readTime={article.readTime}
                    imageColor={article.imageColor}
                    badge={article.badge}
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
                  {category.articleCount} berbagi cara kerja, alat, dan material
                  yang dipakai pengrajin Bali sehari-hari.
                </p>
              </div>
              <RelatedCommunityCta
                label="Komunitas WhatsApp Terkait"
                title="Tenun Endek & Pewarna Alami"
                subtitle="142 anggota · Diskusi teknik aktif tiap hari"
                onClick={() => showRules("endek")}
              />
            </aside>
          </div>
        </div>
      </section>

      <CommunityModal community={community} open={open} onClose={closeModal} />
    </>
  );
}
