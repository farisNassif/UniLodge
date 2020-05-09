import os
# ('json': For json format, 'jsonify': Again for format 'request': For http requests, 'Flask': Main flask library)
from flask import Flask, request, jsonify, json, render_template
# ('CORS': Cross origin resource sharing; so we can access frontend with different urls)
from flask_cors import CORS

# Local utility class that that helps with decoupling the program
import utility.email_validation as ev
import utility.password_handler as p_h

# Local data class that defines all required database logic
import data.database_accessor as d_a

# Local blueprint classes that seperate and tidy different routes
from routes.login_route import login_blueprint 
from routes.register_route import register_blueprint
from routes.temp_users_route import temp_users_blueprint
from routes.listings_route import listings_blueprint

# Required for JWT token
from flask_jwt_extended import JWTManager

app = Flask(__name__)

# For the sake of collaboration and grading, secret key is hardcoded and not an environmental var
app.config['SECRET_KEY'] = '9GjnhWkzY9JxjWES2OD437VBfKqj7gwuztkkPS1Js2DtM2y0hixZ9IUiHUZ8Y8TFYSEjMeSSOR3OOuyxh6aPnP9xxp2gOAKwieOt'
# app.config.from_envvar('SECRET_KEY') # In CLI type: set SECRET_KEY=jwt_secret_key.env

CORS(app)
jwt = JWTManager(app)

'''
All routes required, seperated into their respective classes
'''
# Required blueprints for seperating routes into different files while still accessing them here
app.register_blueprint(login_blueprint) 
app.register_blueprint(register_blueprint)
app.register_blueprint(temp_users_blueprint)
app.register_blueprint(listings_blueprint)

# Runs the application
if __name__ == "__main__":
    # Debug = True - If theres any errors they'll pop up on the page
    app.run(debug=True) 