"use client";

import Link from "next/link";
import { RelatedCommunityCta } from "@/components/shared/RelatedCommunityCta";

export interface SidebarArticle {
  id: string;
  slug: string;
  title: string;
  author: string;
  readTime: string;
}

interface ArticleSidebarProps {
  relatedArticles?: SidebarArticle[];
  relatedCommunity?: {
    label: string;
    title: string;
    subtitle: string;
    onClick: () => void;
  };
}

export function ArticleSidebar({ relatedArticles, relatedCommunity }: ArticleSidebarProps) {
  return (
    <aside className="lg:sticky lg:top-[90px] space-y-5">
      {relatedArticles && relatedArticles.length > 0 && (
        <div className="bg-white border border-line rounded-[14px] p-5 md:p-6">
          <h4 className="text-[11px] uppercase tracking-wider text-ink-muted font-bold mb-3.5">
            Artikel Terkait
          </h4>
          <div className="space-y-0">
            {relatedArticles.map((article) => (
              <Link
                key={article.id}
                href={`/artikel/${article.slug}`}
                className="block py-3 border-b border-line-soft last:border-0 hover:text-terracotta transition-colors"
              >
                <h5 className="text-sm font-semibold leading-snug mb-1">
                  {article.title}
                </h5>
                <span className="text-[11.5px] text-ink-muted">
                  {article.author} · {article.readTime}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {relatedCommunity && (
        <RelatedCommunityCta {...relatedCommunity} />
      )}
    </aside>
  );
}