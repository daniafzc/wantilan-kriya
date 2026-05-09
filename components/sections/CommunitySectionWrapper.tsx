"use client";

import { CommunitySection } from "./CommunitySection";
import { CommunityModal } from "@/components/shared/CommunityModal";
import { useCommunityModal } from "@/hooks/useCommunityModal";
import type { Community } from "@/types";

interface CommunitySectionWrapperProps {
  communities: Community[];
}

export function CommunitySectionWrapper({ communities }: CommunitySectionWrapperProps) {
  const { community, open, showRules, closeModal } = useCommunityModal();

  return (
    <>
      <CommunitySection
        communities={communities}
        onCommunityClick={showRules}  // showRules now receives the full Community object
      />
      <CommunityModal community={community} open={open} onClose={closeModal} />
    </>
  );
}