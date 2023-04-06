from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import User, Friend, Message, Post, Comment

class User(Resource):
    def get(self):
        user_dicts = [user.to_dict() for user in User.query.all()]

        return make_response(
            user_dicts,
            200
        )
api.add_resource(User, '/user')

class Posts(Resource):
    def get(self):
        post_dicts = [post.to_dict() for post in Post.query.all()]
        return make_response(
            post_dicts,
            200,
        )

    def post(self):
        new_post = Post(
            description=request.get_json()['description'],
            file=request.get_json()['file'],
            likes = request.get_json()['likes']
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