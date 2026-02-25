import json
import google.generativeai as genai
import os 
import re
import base64
from dotenv import load_dotenv

class GeminiClient:

    def __init__(self): 
        load_dotenv()
        API_KEY = os.getenv("API_KEY")
        genai.configure(api_key=API_KEY)
        self.model = genai.GenerativeModel("gemini-2.0-flash-exp")
        
    def analyze_fridge_image(self, image_data):
        """
        Analyzes a fridge image and returns list of ingredients
        
        Args:
            image_data: base64 encoded image string or file path
            
        Returns:
            dict: {"ingredients": ["item1", "item2", ...]}
        """
        prompt = """
        Analyze this refrigerator image and identify all visible food items.
        Return ONLY a JSON object in this exact format:
        {"ingredients": ["item1", "item2", "item3"]}
        
        Be specific with food names (e.g., "cheddar cheese" not just "cheese").
        Only include items you can clearly see.
        """
        
        try:
            # Handle base64 image
            if image_data.startswith('data:image'):
                # Remove data:image/jpeg;base64, prefix if present
                image_data = re.sub(r'^data:image/.+;base64,', '', image_data)
            
            # Decode base64 to bytes
            image_bytes = base64.b64decode(image_data)
            
            response = self.model.generate_content([
                prompt,
                {"mime_type": "image/jpeg", "data": image_bytes}
            ])
            
            # Parse JSON from response
            response_text = response.text.strip()
            # Remove markdown code blocks if present
            response_text = re.sub(r'```json\n?|\n?```', '', response_text)
            
            result = json.loads(response_text)
            return result
            
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
        prompt = f"""
        Given these available ingredients: {', '.join(ingredients)}
        """
        
        if dietary_restrictions:
            prompt += f"\nDietary restrictions: {', '.join(dietary_restrictions)}"
        
        if cuisine_preference:
            prompt += f"\nCuisine preference: {cuisine_preference}"
        
        prompt += """
        
        Generate 3 recipe suggestions that use ONLY the available ingredients (you can assume basic pantry items like salt, pepper, oil).
        
        Return ONLY a JSON object in this exact format:
        {
            "recipes": [
                {
                    "name": "Recipe Name",
                    "ingredients": ["ingredient 1", "ingredient 2"],
                    "instructions": ["step 1", "step 2", "step 3"],
                    "prep_time": "15 minutes",
                    "cook_time": "30 minutes"
                }
            ]
        }
        """
        
        try:
            response = self.model.generate_content(prompt)
            response_text = response.text.strip()
            # Remove markdown code blocks if present
            response_text = re.sub(r'```json\n?|\n?```', '', response_text)
            
            result = json.loads(response_text)
            return result
            
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
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            print(f"Error making API call: {e}")
            return None