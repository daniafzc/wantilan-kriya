from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from database import Base, engine
from routes import artikel, kategori, komunitas, submission, kalkulator

load_dotenv()

# Create all tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Wantilan Kriya API",
    description="Backend API untuk platform pengetahuan pengrajin Bali",
    version="1.0.0",
)

# ── CORS ─────────────────────────────────────────────────────────────────────
allowed_origins_raw = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000")
allowed_origins = [o.strip() for o in allowed_origins_raw.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────────────────
app.include_router(artikel.router,    prefix="/artikel",    tags=["Artikel"])
app.include_router(kategori.router,   prefix="/kategori",   tags=["Kategori"])
app.include_router(komunitas.router,  prefix="/komunitas",  tags=["Komunitas"])
app.include_router(submission.router, prefix="/submit",     tags=["Submission"])
app.include_router(kalkulator.router, prefix="/kalkulator", tags=["Kalkulator"])


@app.get("/", tags=["Health"])
def root():
    return {"status": "ok", "message": "Wantilan Kriya API is running 🪴"}
