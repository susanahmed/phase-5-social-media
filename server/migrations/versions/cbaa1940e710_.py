"""empty message

Revision ID: cbaa1940e710
Revises: 7f92c01cb64f
Create Date: 2023-04-11 13:22:25.831928

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cbaa1940e710'
down_revision = '7f92c01cb64f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('comments', schema=None) as batch_op:
        batch_op.add_column(sa.Column('comment', sa.String(), nullable=True))
        batch_op.drop_column('content')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('comments', schema=None) as batch_op:
        batch_op.add_column(sa.Column('content', sa.VARCHAR(), nullable=True))
        batch_op.drop_column('comment')

    # ### end Alembic commands ###
