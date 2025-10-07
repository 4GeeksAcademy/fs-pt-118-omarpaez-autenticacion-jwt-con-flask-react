"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/register', methods=['POST'])
def register():
    body = request.json
    if not body["password"]:
        return jsonify({"error": "Password is required"})
    hashed_password = generate_password_hash(body["password"])
    new_user = User(name=body['name'], role=body['role'], email=body['email'], password=hashed_password, is_active = True)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"success": True, "data": "user register log in now"}), 201

@api.route('/login', methods=['POST'])
def login():
    body = request.json
    query = select(User).where(User.email == body['email'])
    user = db.session.execute(query).scalar_one_or_none()
  
    if not user:
        return jsonify({"success": False, "data": "user not found"}), 404

    if not body["password"]:
        return jsonify({"success": False, "data": "Password is required"})
    
    if not check_password_hash(user.password, body["password"]):
        return jsonify({"success": False, "data": "Invalid password"}), 401
  

    token = create_access_token(identity=str(user.id))
    return jsonify({"success": True, "data": "user logged in", "token": token}), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def private():
     id = get_jwt_identity()
     
     query = select(User).where(User.id == id)
     userData = db.session.execute(query).scalar_one()
     
     return jsonify(userData.serialize())