from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

from app import bcrypt


from config import db



class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)

    username = db.Column(db.String)
    bio = db.Column(db.String)
    image_url = db.Column(db.String, nullable=False)
    background_url=db.Column(db.String)
    location = db.Column(db.String)
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    _password_hash = db.Column(db.String)


    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    friends = db.relationship('Friend', backref = 'user')
    posts = db.relationship('Post', backref='user')
    comments = db.relationship('Comment', backref = 'user')

    serialize_rules = ('-post.users','-_password_hash',)

    @validates('username')
    def validates_name(self, key, value):
        if not value:
            raise ValueError("User must have a name.")
        return value

    def __repr__(self):
        return f'User: {self.id}, Name: {self.username}, Email: {self.email}, Admin: {self.admin}'

class Friend(db.Model, SerializerMixin):
    __tablename__ = 'friends'
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))


class Message(db.Model, SerializerMixin):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)

    text = db.Column(db.String)
    from_user_id = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())


    @validates('body')
    def validates_body(self, key, value):
        if not value:
            raise ValueError("Please enter a message")
        return value

class Post(db.Model, SerializerMixin):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String)
    description = db.Column(db.String)
    file = db.Column(db.String)
    likes = db.Column(db.Integer)
    comments= db.relationship('Comment', backref = 'post')
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    user_id = db.Column(db.Integer(), db.ForeignKey('users.id'))
    serialize_rules= ('-users.post',)


class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)

    comment = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))

    serialize_rules = ('-user.comments', '-post.comments')

