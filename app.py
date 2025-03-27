from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from datetime import datetime, timedelta, timezone
import bcrypt
import jwt
import os
from dotenv import load_dotenv
from flask_cors import CORS
from bson import ObjectId
from dateutil.relativedelta import relativedelta  # For last 6 months calculations

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS

# Retrieve environment variables
MONGO_URI = os.environ.get('MONGO_URI')
SECRET_KEY = os.environ.get('SECRET_KEY')

# Configure the Flask app
app.config['MONGO_URI'] = MONGO_URI
app.config['SECRET_KEY'] = SECRET_KEY

# Initialize PyMongo for authentication (users) and get other collections
mongo_auth = PyMongo(app)
users_collection = mongo_auth.db.users

client = mongo_auth.cx  # Get underlying MongoClient
db = client["expense_tracker"]
expenses = db["expenses"]
income = db["income"]
goals = db["goals"]
reminders = db["reminders"]

# Helper functions
def generate_token(user):
    """Generate a JWT token that expires in 30 minutes using user's _id and email."""
    payload = {
        "sub": str(user['_id']),  # Use _id as a stable identifier
        "email": user['email'],
        "exp": datetime.now(timezone.utc) + timedelta(minutes=30)
    }
    token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm="HS256")
    return token

def decode_token(token):
    """Decode a JWT token to get the payload."""
    try:
        return jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return None

def validate_date(date_str):
    try:
        return datetime.strptime(date_str, "%Y-%m-%d")
    except ValueError:
        return None

def validate_amount(amount_str):
    try:
        return float(amount_str)
    except ValueError:
        return None

# --------------------------
# Authentication Endpoints
# --------------------------
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    
    if not username or not email or not password:
        return jsonify({"error": "Missing required fields."}), 400

    if users_collection.find_one({"email": email}):
        return jsonify({"error": "Email already exists."}), 400

    hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    user_doc = {
        "username": username,
        "email": email,
        "hashed_password": hashed_pw,
        "createdAt": datetime.now(timezone.utc)
    }
    result = users_collection.insert_one(user_doc)
    user_doc["_id"] = result.inserted_id
    token = generate_token(user_doc)
    return jsonify({
        "access_token": token,
        "token_type": "bearer",
        "username": username
    }), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"error": "User not found. Please sign up."}), 404

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
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        return jsonify({"error": "Authorization header missing"}), 401

    token = auth_header.split(" ")[1]
    payload = decode_token(token)
    if not payload:
        return jsonify({"error": "Invalid or expired token"}), 401

    user = users_collection.find_one({"_id": ObjectId(payload.get("sub"))})
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "username": user.get("username"),
        "email": user.get("email")
    }), 200

@app.route('/updateProfile', methods=['PUT'])
def update_profile():
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        return jsonify({"error": "Authorization header missing"}), 401

    token = auth_header.split(" ")[1]
    payload = decode_token(token)
    if not payload:
        return jsonify({"error": "Invalid or expired token"}), 401

    user_id = payload.get("sub")
    data = request.get_json()
    new_username = data.get("name")
    new_email = data.get("email")
    if not new_username or not new_email:
        return jsonify({"error": "Missing required fields."}), 400

    users_collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"username": new_username, "email": new_email}}
    )
    updated_user = users_collection.find_one({"_id": ObjectId(user_id)})
    return jsonify({
        "username": updated_user.get("username"),
        "email": updated_user.get("email")
    }), 200

@app.route('/updatePassword', methods=['PUT'])
def update_password():
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

    new_hashed_pw = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
    users_collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"hashed_password": new_hashed_pw}}
    )
    return jsonify({"message": "Password updated successfully."}), 200

# --------------------------
# Dashboard Endpoints for Income, Expense, Goal, Reminder
# --------------------------
@app.route('/addIncome', methods=['POST'])
def add_income_record():
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        return jsonify({"error": "Authorization header missing"}), 401
    token = auth_header.split(" ")[1]
    payload = decode_token(token)
    if not payload:
        return jsonify({"error": "Invalid or expired token"}), 401

    user_id = payload.get("sub")
    data = request.get_json()
    date_str = data.get("date")
    date = validate_date(date_str)
    if not date:
        return jsonify({"error": "Invalid date format. Use YYYY-MM-DD."}), 400

    try:
        amount = float(data.get("amount"))
    except (TypeError, ValueError):
        return jsonify({"error": "Invalid amount. Must be a number."}), 400

    source = data.get("source")
    if not source:
        return jsonify({"error": "Missing income source."}), 400

    income_record = {
        "user_id": user_id,
        "date": date,
        "amount": amount,
        "source": source,
        "description": data.get("description", "")
    }
    income.insert_one(income_record)
    return jsonify({"message": "Income added successfully."}), 201

@app.route('/addExpense', methods=['POST'])
def add_expense_record():
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        return jsonify({"error": "Authorization header missing"}), 401
    token = auth_header.split(" ")[1]
    payload = decode_token(token)
    if not payload:
        return jsonify({"error": "Invalid or expired token"}), 401

    user_id = payload.get("sub")
    data = request.get_json()
    date_str = data.get("date")
    date = validate_date(date_str)
    if not date:
        return jsonify({"error": "Invalid date format. Use YYYY-MM-DD."}), 400

    description = data.get("description")
    if not description:
        return jsonify({"error": "Missing expense description."}), 400

    try:
        amount = float(data.get("amount"))
    except (TypeError, ValueError):
        return jsonify({"error": "Invalid amount. Must be a number."}), 400

    category = data.get("category")
    if not category:
        return jsonify({"error": "Missing expense category."}), 400

    expense_record = {
        "user_id": user_id,
        "date": date,
        "amount": amount,
        "description": description,
        "category": category
    }
    expenses.insert_one(expense_record)
    return jsonify({"message": "Expense added successfully."}), 201

