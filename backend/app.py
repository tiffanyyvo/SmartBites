from flask import Flask, request, jsonify
from flask_cors import CORS
from gemini_client import GeminiClient

app = Flask(__name__)
CORS(app)

gemini = GeminiClient()

@app.route('/analyze-fridge', methods=['POST'])
def analyze_fridge():
    data = request.get_json()
    image_data = data.get('image')
    
    if not image_data:
        return jsonify({"error": "No image provided"}), 400
    
    result = gemini.analyze_fridge_image(image_data)
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
    app.run(debug=True, port=5000)