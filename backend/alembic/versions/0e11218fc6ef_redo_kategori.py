"""redo kategori

Revision ID: 0e11218fc6ef
Revises: f0b9ae9daeaf
Create Date: 2026-05-06 22:19:04.529529

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0e11218fc6ef'
down_revision: Union[str, Sequence[str], None] = 'f0b9ae9daeaf'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
