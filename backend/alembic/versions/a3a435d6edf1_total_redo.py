"""total redo

Revision ID: a3a435d6edf1
Revises: f371cfd80975
Create Date: 2026-05-06 21:03:38.523954

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a3a435d6edf1'
down_revision: Union[str, Sequence[str], None] = 'f371cfd80975'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
