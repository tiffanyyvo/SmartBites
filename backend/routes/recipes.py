from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from database import client
from datetime import datetime, timezone

recipes_bp = Blueprint('recipes', __name__)

db = client["smartbites"]
shared_recipes = db["shared_recipes"]

# POST /recipes/share
# Shares a recipe to the explore page
@recipes_bp.route('/share', methods=['POST'])
@jwt_required()
def share_recipe():
    email = get_jwt_identity()
    data = request.get_json()

    post_name = data.get('post_name')
    description = data.get('description')
    recipe = data.get('recipe')  # full recipe object from saved_recipes

    if not post_name or not description or not recipe:
        return jsonify({"error": "post_name, description, and recipe are required"}), 400

    post = {
        "post_name": post_name,
        "description": description,
        "recipe": recipe,
        "shared_by": email,
        "shared_at": datetime.now(timezone.utc).isoformat()
    }

    result = shared_recipes.insert_one(post)
    return jsonify({"message": "Recipe shared successfully", "id": str(result.inserted_id)}), 201


# GET /recipes/explore
# Returns all shared recipes for any logged-in user
@recipes_bp.route('/explore', methods=['GET'])
@jwt_required()
def get_explore_recipes():
    posts = list(shared_recipes.find({}, {"_id": 0}))
    return jsonify(posts), 200