# ('json': For json format, 'jsonify': Again for format 'request': For http requests, 'Flask': Main flask library)
from flask import Flask, request, jsonify, json, render_template
# ('PyMongo': Connects flask with mongo database)
from flask_pymongo import MongoClient
# ('ObjectId': Used to convert to MongoDB id format)
from bson.objectid import ObjectId
# ('CORS': Cross origin resource sharing; so we can access frontend with different urls)
from flask_cors import CORS
from flask import Blueprint

home_blueprint = Blueprint('home', __name__,)
# Local utility classes that loosely couples the program 
import utility.email_validation as ev
import utility.password_handler as p_h
import data.database_accessor as d_a
app = Flask(__name__)
CORS(app)

@home_blueprint.route('/api/login', methods=['POST'])
def login():
    # Similar stuff to the Register route
    # The returned result (userLogin) is coming back as bytes, need to call .decode() to get the actual String
    userLogin = request.get_data().decode()
    # Data is coming back in the form of 'username_password', split the data from 'username_password' to 'username' and 'password'
    username_password = userLogin.split("_")
    # Username / Password setting
    username = username_password[0]
    password = username_password[1]

    if d_a.getUsers().find_one( {'Username': username } ):
        # Very painful way of retrieving password from mongo based on username given but it works as it is
        user_to_login_to_list = list(d_a.getUsers().find( { 'Username': username } ))

        for i in user_to_login_to_list: # Will always only loop once, this is how it ended up working with retrieving a single value from mongo
            stored_hash = i["Password"] # Gets the value of "Password" from the user in mongo and stores the hash as stored_hash
        
        if (p_h.check_password(password, stored_hash)): # Return true if entered pw hash matches stored hash
            result = "Return web token here in future"
        else:
            result = "Invalid login"
    else:
        result = ("Invalid login")
    return jsonify(result)