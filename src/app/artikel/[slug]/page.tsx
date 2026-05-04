"use client";

import { useParams } from "next/navigation";
import { ARTICLES } from "@/constant/constant";
import { ArticleHero } from "@/components/sections/ArticleHero";
import { ArticleContent } from "@/components/sections/ArticleContent";
import { ArticleSidebar } from "@/components/sections/ArticleSidebar";
import { CommunityModal } from "@/components/shared/CommunityModal";
import { useCommunityModal } from "@/hooks/useCommunityModals";
import { notFound } from "next/navigation";

const articleContent = `Dulu, sebelum pewarna kimia masuk ke desa kami, semua benang tenun endek diwarnai dengan tumbuhan dari kebun sendiri. Saya belajar dari ibu saya, dan ibu saya belajar dari neneknya. Pengetahuan ini hampir hilang ketika generasi muda lebih memilih pewarna sintetis yang lebih cepat.

## Indigo: si biru yang sabar

Indigo dari daun tarum membutuhkan waktu fermentasi tujuh sampai sepuluh hari. Banyak yang menyerah karena prosesnya lama, tapi warna birunya tidak tertandingi pewarna sintetis manapun. Kami menggunakan kapur sirih sebagai pengikat, dengan perbandingan satu banding lima dari berat daun.

> "Pewarna alami itu mengajarkan kita sabar — sama seperti budaya kita."

Soga dari kulit kayu mahoni memberikan warna cokelat hangat yang khas pada motif Patra. Untuk takaran satu meter kain, kami biasanya menggunakan dua kilogram kulit kayu yang sudah dikeringkan selama dua minggu di bawah matahari pagi.

## Mengapa pewarna alami penting hari ini

Pasar internasional, terutama Eropa dan Jepang, kini lebih menghargai produk dengan pewarna alami karena ramah lingkungan. Endek dengan pewarna alami bisa dijual 2-3 kali lipat dibanding pewarna sintetis di pasar Etsy. Ini bukan hanya soal melestarikan tradisi, tapi juga peluang ekonomi yang nyata.`;

export default function ArtikelDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { community, open, showRules, closeModal } = useCommunityModal();

  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
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
              authorInitial={article.authorInitial}
              authorRole={article.authorRole}
              authorLocation={article.authorLocation}
              readTime={article.readTime}
              content={articleContent}
              relatedCommunity={{
                label: "Lanjutkan diskusi di WhatsApp",
                title: "Tenun Endek & Pewarna Alami",
                subtitle: "142 anggota aktif berdiskusi tiap hari",
                onClick: () => showRules("endek"),
              }}
            />
            <ArticleSidebar
              relatedCommunity={{
                label: "Komunitas Terkait",
                title: "Tenun Endek & Pewarna Alami",
                subtitle: "142 anggota · Aktif tiap hari",
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