@app.route('/addGoal', methods=['POST'])
def add_goal_record():
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        return jsonify({"error": "Authorization header missing"}), 401
    token = auth_header.split(" ")[1]
    payload = decode_token(token)
    if not payload:
        return jsonify({"error": "Invalid or expired token"}), 401

    user_id = payload.get("sub")
    data = request.get_json()
    goal_name = data.get("goal_name")
    try:
        target_amount = float(data.get("target_amount"))
    except (TypeError, ValueError):
        return jsonify({"error": "Invalid target amount."}), 400

    deadline_str = data.get("deadline")
    deadline = validate_date(deadline_str) if deadline_str else None

    goal_record = {
        "user_id": user_id,
        "goal_name": goal_name,
        "target_amount": target_amount,
        "saved_amount": 0,
        "deadline": deadline,
        "createdAt": datetime.now(timezone.utc)
    }
    goals.insert_one(goal_record)
    return jsonify({"message": "Goal added successfully."}), 201

@app.route('/addReminder', methods=['POST'])
def add_reminder_record():
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        return jsonify({"error": "Authorization header missing"}), 401
    token = auth_header.split(" ")[1]
    payload = decode_token(token)
    if not payload:
        return jsonify({"error": "Invalid or expired token"}), 401

    user_id = payload.get("sub")
    data = request.get_json()
    title = data.get("title")
    due_date_str = data.get("due_date")
    due_date = validate_date(due_date_str)
    if not title or not due_date:
        return jsonify({"error": "Missing required fields."}), 400

    reminder_record = {
        "user_id": user_id,
        "title": title,
        "due_date": due_date,
        "createdAt": datetime.now(timezone.utc)
    }
    reminders.insert_one(reminder_record)
    return jsonify({"message": "Reminder added successfully."}), 201

# --------------------------
# Endpoints for Chart Data
# --------------------------
@app.route('/monthlyIncome', methods=['GET'])
def monthly_income_endpoint():
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        return jsonify({"error": "Authorization header missing"}), 401

    token = auth_header.split(" ")[1]
    payload = decode_token(token)
    if not payload:
        return jsonify({"error": "Invalid or expired token"}), 401

    user_id = payload.get("sub")
    now = datetime.now()
    start_of_month = datetime(now.year, now.month, 1)
    total_income = sum(i["amount"] for i in income.find({
        "user_id": user_id,
        "date": {"$gte": start_of_month}
    }))
    return jsonify({"total_income": total_income}), 200

@app.route('/monthlyExpenses', methods=['GET'])
def monthly_expenses_endpoint():
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        return jsonify({"error": "Authorization header missing"}), 401

    token = auth_header.split(" ")[1]
    payload = decode_token(token)
    if not payload:
        return jsonify({"error": "Invalid or expired token"}), 401

    user_id = payload.get("sub")
    now = datetime.now()
    start_of_month = datetime(now.year, now.month, 1)
    total_expenses = sum(e["amount"] for e in expenses.find({
        "user_id": user_id,
        "date": {"$gte": start_of_month}
    }))
    return jsonify({"total_expenses": total_expenses}), 200

@app.route('/expenseBreakdown', methods=['GET'])
def expense_breakdown_endpoint():
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        return jsonify({"error": "Authorization header missing"}), 401
    token = auth_header.split(" ")[1]
    payload = decode_token(token)
    if not payload:
        return jsonify({"error": "Invalid or expired token"}), 401
    user_id = payload.get("sub")
    now = datetime.now()
    start_of_month = datetime(now.year, now.month, 1)
    breakdown = {}
    for exp in expenses.find({
        "user_id": user_id,
        "date": {"$gte": start_of_month}
    }):
        cat = exp.get("category", "Other")
        breakdown[cat] = breakdown.get(cat, 0) + exp.get("amount", 0)
    return jsonify(breakdown), 200

@app.route('/expensesLast6Months', methods=['GET'])
def expenses_last_6_months_endpoint():
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        return jsonify({"error": "Authorization header missing"}), 401
    token = auth_header.split(" ")[1]
    payload = decode_token(token)
    if not payload:
        return jsonify({"error": "Invalid or expired token"}), 401
    user_id = payload.get("sub")
    now = datetime.now()
    start_date = datetime(now.year, now.month, 1) - relativedelta(months=5)
    pipeline = [
        {"$match": {"user_id": user_id, "date": {"$gte": start_date}}},
        {"$group": {
            "_id": {"year": {"$year": "$date"}, "month": {"$month": "$date"}},
            "total": {"$sum": "$amount"}
        }},
        {"$sort": {"_id.year": 1, "_id.month": 1}}
    ]
    results = list(expenses.aggregate(pipeline))
    formatted = [
        {"year": item["_id"]["year"], "month": item["_id"]["month"], "Expenses": item["total"]}
        for item in results
    ]
    return jsonify(formatted), 200

@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({"message": "pong"}), 200

if __name__ == '__main__':
    app.run(debug=True)
