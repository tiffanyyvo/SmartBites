from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models.user import create_user, get_user_by_email, verify_password

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400
    
    if len(password) < 8:
        return jsonify({"error": "Password must be at least 8 characters"}), 400

    result = create_user(email, password)
    
    if "error" in result:
        return jsonify(result), 409  # acct with this email exists
    
    token = create_access_token(identity=email)
    return jsonify({"token": token, "email": email}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = get_user_by_email(email)
    
    if not user or not verify_password(password, user['password']):
        return jsonify({"error": "Invalid email or password"}), 401
    
    token = create_access_token(identity=email)
    return jsonify({"token": token, "email": email}), 200

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def me():
    email = get_jwt_identity()
    user = get_user_by_email(email)
    return jsonify({"email": user['email']}), 200