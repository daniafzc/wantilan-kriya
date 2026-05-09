"""
routes/kategori.py — CRUD endpoints for Kategori.

GET    /kategori          → list all categories (with article_count)
GET    /kategori/{slug}   → single category
POST   /kategori          → create category
PATCH  /kategori/{slug}   → update
"""

from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

import crud
import schemas
from database import get_db

router = APIRouter()


@router.get("/", response_model=List[schemas.KategoriResponse])
def list_kategori(db: Session = Depends(get_db)):
    items = crud.get_all_kategori(db)
    return [
        schemas.KategoriResponse.from_orm_ext(
            k, article_count=crud.count_artikel_by_kategori(db, k.id)
        )
        for k in items
    ]


@router.get("/{slug}", response_model=schemas.KategoriResponse)
def get_kategori(slug: str, db: Session = Depends(get_db)):
    obj = crud.get_kategori_by_slug(db, slug)
    if not obj:
        raise HTTPException(status_code=404, detail="Kategori tidak ditemukan")
    return schemas.KategoriResponse.from_orm_ext(
        obj, article_count=crud.count_artikel_by_kategori(db, obj.id)
    )


@router.post(
    "/",
    response_model=schemas.KategoriResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_kategori(data: schemas.KategoriCreate, db: Session = Depends(get_db)):
    if crud.get_kategori_by_slug(db, data.slug):
        raise HTTPException(status_code=409, detail="Slug sudah digunakan")
    obj = crud.create_kategori(db, data)
    return schemas.KategoriResponse.from_orm_ext(obj, article_count=0)


@router.patch("/{slug}", response_model=schemas.KategoriResponse)
def update_kategori(
    slug: str, data: schemas.KategoriUpdate, db: Session = Depends(get_db)
):
    obj = crud.get_kategori_by_slug(db, slug)
    if not obj:
        raise HTTPException(status_code=404, detail="Kategori tidak ditemukan")
    obj = crud.update_kategori(db, obj, data)
    return schemas.KategoriResponse.from_orm_ext(
        obj, article_count=crud.count_artikel_by_kategori(db, obj.id)
    )
