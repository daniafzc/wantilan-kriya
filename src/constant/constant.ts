export const NavLinks = [
  {
    id: 1,
    url: "#home",
    label: "Beranda",
  },
  {
    id: 2,
    url: "#category",
    label: "Kategori",
  },
  {
    id: 3,
    url: "#article",
    label: "Artikel",
  },
  {
    id: 4,
    url: "#community",
    label: "Komunitas",
  },
  {
    id: 5,
    url: "#calculator",
    label: "Kalkulator Harga",
  },
  {
    id: 6,
    url: "#about",
    label: "Tentang",
  },
];

export const CATEGORIES = [
  {
    id: "teknik",
    slug: "teknik",
    name: "Teknik & Bahan",
    description:
      "Cara, alat, dan material yang digunakan pengrajin di lapangan.",
    icon: "🪡",
    color: "green",
    articleCount: "12 artikel",
  },
  {
    id: "tradisi",
    slug: "tradisi",
    name: "Tradisi & Makna",
    description:
      "Cerita motif, ritual, dan nilai budaya di balik setiap karya.",
    icon: "🕉",
    color: "gold",
    articleCount: "9 artikel",
  },
  {
    id: "pasar",
    slug: "pasar",
    name: "Pasar & Bisnis",
    description:
      "Pengalaman ekspor, harga pasar global, dan strategi penjualan.",
    icon: "🌍",
    color: "plum",
    articleCount: "7 artikel · Termasuk Kalkulator",
  },
  {
    id: "kolaborasi",
    slug: "kolaborasi",
    name: "Kolaborasi",
    description:
      "Cara mencari rekan kerja antar perajin dan validasi desain baru.",
    icon: "🤝",
    color: "teal",
    articleCount: "5 artikel",
  },
] as const;

export const COMMUNITIES = [
  {
    id: "wood",
    slug: "wood",
    name: "Ukir Kayu Mas & Ubud",
    members: 186,
    description:
      "Diskusi teknik ukir kayu, pemilihan jenis kayu, dan motif tradisional Bali.",
    moderator: "Pak Wayan Sudana",
    color: "gold",
    rules: [
      "Bahasa Indonesia atau Bali yang sopan.",
      "Fokus pada teknik ukir kayu & motif tradisional.",
      "Boleh berbagi foto karya dengan kredit pengrajin.",
      "Promosi terbatas (hanya hari Sabtu).",
      "Hormati pengetahuan senior dan budaya lokal.",
    ],
  },
  {
    id: "endek",
    slug: "endek",
    name: "Tenun Endek & Pewarna Alami",
    members: 142,
    description:
      "Diskusi teknik tenun endek, takaran pewarna alami, dan koneksi pasar tenun Bali.",
    moderator: "Ibu Ayu Kartini",
    color: "green",
    rules: [
      "Bahasa Indonesia atau Bali yang sopan; hindari spam.",
      "Fokus diskusi pada tenun & pewarna alami.",
      "Jaga rahasia dapur (resep) bila pemilik tidak ingin dibagi.",
      "Promosi produk hanya pada hari Jumat.",
      "Hormati senior dan pengetahuan tradisional.",
    ],
  },
  {
    id: "silver",
    slug: "silver",
    name: "Perak Celuk",
    members: 98,
    description:
      "Diskusi teknik filigree, finishing, dan desain modern berbasis motif Bali.",
    moderator: "Made Karya",
    color: "silver",
    rules: [
      "Bahasa Indonesia atau Inggris ringan diperbolehkan.",
      "Fokus pada teknik perak & desain perhiasan.",
      "Boleh meminta validasi desain — sesama pengrajin saling bantu.",
      "Tidak boleh menjiplak desain anggota lain.",
      "Promosi produk hanya hari Minggu.",
    ],
  },
  {
    id: "export",
    slug: "export",
    name: "Pasar Ekspor",
    members: 211,
    description:
      "Pengalaman ekspor, dokumen pengiriman, dan negosiasi dengan pembeli internasional.",
    moderator: "Tim Control + Craft",
    color: "terracotta",
    rules: [
      "Diskusi praktis: dokumen, kurir, masalah bea cukai.",
      "Tidak share kontak pembeli pribadi (privasi).",
      "Boleh berbagi pengalaman pahit — tidak menyalahkan pihak.",
      "Tim moderator boleh menambahkan info update regulasi.",
      "Hindari topik politik atau di luar kriya.",
    ],
  },
  {
    id: "collab",
    slug: "collab",
    name: "Kolaborasi Antar Perajin",
    members: 76,
    description:
      "Cari partner desain, pemasok bahan, atau validasi karya baru lintas bidang.",
    moderator: "Made Karya",
    color: "plum",
    rules: [
      "Posting permintaan kolaborasi dengan ringkas & jelas.",
      "Tinggalkan kontak yang aktif — jangan PHP.",
      "Bayaran/imbalan dibahas privat, bukan di grup.",
      "Hormati ide orisinal anggota lain.",
      "Update status kolaborasi (sukses / batal) untuk transparansi.",
    ],
  },
  {
    id: "dye",
    slug: "dye",
    name: "Teknik Pewarna Alami",
    members: 63,
    description:
      "Resep, eksperimen, dan dokumentasi pewarna dari tumbuhan lokal.",
    moderator: "Ibu Ayu Kartini",
    color: "teal",
    rules: [
      "Bagikan resep dengan takaran yang jelas.",
      "Sebutkan jenis kain/serat saat bertanya.",
      "Eksperimen yang gagal pun bermanfaat — dokumentasikan.",
      "Hormati resep keluarga yang tidak ingin dibagi.",
      "Foto sebelum/sesudah sangat membantu diskusi.",
    ],
  },
] as const;

