from flask import Flask, request, jsonify
from config import app, db, bcrypt
from models import User, Contact, Notes
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import random


########## Routes for contacts ##########

@app.route('/contacts/<username>', methods=['GET'])
def get_contacts(username):
    current_user = username
    current_user_id = User.query.filter_by(username=current_user).first().id
    contacts = Contact.query.filter_by(user_id=current_user_id).all()
    contacts = [{"id": contact.id, "first_name": contact.first_name, "last_name": contact.last_name, "email": contact.email, "phone": contact.phone} for contact in contacts]
    return jsonify(contacts), 200

@app.route("/create_contact/<username>", methods=["POST"])
def create_contact(username):
    current_username = username

    current_user = User.query.filter_by(username=current_username).first().id

    
    
    data = request.get_json()
    new_contact = Contact(first_name=data["first_name"], last_name=data["last_name"], email=data["email"], phone=data["phone"], user_id=current_user)
    db.session.add(new_contact)
    db.session.commit()
    return jsonify({"message": "Contact created successfully"}), 201


@app.route("/delete_contact/<contact_id>", methods=["DELETE"])
def delete_contact(contact_id):
    contact = Contact.query.get(contact_id)
    db.session.delete(contact)
    db.session.commit()
    return jsonify({"message": "Contact deleted successfully"}), 200


@app.route("/update_contact/<contact_id>", methods=["PUT"])
def update_contact(contact_id):
    contact = Contact.query.get(contact_id)
    data = request.get_json()
    contact.first_name = data["first_name"]
    contact.last_name = data["last_name"]
    contact.email = data["email"]
    contact.phone = data["phone"]
    db.session.commit()
    return jsonify({"message": "Contact updated successfully"}), 200


@app.route("/get_contact/<contact_id>", methods=["GET"])
def get_contact(contact_id):
    contact = Contact.query.get(contact_id)
    return jsonify({"id": contact.id, "first_name": contact.first_name, "last_name": contact.last_name, "email": contact.email, "phone": contact.phone}), 200



############## Routes for authentication ##############

# Register route
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    email = data['email'].lower()
    password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already in use"}), 400

    new_user = User(username=username, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

# Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity={"username": user.username, "email": user.email, "id": user.id})
        return jsonify({"access_token": access_token, "username": user.username}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401
    

#Protected route
@app.route('/user', methods=['GET'])
@jwt_required()
def user():
    current_user = get_jwt_identity()
    return jsonify({"username": current_user["username"], "email": current_user["email"]}), 200

####################### Games and stuff #######################

########## Dice Roll ##########

@app.route("/roll_dice", methods=["GET"])
def roll_dice():
    result = random.randint(1, 6)
    return jsonify({"result": result}), 200

####Lottery####

@app.route('/lottery/<chosen_number>', methods=['GET'])

def lottery(chosen_number):
    winning_number = random.randint(1, 10)
    if int(chosen_number) == winning_number:
        return jsonify("Congratulations! You won the lottery!"), 200
    else:
        return jsonify("Sorry, you did not win the lottery. The winning number was " + str(winning_number)), 200
    

############ Notes ############

@app.route('/notes/<username>', methods=['GET'])
def get_notes(username):
    current_user = username
    current_user_id = User.query.filter_by(username=current_user).first().id
    notes = Notes.query.filter_by(user_id=current_user_id).all()
    notes = [{"id": note.id, "title": note.title, "content": note.content} for note in notes]
    return jsonify(notes), 200

@app.route("/create_note/<username>", methods=["POST"])
def create_note(username):
    current_username = username

    current_user = User.query.filter_by(username=current_username).first().id
    
    data = request.get_json()
    new_note = Notes(title=data["title"], content=data["content"], user_id=current_user)
    db.session.add(new_note)
    db.session.commit()
    return jsonify({"message": "Note created successfully"}), 201


@app.route("/delete_note/<note_id>", methods=["DELETE"])
def delete_note(note_id):
    note = Notes.query.get(note_id)
    db.session.delete(note)
    db.session.commit()
    return jsonify({"message": "Note deleted successfully"}), 200


@app.route("/update_note/<note_id>", methods=["PUT"])
def update_note(note_id):
    note = Notes.query.get(note_id)
    data = request.get_json()
    note.title = data["title"]
    note.content = data["content"]
    db.session.commit()
    return jsonify({"message": "Note updated successfully"}), 200

@app.route("/get_note/<note_id>", methods=["GET"])
def get_note(note_id):
    note = Notes.query.get(note_id)
    return jsonify({"id": note.id, "title": note.title, "content": note.content}), 200




################ Routes for users public profile ################

## add profile information ##

@app.route("/add_profile_info/<username>", methods=["POST"])
def add_profile_info(username):
    current_username = username
    current_user = User.query.filter_by(username=current_username).first()
    data = request.get_json()
    current_user.picture_path = data["picture_path"]
    current_user.fullname = data["fullname"]
    current_user.age = data["age"]
    current_user.sex = data["sex"]
    current_user.country = data["country"]
    current_user.city = data["city"]
    current_user.freeform = data["freeform"]
    db.session.commit()
    return jsonify({"message": "Profile information added successfully"}), 200

## get profile information ##

@app.route("/get_profile_info/<username>", methods=["GET"])
def get_profile_info(username):
    current_username = username
    current_user = User.query.filter_by(username=current_username).first()
    return jsonify({"picture_path": current_user.picture_path, "fullname": current_user.fullname, "age": current_user.age, "sex": current_user.sex, "country": current_user.country, "city": current_user.city, "freeform": current_user.freeform}), 200

## update profile information ##
@app.route("/update_profile_info/<username>", methods=["PUT"])
def update_profile_info(username):
    current_username = username
    current_user = User.query.filter_by(username=current_username).first()
    data = request.get_json()
    current_user.picture_path = data["picture_path"]
    current_user.fullname = data["fullname"]
    current_user.age = data["age"]
    current_user.sex = data["sex"]
    current_user.country = data["country"]
    current_user.city = data["city"]
    current_user.freeform = data["freeform"]
    db.session.commit()
    return jsonify({"message": "Profile information updated successfully"}), 200

## delete profile information ##

@app.route("/delete_profile_info/<username>", methods=["DELETE"])
def delete_profile_info(username):
    current_username = username
    current_user = User.query.filter_by(username=current_username).first()
 
    db.session.commit()
    return jsonify({"message": "Profile information deleted successfully"}), 200





################### Route for finding all users ####################
@app.route("/find_all_users", methods=["GET"])
def find_all_users():
    users = User.query.all()
    users = [{"id": user.id, "username": user.username, "email": user.email} for user in users]
    return jsonify(users), 200

################### Route for finding a specific user ####################
@app.route("/find_user/<username>", methods=["GET"])
def find_user(username):
    user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify({"message": "User not found"}), 404

    return jsonify({"id": user.id, "username": user.username, "email": user.email}), 200

################### Route for deleting a user ####################
@app.route("/delete_user/<username>", methods=["DELETE"])
def delete_user(username):
    user = User.query.filter_by(username=username).first()
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200

    


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
