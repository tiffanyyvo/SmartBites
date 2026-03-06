from database import client
import bcrypt

db = client["smartbites"]
users = db["users"]

def create_user(email, password):
    if users.find_one({"email": email}):
        return {"error": "Email already registered"}
    
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

def get_user_by_email(email):
    return users.find_one({"email": email})

def verify_password(plain_password, hashed_password):
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password)