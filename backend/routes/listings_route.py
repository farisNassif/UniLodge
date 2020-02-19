# ('jsonify': For formatting 'request': For http requests, 'Flask': Main flask library)
from flask import Flask, request, jsonify, json
from flask import Blueprint
# Required for authorizing routes with JWT token
from flask_jwt_extended import jwt_required, get_jwt_identity

# Blueprint definition
listings_blueprint = Blueprint('listings_route', __name__)

# Local utility classes that loosely couples the program 
import utility.email_validation as ev
import utility.password_handler as p_h

# Local data class that defines all required database logic
import data.database_accessor as d_a

# Create a new Listing
@listings_blueprint.route('/api/new-listing/<string:Username>', methods=['POST'])
def new_listing(Username):
    Username = get_jwt_identity()
    listing_data = json.loads(request.get_data().decode()) # Using json module convert to json
    try: 
        # Posting data stored above to mongo
        d_a.getListings().insert_one(listing_data) # Sticking direct json data into database from frontend
        result = ("Success! Added to database")
    except:
        result = ("Some error thrown")
    
    return jsonify("result")

# Get Listings
@listings_blueprint.route('/api/listings', methods=['GET'])
def list_listings():
    # Making userList equal to whatever is in the users table. So return Username/Password WITHOUT the _id
    userList = list(d_a.getListings().find({}, {'_id': False}))
    # Send the list of users (more specifically a users Username+Password) to the frontend
    return jsonify(userList)

# Get Listing information for a specific user
@listings_blueprint.route('/api/listings/<string:Username>', methods=['GET'])
def list_user_listings(Username):
    temp = request.get_data().decode()
    # Getting the listings made by the user who's profile has just been accessed
    userList = list(d_a.getListings().find({'Seller': Username}, {'_id': False}))

    # Just checking to see if the amount of listings was correct
    amt = 0
    for listing in userList:
        amt = amt + 1
        
    print("listings for " + Username + ": " + str(amt))
    # Return only the listings made by this user
    
    return jsonify(userList)