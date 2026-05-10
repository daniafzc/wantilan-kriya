"""
routes/komunitas.py — CRUD endpoints for Komunitas.

GET    /komunitas          → list all
GET    /komunitas/{slug}   → single community
POST   /komunitas          → create
PATCH  /komunitas/{slug}   → update
DELETE /komunitas/{slug}   → delete
"""

from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

import crud
import schemas
from database import get_db

router = APIRouter()


@router.get("/", response_model=List[schemas.KomunitasResponse])
def list_komunitas(db: Session = Depends(get_db)):
    items = crud.get_all_komunitas(db)
    return [schemas.KomunitasResponse.from_orm_ext(k) for k in items]


@router.get("/{slug}", response_model=schemas.KomunitasResponse)
def get_komunitas(slug: str, db: Session = Depends(get_db)):
    obj = crud.get_komunitas_by_slug(db, slug)
    if not obj:
        raise HTTPException(status_code=404, detail="Komunitas tidak ditemukan")
    return schemas.KomunitasResponse.from_orm_ext(obj)


@router.post(
    "/",
    response_model=schemas.KomunitasResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_komunitas(data: schemas.KomunitasCreate, db: Session = Depends(get_db)):
    if crud.get_komunitas_by_slug(db, data.slug):
        raise HTTPException(status_code=409, detail="Slug sudah digunakan")
    obj = crud.create_komunitas(db, data)
    return schemas.KomunitasResponse.from_orm_ext(obj)


@router.patch("/{slug}", response_model=schemas.KomunitasResponse)
def update_komunitas(
    slug: str, data: schemas.KomunitasUpdate, db: Session = Depends(get_db)
):
    obj = crud.get_komunitas_by_slug(db, slug)
    if not obj:
        raise HTTPException(status_code=404, detail="Komunitas tidak ditemukan")
    obj = crud.update_komunitas(db, obj, data)
    return schemas.KomunitasResponse.from_orm_ext(obj)


@router.delete("/{slug}", status_code=status.HTTP_204_NO_CONTENT)
def delete_komunitas(slug: str, db: Session = Depends(get_db)):
    obj = crud.get_komunitas_by_slug(db, slug)
    if not obj:
        raise HTTPException(status_code=404, detail="Komunitas tidak ditemukan")
    crud.delete_komunitas(db, obj)
