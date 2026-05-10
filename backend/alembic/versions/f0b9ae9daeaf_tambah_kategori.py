"""tambah kategori

Revision ID: f0b9ae9daeaf
Revises: 439dc28f0a4a
Create Date: 2026-05-06 21:18:48.212802

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f0b9ae9daeaf'
down_revision: Union[str, Sequence[str], None] = '439dc28f0a4a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
