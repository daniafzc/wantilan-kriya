"""
models.py — SQLAlchemy table definitions.

Naming follows Indonesian convention to match original DB design,
but each model exposes a `slug` column so the frontend can address
resources by URL-friendly strings without relying on integer PKs.
"""

from sqlalchemy import (
    Boolean, Column, DateTime, ForeignKey,
    Integer, String, Text, func,
)
from sqlalchemy.orm import relationship

from database import Base


class Kategori(Base):
    __tablename__ = "kategori"

    id          = Column(Integer, primary_key=True, index=True)
    slug        = Column(String(100), unique=True, index=True, nullable=False)  # e.g. "teknik"
    nama        = Column(String(150), nullable=False)          # → frontend: name
    deskripsi   = Column(Text, nullable=True)                  # → frontend: description
    warna       = Column(String(50), nullable=True)            # → frontend: color
    created_at  = Column(DateTime(timezone=True), server_default=func.now())

    artikel     = relationship("Artikel", back_populates="kategori")
    #Tambahan
    komunitas       = relationship("Komunitas", back_populates="kategori")
    komunitas_id    = Column(Integer, ForeignKey("komunitas.id"), nullable=True)


class Artikel(Base):
    __tablename__ = "artikel"

    id              = Column(Integer, primary_key=True, index=True)
    slug            = Column(String(200), unique=True, index=True, nullable=False)
    judul           = Column(String(300), nullable=False)      # → frontend: title
    author          = Column(String(150), nullable=False)      # → frontend: author
    author_initial  = Column(String(10), nullable=True)        # → frontend: authorInitial
    author_role     = Column(String(150), nullable=True)       # → frontend: authorRole
    daerah          = Column(String(150), nullable=True)        # → frontend: authorLocation
    excerpt         = Column(Text, nullable=True)              # → frontend: excerpt (short desc)
    content         = Column(Text, nullable=True)              # → frontend: content (full body)
    menit_baca      = Column(Integer, default=3)               # → frontend: readTime (int→ "X menit baca")
    badge           = Column(String(100), nullable=True)       # → frontend: badge
    image_color     = Column(String(50), nullable=True)        # → frontend: imageColor
    diterbitkan     = Column(Boolean, default=False)           # published flag
    kategori_id     = Column(Integer, ForeignKey("kategori.id"), nullable=True)
    created_at      = Column(DateTime(timezone=True), server_default=func.now())

    kategori        = relationship("Kategori", back_populates="artikel")

    komunitas       = relationship("Komunitas", back_populates="artikel")
    komunitas_id    = Column(Integer, ForeignKey("komunitas.id"), nullable=True)



class Komunitas(Base):
    __tablename__ = "komunitas"

    id              = Column(Integer, primary_key=True, index=True)
    slug            = Column(String(150), unique=True, index=True, nullable=False)  # → frontend: slug
    nama            = Column(String(200), nullable=False)      # → frontend: name
    deskripsi       = Column(Text, nullable=True)              # → frontend: description
    jumlah_anggota  = Column(Integer, default=0)               # → frontend: members
    link_whatsapp   = Column(String(500), nullable=True)       # WhatsApp invite link
    warna           = Column(String(50), nullable=True)        # → frontend: color
    rules           = Column(Text, nullable=True)              # JSON-encoded list → frontend: rules[]
    created_at      = Column(DateTime(timezone=True), server_default=func.now())

    artikel         = relationship("Artikel", back_populates="komunitas")
    kategori        = relationship("Kategori", back_populates="komunitas")

class Submission(Base):
    __tablename__ = "submission"

    id              = Column(Integer, primary_key=True, index=True)
    tipe            = Column(String(50), nullable=True)        # "story" | "question" — frontend: type
    penulis_nama    = Column(String(150), nullable=False)      # → frontend: name
    penulis_daerah  = Column(String(150), nullable=True)       # → frontend: location
    judul           = Column(String(300), nullable=False)      # → frontend: title
    konten          = Column(Text, nullable=False)             # → frontend: content
    kategori        = Column(String(150), nullable=True)       # stored as slug string → frontend: category
    status          = Column(String(50), default="pending")   # pending | approved | rejected
    catatan_kurator = Column(Text, nullable=True)             # internal curator notes
    created_at      = Column(DateTime(timezone=True), server_default=func.now())
