"use client";

import { PERSONAS } from "@/lib/constants";
import { PersonaMini } from "@/components/shared/PersonaMini";

export function PersonaGrid() {
  return (
    <div className="my-8 md:my-[60px]">
      <h2 className="font-serif text-2xl md:text-[32px] mb-2 text-center">Untuk Siapa Platform Ini</h2>
      <p className="text-center text-ink-soft mb-6 md:mb-8 max-w-[620px] mx-auto text-base">
        Tiga generasi pengrajin dengan kebutuhan berbeda, tetapi saling melengkapi.
      </p>
      <div className="grid md:grid-cols-3 gap-5">
        {PERSONAS.map((persona) => (
          <PersonaMini key={persona.id} persona={persona} />
        ))}
      </div>
    </div>
  );
}
