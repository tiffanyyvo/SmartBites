from flask import Flask, request, jsonify, redirect, url_for
from google import genai
from google.genai import types
import base64
import os
import json
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
client = genai.Client(api_key=os.getenv('GEMINI_API_KEY'))

@app.route("/")
def home():
    return "Homepage Test"

@app.route('/analyze-fridge', methods=['POST'])
def analyze_fridge():
    print("Files received:", request.files)
    print("Form data:", request.form)

    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400
    
    image = request.files['image']
    image_data = base64.b64encode(image.read()).decode('utf-8')
    
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=[
                types.Part.from_bytes(
                    data=base64.b64decode(image_data),
                    mime_type=image.content_type
                ),
                """Look at this fridge/pantry image and list every food ingredient you can identify.
                Return ONLY a JSON array of strings, nothing else. 
                Example format: ["eggs", "milk", "cheddar cheese", "carrots"]
                Be specific (e.g. "cheddar cheese" not just "dairy")."""
            ],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
            )
        )

        raw = response.text.strip()
        ingredients = json.loads(raw)

        return jsonify({
            "status": "success",
            "ingredients": ingredients
        })
    
    except json.JSONDecodeError:
        return jsonify({
            "status": "partial",
            "raw_response": response.text,
            "message": "Could not parse ingredients as JSON"
        }), 500
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)