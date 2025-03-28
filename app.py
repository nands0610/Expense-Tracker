from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from datetime import datetime, timedelta, timezone
import bcrypt
import jwt
import os
from dotenv import load_dotenv
from flask_cors import CORS
from bson import ObjectId

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Retrieve environment variables
MONGO_URI = os.environ.get('MONGO_URI')
SECRET_KEY = os.environ.get('SECRET_KEY')

# Configure the Flask app with the environment variables
app.config['MONGO_URI'] = MONGO_URI
app.config['SECRET_KEY'] = SECRET_KEY

# Initialize PyMongo and connect to the 'users' collection
mongo = PyMongo(app)
users_collection = mongo.db.users

def generate_token(user):
    """Generate a JWT token that expires in 30 minutes using user's _id and email."""
    payload = {
        "sub": str(user['_id']),  # use _id as a stable identifier
        "email": user['email'],
        "exp": datetime.now(timezone.utc) + timedelta(minutes=30)
    }
    token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm="HS256")
    return token

def decode_token(token):
    """Decode a JWT token to get the payload."""
    try:
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

@app.route('/signup', methods=['POST'])
def signup():
    """
    Signup endpoint:
      - Expects a JSON payload with 'username', 'email', and 'password'.
      - Checks for missing fields and duplicate emails.
      - Hashes the password, stores the user in the database, and returns a JWT token.
    """
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    
    # Validate required fields
    if not username or not email or not password:
        return jsonify({"error": "Missing required fields."}), 400

    # Check if the user already exists based on email
    if users_collection.find_one({"email": email}):
        return jsonify({"error": "Email already exists."}), 400

    # Hash the password
    hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    user_doc = {
        "username": username,
        "email": email,
        "hashed_password": hashed_pw,
        "createdAt": datetime.now(timezone.utc)
    }
    result = users_collection.insert_one(user_doc)
    user_doc["_id"] = result.inserted_id  # Ensure _id is present
    token = generate_token(user_doc)
    return jsonify({"access_token": token, "token_type": "bearer", "username": username}), 201

@app.route('/login', methods=['POST'])
def login():
    """
    Login endpoint:
      - Expects a JSON payload with 'email' and 'password'.
      - Verifies if the user exists and checks the provided password.
      - Returns a JWT token and the user's username if credentials are valid.
    """
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Find the user in the database using email
    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"error": "User not found. Please sign up."}), 404

    # Verify the provided password against the stored hashed password
    if not bcrypt.checkpw(password.encode('utf-8'), user['hashed_password']):
        return jsonify({"error": "Invalid credentials."}), 401

    token = generate_token(user)
    return jsonify({
        "access_token": token,
        "token_type": "bearer",
        "username": user.get("username", email)
    }), 200

@app.route('/profile', methods=['GET'])
def profile():
    """
    Profile endpoint:
      - Expects the JWT token in the Authorization header.
      - Returns the user's username and email.
    """
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        return jsonify({"error": "Authorization header missing"}), 401

    token = auth_header.split(" ")[1]
    payload = decode_token(token)
    if not payload:
        return jsonify({"error": "Invalid or expired token"}), 401

    user_id = payload.get("sub")
    user = users_collection.find_one({"_id": ObjectId(user_id)})
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "username": user.get("username"),
        "email": user.get("email")
    }), 200

@app.route('/updateProfile', methods=['PUT'])
def update_profile():
    """
    Update Profile endpoint:
      - Expects the JWT token in the Authorization header.
      - Expects a JSON payload with 'name' and 'email'.
      - Updates the user's profile in the database.
    """
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        return jsonify({"error": "Authorization header missing"}), 401

    token = auth_header.split(" ")[1]
    payload = decode_token(token)
    if not payload:
        return jsonify({"error": "Invalid or expired token"}), 401

    user_id = payload.get("sub")
    data = request.get_json()
    new_username = data.get("name")  # 'name' holds the new username
    new_email = data.get("email")
    if not new_username or not new_email:
        return jsonify({"error": "Missing required fields."}), 400

    # Update the user's profile using _id as identifier
    users_collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"username": new_username, "email": new_email}}
    )
    # Return updated profile
    updated_user = users_collection.find_one({"_id": ObjectId(user_id)})
    return jsonify({
        "username": updated_user.get("username"),
        "email": updated_user.get("email")
    }), 200

@app.route('/updatePassword', methods=['PUT'])
def update_password():
    """
    Update Password endpoint:
      - Expects the JWT token in the Authorization header.
      - Expects a JSON payload with 'currentPassword' and 'newPassword'.
      - Verifies the current password and updates it with the new password.
    """
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        return jsonify({"error": "Authorization header missing"}), 401

    token = auth_header.split(" ")[1]
    payload = decode_token(token)
    if not payload:
        return jsonify({"error": "Invalid or expired token"}), 401

    user_id = payload.get("sub")
    data = request.get_json()
    current_password = data.get("currentPassword")
    new_password = data.get("newPassword")

    if not current_password or not new_password:
        return jsonify({"error": "Missing required fields."}), 400

    user = users_collection.find_one({"_id": ObjectId(user_id)})
    if not user:
        return jsonify({"error": "User not found"}), 404

    if not bcrypt.checkpw(current_password.encode('utf-8'), user['hashed_password']):
        return jsonify({"error": "Current password is incorrect."}), 401

    # Hash the new password and update it
    new_hashed_pw = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
    users_collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"hashed_password": new_hashed_pw}}
    )
    return jsonify({"message": "Password updated successfully."}), 200

@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({"message": "pong"}), 200

if __name__ == '__main__':
    app.run(debug=True)
