from app.extensions import db, bcrypt
from app.core.models import CRUDMixin
from datetime import datetime


class Users(CRUDMixin, db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    email = db.Column(db.String(200), unique=True, nullable=False)
    firstname = db.Column(db.String(120), nullable=False)
    lastname = db.Column(db.String(120), nullable=False)
    password = db.Column(db.String(120), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    def __init__(self, email, firstname, lastname, password):
        super().__init__()

        self.created_at = datetime.utcnow()
        self.email = email
        self.password = bcrypt.generate_password_hash(password)
        self.firstname = firstname
        self.lastname = lastname

    def __repr__(self):
        return '<User {0}>'.format(self.email)

    def verify_password(self, password):
        return bcrypt.check_password_hash(self.password, password)
