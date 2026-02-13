# from flask import Flask, redirect, url_for

# app = Flask(__name__)

# @app.route("/")
# def home():
#     return "Homepage Test"

# if __name__ == "__main__":
#     app.run(debug=True)

from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/analyze-fridge', methods=['POST'])
def analyze_fridge():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400
    
    image = request.files['image']
    
    # For now, just return a test response
    return jsonify({
        "status": "success",
        "ingredients": ["eggs", "milk", "cheese"],
        "message": "Image received successfully"
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)