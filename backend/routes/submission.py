"""
routes/submission.py — Submission endpoints.

POST   /submit                    → public form submission
GET    /submit                    → list submissions (curator view)
PATCH  /submit/{id}/status        → update status + curator notes
"""

from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

import crud
import schemas
from database import get_db

router = APIRouter()


@router.post(
    "/",
    response_model=schemas.SubmissionResponse,
    status_code=status.HTTP_201_CREATED,
)
def submit_form(data: schemas.SubmitFormData, db: Session = Depends(get_db)):
    """Public endpoint — no auth required, matches frontend SubmitFormData."""
    obj = crud.create_submission(db, data)
    return schemas.SubmissionResponse.from_orm_ext(obj)


@router.get("/", response_model=List[schemas.SubmissionResponse])
def list_submissions(
    status_filter: Optional[str] = Query(None, alias="status"),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db),
):
    """Curator/admin view — consider adding auth middleware in production."""
    items = crud.get_all_submissions(db, status=status_filter, skip=skip, limit=limit)
    return [schemas.SubmissionResponse.from_orm_ext(s) for s in items]


@router.patch("/{id}/status", response_model=schemas.SubmissionResponse)
def update_status(
    id: int,
    data: schemas.SubmissionStatusUpdate,
    db: Session = Depends(get_db),
):
    obj = crud.get_submission_by_id(db, id)
    if not obj:
        raise HTTPException(status_code=404, detail="Submission tidak ditemukan")
    obj = crud.update_submission_status(db, obj, data)
    return schemas.SubmissionResponse.from_orm_ext(obj)
