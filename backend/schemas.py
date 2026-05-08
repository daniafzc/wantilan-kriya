"""
schemas.py — Pydantic models for request validation and response serialization.

Bridge strategy
───────────────
Backend stores data with Indonesian field names and integer PKs.
Frontend consumes English field names and expects string IDs plus
some computed / denormalized fields (readTime as string, articleCount, etc.).

Each domain has three schema classes:
  • <Model>Base      – shared fields (internal types)
  • <Model>Create    – fields accepted on POST
  • <Model>Response  – what the API sends back (frontend-friendly)
"""

from __future__ import annotations

from datetime import datetime
from typing import List, Literal, Optional

from pydantic import BaseModel, Field, field_validator, model_validator


# ══════════════════════════════════════════════════════════════════════════════
# Kategori
# ══════════════════════════════════════════════════════════════════════════════

class KategoriBase(BaseModel):
    slug: str
    nama: str
    deskripsi: Optional[str] = None
    warna: Optional[str] = None
    komunitas_id: Optional[int] = None

class KategoriCreate(KategoriBase):
    pass


class KategoriUpdate(BaseModel):
    nama: Optional[str] = None
    deskripsi: Optional[str] = None
    warna: Optional[str] = None
    komunitas_id: Optional[int] = None

class KategoriResponse(BaseModel):
    """Frontend-friendly shape (English keys, string id, articleCount)."""
    id: str                          # int → str
    slug: str
    name: str                        # nama
    description: Optional[str]       # deskripsi
    color: Optional[str]             # warna
    article_count: int = 0           # computed from relationship
    community: Optional[str] = None
    community_slug: Optional[str] = None

    model_config = {"from_attributes": True}

    @classmethod
    def from_orm_ext(cls, obj, article_count: int = 0) -> "KategoriResponse":
        komunitas = obj.komunitas
        return cls(
            id=str(obj.id),
            slug=obj.slug,
            name=obj.nama,
            description=obj.deskripsi,
            color=obj.warna,
            article_count=article_count,
            community=komunitas.nama if komunitas else None,
            community_slug=komunitas.slug if komunitas else None,
        )


# ══════════════════════════════════════════════════════════════════════════════
# Artikel
# ══════════════════════════════════════════════════════════════════════════════

class ArtikelBase(BaseModel):
    slug: str
    judul: str
    author: str
    author_initial: Optional[str] = None
    author_role: Optional[str] = None
    daerah: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    menit_baca: int = Field(default=3, ge=1)
    badge: Optional[str] = None
    image_color: Optional[str] = None
    diterbitkan: bool = False
    kategori_id: Optional[int] = None
    komunitas_id: Optional[int] = None

class ArtikelCreate(ArtikelBase):
    pass


class ArtikelUpdate(BaseModel):
    judul: Optional[str] = None
    author: Optional[str] = None
    author_initial: Optional[str] = None
    author_role: Optional[str] = None
    daerah: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    menit_baca: Optional[int] = Field(default=None, ge=1)
    badge: Optional[str] = None
    image_color: Optional[str] = None
    diterbitkan: Optional[bool] = None
    kategori_id: Optional[int] = None
    komunitas_id: Optional[int] = None

class ArtikelResponse(BaseModel):
    """
    Frontend-friendly response.
    Integer IDs → string, menit_baca (int) → readTime (string),
    kategori_id (FK int) → category (name string) + categorySlug.
    """
    id: str
    slug: str
    title: str                          # judul
    author: str
    author_initial: Optional[str]       # authorInitial
    author_role: Optional[str]          # authorRole
    author_location: Optional[str]      # daerah
    excerpt: Optional[str]
    content: Optional[str]
    read_time: str                      # "5 menit baca"
    badge: Optional[str]
    image_color: Optional[str]
    category: Optional[str]             # kategori.nama
    category_slug: Optional[str]        # kategori.slug
    published: bool
    created_at: Optional[datetime]
    community: Optional[str]
    community_slug: Optional[str]

    model_config = {"from_attributes": True}

    @classmethod
    def from_orm_ext(cls, obj) -> "ArtikelResponse":
        cat = obj.kategori
        komunitas = obj.komunitas
        return cls(
            id=str(obj.id),
            slug=obj.slug,
            title=obj.judul,
            author=obj.author,
            author_initial=obj.author_initial,
            author_role=obj.author_role,
            author_location=obj.daerah,
            excerpt=obj.excerpt,
            content=obj.content,
            read_time=f"{obj.menit_baca} menit baca",
            badge=obj.badge,
            image_color=obj.image_color,
            category=cat.nama if cat else None,
            category_slug=cat.slug if cat else None,
            community=komunitas.nama if komunitas else None,
            community_slug=komunitas.slug if komunitas else None,
            published=obj.diterbitkan,
            created_at=obj.created_at,
        )


# ══════════════════════════════════════════════════════════════════════════════
# Komunitas
# ══════════════════════════════════════════════════════════════════════════════

