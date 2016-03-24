from flask import render_template, Blueprint


home = Blueprint('home', __name__)


@home.route('/', defaults={'path': ''})
@home.route('/<path:path>')
def index(path):
    return render_template('index.html')
