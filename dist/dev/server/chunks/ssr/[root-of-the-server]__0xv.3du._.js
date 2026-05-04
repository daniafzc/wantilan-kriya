module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/constant/constant.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ARTICLES",
    ()=>ARTICLES,
    "CALCULATOR_OPTIONS",
    ()=>CALCULATOR_OPTIONS,
    "CATEGORIES",
    ()=>CATEGORIES,
    "COMMUNITIES",
    ()=>COMMUNITIES,
    "NavLinks",
    ()=>NavLinks,
    "PERSONAS",
    ()=>PERSONAS,
    "TEAM_MEMBERS",
    ()=>TEAM_MEMBERS
]);
const NavLinks = [
    {
        id: 1,
        url: "#home",
        label: "Beranda"
    },
    {
        id: 2,
        url: "#category",
        label: "Kategori"
    },
    {
        id: 3,
        url: "#article",
        label: "Artikel"
    },
    {
        id: 4,
        url: "#community",
        label: "Komunitas"
    },
    {
        id: 5,
        url: "#calculator",
        label: "Kalkulator Harga"
    },
    {
        id: 6,
        url: "#about",
        label: "Tentang"
    }
];
const CATEGORIES = [
    {
        id: "teknik",
        slug: "teknik",
        name: "Teknik & Bahan",
        description: "Cara, alat, dan material yang digunakan pengrajin di lapangan.",
        icon: "🪡",
        color: "green",
        articleCount: "12 artikel"
    },
    {
        id: "tradisi",
        slug: "tradisi",
        name: "Tradisi & Makna",
        description: "Cerita motif, ritual, dan nilai budaya di balik setiap karya.",
        icon: "🕉",
        color: "gold",
        articleCount: "9 artikel"
    },
    {
        id: "pasar",
        slug: "pasar",
        name: "Pasar & Bisnis",
        description: "Pengalaman ekspor, harga pasar global, dan strategi penjualan.",
        icon: "🌍",
        color: "plum",
        articleCount: "7 artikel · Termasuk Kalkulator"
    },
    {
        id: "kolaborasi",
        slug: "kolaborasi",
        name: "Kolaborasi",
        description: "Cara mencari rekan kerja antar perajin dan validasi desain baru.",
        icon: "🤝",
        color: "teal",
        articleCount: "5 artikel"
    }
];
const COMMUNITIES = [
    {
        id: "wood",
        slug: "wood",
        name: "Ukir Kayu Mas & Ubud",
        members: 186,
        description: "Diskusi teknik ukir kayu, pemilihan jenis kayu, dan motif tradisional Bali.",
        moderator: "Pak Wayan Sudana",
        color: "gold",
        rules: [
            "Bahasa Indonesia atau Bali yang sopan.",
            "Fokus pada teknik ukir kayu & motif tradisional.",
            "Boleh berbagi foto karya dengan kredit pengrajin.",
            "Promosi terbatas (hanya hari Sabtu).",
            "Hormati pengetahuan senior dan budaya lokal."
        ]
    },
    {
        id: "endek",
        slug: "endek",
        name: "Tenun Endek & Pewarna Alami",
        members: 142,
        description: "Diskusi teknik tenun endek, takaran pewarna alami, dan koneksi pasar tenun Bali.",
        moderator: "Ibu Ayu Kartini",
        color: "green",
        rules: [
            "Bahasa Indonesia atau Bali yang sopan; hindari spam.",
            "Fokus diskusi pada tenun & pewarna alami.",
            "Jaga rahasia dapur (resep) bila pemilik tidak ingin dibagi.",
            "Promosi produk hanya pada hari Jumat.",
            "Hormati senior dan pengetahuan tradisional."
        ]
    },
    {
        id: "silver",
        slug: "silver",
        name: "Perak Celuk",
        members: 98,
        description: "Diskusi teknik filigree, finishing, dan desain modern berbasis motif Bali.",
        moderator: "Made Karya",
        color: "silver",
        rules: [
            "Bahasa Indonesia atau Inggris ringan diperbolehkan.",
            "Fokus pada teknik perak & desain perhiasan.",
            "Boleh meminta validasi desain — sesama pengrajin saling bantu.",
            "Tidak boleh menjiplak desain anggota lain.",
            "Promosi produk hanya hari Minggu."
        ]
    },
    {
        id: "export",
        slug: "export",
        name: "Pasar Ekspor",
        members: 211,
        description: "Pengalaman ekspor, dokumen pengiriman, dan negosiasi dengan pembeli internasional.",
        moderator: "Tim Control + Craft",
        color: "terracotta",
        rules: [
            "Diskusi praktis: dokumen, kurir, masalah bea cukai.",
            "Tidak share kontak pembeli pribadi (privasi).",
            "Boleh berbagi pengalaman pahit — tidak menyalahkan pihak.",
            "Tim moderator boleh menambahkan info update regulasi.",
            "Hindari topik politik atau di luar kriya."
        ]
    },
    {
        id: "collab",
        slug: "collab",
        name: "Kolaborasi Antar Perajin",
        members: 76,
        description: "Cari partner desain, pemasok bahan, atau validasi karya baru lintas bidang.",
        moderator: "Made Karya",
        color: "plum",
        rules: [
            "Posting permintaan kolaborasi dengan ringkas & jelas.",
            "Tinggalkan kontak yang aktif — jangan PHP.",
            "Bayaran/imbalan dibahas privat, bukan di grup.",
            "Hormati ide orisinal anggota lain.",
            "Update status kolaborasi (sukses / batal) untuk transparansi."
        ]
    },
    {
        id: "dye",
        slug: "dye",
        name: "Teknik Pewarna Alami",
        members: 63,
        description: "Resep, eksperimen, dan dokumentasi pewarna dari tumbuhan lokal.",
        moderator: "Ibu Ayu Kartini",
        color: "teal",
        rules: [
            "Bagikan resep dengan takaran yang jelas.",
            "Sebutkan jenis kain/serat saat bertanya.",
            "Eksperimen yang gagal pun bermanfaat — dokumentasikan.",
            "Hormati resep keluarga yang tidak ingin dibagi.",
            "Foto sebelum/sesudah sangat membantu diskusi."
        ]
    }
];
const ARTICLES = [
    {
        id: "1",
        slug: "pewarna-alami-tenun-endek",
        title: "Pewarna Alami untuk Tenun Endek: Dari Indigo sampai Soga",
        excerpt: "Dulu, sebelum pewarna kimia masuk ke desa kami, semua benang tenun endek diwarnai dengan tumbuhan dari kebun sendiri...",
        category: "Teknik & Bahan",
        categorySlug: "teknik",
        author: "Ibu Ayu Kartini",
        authorInitial: "A",
        authorRole: "Pengrajin Tenun",
        authorLocation: "Sidemen, Karangasem",
        readTime: "5 menit baca",
        imageColor: "green",
        badge: "Teknik & Bahan"
    },
    {
        id: "2",
        slug: "patung-kayu-pertama-ekspor-jepang",
        title: "Patung Kayu Pertama yang Dikirim ke Jepang — Pengalaman Pak Wayan",
        excerpt: "Cerita perjalanan ekspor pertama seorang pengrajin ukir kayu dari Ubud ke Jepang...",
        category: "Pasar & Bisnis",
        categorySlug: "pasar",
        author: "Pak Wayan Sudana",
        authorInitial: "W",
        authorRole: "Pengrajin Ukir Kayu",
        authorLocation: "Mas, Gianyar",
        readTime: "7 menit baca",
        imageColor: "terracotta",
        badge: "Pasar & Bisnis"
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
        badge: "Tradisi & Makna"
    },
    {
        id: "4",
        slug: "mencari-rekan-desain-perak",
        title: "Mencari Rekan Desain untuk Koleksi Perak Modern",
        excerpt: "Butuh masukan untuk desain perak kontemporer yang tetap mempertahankan unsur tradisional...",
        category: "Kolaborasi",
        categorySlug: "kolaborasi",
        author: "Made Karya",
        authorInitial: "M",
        authorRole: "Pengrajin Perak",
        authorLocation: "Celuk, Gianyar",
        readTime: "3 menit baca",
        imageColor: "teal",
        badge: "Kolaborasi"
    }
];
const PERSONAS = [
    {
        id: "wayan",
        name: "Pak Wayan",
        role: "Pengrajin Senior · Ukir Kayu",
        description: "Pengetahuannya berharga; cukup keluarganya yang membantu menulis cerita di form kami. Tidak perlu belajar aplikasi baru.",
        color: "gold"
    },
    {
        id: "ayu",
        name: "Ayu",
        role: "Pengrajin Tenun · Sidemen",
        description: "Sudah lihai Instagram; butuh perpustakaan yang bisa dicari per kategori dan grup WhatsApp khusus tenun yang fokus.",
        color: "green"
    },
    {
        id: "made",
        name: "Made",
        role: "Pengrajin Perak · Celuk",
        description: "Aktif digital; butuh feedback desain cepat dan kalkulator harga ekspor untuk pasar internasional.",
        color: "terracotta"
    }
];
const TEAM_MEMBERS = [
    {
        id: "1",
        name: "Muhammad Gibran Basyir"
    },
    {
        id: "2",
        name: "Jelena Justine Susanto"
    },
    {
        id: "3",
        name: "Radistha Kriska Dahana Purusa"
    },
    {
        id: "4",
        name: "Arya Hari Wicaksana"
    },
    {
        id: "5",
        name: "Dania Hafiza"
    }
];
const CALCULATOR_OPTIONS = {
    jenisKriya: [
        "Perhiasan Perak",
        "Patung Kayu",
        "Tenun Endek",
        "Lukisan Kamasan"
    ],
    bahanUtama: [
        "Perak 925",
        "Kayu Suar",
        "Katun + Pewarna Alami"
    ],
    targetPasar: [
        "Amerika Serikat",
        "Eropa",
        "Australia / Asia"
    ],
    tingkatKerumitan: [
        "Sederhana",
        "Sedang",
        "Detail tinggi"
    ]
};
}),
"[project]/src/components/Navbar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$constant$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constant/constant.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$hi2$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/hi2/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$cg$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/cg/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const Navbar = ()=>{
    const [showNav, setShowNav] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "sticky top-0 z-50 border-b",
                style: {
                    background: "var(--paper)",
                    borderColor: "var(--line)"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-[1280px] mx-auto px-5 md:px-10 py-4 flex items-center gap-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "flex items-center gap-2.5 shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-9 h-9 rounded-full relative",
                                    style: {
                                        background: "var(--terracotta)"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-[7px] rounded-full",
                                            style: {
                                                background: "var(--paper)"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Navbar.tsx",
                                            lineNumber: 24,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-[13px] rounded-full",
                                            style: {
                                                background: "var(--terracotta)"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Navbar.tsx",
                                            lineNumber: 28,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Navbar.tsx",
                                    lineNumber: 20,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "leading-none",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-serif text-lg font-bold block",
                                            style: {
                                                color: "var(--ink)"
                                            },
                                            children: "Wantilan Kriya"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Navbar.tsx",
                                            lineNumber: 34,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10.5px] font-medium uppercase tracking-wider",
                                            style: {
                                                color: "var(--ink-muted)"
                                            },
                                            children: "Kerajinan Bali"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Navbar.tsx",
                                            lineNumber: 40,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Navbar.tsx",
                                    lineNumber: 33,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Navbar.tsx",
                            lineNumber: 19,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "hidden lg:flex items-center gap-1 flex-1",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$constant$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NavLinks"].map((nav)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: nav.url,
                                    className: "px-3.5 py-2 rounded-md text-sm font-medium transition-colors hover:bg-[var(--line-soft)]",
                                    style: {
                                        color: "var(--ink-soft)"
                                    },
                                    children: nav.label
                                }, nav.id, false, {
                                    fileName: "[project]/src/components/Navbar.tsx",
                                    lineNumber: 52,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/src/components/Navbar.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 ml-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "#community",
                                    className: "hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors hover:opacity-90",
                                    style: {
                                        background: "var(--terracotta)"
                                    },
                                    children: "+ Bagikan Cerita"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.tsx",
                                    lineNumber: 65,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowNav(true),
                                    className: "lg:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-colors hover:bg-[var(--line-soft)]",
                                    "aria-label": "Open Menu",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$hi2$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HiBars3BottomRight"], {
                                        className: "w-5 h-5",
                                        style: {
                                            color: "var(--ink)"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.tsx",
                                        lineNumber: 77,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.tsx",
                                    lineNumber: 72,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Navbar.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Navbar.tsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/Navbar.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: ()=>setShowNav(false),
                className: `fixed inset-0 z-[100002] transition-all duration-300 ${showNav ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`,
                style: {
                    backgroundColor: "rgba(26, 20, 14, 0.55)"
                }
            }, void 0, false, {
                fileName: "[project]/src/components/Navbar.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `fixed top-0 right-0 h-full w-72 z-[100003] transition-all duration-300 shadow-2xl flex flex-col ${showNav ? "translate-x-0" : "translate-x-full"}`,
                style: {
                    background: "var(--paper)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between px-6 py-5 border-b",
                        style: {
                            borderColor: "var(--line)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-7 h-7 rounded-full relative",
                                        style: {
                                            background: "var(--terracotta)"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-[5px] rounded-full",
                                                style: {
                                                    background: "var(--paper)"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Navbar.tsx",
                                                lineNumber: 114,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-[10px] rounded-full",
                                                style: {
                                                    background: "var(--terracotta)"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Navbar.tsx",
                                                lineNumber: 118,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Navbar.tsx",
                                        lineNumber: 110,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-serif text-base font-bold",
                                        style: {
                                            color: "var(--ink)"
                                        },
                                        children: "Wantilan Kriya"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.tsx",
                                        lineNumber: 123,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Navbar.tsx",
                                lineNumber: 109,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowNav(false),
                                className: "w-8 h-8 flex items-center justify-center rounded-md transition-colors hover:bg-[var(--line-soft)]",
                                "aria-label": "Close Menu",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$cg$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CgClose"], {
                                    className: "w-4 h-4",
                                    style: {
                                        color: "var(--ink-soft)"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.tsx",
                                    lineNumber: 135,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/Navbar.tsx",
                                lineNumber: 130,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Navbar.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "flex-1 px-4 py-4 flex flex-col gap-1",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constant$2f$constant$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NavLinks"].map((nav)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: nav.url,
                                onClick: ()=>setShowNav(false),
                                className: "flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-[var(--line-soft)]",
                                style: {
                                    color: "var(--ink-soft)"
                                },
                                children: nav.label
                            }, nav.id, false, {
                                fileName: "[project]/src/components/Navbar.tsx",
                                lineNumber: 142,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/components/Navbar.tsx",
                        lineNumber: 140,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 pb-8 pt-4 border-t",
                        style: {
                            borderColor: "var(--line)"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "#community",
                            onClick: ()=>setShowNav(false),
                            className: "flex items-center justify-center gap-1.5 w-full px-4 py-3 rounded-lg text-sm font-semibold text-white transition-colors hover:opacity-90",
                            style: {
                                background: "var(--terracotta)"
                            },
                            children: "+ Bagikan Cerita"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Navbar.tsx",
                            lineNumber: 159,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/Navbar.tsx",
                        lineNumber: 155,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Navbar.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
const __TURBOPACK__default__export__ = Navbar;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0xv.3du._.js.map