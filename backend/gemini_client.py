from google import genai
from google.genai import types
import json, os 
from dotenv import load_dotenv

class GeminiClient:

    def __init__(self): 
        load_dotenv()
        self.client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
        self.model = "gemini-2.5-flash"
        
    def analyze_fridge_image(self, image_bytes, mime_type="image/jpeg"):
        """
        Analyzes a fridge image and returns list of ingredients.
        Expects raw bytes directly from the uploaded image file.
        Returns:
            dict: {"ingredients": ["item1", "item2", ...]}
        """
        
        try:
            response = self.client.models.generate_content(
                model=self.model,
                contents=[
                    types.Part.from_bytes(data=image_bytes, mime_type=mime_type),
                    """Analyze this fridge image and identify all visible food items.
                    Return ONLY a JSON object: {"ingredients": ["item1", "item2"]}
                    Be specific (e.g. "cheddar cheese" not just "cheese")."""
                ],
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    response_schema=list[str],
                )
            )
            ingredients_list = json.loads(response.text)
            return {"ingredients": ingredients_list}
            
        except Exception as e:
            print(f"Error analyzing image: {e}")
            return {"error": str(e)}
    
    def generate_recipes(self, ingredients, dietary_restrictions=None, cuisine_preference=None):
        """
        Generates recipe suggestions based on available ingredients
        
        Args:
            ingredients: list of ingredient strings
            dietary_restrictions: optional list (e.g., ["vegetarian", "gluten-free"])
            cuisine_preference: optional string (e.g., "Italian", "Mexican")
            
        Returns:
            dict: {"recipes": [{"name": "...", "ingredients": [...], "instructions": [...]}]}
        """

        prompt = f"Given these available ingredients: {', '.join(ingredients)}"
        
        if dietary_restrictions:
            prompt += f"\nDietary restrictions: {', '.join(dietary_restrictions)}"
        if cuisine_preference:
            prompt += f"\nCuisine preference: {cuisine_preference}"
        
        prompt += """
        Generate 3 recipe suggestions that use ONLY the available ingredients (you can assume basic pantry items like salt, pepper, oil).
        Return ONLY a JSON object in this exact format:
        {
            "recipes": [{
                "name": "Recipe Name",
                "ingredients": ["ingredient 1", "ingredient 2"],
                "instructions": ["step 1", "step 2", "step 3"],
                "prep_time": "15 minutes",
                "cook_time": "30 minutes"
            }]
        }"""
        
        try:
            response = self.client.models.generate_content(
                model=self.model,
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json"
                )
            )
            return json.loads(response.text)
            
        except Exception as e:
            print(f"Error generating recipes: {e}")
            return {"error": str(e)}
    
    def makeAPICall(self, prompt):
        """
        Generic API call method for custom prompts
        
        Args:
            prompt: string or list (for multimodal content)
            
        Returns:
            string: response text
        """
        try:
            response = self.client.models.generate_content(
                model=self.model,
                contents=prompt,
            )
            return response.text
        
        except Exception as e:
            print(f"Error making API call: {e}")
            return None