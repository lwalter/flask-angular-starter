from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt import JWT


api = Api()
db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWT()
