# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Local imports
from app import app
from models import db, User, Friend, Message, Post, Comment

if __name__ == '__main__':
    fake = Faker()
    engine = create_engine('sqlite:///instance/app.db')
    Session = sessionmaker(bind=engine)
    session = Session()

    session.query(User).delete()
    session.query(Post).delete()
    session.commit()

    with app.app_context():
        
        print("SEED!")


        # users = []
        # for i in range(100):
        #     new_user = User(
        #         name=fake.name(),
        #         location=fake.word(),
        #         bio = fake.sentence(),
        #         image = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
        #         username = fake.name()
        #     )
        #     users.append(new_user)
        # db.session.add_all(users)
        # db.session.commit()

        posts = []
        for i in range(10):
            new_post = Post(
                description = fake.sentence(),
                file = "https://techresearchonline.com/wp-content/uploads/2022/08/Zetaplus-%F0%9F%87%B9%F0%9F%87%AC-on-Twitter.webp",
                likes = 0,

            )
            posts.append(new_post)
            db.session.add_all(posts)
            db.session.commit()
