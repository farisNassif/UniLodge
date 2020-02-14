# ('PyMongo': Connects flask with mongo database)
from flask_pymongo import MongoClient

# MongoString generated on my https://cloud.mongodb.com account || https://prnt.sc/pgi59k - Explaination
cluster = MongoClient("mongodb+srv://Faris:loughrea@cluster0-dewud.mongodb.net/test?retryWrites=true&w=majority")
database = cluster["FinalProjectDatabase"]

def getUsers():
    users = database["Users"] # Referenced whenever inserting/deleting from the userscollection(table)
    return users

def getListings():
    listings = database["Listings"] # Referenced whenever inserting/deleting from the listings collection(table)
    return listings

