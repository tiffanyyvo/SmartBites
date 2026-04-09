from database import client
import bcrypt

db = client["smartbites"]
users = db["users"]

def create_user(email, password):
    if users.find_one({"email": email}):
        return {"error": "Email already registered"}
    
    # encode binary pwd to a string
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    user = {
        "email": email,
        "password": hashed,
        "dietary_restrictions": [],
        "cuisine_preferences": [],
        "saved_recipes": [],
        "pantry": []
    }
    
    result = users.insert_one(user)
    return {"id": str(result.inserted_id), "email": email}

# Finds user by email and updates dietary restrictions and cuisine preferences
def update_user_preferences(email, dietary_restrictions=None, cuisine_preferences=None):
    update_fields = {}
    if dietary_restrictions is not None:
        update_fields["dietary_restrictions"] = dietary_restrictions
    if cuisine_preferences is not None:
        update_fields["cuisine_preferences"] = cuisine_preferences
    
    if not update_fields:
        return {"error": "No preferences provided"}
    
    users.update_one({"email": email}, {"$set": update_fields})
    return {"message": "Preferences updated"}

def get_user_by_email(email):
    return users.find_one({"email": email})

def verify_password(plain_password, hashed_password):
    if isinstance(hashed_password, str):
        hashed_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password)