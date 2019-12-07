# ('json': For json format, 'jsonify': Again for format 'request': For http requests, 'Flask': Main flask library)
from flask import Flask, request, jsonify, json, render_template
# ('PyMongo': Connects flask with mongo database)
from flask_pymongo import MongoClient
# ('ObjectId': Used to convert to MongoDB id format)
from bson.objectid import ObjectId
# ('CORS': Cross origin resource sharing; so we can access frontend with different urls)
from flask_cors import CORS
# ('Bcrypt': Used for hashing of password)
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token)
from datetime import datetime

# Leave these for now
# UPLOAD_FOLDER = "./uploads"
# ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}

# MongoString generated on my https://cloud.mongodb.com account || https://prnt.sc/pgi59k - Explaination
cluster = MongoClient("mongodb+srv://Faris:loughrea@cluster0-dewud.mongodb.net/test?retryWrites=true&w=majority")
# Database may contain multiple collections (tables), eg 'Employees' table, 'Appointments' table etc
database = cluster["FinalProjectDatabase"]
# Referenced whenever inserting/deleting from the users collection(table)
users = database["Users"]

app = Flask(__name__)

# app.config['JWT_SECRET_KEY'] = 'secret'
# bcrypt = Bcrypt(app)
# jwt = JWTManager(app)

CORS(app)

@app.route('/api/home', methods=['GET'])
def home():
    # Message should appear in frontend 
    result = ('Hello World from runner.py - /api/welcomeMessage')
    # Sending off the message, for some reason doesn't work
    return jsonify(result)

@app.route('/api/registerUser', methods=['POST'])
def reg():

    # The returned result (userLogin) is coming back as bytes, need to call .decode() to get the actual String
    userLogin = request.get_data().decode()
    # Data is coming back in the form of 'username_password', split the data from 'username_password' to 'username' and 'password'
    username_password = userLogin.split("_")
    # Testing it works
    username = username_password[0]
    password = username_password[1]

    # Print for testing
    print ("Username: " + username) # Print username
    print ("Password: " + password) # Print password

    # https://stackoverflow.com/questions/18667410/how-can-i-check-if-a-string-only-contains-letters-in-python
    if username.endswith('@gmit.ie'): 
        result = ("good job, it ends with @gmit.ie!, now adding to mongo")
        # Preparing data to be inserted into mongo
        new_user = {"Username":username,"Password":password}
        try:        
            # Posting data stored above to mongo
            users.insert_one(new_user)
        # Error Handling
        except: 
            # If for some reason data couldn't be commit throw an error message
            result = ("there was an issue adding you to our database")
    else: 
        result = ("Username must end with @gmit.ie")
    # password = request.get_json()['password']

    # Returning back to the frontend a String
    return jsonify(result)

# Runs the application
if __name__ == "__main__":
    # Debug = True - If theres any errors they'll pop up on the page
    app.run(debug=True) 