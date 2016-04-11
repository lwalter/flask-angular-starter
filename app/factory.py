import os
from flask import Flask
from logging.handlers import RotatingFileHandler
from app.extensions import db, api, bcrypt, jwt


def create_app(config=None):
    app = Flask(__name__)

    if config:
        app.config.from_object(config)
    else:
        app.config.from_object(os.environ['APP_SETTINGS'])

    # Init logger
    handler = RotatingFileHandler(app.config['LOGGING_LOCATION'], maxBytes=10000, backupCount=1)
    handler.setLevel(app.config['LOGGING_LEVEL'])
    app.logger.addHandler(handler)

    # Init routes
    from app.home.views import home
    app.register_blueprint(home)

    from app.home.api import TestApi
    api.add_resource(TestApi, '/api/protected')

    from app.user.api import UserApi
    api.add_resource(UserApi, '/api/user/register')

    # Init extensions
    db.init_app(app)
    api.init_app(app)
    bcrypt.init_app(app)

    from app.user.auth import authenticate, identity, payload_handler
    jwt.authentication_handler(authenticate)
    jwt.identity_handler(identity)
    jwt.jwt_payload_handler(payload_handler)
    jwt.init_app(app)

    return app
