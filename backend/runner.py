import password_handler as p_h
# ('json': For json format, 'jsonify': Again for format 'request': For http requests, 'Flask': Main flask library)
from flask import Flask, request, jsonify, json, render_template
# ('PyMongo': Connects flask with mongo database)
from flask_pymongo import MongoClient
# ('ObjectId': Used to convert to MongoDB id format)
from bson.objectid import ObjectId
# ('CORS': Cross origin resource sharing; so we can access frontend with different urls)
from flask_cors import CORS

from functools import wraps
import jwt
import datetime

# from flask_jwt_extended import JWTManager
# from flask_jwt_extended import (create_access_token)
# from datetime import datetime

# MongoString generated on my https://cloud.mongodb.com account || https://prnt.sc/pgi59k - Explaination
cluster = MongoClient("mongodb+srv://Faris:loughrea@cluster0-dewud.mongodb.net/test?retryWrites=true&w=majority")
# Database may contain multiple collections (tables), eg 'Employees' table, 'Appointments' table etc
database = cluster["FinalProjectDatabase"]
# Referenced whenever inserting/deleting from the users collection(table)
users = database["Users"]

app = Flask(__name__)
app.config['SECRET_KEY'] = 'JustTesting'
CORS(app)

def check_for_token(func):
    @wraps(func)
    def wrapped(*args, **kwargs):
        token = request.args.get('token')
        if not token:
            return jsonify( {'message': 'Missing Token'} ), 403
        try: 
            data = jwt.decode(token, app.config['SECRET_KEY'])
        except:
            return jsonify( {'message': 'Invalid Token' } ), 403
        return func(*args, **kwargs)
    return wrapped

@app.route('/api/home', methods=['GET'])
def home():    
    # Message should appear in frontend 
    result = ('Hello World from runner.py - /api/welcomeMessage')
    # Sending off the message, for some reason doesn't work
    return jsonify(result)

@app.route('/api/register', methods=['POST'])
def reg():
    # The returned result (userLogin) is coming back as bytes, need to call .decode() to get the actual String
    userLogin = request.get_data().decode()
    # Data is coming back in the form of 'username_password', split the data from 'username_password' to 'username' and 'password'
    username_password = userLogin.split("_")
    # Username / Password setting
    username = username_password[0]
    password = p_h.generate_hash(username_password[1])

    # Print for testing
    print ("Username: " + username) # Print username
    print ("Password: " + password) # Print password

    # If username ends correctly (TODO At some point gotta change this to not just be '@gmit.ie')
    if ((username.endswith('@gmit.ie') or username.endswith('@nuig.ie') or "gti" in username or "gcc" in username) and (len(password) > 4)): 
        # Basically if theres already an email in mongo the same as what was just entered
        if users.find_one( {'Username':username} ):
            result = ("There is already an account associated with that email.")
        else:
            # Preparing data to be inserted into mongo, data will be inserted with this schema
            new_user = {"Username":username,"Password":password}
            try:        
                # Posting data stored above to mongo
                users.insert_one(new_user)
                result = ("Success! Added to database")
            # Error Handling
            except: 
                # If for some reason data couldn't be commit throw an error message
                result = ("There was an issue adding you to our database.")
    else: 
        result = ("Username must be associated with a College and Password must be 4+ characters")
    # password = request.get_json()['password']

    # Returning back to the frontend a String
    return jsonify(result)

@app.route('/api/login', methods=['POST'])
def login():
    # Similar stuff to the Register route
    # The returned result (userLogin) is coming back as bytes, need to call .decode() to get the actual String
    userLogin = request.get_data().decode()
    # Data is coming back in the form of 'username_password', split the data from 'username_password' to 'username' and 'password'
    username_password = userLogin.split("_")
    # Username / Password setting
    username = username_password[0]
    password = username_password[1]

    # Print for testing
    print ("Username: " + username) # Print username
    print ("Password: " + password) # Print password

    if users.find_one( {'Username': username } ):
        # Very painful way of retrieving password from mongo based on username given but it works as it is
        user_to_login_to_list = list(users.find( { 'Username': username } ))

        for i in user_to_login_to_list: # Will always only loop once, this is how it ended up working with retrieving a single value from mongo
            stored_hash = i["Password"] # Gets the value of "Password" from the user in mongo and stores the hash as stored_hash
        
        if (p_h.check_password(password, stored_hash)): # Return true if entered pw hash matches stored hash
            result = "true"
            token = jwt.encode ({
                'user': username,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=5)
            },
            app.config['SECRET_KEY'])
            print ({token.decode('utf-8')})
        else:
            result = "Invalid login"
    else:
        result = ("Username doesn't exist")
    return jsonify(result)

@app.route('/api/user/<string:Username>', methods=['GET'])
def list_user(Username):
    # Making userList equal to whatever is in the users table. So return Username/Password WITHOUT the _id
    user = list(users.find({"Username": Username}, {'_id': False}))

    # Return a single user (Username/Password)
    return jsonify(user)

@app.route('/api/users', methods=['GET'])
def list_users():
    # Making userList equal to whatever is in the users table. So return Username/Password WITHOUT the _id
    userList = list(users.find({}, {'_id': False}))
    # Send the list of users (more specifically a users Username+Password) to the frontend
    return jsonify(userList)

@app.route('/api/users/<string:Username>', methods=['DELETE'])
def delete_user(Username):
    # Username being the email, since it will be unique in the database it's pretty much the primary key for users
    try: 
        users.delete_one( {'Username': Username } )
        result = "User with Email: [" + Username + "] has been successfully removed."
    except:
        result = "There was an error deleting that user, try again."
    return jsonify(result)
        
@app.route('/api/users/update/<string:Username>', methods=['PUT'])
def update_user(Username):
    new_password = request.get_data().decode()
    # email_to_update = request.get_data().decode()
    email_to_update = Username
    try: 
        users.update_one({ "Username": email_to_update }, { "$set": { "Password": new_password } } )
        result = (email_to_update + " your password was successfully updated!")
    except: 
        result = ("There was an error updating " + email_to_update + ".")
    return jsonify(result)

@app.route('/api/users/add-image/<string:Username>', methods=['PUT'])
def add_image(Username):
    email_to_update = Username
    image_to_add = request.get_data().decode()
    try: 
        users.update_one({ "Username": email_to_update }, { "$set": { "Image": image_to_add } } )
        result = "Image successfully added"
    except:
        result = ("Image not added")
    return jsonify(result)

@app.route('/api/profile/<string:Username>', methods=['GET'])
@check_for_token
def user_profile(Username):
    new_password = request.get_data().decode()
    # email_to_update = request.get_data().decode()
    email_to_update = Username
    try: 
        users.update_one({ "Username": email_to_update }, { "$set": { "Password": new_password } } )
        result = (email_to_update + " your password was successfully updated!")
    except: 
        result = ("There was an error updating " + email_to_update + ".")
    return jsonify(result)

# Runs the application
if __name__ == "__main__":
    # Debug = True - If theres any errors they'll pop up on the page
    app.run(debug=True) 