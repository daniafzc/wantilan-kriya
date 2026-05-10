"use client";

import { TEAM_MEMBERS } from "@/lib/constants";

export function TeamGrid() {
  return (
    <div className="bg-sand-soft rounded-2xl p-8 md:p-10 mb-10">
      <h2 className="font-serif text-2xl md:text-[28px] mb-3.5">Tim Pengembang</h2>
      <p className="text-base text-ink-soft leading-relaxed mb-4">
        Mahasiswa Ilmu Komputer Universitas Gadjah Mada angkatan 2026, didampingi pendamping budaya lokal di Gianyar dan moderator komunitas WhatsApp di Karangasem.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {TEAM_MEMBERS.map((member) => (
          <div
            key={member.id}
            className="bg-sand-soft border border-sand rounded-xl p-3 md:p-[18px] text-center text-sm text-ink font-medium leading-snug"
          >
            {member.name}
          </div>
        ))}
      </div>
    </div>
  );
}
