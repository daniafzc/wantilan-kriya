# Wantilan Kriya

Platform pengetahuan dan komunitas untuk pengrajin tradisional Bali. Pengrajin bisa berbagi cerita, membaca artikel per kategori, bergabung ke komunitas diskusi, dan mengestimasi harga jual di pasar internasional.

## Stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS

## Instalasi

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Halaman

| Route | Isi |
|---|---|
| `/` | Beranda — hero, kategori, artikel, komunitas |
| `/artikel` | Daftar artikel, bisa filter per kategori |
| `/artikel/[slug]` | Detail artikel |
| `/kategori` | Grid 4 kategori utama |
| `/komunitas` | 6 komunitas diskusi + aturan masing-masing |
| `/kalkulator` | Estimasi harga jual di Etsy & Amazon |
| `/submit` | Form kirim cerita/pertanyaan (multi-step) |
| `/tentang` | Tentang project & tim |

## Struktur Folder

```
app/          # routing (Next.js App Router)
components/
  layout/     # header, footer, drawer
  sections/   # section per halaman
  shared/     # card & komponen reusable
  ui/         # button, input, select, dll
hooks/        # useCommunityModal
lib/          # constants.ts (semua data statis), utils
types/        # TypeScript interfaces
public/       # gambar .webp
```

## Catatan

Semua data (artikel, komunitas, kategori) disimpan secara statis di `lib/constants.ts` — belum menggunakan database atau API eksternal.

## Tim

Muhammad Gibran Basyir · Jelena Justine Susanto · Radistha Kriska Dahana Purusa · Arya Hari Wicaksana · Dania Hafiza
