"use client";

import Link from "next/link";
import { COMMUNITIES } from "@/lib/constants";
import { CommunityCard } from "@/components/shared/CommunityCard";
import { Spotlight } from "./Spotlight";

interface CommunitySectionProps {
  onCommunityClick: (id: string) => void;
}

export function CommunitySection({ onCommunityClick }: CommunitySectionProps) {
  const featuredCommunities = COMMUNITIES.slice(0, 2);

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">
        <div className="flex flex-wrap justify-between items-end gap-6 mb-8 md:mb-10">
          <div>
            <h2 className="font-serif text-3xl md:text-[38px] mb-2.5 leading-tight">Diskusi nyata di WhatsApp</h2>
            <p className="text-base text-ink-soft">Bergabung dengan komunitas pengrajin yang aktif berdiskusi setiap hari.</p>
          </div>
          <Link href="/komunitas" className="text-sm text-terracotta font-semibold hover:underline shrink-0">
            Lihat semua komunitas →
          </Link>
        </div>

        <div className="grid md:grid-cols-[1.5fr_1fr] gap-6">
          <div className="space-y-3.5">
            {featuredCommunities.map((community) => (
              <CommunityCard
                key={community.id}
                community={community}
                onClick={() => onCommunityClick(community.id)}
              />
            ))}
          </div>
          <Spotlight />
        </div>
      </div>
    </section>
  );
}
