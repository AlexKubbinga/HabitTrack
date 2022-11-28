from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')

db = client['Oura']

users = db['users']
habits = db['habits']

print('TEST:', habits.find_one({'name': 'Magnesium'}))
