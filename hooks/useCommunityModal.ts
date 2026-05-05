"use client";

import { useState, useCallback } from "react";
import { COMMUNITIES } from "@/lib/constants";

export function useCommunityModal() {
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const showRules = useCallback((communityId: string) => {
    setSelectedCommunity(communityId);
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    setTimeout(() => setSelectedCommunity(null), 200);
  }, []);

  const community = selectedCommunity
    ? COMMUNITIES.find((c) => c.id === selectedCommunity) || null
    : null;

  return { community, open, showRules, closeModal };
}
