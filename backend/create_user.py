from pymongo import MongoClient
from passlib.context import CryptContext
import os

# Load environment variables
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "nepali_global_connect")

# Connect to MongoDB
client = MongoClient(MONGO_URL)
db = client[DB_NAME]

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# User data
email = "ndc@gmail.com"
password = "test1234"  # plain password

password = pwd_context.hash(password)

# Insert user
user = {
    "email": email,
    "hashed_password": password
}


result = db.users.insert_one(user)
print(f"Inserted user with ID: {result.inserted_id}")
