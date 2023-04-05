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
        for i in range(100):
            new_user = User(
                name=fake.name(),
                location=fake.word(),
                bio = fake.sentence(),
                image= "https://random.imagecdn.app/500/150",
                username = fake.name()
            )
            users.append(new_user)
        db.session.add_all(users)
        db.session.commit()

        posts = []
        for i in range(10):
            new_post = Post(
                text = fake.sentence(),
                file = fake.word()
            )
            posts.append(new_post)
            db.session.add_all(posts)
            db.session.commit()
