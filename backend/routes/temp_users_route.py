# ('jsonify': For formatting 'request': For http requests, 'Flask': Main flask library)
from flask import Flask, request, jsonify
from flask import Blueprint

# Blueprint definition
temp_users_blueprint = Blueprint('temp_users_route', __name__)

# Local utility classes that loosely couples the program 
import utility.email_validation as ev
import utility.password_handler as p_h

# Local data class that defines all required database logic
import data.database_accessor as d_a

'''
    Depreciated Class, used during initial testing for user testing
'''

@temp_users_blueprint.route('/api/user/<string:Username>', methods=['GET'])
def list_user(Username):
    # Making userList equal to whatever is in the users table. So return Username/Password WITHOUT the _id
    user = list(d_a.Users().find({"Username": Username}, {'_id': False}))

    # Return a single user (Username/Password)
    return jsonify(user)

@temp_users_blueprint.route('/api/users', methods=['GET'])
def list_users():
    # Making userList equal to whatever is in the users table. So return Username/Password WITHOUT the _id
    userList = list(d_a.Users().find({}, {'_id': False}))
    # Send the list of users (more specifically a users Username+Password) to the frontend
    return jsonify(userList)

@temp_users_blueprint.route('/api/users/<string:Username>', methods=['DELETE'])
def delete_user(Username):
    # Username being the email, since it will be unique in the database it's pretty much the primary key for users
    try: 
        d_a.Users().delete_one( {'Username': Username } )
        result = "User with Email: [" + Username + "] has been successfully removed."
    except:
        result = "There was an error deleting that user, try again."
    return jsonify(result)
        
@temp_users_blueprint.route('/api/users/update/<string:Username>', methods=['PUT'])
def update_user(Username):
    new_password = request.get_data().decode()
    # email_to_update = request.get_data().decode()
    email_to_update = Username
    try: 
        d_a.Users().update_one({ "Username": email_to_update }, { "$set": { "Password": new_password } } )
        result = (email_to_update + " your password was successfully updated!")
    except: 
        result = ("There was an error updating " + email_to_update + ".")
    return jsonify(result)

@temp_users_blueprint.route('/api/users/add-image/<string:Username>', methods=['PUT'])
def add_image(Username):
    email_to_update = Username
    image_to_add = request.get_data().decode()
    try: 
        d_a.Users().update_one({ "Username": email_to_update }, { "$set": { "Image": image_to_add } } )
        result = "Image successfully added"
    except:
        result = ("Image not added")
    return jsonify(result)