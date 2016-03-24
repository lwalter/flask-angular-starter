import os
from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt import JWT
from flask_assets import Environment, Bundle
from logging.handlers import RotatingFileHandler


app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
api = Api(app)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
assets = Environment(app)

js_app_bundle = Bundle(
    'app/app.js',
    'app/services/service.dataService.js',
    'app/services/service.authService.js',
    'app/services/service.toastService.js',
    'app/controllers/controller.protectedController.js',
    'app/controllers/controller.toastController.js',
    'app/controllers/controller.login.js',
    'app/controllers/controller.navbar.js',
    'app/controllers/controller.register.js',
    'app/components/component.login.js',
    'app/components/component.register.js',
    'app/components/component.navbar.js',
    'app/components/component.protected.js',
    filters='jsmin',
    output='jsAppBundle.js')

js_libs_bundle = Bundle(
    'libs/angular/angular.js',
    'libs/angular-animate/angular-animate.js',
    'libs/angular-aria/angular-aria.js',
    'libs/angular-material/angular-material.js',
    'libs/angular-route/angular-route.js',
    'libs/angular-messages/angular-messages.js',
    filters='jsmin',
    output='jsLibBundle.js')

css_bundle = Bundle(
    'libs/angular-material/angular-material.css',
    'libs/angular-material/angular-material.layouts.css',
    'css/warning-toast.css',
    filters='cssmin',
    output='cssLBundle.css')

assets.register('js_app_bundle', js_app_bundle)
assets.register('js_libs_bundle', js_libs_bundle)
assets.register('css_bundle', css_bundle)

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
