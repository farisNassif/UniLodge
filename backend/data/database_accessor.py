# ('PyMongo': Connects flask with mongo database)
from flask_pymongo import MongoClient

# MongoString generated on my https://cloud.mongodb.com account || https://prnt.sc/pgi59k - Explaination

# Cluster definition, whatever objects are within the cloud are stored in variable cluster
cluster = MongoClient("mongodb+srv://Faris:loughrea@cluster0-dewud.mongodb.net/test?retryWrites=true&w=majority")

# The data object we're using within the cluster is "FinalProjectDatabase", assigning it to a local variable
database = cluster["FinalProjectDatabase"]

'''
Function that defines a users collection that contains all users within the MongoDB collection on the cloud

@returns a collection of users that may be manipulated
'''
def getUsers():
    users = database["Users"] # Referenced whenever inserting/deleting from the userscollection(table)
    return users

'''
Function that defines a listings collection that contains all listings within the MongoDB collection on the cloud

@returns a collection of listings that may be manipulated
'''
def getListings():
    listings = database["Listings"] # Referenced whenever inserting/deleting from the listings collection(table)
    return listings