export const ARTICLES = [
  {
    id: "1",
    slug: "pewarna-alami-tenun-endek",
    title: "Pewarna Alami untuk Tenun Endek: Dari Indigo sampai Soga",
    excerpt:
      "Dulu, sebelum pewarna kimia masuk ke desa kami, semua benang tenun endek diwarnai dengan tumbuhan dari kebun sendiri...",
    category: "Teknik & Bahan",
    categorySlug: "teknik",
    author: "Ibu Ayu Kartini",
    authorInitial: "A",
    authorRole: "Pengrajin Tenun",
    authorLocation: "Sidemen, Karangasem",
    readTime: "5 menit baca",
    imageColor: "green",
    badge: "Teknik & Bahan",
  },
  {
    id: "2",
    slug: "patung-kayu-pertama-ekspor-jepang",
    title: "Patung Kayu Pertama yang Dikirim ke Jepang — Pengalaman Pak Wayan",
    excerpt:
      "Cerita perjalanan ekspor pertama seorang pengrajin ukir kayu dari Ubud ke Jepang...",
    category: "Pasar & Bisnis",
    categorySlug: "pasar",
    author: "Pak Wayan Sudana",
    authorInitial: "W",
    authorRole: "Pengrajin Ukir Kayu",
    authorLocation: "Mas, Gianyar",
    readTime: "7 menit baca",
    imageColor: "terracotta",
    badge: "Pasar & Bisnis",
  },
  {
    id: "3",
    slug: "makna-motif-wayang-ukiran-mas",
    title: "Makna Motif Wayang dalam Ukiran Mas: Bukan Sekadar Hiasan",
    excerpt: "Setiap garis ukiran memiliki makna spiritual yang dalam...",
    category: "Tradisi & Makna",
    categorySlug: "tradisi",
    author: "Pak Ketut Subrata",
    authorInitial: "K",
    authorRole: "Pengrajin Ukir",
    authorLocation: "Mas, Gianyar",
    readTime: "4 menit baca",
    imageColor: "plum",
    badge: "Tradisi & Makna",
  },
  {
    id: "4",
    slug: "mencari-rekan-desain-perak",
    title: "Mencari Rekan Desain untuk Koleksi Perak Modern",
    excerpt:
      "Butuh masukan untuk desain perak kontemporer yang tetap mempertahankan unsur tradisional...",
    category: "Kolaborasi",
    categorySlug: "kolaborasi",
    author: "Made Karya",
    authorInitial: "M",
    authorRole: "Pengrajin Perak",
    authorLocation: "Celuk, Gianyar",
    readTime: "3 menit baca",
    imageColor: "teal",
    badge: "Kolaborasi",
  },
] as const;

export const PERSONAS = [
  {
    id: "wayan",
    name: "Pak Wayan",
    role: "Pengrajin Senior · Ukir Kayu",
    description:
      "Pengetahuannya berharga; cukup keluarganya yang membantu menulis cerita di form kami. Tidak perlu belajar aplikasi baru.",
    color: "gold",
  },
  {
    id: "ayu",
    name: "Ayu",
    role: "Pengrajin Tenun · Sidemen",
    description:
      "Sudah lihai Instagram; butuh perpustakaan yang bisa dicari per kategori dan grup WhatsApp khusus tenun yang fokus.",
    color: "green",
  },
  {
    id: "made",
    name: "Made",
    role: "Pengrajin Perak · Celuk",
    description:
      "Aktif digital; butuh feedback desain cepat dan kalkulator harga ekspor untuk pasar internasional.",
    color: "terracotta",
  },
] as const;

export const TEAM_MEMBERS = [
  { id: "1", name: "Muhammad Gibran Basyir" },
  { id: "2", name: "Jelena Justine Susanto" },
  { id: "3", name: "Radistha Kriska Dahana Purusa" },
  { id: "4", name: "Arya Hari Wicaksana" },
  { id: "5", name: "Dania Hafiza" },
] as const;

export const CALCULATOR_OPTIONS = {
  jenisKriya: [
    "Perhiasan Perak",
    "Patung Kayu",
    "Tenun Endek",
    "Lukisan Kamasan",
  ],
  bahanUtama: ["Perak 925", "Kayu Suar", "Katun + Pewarna Alami"],
  targetPasar: ["Amerika Serikat", "Eropa", "Australia / Asia"],
  tingkatKerumitan: ["Sederhana", "Sedang", "Detail tinggi"],
} as const;
