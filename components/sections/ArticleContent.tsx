"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { RelatedCommunityCta } from "@/components/shared/RelatedCommunityCta";
import { cn } from "@/lib/utils";

interface ArticleContentProps {
  category: string;
  categoryColor?: string;
  title: string;
  author: string;
  authorInitial: string;
  authorRole: string;
  authorLocation: string;
  readTime: string;
  content: string;
  relatedCommunity?: {
    label: string;
    title: string;
    subtitle: string;
    onClick: () => void;
  };
}

export function ArticleContent({
  category,
  categoryColor = "green",
  title,
  author,
  authorInitial,
  authorRole,
  authorLocation,
  readTime,
  content,
  relatedCommunity,
}: ArticleContentProps) {
  // Parse markdown-like content
  const paragraphs = content.split("

").filter(Boolean);

  return (
    <article className="max-w-[720px]">
      {/* Breadcrumbs */}
      <div className="text-[13px] text-ink-muted mb-3.5">
        <Link href="/" className="text-terracotta hover:underline">Beranda</Link> ·{" "}
        <Link href="/artikel" className="text-terracotta hover:underline">Artikel</Link> ·{" "}
        {category}
      </div>

      <Badge color={categoryColor as any} className="mb-4">{category}</Badge>

      <h1 className="font-serif text-2xl md:text-[44px] leading-tight mb-5 tracking-tight">{title}</h1>

      {/* Author row */}
      <div className="flex items-center gap-3.5 pb-5 md:pb-6 mb-6 md:mb-8 border-b border-line">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-gold to-terracotta text-white flex items-center justify-center font-bold text-base md:text-lg shrink-0">
          {authorInitial}
        </div>
        <div className="flex-1 min-w-0">
          <strong className="block text-sm md:text-[15px] text-ink">{author}</strong>
          <span className="block text-xs md:text-[13px] text-ink-muted">{authorRole} · {authorLocation}</span>
        </div>
        <span className="text-xs md:text-[12.5px] text-ink-muted bg-sand-soft px-2.5 py-1 md:px-3 md:py-1.5 rounded-md font-semibold shrink-0">
          {readTime}
        </span>
      </div>

      {/* Article body */}
      <div className="space-y-4 md:space-y-5">
        {paragraphs.map((para, i) => {
          if (para.startsWith("## ")) {
            return (
              <h2 key={i} className="font-serif text-xl md:text-[26px] mt-8 md:mt-9 mb-3">
                {para.replace("## ", "")}
              </h2>
            );
          }
          if (para.startsWith("> ")) {
            return (
              <blockquote
                key={i}
                className="border-l-[3px] border-terracotta pl-4 md:pl-[22px] py-1.5 md:py-2 my-6 md:my-7 italic text-ink text-base md:text-lg leading-relaxed"
              >
                {para.replace("> ", "").replace(/^"|"$/g, "")}
              </blockquote>
            );
          }
          return (
            <p
              key={i}
              className={cn(
                "text-[15px] md:text-[17px] text-ink-soft leading-[1.65] md:leading-[1.75]",
                i === 0 && "first-letter:font-serif first-letter:text-[38px] md:first-letter:text-[64px] first-letter:font-bold first-letter:float-left first-letter:leading-[0.85] first-letter:mt-1.5 first-letter:mr-2.5 first-letter:text-terracotta"
              )}
            >
              {para}
            </p>
          );
        })}
      </div>

      {/* Related community CTA */}
      {relatedCommunity && (
        <div className="mt-8 md:mt-10">
          <RelatedCommunityCta {...relatedCommunity} />
        </div>
      )}
    </article>
  );
}
