from flask import request, make_response, session, jsonify, abort
from flask_restful import Resource, Api
from flask_bcrypt import Bcrypt
from config import app, db, api
from werkzeug.exceptions import NotFound, Unauthorized
from sqlalchemy.exc import IntegrityError

bcrypt = Bcrypt(app)

from models import User, Friend, Message, Post, Comment

app.secret_key = b'@~xH\xf2\x10k\x07hp\x85\xa6N\xde\xd4\xcd'

class Signup(Resource):
    def post(self):
        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('password')
        image_url = request_json.get('image_url')
        bio = request_json.get('bio')
        background_url = request_json.get('background_url')
        location = request_json.get('location')

        user = User(
            username=username,
            image_url=image_url,
            bio=bio,
            background_url=background_url,
            location=location
        )

        user.password_hash = password

        db.session.add(user)
        db.session.commit()

        response = make_response(
            user.to_dict(),
            201
        )
        return response 
api.add_resource(Signup, '/signup', endpoint='signup')

class Login(Resource):
    def post(self):
        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('password')

        user = User.query.filter(User.username == username).first()
        if user:
                if user.authenticate(password):
                    session['user_id'] = user.id
                response = make_response(
                    user.to_dict(),
                    200
                )
                return response
        return {'error': '401 Unauthorized'}, 401

api.add_resource(Login, '/login', endpoint='login')

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

api.add_resource(AuthorizedSession, '/authorized', endpoint='authorized')

class Logout(Resource):
    def delete(self):
        if session.get('user_id'):
            
            session['user_id'] = None
            
            return {}, 204
        
        return {'error': '401 Unauthorized'}, 401
api.add_resource(Logout, '/logout', endpoint='logout')

class Posts(Resource):
    def get(self):
        post_dicts = [post.to_dict() for post in Post.query.all()]
        return make_response(
            post_dicts,
            200,
        )

    def post(self):
        try:

            new_post = Post(
                title=request.get_json()['title'],
                description=request.get_json()['description'],
                file=request.get_json()['file'],
            )
        except:
            abort(422, "Incorrect Information")

        db.session.add(new_post)
        db.session.commit()

        return make_response(
            new_post.to_dict(),
            201
        )
api.add_resource(Posts, '/posts')

class PostByID(Resource):
    def get(self,id):
        post = Post.query.filter(Post.id == id).first()
        if not post:
            raise NotFound
        post_dict = post.to_dict()
        response = make_response(
            post_dict,
            200
        )
        
        return response

    def patch(self, id):
        post = Post.query.filter(Post.id == id).first()
        if not post:
            raise NotFound

        for attr in request.get_json():
            setattr(post, attr, request.get_json()[attr])

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

class Users(Resource):
    def get(self):
        user_dicts = [user.to_dict() for user in User.query.all()]
        return make_response(
            user_dicts,
            200,
        )
api.add_resource(Users, '/users')

class UserByID(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            raise NotFound
        user_dict = user.to_dict()
        response = make_response(
            user_dict,
            200
        )
        
        return response
api.add_resource(UserByID, '/users/<int:id>')

class Comments(Resource):
     def get(self):
        comment_dicts = [comment.to_dict() for comment in Comment.query.all()]
        return make_response(
            comment_dicts,
            200,
        )

     def post(self):

        try:
            comment = Comment(
                comment =request.get_json()['comment']
            )
        except ValueError as e:
            abort(422,e.args[0])

        db.session.add(comment)
        db.session.commit()

        return make_response(
            comment.to_dict(),
            201
        )
api.add_resource(Comments, '/comments')

class CommentsByID(Resource):
    def get(self,id):
        comment = Comment.query.filter_by(id=id).first()
        if not comment:
            raise NotFound
        comment_dict = comment.to_dict()
        response = make_response(
            comment_dict,
            200
        )
        
        return response

    def patch(self, id):
        comment = Comment.query.filter_by(id=id).first()
        if not comment:
            raise NotFound

        for attr in request.form:
            setattr(comment, attr, request.form[attr])

        db.session.add(comment)
        db.session.commit()

        comment_dict = comment.to_dict()
        
        response = make_response(
            comment_dict,
            200
        )
        return response

    def delete(self, id):
        comment = Comment.query.filter_by(id=id).first()
        if not comment:
            raise NotFound
        db.session.delete(comment)
        db.session.commit()

        response = make_response('', 204)
        
        return response
api.add_resource(CommentsByID, '/comments/<int:id>')

@app.errorhandler(NotFound)
def handle_not_found(e):
    response = make_response(
        "Not Found: Sorry this does not exist!",
        404
    )

    return response

class Messages(Resource):
     def get(self):
        message_dicts = [message.to_dict() for message in Message.query.all()]
        return make_response(
            message_dicts,
            200,
        )

     def post(self):

        try:
            message = Message(
                text =request.get_json()['text'],
                from_user_id=request.get_json()['from_user_id']
            )
        except ValueError as e:
            abort(422,e.args[0])

        db.session.add(message)
        db.session.commit()

        return make_response(
            message.to_dict(),
            201
        )
api.add_resource(Messages, '/messages')

class MessageByID(Resource):
    def get(self, id):
        message = Message.query.filter(Message.id == id).first()
        if not message:
            raise NotFound
        message_dict = message.to_dict()
        response = make_response(
            message_dict,
            200
        )
        
        return response

api.add_resource(MessageByID, '/messages/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)