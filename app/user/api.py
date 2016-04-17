from .models import Users
from flask_restful import Resource, reqparse
from sqlalchemy.exc import IntegrityError
from flask import current_app
import re


class UserApi(Resource):
    def post(self):
        req_parse = reqparse.RequestParser(bundle_errors=True)
        req_parse.add_argument('email', type=str, required=True, help='No email provided', location='json')
        req_parse.add_argument('password', type=str, required=True, help='No password provided', location='json')
        req_parse.add_argument('firstname', type=str, required=True, help='No first name provided', location='json')
        req_parse.add_argument('lastname', type=str, required=True, help='No last name provided', location='json')

        args = req_parse.parse_args()

        email = args.get('email')
        firstname = args.get('firstname')
        lastname = args.get('lastname')
        password = args.get('password')

        if email == '':
            return {'message': {'email': 'No email provided'}}, 400
        elif not re.match(r"^[A-Za-z0-9\.\+_-]+@[A-Za-z0-9\._-]+\.[a-zA-Z]*$", email):
            return {'message': {'email': 'Invalid email provided'}}, 400

        if password == '':
            return {'message': {'password': 'Invalid password provided'}}, 400
        elif len(password) < 8:
            return {'message': {'password': 'Password must be at least 8 characters long'}}, 400

        if firstname == '':
            return {'message': {'firstname': 'No first name provided'}}, 400

        if lastname == '':
            return {'message': {'lastname': 'No last name provided'}}, 400

        new_user = Users(email=email,
                         firstname=firstname,
                         lastname=lastname,
                         password=password)

        try:
            new_user.save()
        except IntegrityError as e:
            current_app.logger.info(str(e))
            return {'description': 'User with given email already exists.'}, 409
        except Exception as e:
            current_app.logger.error(str(e))
            return {'description': 'Server encountered an error.'}, 500

        return {'email': new_user.email}, 201
