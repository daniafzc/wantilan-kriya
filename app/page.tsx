"use client";

import { Hero } from "@/components/sections/Hero";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { ArticleGrid } from "@/components/sections/ArticleGrid";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { CommunityModal } from "@/components/shared/CommunityModal";
import { useCommunityModal } from "@/hooks/useCommunityModal";

export default function HomePage() {
  const { community, open, showRules, closeModal } = useCommunityModal();

  return (
    <>
      <Hero />
      <CategoryGrid />
      <ArticleGrid />
      <CommunitySection onCommunityClick={showRules} />
      <CommunityModal community={community} open={open} onClose={closeModal} />
    </>
  );
}
