from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models.user import create_user, get_user_by_email, verify_password, update_user_preferences

auth_bp = Blueprint('auth', __name__)

# POST /auth/register
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

# POST /auth/login
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

# GET /auth/me
# returns user's email
@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def me():
    email = get_jwt_identity()
    user = get_user_by_email(email)
    return jsonify({"email": user['email']}), 200

# GET /auth/me/profile
# returns user's dietary restrictions and cuisine preferences
@auth_bp.route('/me/profile', methods=['GET'])
@jwt_required()
def get_profile():
    email = get_jwt_identity()
    user = get_user_by_email(email)
    return jsonify({
        "email": user['email'],
        "dietary_restrictions": user['dietary_restrictions'],
        "cuisine_preferences": user['cuisine_preferences']
    }), 200

# PUT /auth/me/profile
# updates user's dietary restrictions and cuisine preferences
@auth_bp.route('/me/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    email = get_jwt_identity()
    data = request.get_json()
    dietary_restrictions = data.get('dietary_restrictions')
    cuisine_preferences = data.get('cuisine_preferences')
    
    result = update_user_preferences(email, dietary_restrictions, cuisine_preferences)
    
    if "error" in result:
        return jsonify(result), 400
    
    return jsonify(result), 200