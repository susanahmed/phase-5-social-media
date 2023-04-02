from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-playlist_songs', '-playlists.songs')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)

    # playlist_songs = db.relationship('PlaylistSong', backref='song')
    # playlists = association_proxy('playlist_songs', 'playlist')

    def __repr__(self):
        return f'<Song {self.username}>'
    