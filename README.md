# Wantilan Kriya

Platform pengetahuan dan komunitas untuk pengrajin tradisional Bali. Pengrajin bisa berbagi cerita, membaca artikel per kategori, bergabung ke komunitas diskusi, dan mengestimasi harga jual di pasar internasional.

## Stack

- **Frontend**: Next.js 15 · React 19 · TypeScript · Tailwind CSS
- **Backend**: FastAPI · SQLAlchemy · Alembic
- **Database**: PostgreSQL (Supabase)

## Deployment

- **Frontend**: Vercel
- **Backend**: Railway
- **Database**: Supabase (Postgres)

## Instalasi Lokal

### Frontend

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

Buat file `.env.local` di root, isi:

```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

### Backend

```bash
cd backend
python -m venv venv
. venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Buat file `.env` di folder `backend`, isi:

```
DATABASE_URL=postgresql://user:password@host:port/dbname
ALLOWED_ORIGINS=http://localhost:3000
```

## Halaman

| Route             | Isi                                                        |
| ----------------- | ---------------------------------------------------------- |
| `/`               | Beranda — hero, kategori, artikel, komunitas               |
| `/artikel`        | Daftar artikel, bisa filter per kategori                   |
| `/artikel/[slug]` | Detail artikel                                             |
| `/kategori`       | Grid 4 kategori utama                                      |
| `/komunitas`      | 6 komunitas diskusi + aturan masing-masing                 |
| `/kalkulator`     | Estimasi harga jual di Etsy & Amazon                       |
| `/submit`         | Form kirim cerita/pertanyaan (multi-step)                  |
| `/admin`          | Kurasi submission — approve/reject, terbitkan jadi artikel |
| `/tentang`        | Tentang project & tim                                      |

## Alur Submission → Artikel

1. Pengunjung isi form di `/submit` (cerita/pertanyaan) → tersimpan sebagai `submission` dengan status `pending`.
2. Kurator buka `/admin`, review isi submission.
3. Kurator bisa **Tolak** (status jadi `rejected`) atau **Terbitkan Artikel** (status jadi `approved` + otomatis dibuatkan entry baru di tabel `artikel`, langsung tayang di `/artikel`).

## Struktur Folder

```
app/          # routing (Next.js App Router)
components/
  layout/     # header, footer, drawer
  sections/   # section per halaman
  shared/     # card & komponen reusable
  ui/         # button, input, select, dll
hooks/        # useCommunityModal
lib/          # constants.ts (data statis: kategori & komunitas), utils
types/        # TypeScript interfaces
public/       # gambar .webp
backend/      # FastAPI app (routes, models, schemas, migrations Alembic)
```

## Catatan

Data **kategori dan komunitas** masih disimpan statis di `lib/constants.ts`. Data **artikel dan submission** disimpan di database (PostgreSQL via Supabase) dan diakses lewat backend FastAPI.

## Tim

Muhammad Gibran Basyir · Jelena Justine Susanto · Radistha Kriska Dahana Purusa · Arya Hari Wicaksana · Dania Hafiza
