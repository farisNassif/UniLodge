# ('jsonify': For formatting 'request': For http requests, 'Flask': Main flask library)
from flask import Flask, request, jsonify
from flask import Blueprint

# Required imports for JWT token generation
import datetime
from flask import Response, request
from flask_jwt_extended import create_access_token, JWTManager

# Local utility classes that loosely couples the program 
import utility.email_validation as ev
import utility.password_handler as p_h

# Local data class that defines all required database logic
import data.database_accessor as d_a

# Blueprint definition
login_blueprint = Blueprint('login_route', __name__)

@login_blueprint.route('/api/login', methods=['POST'])
def login():
    # Similar stuff to the Register route
    # The returned result (userLogin) is coming back as bytes, need to call .decode() to get the actual String
    userLogin = request.get_data().decode()
    # Data is coming back in the form of 'username_password', split the data from 'username_password' to 'username' and 'password'
    username_password = userLogin.split("_")
    # Username / Password setting
    username = username_password[0]
    password = username_password[1]

    if d_a.Users().find_one( {'Username': username } ):
        # Very painful way of retrieving password from mongo based on username given but it works as it is
        user_to_login_to_list = list(d_a.Users().find( { 'Username': username } ))

        for i in user_to_login_to_list: # Will always only loop once, this is how it ended up working with retrieving a single attribute value from mongo
            stored_hash = i["Password"] # Gets the value of "Password" from the user in mongo and stores the hash as stored_hash
        
        if (p_h.check_password(password, stored_hash)): # Return true if entered pw hash matches stored hash
            # Assign the JWT web token to the result, map the identiy to the Username and set it to expire in 25 minutes
            result = create_access_token(identity=str(username), expires_delta=(datetime.timedelta(minutes=25)))
        else:
            result = "Invalid login"
    else:
        result = "Invalid login"
    return jsonify(result)