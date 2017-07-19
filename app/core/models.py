from datetime import datetime
from flask_jwt import current_identity
from app.extensions import db


class CRUDMixin:

    def save(self):
        db.session.add(self)
        db.session.commit()
        return self

    def delete(self):
        db.session.delete(self)
        db.session.commit()
        return self
