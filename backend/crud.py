"""
crud.py — All database interaction logic.

Each function is a thin, reusable layer between routes and SQLAlchemy models.
Business rules (field mapping, JSON encoding) stay here so routes stay clean.
"""

import json
from typing import List, Optional

from sqlalchemy.orm import Session
from sqlalchemy import or_

import models
import schemas


# ══════════════════════════════════════════════════════════════════════════════
# Kategori
# ══════════════════════════════════════════════════════════════════════════════

def get_all_kategori(db: Session) -> List[models.Kategori]:
    return db.query(models.Kategori).order_by(models.Kategori.id).all()


def get_kategori_by_slug(db: Session, slug: str) -> Optional[models.Kategori]:
    return db.query(models.Kategori).filter(models.Kategori.slug == slug).first()


def get_kategori_by_id(db: Session, id: int) -> Optional[models.Kategori]:
    return db.query(models.Kategori).filter(models.Kategori.id == id).first()


def create_kategori(db: Session, data: schemas.KategoriCreate) -> models.Kategori:
    obj = models.Kategori(
        slug=data.slug,
        nama=data.nama,
        deskripsi=data.deskripsi,
        warna=data.warna,
    )
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_kategori(
    db: Session, obj: models.Kategori, data: schemas.KategoriUpdate
) -> models.Kategori:
    if data.nama is not None:
        obj.nama = data.nama
    if data.deskripsi is not None:
        obj.deskripsi = data.deskripsi
    if data.warna is not None:
        obj.warna = data.warna
    db.commit()
    db.refresh(obj)
    return obj


def count_artikel_by_kategori(db: Session, kategori_id: int) -> int:
    return (
        db.query(models.Artikel)
        .filter(models.Artikel.kategori_id == kategori_id)
        .count()
    )


# ══════════════════════════════════════════════════════════════════════════════
# Artikel
# ══════════════════════════════════════════════════════════════════════════════

def get_all_artikel(
    db: Session,
    skip: int = 0,
    limit: int = 50,
    kategori_slug: Optional[str] = None,
    search: Optional[str] = None,
    published_only: bool = True,
) -> List[models.Artikel]:
    q = db.query(models.Artikel)

    if published_only:
        q = q.filter(models.Artikel.diterbitkan == True)  # noqa: E712

    if kategori_slug:
        kat = get_kategori_by_slug(db, kategori_slug)
        if not kat:
            return []
        q = q.filter(models.Artikel.kategori_id == kat.id)

    if search:
        pattern = f"%{search}%"
        q = q.filter(
            or_(
                models.Artikel.judul.ilike(pattern),
                models.Artikel.excerpt.ilike(pattern),
                models.Artikel.content.ilike(pattern),
                models.Artikel.author.ilike(pattern),
                models.Artikel.daerah.ilike(pattern),
                models.Artikel.badge.ilike(pattern),
            )
        )

    return (
        q.order_by(models.Artikel.created_at.desc())
         .offset(skip)
         .limit(limit)
         .all()
    )

def get_artikel_by_slug(db: Session, slug: str) -> Optional[models.Artikel]:
    return db.query(models.Artikel).filter(models.Artikel.slug == slug).first()


def get_artikel_by_id(db: Session, id: int) -> Optional[models.Artikel]:
    return db.query(models.Artikel).filter(models.Artikel.id == id).first()


def create_artikel(db: Session, data: schemas.ArtikelCreate) -> models.Artikel:
    obj = models.Artikel(
        slug=data.slug,
        judul=data.judul,
        author=data.author,
        author_initial=data.author_initial,
        author_role=data.author_role,
        daerah=data.daerah,
        excerpt=data.excerpt,
        content=data.content,
        menit_baca=data.menit_baca,
        badge=data.badge,
        image_color=data.image_color,
        diterbitkan=data.diterbitkan,
        kategori_id=data.kategori_id,
    )
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_artikel(
    db: Session, obj: models.Artikel, data: schemas.ArtikelUpdate
) -> models.Artikel:
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(obj, field, value)
    db.commit()
    db.refresh(obj)
    return obj


def delete_artikel(db: Session, obj: models.Artikel) -> None:
    db.delete(obj)
    db.commit()


# ══════════════════════════════════════════════════════════════════════════════
# Komunitas
# ══════════════════════════════════════════════════════════════════════════════

def _encode_rules(rules: Optional[List[str]]) -> Optional[str]:
    return json.dumps(rules, ensure_ascii=False) if rules is not None else None


def get_all_komunitas(db: Session) -> List[models.Komunitas]:
    return db.query(models.Komunitas).order_by(models.Komunitas.id).all()


def get_komunitas_by_slug(db: Session, slug: str) -> Optional[models.Komunitas]:
    return db.query(models.Komunitas).filter(models.Komunitas.slug == slug).first()


def get_komunitas_by_id(db: Session, id: int) -> Optional[models.Komunitas]:
    return db.query(models.Komunitas).filter(models.Komunitas.id == id).first()


def create_komunitas(db: Session, data: schemas.KomunitasCreate) -> models.Komunitas:
    obj = models.Komunitas(
        slug=data.slug,
        nama=data.nama,
        deskripsi=data.deskripsi,
        jumlah_anggota=data.jumlah_anggota,
        link_whatsapp=data.link_whatsapp,
        warna=data.warna,
        rules=_encode_rules(data.rules),
    )
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update_komunitas(
    db: Session, obj: models.Komunitas, data: schemas.KomunitasUpdate
) -> models.Komunitas:
    if data.nama is not None:
        obj.nama = data.nama
    if data.deskripsi is not None:
        obj.deskripsi = data.deskripsi
    if data.jumlah_anggota is not None:
        obj.jumlah_anggota = data.jumlah_anggota
    if data.link_whatsapp is not None:
        obj.link_whatsapp = data.link_whatsapp
    if data.warna is not None:
        obj.warna = data.warna
    if data.rules is not None:
        obj.rules = _encode_rules(data.rules)
    db.commit()
    db.refresh(obj)
    return obj


def delete_komunitas(db: Session, obj: models.Komunitas) -> None:
    db.delete(obj)
    db.commit()


# ══════════════════════════════════════════════════════════════════════════════
# Submission
# ══════════════════════════════════════════════════════════════════════════════

def create_submission(
    db: Session, data: schemas.SubmitFormData
) -> models.Submission:
    obj = models.Submission(
        tipe=data.type or None,
        penulis_nama=data.name,
        penulis_daerah=data.location,
        judul=data.title,
        konten=data.content,
        kategori=data.category,
        status="pending",
    )
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def get_all_submissions(
    db: Session,
    status: Optional[str] = None,
    skip: int = 0,
    limit: int = 50,
) -> List[models.Submission]:
    q = db.query(models.Submission)
    if status:
        q = q.filter(models.Submission.status == status)
    return q.order_by(models.Submission.created_at.desc()).offset(skip).limit(limit).all()


def get_submission_by_id(db: Session, id: int) -> Optional[models.Submission]:
    return db.query(models.Submission).filter(models.Submission.id == id).first()


def update_submission_status(
    db: Session,
    obj: models.Submission,
    data: schemas.SubmissionStatusUpdate,
) -> models.Submission:
    obj.status = data.status
    if data.catatan_kurator is not None:
        obj.catatan_kurator = data.catatan_kurator
    db.commit()
    db.refresh(obj)
    return obj
