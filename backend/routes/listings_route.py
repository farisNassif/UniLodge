# ('jsonify': For formatting 'request': For http requests, 'Flask': Main flask library)
from flask import Flask, request, jsonify, json
from flask import Blueprint
# Required for authorizing routes with JWT token
from flask_jwt_extended import jwt_required, get_jwt_identity
# Gets the timestamp for posted comments
from datetime import datetime

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
        d_a.Listings().insert_one(listing_data) # Sticking direct json data into database from frontend
        d_a.Listings().update_one({'Unique_Id': listing_data['Unique_Id']}, {"$set": {"Price" : float(price_to_modify)} })
        result = ("Success! Added to database")
    except:
        result = ("Error: Could not add your Listing")
    
    return jsonify(result)

# Get Listings
@listings_blueprint.route('/api/listings', methods=['GET'])
def list_listings():
    # Making listings equal to whatever is in the listings database
    listings = list(d_a.Listings().find({}, {'_id': False}))
    
    # Send the list of listings to the frontend
    return jsonify(listings)

# Get a single listing based on an ID
@listings_blueprint.route('/api/listings-id/<string:Unique_ID>', methods=['GET'])
def get_listing_by_id(Unique_ID):
    temp = request.get_data().decode() # Ignore this, something needs to store decoded data or flask whines

    # Returning a single listing but it's still more efficient to return as a list (Makes angular happy)
    listing = list(d_a.Listings().find({'Unique_Id': Unique_ID}, {'_id': False}))
   
    # Return the Listing with the associated ID
    return jsonify(listing)

# Get Listing information for a specific user
@listings_blueprint.route('/api/listings/<string:Username>', methods=['GET'])
def list_user_listings(Username):
    temp = request.get_data().decode() # Ignore this, something needs to store decoded data or flask whines

    # Getting the listings made by the user who's profile has just been accessed
    specificListing = list(d_a.Listings().find({'Seller': Username}, {'_id': False}))
    
    # Return only the listings made by this user
    return jsonify(specificListing)

# Delete Listing by ID
@listings_blueprint.route('/api/listings/remove/<string:Unique_Id>', methods=['DELETE'])
def delete_listing(Unique_Id):
    temp = request.get_data().decode() # Ignore this, something needs to store decoded data or flask whines
    try: 
        d_a.Listings().delete_one({'Unique_Id': Unique_Id })
        result = "Success"
    except:
        result = "Failed to remove"
    return jsonify(result)

# Get Listing information for a specific location
@listings_blueprint.route('/api/listings-query/<string:Query>', methods=['GET', 'POST'])
def list_listings_by_location(Query):
    temp = request.get_data().decode() # Ignore this, something needs to store decoded data or flask whines

    query_data = json.loads(temp)

    if "location" in query_data:
        if query_data['location']:
            listingList = list(d_a.Listings().find({'Location': query_data['location'], 'Price': {"$gt": query_data['minVal'], "$lt": query_data['maxVal']} }, {'_id': False}))
        else:
            listingList = list(d_a.Listings().find({'Price': {"$gt": query_data['minVal'], "$lt": query_data['maxVal']} }, {'_id': False}))

    else:
        listingList = list(d_a.Listings().find({'Price': {"$gt": query_data['minVal'], "$lt": query_data['maxVal']} }, {'_id': False}))

    # Return only the listings associated with the location
    return jsonify(listingList)

# Get all comments associated with a specific Listings ID
@listings_blueprint.route('/api/listings-id/<string:Unique_ID>/comments', methods=['GET'])
def listings_comments(Unique_ID):
    temp = request.get_data().decode() # Ignore this, something needs to store decoded even if its blank data or flask whines

    # Returning a single listing but it's still more efficient to return as a list (Makes angular happy)
    comments = list(d_a.Comments().find({'Unique_Id': Unique_ID}, {'_id': False}))
   
    # Return the Listing with the associated ID
    return jsonify(comments)

# Create a new comment
@listings_blueprint.route('/api/listings-id/new-comment', methods=['POST'])
def new_comment():
    now = datetime.now() # Init datetime
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S") # Getting the current datetime the comment was posted at
    comment_data = json.loads(request.get_data().decode()) # Using json module convert to json
    
    try: 
        # Sending comment data into mongo
        d_a.Comments().insert_one(comment_data)
        d_a.Comments().update_one({'Comment_ID': comment_data['Comment_ID']}, {"$set": {"Timestamp": dt_string} })
        result = ("Success!")
    except:
        result = ("Error: Comment couldn't be posted")
    
    return jsonify(result)

# Get Comments for a Listing
@listings_blueprint.route('/api/listings-id/comments/<string:Listing_ID>', methods=['GET'])
def get_comments(Listing_ID):
    # Find all comments for a Listing
    comments = list(d_a.Comments().find({'Listing_ID': Listing_ID}, {'_id': False}))

    # Send the list of comments to the frontend
    return jsonify(comments)

# Deletes a Comment
@listings_blueprint.route('/api/listings-id/remove-comment/<string:Comment_ID>', methods=['DELETE'])
def delete_comment(Comment_ID):
    try: 
        d_a.Comments().delete_one({'Comment_ID': Comment_ID })
        result = "Success"
    except:
        result = "Failed to remove"
    return jsonify(result)

    