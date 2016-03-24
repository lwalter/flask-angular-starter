from datetime import timedelta
import os
import logging


class Config(object):
    DEBUG = False
    ASSETS_DEBUG = False

    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']

    SECRET_KEY = os.environ['SECRET_KEY']

    JWT_AUTH_USERNAME_KEY = 'email'
    JWT_EXPIRATION_DELTA = timedelta(seconds=10)
    JWT_NOT_BEFORE_DELTA = timedelta(seconds=0)

    LOGGING_LEVEL = logging.INFO
    LOGGING_LOCATION = 'app.logs'


class Development(Config):
    DEVELOPMENT = True
    DEBUG = True
    ASSETS_DEBUG = True
    LOGGING_LEVEL = logging.DEBUG


class Production(Config):
    PRODUCTION = True
