from .models import Users
from flask_restful import Resource, reqparse
from sqlalchemy.exc import IntegrityError
from flask import current_app


class UserApi(Resource):
    def post(self):
        req_parse = reqparse.RequestParser()
        req_parse.add_argument('email', type=str, required=True, help='No email provided', location='json')
        req_parse.add_argument('password', type=str, required=True, help='No password provided', location='json')
        req_parse.add_argument('firstname', type=str, required=True, help='No first name provided', location='json')
        req_parse.add_argument('lastname', type=str, required=True, help='No last name provided', location='json')

        args = req_parse.parse_args()

        new_user = Users(email=args.get('email'),
                         firstname=args.get('firstname'),
                         lastname=args.get('lastname'),
                         password=args.get('password'))

        try:
            new_user.save()
        except IntegrityError as e:
            current_app.logger.info(str(e))
            return {'description': 'User with given email already exists.'}, 409
        except Exception as e:
            current_app.logger.error(str(e))
            return {'description': 'Server encountered an error.'}, 500

        return {'email': new_user.email}, 201
