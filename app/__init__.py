import os
from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt import JWT
from logging.handlers import RotatingFileHandler


app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
api = Api(app)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

handler = RotatingFileHandler(app.config['LOGGING_LOCATION'], maxBytes=10000, backupCount=1)
handler.setLevel(app.config['LOGGING_LEVEL'])
app.logger.addHandler(handler)

from app.home.views import home
app.register_blueprint(home)

from app.home.api import TestApi
api.add_resource(TestApi, '/api/protected')

from app.user.api import UserApi
api.add_resource(UserApi, '/api/user/register')

from app.user.auth import authenticate, identity, payload_handler
jwt = JWT(app, authenticate, identity)
jwt.jwt_payload_handler(payload_handler)
