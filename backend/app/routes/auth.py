# app/routes/auth.py
from flask import Blueprint, request, jsonify
from ..extensions import db
from ..models.user import User
from ..schemas.user import UserSchema
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

bp = Blueprint("auth", __name__)  # Hapus url_prefix dari sini
user_schema = UserSchema()

@bp.route('/login', methods=['POST'])
def login():
    data = request.json or {}
    identifier = data.get('email') or data.get('username')
    password = data.get('password')
    if not identifier or not password:
        return {"msg": "email/username and password required"}, 400

    user = User.query.filter((User.email==identifier) | (User.username==identifier)).first()
    if not user or not user.check_password(password):
        return {"msg": "Bad credentials"}, 401

    access_token = create_access_token(identity={"id": user.id, "role": user.role})
    # Note: prefer httpOnly cookie in production. Demo returns token in body.
    return {"access_token": access_token, "user": user_schema.dump(user)}

@bp.route('/me')
@jwt_required()
def me():
    identity = get_jwt_identity()
    user = User.query.get(identity.get('id'))
    return user_schema.dump(user)