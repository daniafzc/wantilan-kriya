import Link from "next/link";
import { CategoryCard } from "@/components/shared/CategoryCard";
import type { Category } from "@/types";

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">
        <div className="flex flex-wrap justify-between items-end gap-6 mb-8 md:mb-10">
          <div className="max-w-[600px]">
            <h2 className="font-serif text-3xl md:text-[38px] mb-2.5 leading-tight">
              Empat kategori pengetahuan
            </h2>
            <p className="text-base text-ink-soft">
              Diorganisir dengan rapi oleh tim kurator agar mudah ditemukan oleh pengrajin lintas generasi.
            </p>
          </div>
          <Link
            href="/kategori"
            className="text-sm text-terracotta font-semibold hover:underline shrink-0"
          >
            Lihat semua kategori →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, index) => (
            <CategoryCard
              key={cat.id ?? cat.slug ?? index}
              slug={cat.slug}
              name={cat.name}
              description={cat.description ?? "No Description"}
              icon={cat.icon ?? ""}
              color={cat.color ?? "green"}
              articleCount={String(cat.article_count)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}