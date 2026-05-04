"use client";

import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { Hero } from "@/components/sections/Hero";
import { ArticleGrid } from "@/components/sections/ArticleGrid";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { useCommunityModal } from "@/hooks/useCommunityModals";
import { CommunityModal } from "@/components/shared/CommunityModal";
import { Community } from "../../types";
import Image from "next/image";

export default function Home() {
  const { community, open, showRules, closeModal } = useCommunityModal();

  return (
    <div>
      <Hero />
      <CategoryGrid />
      <ArticleGrid />
      <CommunitySection onCommunityClick={showRules} />
      <CommunityModal community={community} open={open} onClose={closeModal} />
    </div>
  );
}
