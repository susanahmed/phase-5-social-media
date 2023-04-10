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


        users = []
        usernames =[]

        for i in range(100):
            username = fake.first_name()
            while username in usernames:
                username = fake.first_name()
            usernames.append(username)

            user = User(
                username=username,
                bio = fake.paragraph(nb_sentences=3),
                image_url = fake.url(),
            )
            user.password_hash = user.username + 'password'

            users.append(user)

        db.session.add_all(users)
        db.session.commit()

        posts = []
        for i in range(100):
            post = Post(
                title= fake.word(),
                description = fake.sentence(),
                file = fake.url(),
                likes = 0,

            )
            posts.append(post)
        db.session.add_all(posts)
        db.session.commit()
