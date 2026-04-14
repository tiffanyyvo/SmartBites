from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from gemini_client import GeminiClient
from routes.auth import auth_bp
from routes.recipes import recipes_bp
import base64, os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)
gemini = GeminiClient()
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(recipes_bp, url_prefix='/recipes')

@app.route("/")
def home():
    return "Homepage Test"

@app.route('/analyze-fridge', methods=['POST'])
def analyze_fridge():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400
    
    image = request.files['image']
    image_bytes = image.read()
    
    result = gemini.analyze_fridge_image(image_bytes, mime_type=image.content_type)
    return jsonify(result)

@app.route('/generate-recipe', methods=['POST'])
def generate_recipe():
    data = request.get_json()
    ingredients = data.get('ingredients', [])
    dietary_restrictions = data.get('dietary_restrictions', [])
    cuisine_preference = data.get('cuisine_preference')
    
    if not ingredients:
        return jsonify({"error": "No ingredients provided"}), 400
    
    result = gemini.generate_recipes(
        ingredients, 
        dietary_restrictions, 
        cuisine_preference
    )
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port=5001)