"""
routes/artikel.py — CRUD endpoints for Artikel.

GET    /artikel               → list all published articles (filter by kategori_slug)
GET    /artikel/{slug}        → single article by slug
POST   /artikel               → create article
PATCH  /artikel/{slug}        → partial update
DELETE /artikel/{slug}        → delete
"""

from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

import crud
import schemas
from database import get_db

router = APIRouter()


@router.get("/", response_model=List[schemas.ArtikelResponse])
def list_artikel(
    kategori: Optional[str] = Query(None, description="Filter by kategori slug"),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    include_unpublished: bool = Query(False),
    db: Session = Depends(get_db),
):
    items = crud.get_all_artikel(
        db,
        skip=skip,
        limit=limit,
        kategori_slug=kategori,
        published_only=not include_unpublished,
    )
    return [schemas.ArtikelResponse.from_orm_ext(a) for a in items]


@router.get("/{slug}", response_model=schemas.ArtikelResponse)
def get_artikel(slug: str, db: Session = Depends(get_db)):
    obj = crud.get_artikel_by_slug(db, slug)
    if not obj:
        raise HTTPException(status_code=404, detail="Artikel tidak ditemukan")
    return schemas.ArtikelResponse.from_orm_ext(obj)


@router.post(
    "/",
    response_model=schemas.ArtikelResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_artikel(data: schemas.ArtikelCreate, db: Session = Depends(get_db)):
    existing = crud.get_artikel_by_slug(db, data.slug)
    if existing:
        raise HTTPException(status_code=409, detail="Slug sudah digunakan")
    obj = crud.create_artikel(db, data)
    return schemas.ArtikelResponse.from_orm_ext(obj)


@router.patch("/{slug}", response_model=schemas.ArtikelResponse)
def update_artikel(
    slug: str, data: schemas.ArtikelUpdate, db: Session = Depends(get_db)
):
    obj = crud.get_artikel_by_slug(db, slug)
    if not obj:
        raise HTTPException(status_code=404, detail="Artikel tidak ditemukan")
    obj = crud.update_artikel(db, obj, data)
    return schemas.ArtikelResponse.from_orm_ext(obj)


@router.delete("/{slug}", status_code=status.HTTP_204_NO_CONTENT)
def delete_artikel(slug: str, db: Session = Depends(get_db)):
    obj = crud.get_artikel_by_slug(db, slug)
    if not obj:
        raise HTTPException(status_code=404, detail="Artikel tidak ditemukan")
    crud.delete_artikel(db, obj)
