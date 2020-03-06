# ('PyMongo': Connects flask with mongo database)
from flask_pymongo import MongoClient

#To read from a file:
with open("mongo_uri.txt", "r") as uri:
    MONGO_URI = uri.read()

# MongoString generated on my https://cloud.mongodb.com account || https://prnt.sc/pgi59k - Explaination

# Cluster definition, whatever objects are within the cloud are stored in variable cluster
cluster = MongoClient(MONGO_URI)

# The data object we're using within the cluster is "FinalProjectDatabase", assigning it to a local variable
database = cluster["UniLodge"]

'''
Function that defines a users collection that contains all users within the MongoDB collection on the cloud

@returns a collection of users that may be manipulated
'''
def Users():
    users = database["Users"] # Referenced whenever inserting/deleting from the userscollection(table)
    return users

'''
Function that defines a listings collection that contains all listings within the MongoDB collection on the cloud

@returns a collection of listings that may be manipulated
'''
def Listings():
    listings = database["Listings"] # Referenced whenever inserting/deleting from the listings collection(table)
    return listings

'''
Function that defines a comments collection that contains all comments within the MongoDB collection on the cloud

@returns a collection of comments that may be manipulated
'''
def Comments():
    comments = database["Comments"] # Referenced whenever inserting/deleting from the comments collection(table)
    return comments



