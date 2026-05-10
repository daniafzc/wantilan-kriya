"""perbaikan tabel

Revision ID: 439dc28f0a4a
Revises: b48cbf4df5f6
Create Date: 2026-05-06 21:18:02.642582

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '439dc28f0a4a'
down_revision: Union[str, Sequence[str], None] = 'b48cbf4df5f6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
