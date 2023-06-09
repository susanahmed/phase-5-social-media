"""empty message

Revision ID: 7f92c01cb64f
Revises: 603cf6c850cc
Create Date: 2023-04-10 22:11:15.528673

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7f92c01cb64f'
down_revision = '603cf6c850cc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('background_url', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('location', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('location')
        batch_op.drop_column('background_url')

    # ### end Alembic commands ###
