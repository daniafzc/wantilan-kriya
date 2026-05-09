"use client";

import { useState, useCallback } from "react";
import { COMMUNITIES } from "@/lib/constants";
import { Community } from "@/types";

/* ═══════════════════════════════════════════════════════════════════════
   Loose input shape — covers static constants, backend payload, or any
   future variation. Only `id` + `name` are required.
   ═══════════════════════════════════════════════════════════════════════ */
type CommunityInput = {
  id: string;
  slug?: string;
  name: string;
  members?: number;
  description?: string | null;
  deskripsi?: string | null;   // backend alias for description
  moderator?: string | null;
  color?: string | null;
  rules?: readonly string[] | string[];
};

/* Normalize anything into the canonical Community shape your UI expects */
function toCommunity(input: CommunityInput): Community {
  return {
    id: input.id,
    slug: input.slug ?? input.id,
    name: input.name,
    members: input.members ?? 0,
    description: input.description ?? input.deskripsi ?? "",
    moderator: input.moderator ?? "Moderator Komunitas",
    color: input.color ?? "#C9623F",
    rules: input.rules ? [...input.rules] : [],
  };
}

export function useCommunityModal() {
  const [selected, setSelected] = useState<string | CommunityInput | null>(null);
  const [open, setOpen] = useState(false);

  /** Accept a static ID (string) OR a backend/static object */
  const showRules = useCallback((input: string | CommunityInput) => {
    setSelected(input);
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    setTimeout(() => setSelected(null), 200);
  }, []);

  /** Guaranteed to match the Community interface from @/types */
  const community: Community | null = (() => {
    if (!selected) return null;

    /* Branch A — legacy static lookup by ID */
    if (typeof selected === "string") {
      return COMMUNITIES.find((c) => c.id === selected) ?? null;
    }

    /* Branch B — backend-fetched or ad-hoc object → normalize */
    return toCommunity(selected);
  })();

  return { community, open, showRules, closeModal };
}