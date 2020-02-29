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
    price_to_modify = listing_data['Price'] # Price needs to be sent in not as a String for search query
   
    try: 
        # Posting data stored above to mongo
        d_a.getListings().insert_one(listing_data) # Sticking direct json data into database from frontend
        d_a.getListings().update_one({'Unique_Id': listing_data['Unique_Id']}, {"$set": {"Price" : float(price_to_modify)} })
        result = ("Success! Added to database")
    except:
        result = ("Some error thrown")
    
    return jsonify(result)

# Get Listings
@listings_blueprint.route('/api/listings', methods=['GET'])
def list_listings():
    # Making userList equal to whatever is in the users table. So return Username/Password WITHOUT the _id
    userList = list(d_a.getListings().find({}, {'_id': False}))
    # Send the list of users (more specifically a users Username+Password) to the frontend
    return jsonify(userList)

# Get a single listing based on an ID
@listings_blueprint.route('/api/listings-id/<string:Unique_ID>', methods=['GET'])
def get_listing_by_id(Unique_ID):
    temp = request.get_data().decode() # Ignore this, something needs to store decoded data or flask whines

    # Returning a single user but it's still more efficient to return as a list (Makes angular happy)
    userList = list(d_a.getListings().find({'Unique_Id': Unique_ID}, {'_id': False}))
   
    # Return the Listing with the associated ID
    return jsonify(userList)

# Get Listing information for a specific user
@listings_blueprint.route('/api/listings/<string:Username>', methods=['GET'])
def list_user_listings(Username):
    temp = request.get_data().decode() # Ignore this, something needs to store decoded data or flask whines

    # Getting the listings made by the user who's profile has just been accessed
    userList = list(d_a.getListings().find({'Seller': Username}, {'_id': False}))
    
    # Return only the listings made by this user
    return jsonify(userList)

# Get Listing information for a specific location
@listings_blueprint.route('/api/listings-query/<string:Query>', methods=['GET', 'POST'])
def list_listings_by_location(Query):
    temp = request.get_data().decode() # Ignore this, something needs to store decoded data or flask whines

    query_data = json.loads(temp)
    print(query_data['minVal'])
    print(query_data['maxVal'])
    print(query_data['location'])
    # Getting the listings associated with a single location
    listingList = list(d_a.getListings().find({'Location': query_data['location'], 'Price': {"$gt": query_data['minVal'], "$lt": query_data['maxVal']} }, {'_id': False}))
    print(listingList)
    # Return only the listings associated with the location
    return jsonify(listingList)