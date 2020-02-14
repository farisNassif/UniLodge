# ('jsonify': For formatting 'request': For http requests, 'Flask': Main flask library)
from flask import Flask, request, jsonify
from flask import Blueprint

# Blueprint definition
register_blueprint = Blueprint('register_route', __name__,)

# Local utility classes that loosely couples the program 
import utility.email_validation as ev
import utility.password_handler as p_h

# Local data class that defines all required database logic
import data.database_accessor as d_a

@register_blueprint.route('/api/register', methods=['POST'])
def reg():
    # The returned result (userLogin) is coming back as bytes, need to call .decode() to get the actual String
    userLogin = request.get_data().decode()
    # Data is coming back in the form of 'username_password', split the data from 'username_password' to 'username' and 'password'
    username_password = userLogin.split("_")
    # Username / Password setting
    username = username_password[0]
    password = p_h.generate_hash(username_password[1])

    # If username ends correctly (TODO At some point gotta change this to not just be '@gmit.ie')
    if (ev.check_email(username)) and (len(password) > 4): 
        # Basically if theres already an email in mongo the same as what was just entered
        if d_a.getUsers().find_one( {'Username':username} ):
            result = ("There is already an account associated with that email.")
        else:
            # Preparing data to be inserted into mongo, data will be inserted with this schema
            new_user = {"Username":username,"Password":password}
            try:        
                # Posting data stored above to mongo
                d_a.getUsers().insert_one(new_user)
                result = ("Success! Added to database")
            # Error Handling
            except: 
                # If for some reason data couldn't be commit throw an error message
                result = ("There was an issue adding you to our database.")
    else: 
        result = ("Username must be associated with a College and Password must be 4+ characters")
        
    # Returning back to the frontend a String
    return jsonify(result)