"use client";

export function AboutIntro() {
  return (
    <div className="grid md:grid-cols-2 gap-10 md:gap-[60px] mb-10 md:mb-[60px]">
      <div>
        <h2 className="font-serif text-2xl md:text-[28px] mb-3.5">Apa itu Wantilan Kriya?</h2>
        <p className="text-base md:text-[16px] text-ink-soft leading-relaxed mb-3.5">
          <em>Wantilan</em> adalah balai komunitas tradisional Bali — tempat warga berkumpul, berdiskusi, dan saling belajar. Wantilan Kriya membawa semangat itu ke ruang digital: perpustakaan cerita pengrajin sekaligus pintu masuk ke komunitas WhatsApp.
        </p>
        <p className="text-base md:text-[16px] text-ink-soft leading-relaxed">
          Platform ini sengaja dibuat ringan dan tanpa daftar akun. Cukup nama dan asal daerah, siapapun bisa berkontribusi.
        </p>
      </div>
      <div>
        <h2 className="font-serif text-2xl md:text-[28px] mb-3.5">Mengapa Kami Ada</h2>
        <p className="text-base md:text-[16px] text-ink-soft leading-relaxed mb-3.5">
          Tiga risiko nyata mengancam kriya Bali: pengetahuan senior bisa hilang tanpa dokumentasi, akses pasar global terbatas, dan komunitas online yang ada belum terkurasi.
        </p>
        <p className="text-base md:text-[16px] text-ink-soft leading-relaxed">
          Wantilan Kriya hadir sebagai solusi sederhana untuk ketiganya — bukan dengan teknologi paling canggih, tapi dengan pendekatan yang paling pas dengan realitas pengrajin di lapangan.
        </p>
      </div>
    </div>
  );
}
