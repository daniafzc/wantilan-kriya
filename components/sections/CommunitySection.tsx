"use client";

import Link from "next/link";
import type { Community } from "@/types";
import { CommunityCard } from "@/components/shared/CommunityCard";
import { Spotlight } from "./Spotlight";

interface CommunitySectionProps {
  communities: Community[];
  onCommunityClick: (community: Community) => void;  // <-- was (id: string) => void
}

export function CommunitySection({
  communities,
  onCommunityClick,
}: CommunitySectionProps) {
  const featuredCommunities = communities.slice(0, 2);

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">
        {/* ... header ... */}

        <div className="grid md:grid-cols-[1.5fr_1fr] gap-6">
          <div className="space-y-3.5">
            {featuredCommunities.map((community) => (
              <CommunityCard
                key={community.id}
                community={community}
                onClick={() => onCommunityClick(community)}  // <-- pass object, not id
              />
            ))}
          </div>
          <Spotlight />
        </div>
      </div>
    </section>
  );
}