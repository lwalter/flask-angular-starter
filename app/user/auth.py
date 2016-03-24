from datetime import datetime
from config import Config
from .models import Users


def authenticate(email, password):
    user = Users.query.filter_by(email=email).first()

    if not user or not user.verify_password(password):
        return None

    return user


def identity(payload):
    user_id = payload['identity']
    user = Users.query.get(user_id)

    if not user:
        return None

    return user


def payload_handler(identity):
    iat = datetime.utcnow()
    exp = iat + Config.JWT_EXPIRATION_DELTA
    nbf = iat + Config.JWT_NOT_BEFORE_DELTA
    identity_id = getattr(identity, 'id') or identity['id']
    identity_firstname = getattr(identity, 'firstname') or identity['firstname']
    return {'exp': exp, 'iat': iat, 'nbf': nbf, 'identity': identity_id, 'firstname': identity_firstname}
