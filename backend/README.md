# Wantilan Kriya — Backend

FastAPI backend untuk platform Wantilan Kriya. Menangani submission cerita/pertanyaan, artikel, kategori, dan komunitas.

## Setup Lokal

```bash
python -m venv venv
. venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Buat file `.env` di folder ini (`backend/`), isi:

```
DATABASE_URL=postgresql://user:password@host:port/dbname
ALLOWED_ORIGINS=http://localhost:3000
```

## Run

```bash
uvicorn main:app --reload
```

Buka `http://127.0.0.1:8000` — harus muncul response status OK.

## Migrasi Database (Alembic)

```bash
alembic upgrade head        # apply semua migrasi
alembic revision --autogenerate -m "pesan"   # bikin migrasi baru dari perubahan models.py
```

## Deployment (Railway)

- **Root Directory**: `backend`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- **Environment Variables**: `DATABASE_URL` (connection string Supabase, pakai connection pooler bukan direct connection), `ALLOWED_ORIGINS` (domain frontend production)
