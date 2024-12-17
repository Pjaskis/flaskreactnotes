
from config import db


# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    picture_path = db.Column(db.String(200), nullable=True)
    fullname = db.Column(db.String(200), nullable=True)
    age = db.Column(db.Integer, nullable=True)
    sex = db.Column(db.String(10), nullable=True)
    country = db.Column(db.String(100), nullable=True)
    city = db.Column(db.String(100), nullable=True)
    freeform = db.Column(db.String(200), nullable=True)
    
    
class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), unique=False, nullable=False)
    last_name = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=False, nullable=False)
    phone = db.Column(db.String(20), unique=False, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    

    user = db.relationship("User", backref=db.backref("contacts", lazy=True))


class Notes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), unique=False, nullable=False)
    content = db.Column(db.String(200), unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    related_contact_id = db.Column(db.Integer, db.ForeignKey("contact.id"), nullable=True)


    contact = db.relationship("Contact", backref=db.backref("notes", lazy=True))
    user = db.relationship("User", backref=db.backref("notes", lazy=True))