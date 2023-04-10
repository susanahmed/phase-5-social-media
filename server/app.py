from flask import request, make_response, session, jsonify, abort
from flask_restful import Resource, Api
from flask_bcrypt import Bcrypt
from config import app, db, api
from werkzeug.exceptions import NotFound, Unauthorized

bcrypt = Bcrypt(app)

from models import User, Friend, Message, Post, Comment

class Signup(Resource):
    def post(self):
        form_json = request.get_json()
        new_user = User(name = form_json['name'], email=form_json['email'], username=form_json['username'])
        new_user.password_hash = form_json['password']

        db.session.add(new_user)
        db.session.commit()

        response = make_response(
            new_user.to_dict(),
            201
        )
        return response 
api.add_resource(Signup, '/signup')

class Login(Resource):
    def post(self):
        try:
            user= User.query.filter_by(name=request.get_json()['name']).first()
            if user.authenticate(request.get_json()['password']):
                session['user_id'] = user.id
                response = make_response(
                    user.to_dict(),
                    200
                )
                return response
        except: 
            abort(401, "Incorrect Username or Password")

api.add_resource(Login, '/login')

class AuthorizedSession(Resource):
    def get(self):
        try:
            user = User.query.filter_by(id=session['user_id']).first()
            response = make_response(
                user.to_dict(),
                200
            )
            return response
        except:
            abort(401, "Unauthorized")

api.add_resource(AuthorizedSession, '/authorized')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None 
        response = make_response('',204)
        return response
api.add_resource(Logout, '/logout')

@app.errorhandler(NotFound)
def handle_not_found(e):
    response = make_response(
        "Sorry, Not Found",
        404
    )

    return response


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
            # likes = request.get_json()['likes']
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


if __name__ == '__main__':
    app.run(port=5555, debug=True)