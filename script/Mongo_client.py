import pymongo


# Class to crud a MongoDB database
class MongoDB:
    def __init__(self, conn_str, database):
        self.conn_str = conn_str
        self.client_gen = pymongo.MongoClient(self.conn_str, serverSelectionTimeoutMS=5000)
        self.client = self.client_gen[database]

    def drop_all(self, collection):
        c = self.client[collection]
        drop_data = c.delete_many({})
        return drop_data.deleted_count

    def insert_many(self, collection, docs):
        return self.client[collection].insert_many(docs)

    def insert_one(self, collection, doc):
        return self.client[collection].insert_one(doc)

    def find_one(self, collection, query={}):
        return self.client[collection].find_one(query)

    def find(self, collection, query):
        return self.client[collection].find(query)

    def update(self, collection, query, update):
        return self.client[collection].update(query, update)

    def delete(self, collection, query):
        return self.client[collection].delete_one(query)

    def get_client(self):
        return self.client



