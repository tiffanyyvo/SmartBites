# test_gemini.py
import google.generativeai as genai
import base64

genai.configure(api_key='Gemini_api_key_here')

# Test with a sample fridge image
model = genai.GenerativeModel('gemini-1.5-flash')
response = model.generate_content([
    "List all food items you can see in this refrigerator image. Return as a simple list.",
    {"mime_type": "image/jpeg", "data": base64.b64encode(open("fridge.jpg", "rb").read())}
])

print(response.text)