class KomunitasBase(BaseModel):
    slug: str
    nama: str
    deskripsi: Optional[str] = None
    jumlah_anggota: int = 0
    link_whatsapp: Optional[str] = None
    warna: Optional[str] = None
    rules: Optional[List[str]] = None  # stored as JSON in DB


class KomunitasCreate(KomunitasBase):
    pass


class KomunitasUpdate(BaseModel):
    nama: Optional[str] = None
    deskripsi: Optional[str] = None
    jumlah_anggota: Optional[int] = None
    link_whatsapp: Optional[str] = None
    warna: Optional[str] = None
    rules: Optional[List[str]] = None


class KomunitasResponse(BaseModel):
    """Frontend-friendly shape."""
    id: str
    slug: str
    name: str                           # nama
    description: Optional[str]         # deskripsi
    members: int                        # jumlah_anggota
    whatsapp_link: Optional[str]        # link_whatsapp
    color: Optional[str]               # warna
    rules: List[str] = []

    model_config = {"from_attributes": True}

    @classmethod
    def from_orm_ext(cls, obj) -> "KomunitasResponse":
        import json
        rules_parsed: List[str] = []
        if obj.rules:
            try:
                rules_parsed = json.loads(obj.rules)
            except (ValueError, TypeError):
                rules_parsed = [obj.rules]

        return cls(
            id=str(obj.id),
            slug=obj.slug,
            name=obj.nama,
            description=obj.deskripsi,
            members=obj.jumlah_anggota,
            whatsapp_link=obj.link_whatsapp,
            color=obj.warna,
            rules=rules_parsed,
        )


# ══════════════════════════════════════════════════════════════════════════════
# Submission
# ══════════════════════════════════════════════════════════════════════════════

SubmissionType = Literal["story", "question", ""]


class SubmitFormData(BaseModel):
    """Matches exactly what the frontend form sends."""
    type: SubmissionType = ""          # "story" | "question" | ""
    name: str = Field(..., min_length=1)        # penulis_nama
    location: Optional[str] = None             # penulis_daerah
    title: str = Field(..., min_length=1)       # judul
    content: str = Field(..., min_length=1)     # konten
    category: Optional[str] = None             # kategori slug as string


class SubmissionStatusUpdate(BaseModel):
    status: Literal["pending", "approved", "rejected"]
    catatan_kurator: Optional[str] = None


class SubmissionResponse(BaseModel):
    id: str
    type: Optional[str]
    name: str
    location: Optional[str]
    title: str
    content: str
    category: Optional[str]
    status: str
    curator_notes: Optional[str]
    created_at: Optional[datetime]

    model_config = {"from_attributes": True}

    @classmethod
    def from_orm_ext(cls, obj) -> "SubmissionResponse":
        return cls(
            id=str(obj.id),
            type=obj.tipe,
            name=obj.penulis_nama,
            location=obj.penulis_daerah,
            title=obj.judul,
            content=obj.konten,
            category=obj.kategori,
            status=obj.status,
            curator_notes=obj.catatan_kurator,
            created_at=obj.created_at,
        )


# ══════════════════════════════════════════════════════════════════════════════
# Kalkulator
# ══════════════════════════════════════════════════════════════════════════════

class CalculatorInput(BaseModel):
    """Mirrors the frontend CalculatorInput interface."""
    jenis_kriya: str = Field(..., description="e.g. 'tenun', 'ukir-kayu', 'perak'")
    bahan_utama: str = Field(..., description="Main material used")
    kualitas: Literal["standar", "premium", "eksklusif"] = "standar"
    jam_kerja: float = Field(..., gt=0, description="Total working hours")
    target_pasar: Literal["lokal", "nasional", "internasional"] = "lokal"


class Insight(BaseModel):
    title: str
    content: str


class CalculatorResult(BaseModel):
    """Mirrors the frontend CalculatorResult interface."""
    price_range_usd: str        # e.g. "$45 – $90"
    price_range_idr: str        # e.g. "Rp 700.000 – Rp 1.400.000"
    insights: List[Insight]


# ══════════════════════════════════════════════════════════════════════════════
# JSON seed file schema (for loading articles from /data folder)
# ══════════════════════════════════════════════════════════════════════════════

class ArtikelSeedItem(BaseModel):
    """Shape expected in data/artikel/*.json seed files."""
    slug: str
    judul: str
    author: str
    author_initial: Optional[str] = None
    author_role: Optional[str] = None
    daerah: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    menit_baca: int = 3
    badge: Optional[str] = None
    image_color: Optional[str] = None
    diterbitkan: bool = True
    kategori_slug: Optional[str] = None  # resolved to kategori_id on seed


class KategoriSeedItem(BaseModel):
    slug: str
    nama: str
    deskripsi: Optional[str] = None
    warna: Optional[str] = None


class KomunitasSeedItem(BaseModel):
    slug: str
    nama: str
    deskripsi: Optional[str] = None
    jumlah_anggota: int = 0
    link_whatsapp: Optional[str] = None
    warna: Optional[str] = None
    rules: Optional[List[str]] = None
