# ('jsonify': For formatting 'request': For http requests, 'Flask': Main flask library)
from flask import Flask, request, jsonify, json
from flask import Blueprint

# Blueprint definition
listings_blueprint = Blueprint('listings_route', __name__,)

# Local utility classes that loosely couples the program 
import utility.email_validation as ev
import utility.password_handler as p_h

# Local data class that defines all required database logic
import data.database_accessor as d_a

@listings_blueprint.route('/api/new-listing/<string:Username>', methods=['POST'])
def new_listing(Username):
    listing_data = json.loads(request.get_data().decode()) # Using json module convert to json
    try: 
        # Posting data stored above to mongo
        d_a.getListings().insert_one(listing_data) # Sticking direct json data into database from frontend
        result = ("Success! Added to database")
    except:
        result = ("Some error thrown")

    return jsonify("result")