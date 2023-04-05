from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import db, User, Friend, Message, Post, Comment

class User(Resource):
    def get(self):
        user_dicts = [user.to_dict(rules=('Friend','Post','Comment')) for user in User.query.all()]

        return make_response(
            user_dicts,
            200
        )
class Post(Resource):
    def get(self):
        post_list = [post.to_dict() for post in Post.query.all()]
        response = make_response(
            post_list,
            200,
        )
        return response

    def post(self):
        new_post = Post(
            text=request.get_json()['text'],
            file=request.request.get_json()['file']
        )

        db.session.add(new_post)
        db.session.commit()

        return make_response(
            new_post.to_dict(),
            201
        )
api.add_resource(Posts, '/posts')

class PostByID(Resource):
    def get(self,id):
        post = Post.query.filter_by(id=id).first()
        if not post:
            raise NotFound
        post_dict = post.to_dict()
        response = make_response(
            post_dict,
            200
        )
        
        return response

    def patch(self, id):
        post = Post.query.filter_by(id=id).first()
        if not post:
            raise NotFound

        for attr in request.form:
            setattr(post, attr, request.form[attr])

        db.session.add(post)
        db.session.commit()

        post_dict = post.to_dict()
        
        response = make_response(
            post_dict,
            200
        )
        return response

    def delete(self, id):
        post = Post.query.filter_by(id=id).first()
        if not post:
            raise NotFound
        db.session.delete(post)
        db.session.commit()

        response = make_response('', 204)
        
        return response
api.add_resource(PostByID, '/posts/<int:id>')