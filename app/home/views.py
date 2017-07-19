import os
from flask import Blueprint


static_folder = os.path.join(os.pardir, 'static')
home = Blueprint('home', __name__, static_folder=static_folder, static_url_path='/static')


@home.route('/', defaults={'path': ''})
@home.route('/<path:path>')
def index(path):
    return home.send_static_file('dist/index.html')
