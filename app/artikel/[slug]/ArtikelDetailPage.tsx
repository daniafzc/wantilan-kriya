"use client";

import { useParams } from "next/navigation";
import { ARTICLES } from "@/lib/constants";
import { useEffect, useState } from "react";
import { ArticleHero } from "@/components/sections/ArticleHero";
import { ArticleContent } from "@/components/sections/ArticleContent";
import { ArticleSidebar } from "@/components/sections/ArticleSidebar";
import { CommunityModal } from "@/components/shared/CommunityModal";
import { useCommunityModal } from "@/hooks/useCommunityModal";
import { notFound } from "next/navigation";
import { Article, Community } from "@/types"

const articleContent = `Dulu, sebelum pewarna kimia masuk ke desa kami, semua benang tenun endek diwarnai dengan tumbuhan dari kebun sendiri. Saya belajar dari ibu saya, dan ibu saya belajar dari neneknya. Pengetahuan ini hampir hilang ketika generasi muda lebih memilih pewarna sintetis yang lebih cepat.

## Indigo: si biru yang sabar

Indigo dari daun tarum membutuhkan waktu fermentasi tujuh sampai sepuluh hari. Banyak yang menyerah karena prosesnya lama, tapi warna birunya tidak tertandingi pewarna sintetis manapun. Kami menggunakan kapur sirih sebagai pengikat, dengan perbandingan satu banding lima dari berat daun.

> "Pewarna alami itu mengajarkan kita sabar — sama seperti budaya kita."

Soga dari kulit kayu mahoni memberikan warna cokelat hangat yang khas pada motif Patra. Untuk takaran satu meter kain, kami biasanya menggunakan dua kilogram kulit kayu yang sudah dikeringkan selama dua minggu di bawah matahari pagi.

## Mengapa pewarna alami penting hari ini

Pasar internasional, terutama Eropa dan Jepang, kini lebih menghargai produk dengan pewarna alami karena ramah lingkungan. Endek dengan pewarna alami bisa dijual 2-3 kali lipat dibanding pewarna sintetis di pasar Etsy. Ini bukan hanya soal melestarikan tradisi, tapi juga peluang ekonomi yang nyata.`;

interface ArtikelDetailPageProps {
  slug: string;
}

export default function ArtikelDetailPage({ slug }: ArtikelDetailPageProps) {
  const { community, open, showRules, closeModal } = useCommunityModal();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedCommunity, setRelatedCommunity] = useState<Community | null>(null);

  useEffect(() => {

    async function fetchArticle() {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/artikel/${slug}`
        );

        if (res.status === 404) {
          notFound();
        }

        if (!res.ok) {
          throw new Error("Gagal mengambil artikel");
        }
        const data = await res.json();
        if (data.community_slug) {
          const communityRes = await fetch(
            `http://127.0.0.1:8000/komunitas/${data.community_slug}`
          );
          if (communityRes.ok) {
            const communityData = await communityRes.json();
            setRelatedCommunity(communityData);
          }
        }
        setArticle(data);

      } catch (error) {
        console.error(error);
      } finally {

        setLoading(false);
      }
    }

    fetchArticle();

  }, [slug]);

  // LOADING STATE
  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  // JIKA artikel null
  if (!article) {
    return notFound();
  }

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
                onClick: () => showRules("endek"),
              }}
            />
            {/* <div className="mb-4"></div> */}
            <ArticleSidebar
              relatedCommunity={{
                label: "Komunitas Terkait",
                title: relatedCommunity?.name ?? "Komunitas",
                subtitle: `${relatedCommunity?.members ?? 0} anggota`,
                onClick: () => showRules("endek"),
              }}
            />
          </div>
        </div>
      </section>
      <CommunityModal community={community} open={open} onClose={closeModal} />
    </>
  );
}
