from gemini_client import GeminiClient
import base64

# Initialize client
client = GeminiClient()

# Test 1: Analyze a fridge image
print("Testing image analysis...")
with open("fridge_test.jpg", "rb") as image_file:
    image_data = base64.b64encode(image_file.read()).decode('utf-8')

result = client.analyze_fridge_image(image_data)
print("Ingredients found:", result)

# Test 2: Generate recipes
print("\nTesting recipe generation...")
test_ingredients = ["eggs", "milk", "cheese", "tomatoes", "spinach"]
recipes = client.generate_recipes(
    ingredients=test_ingredients,
    dietary_restrictions=["vegetarian"],
    cuisine_preference="Italian"
)
print("Recipes:", recipes)