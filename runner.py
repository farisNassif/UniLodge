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


# MongoString generated on my https://cloud.mongodb.com account || https://prnt.sc/pgi59k - Explaination
cluster = MongoClient("mongodb+srv://Faris:loughrea@cluster0-dewud.mongodb.net/test?retryWrites=true&w=majority")
database = cluster["FinalProjectDatabase"]
# Referenced whenever inserting/deleting from the users collection(table)
users = database["Users"]

app = Flask(__name__)

# app.config['JWT_SECRET_KEY'] = 'secret'
# bcrypt = Bcrypt(app)
# jwt = JWTManager(app)

CORS(app)

@app.route('/api/outputMessage', methods=['GET'])
def sampleMsg():
    # Message should appear in frontend 
    result = 'Hello World from runner.py'
    
    # Sending off the message, for some reason doesn't work
    return jsonify(result)

@app.route('/api/registerUser', methods=['POST'])
def reg():

    # The returned result (userLogin) is coming back as bytes, need to call .decode() to get the actual String
    userLogin = request.get_data().decode()
    print(userLogin)
    username_password = userLogin.split("_")
    print (username_password[0])
    print (username_password[1])

    if userLogin.isalpha():
        print("It's all letters")
    # password = request.get_json()['password']
    
    # TODO Logic here for inserting user into mongo

    # Returning back to the frontend
    # Doesn't do anything yet in frontend
    return jsonify("User Registered on the Backend!")

# Runs the application
if __name__ == "__main__":
    # If theres any errors they'll pop up on the page
    app.run(debug=True) 