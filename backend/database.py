from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os

load_dotenv()

uri = os.getenv("SMT_MONGO_URI")
client = MongoClient(uri, server_api=ServerApi('1'))

try:
    client.admin.command('ping')
    print("Successfully connected to MongoDB!")
except Exception as e:
    print(f"Connection failed: {e}")