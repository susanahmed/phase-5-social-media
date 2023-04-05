from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    bio = db.Column(db.String)
    image = db.Column(db.String, nullable=False)
    username = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    friends = db.relationship('Friend', backref = 'user')
    posts = db.relationship('Post', backref='post')
    comments = db.relationship('Comment', backref = 'user')

    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))


    serialize_rules = ('-post.users',)

    @validates('name')
    def validates_name(self, key, value):
        if not value:
            raise ValueError("User must have a name.")
        return value

    def __repr__(self):
        return f'<User {self.name}>'

class Friend(db.Model, SerializerMixin):
    __tablename__ = 'friends'
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))


class Message(db.Model, SerializerMixin):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)

    text = db.Column(db.String)
    to_user_id = db.Column(db.Integer)
    from_user_id = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

class Post(db.Model, SerializerMixin):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)

    text = db.Column(db.String)
    file = db.Column(db.String)
    likes = db.Column(db.Integer)
    comments= db.relationship('Comment', backref = 'post')
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    user_id = db.relationship('User', backref= 'post')
    serialize_rules= ('-users.post',)

    @validates('text')
    def validates_content(self, key, text):
        if len(text) < 1:
            raise ValueError("Text must be valid!")
            return text

class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)

    content = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))

    serialize_rules = ('-user.comments', '-post.comments')

    @validates('content')
    def validates_content(self, key, content):
        if len(content) < 1:
            raise ValueError("Comment must be valid!")
            return content


