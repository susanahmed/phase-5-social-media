# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import random
from random import randint

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
    session.query(Comment).delete()
    session.query(Message).delete()
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
                background_url = fake.url(),
                location = fake.word()
            )
            user.password_hash = user.username + 'password'

            users.append(user)

        db.session.add_all(users)
        db.session.commit()

        posts = []
        p1 = Post(title='IMPOSTER!', description='Dealing with Imposter Syndrome is absolutely normal! You got this!', file='https://www.boredpanda.com/blog/wp-content/uploads/2022/03/6228a46713809_7uml6ksf4x481__700.jpg', likes = random.randint(1, 3000))
        posts.append(p1)

        p2 = Post(title='Code is Life', description='I often Dream about my code and wake up with a solution, take time, breathe, sleep!', file='https://i.pinimg.com/736x/20/90/23/209023711e3cd96adbc0f2239f6b7b4e--nerd-stuff-computer-jokes.jpg', likes = random.randint(1, 3000))
        posts.append(p2)
                
        p3 = Post(title='No, its fine... Really.', description='The more I code the faster I age. Its Science!', file='https://i.pinimg.com/originals/ea/21/4d/ea214df4b094e8e512aba08fedc3cf75.jpg', likes = random.randint(1, 3000))
        posts.append(p3)
        
        p4 = Post(title='Home is where the heart is', description='I havent seen the great outdoors for this entire cohort', file='https://cdn.guff.com/site_0/media/33000/32406/items/6c5b77833010314ab28d6d09.jpg', likes = random.randint(1, 3000))
        posts.append(p4)
        
        p5 = Post(title='Error! What Error!?', description='Frustrated? Comment it out and come back to it later', file='https://i.pinimg.com/736x/df/16/b9/df16b943b8cb9902913e242dae91f2ce.jpg', likes = random.randint(1, 3000))
        posts.append(p5)

        p6 = Post(title='Im here for a good time!', description='Its all fun and games... unitl its not.', file='https://assets-global.website-files.com/5f3c19f18169b62a0d0bf387/60d33bf3a2121cc74f72a286_0AEnnZYBAYzmSXzyGaopjvEGKKO1yFqf_zMXqFTAT6vUDfXVPRifI3J8oBjZUl51PnRQqf2tqpjiRt33IKgg4sTiJi2YShGTN5iNUIoYbNj2HXobiQg4-k7yBiNT54EKOGYyZOR2.png',likes = random.randint(1, 3000))
        posts.append(p6)

        p7 = Post(title='WHY????', description='Knowledge is power, question everything.', file='https://assets-global.website-files.com/5f3c19f18169b62a0d0bf387/60d33be8cf4ba7565123c8bc_YPD3ulQQAGQpOcnqIm3QzSTRgzmr1SexpW9ZjMpJ1mAnUxx4iF05XOTu44sk0qQG-8XgBcYmGZGAD-5SAZvJl3TjtmhgWnn-w0C2XKwhBscV78RVvhwZfyp0v_Pa6sNj5zxpOvRW.png', likes = random.randint(1, 3000))
        posts.append(p7)

        # for i in range(100):
        #     post = Post(
        #         title= fake.word(),
        #         description = fake.sentence(),
        #         file = "https://cdn.guff.com/site_0/media/33000/32406/items/6c5b77833010314ab28d6d09.jpg",
        #         likes = random.randint(1, 3000),

        #     )
           
        #     posts.append(post)
        db.session.add_all(posts)
        db.session.commit()

        comments = []
        for i in range(25):
            comment = Comment(
                comment = fake.sentence(),
                user_id = fake.first_name()
            )
            comments.append(comment)
        db.session.add_all(comments)
        db.session.commit()

        messages = []

        for i in range(25):
            message = Message(
                text=fake.sentence(),
                from_user_id= fake.first_name()
            )
            messages.append(message)

        db.session.add_all(messages)
        db.session.commit()




