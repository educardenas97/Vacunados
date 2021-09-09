import pandas as pd
import Mongo_client
import numpy as np
import gc

# Validate a schema (document)
def validate_squema(doc):
    document = {
        "nombre": doc['nombre'],
        "apellido": doc['apellido'],
        "cedula": int(doc['cedula']),
        "establecimiento": doc['establecimiento'],
        "fecha_aplicacion": pd.to_datetime(doc['fecha_aplicacion']),
        "dosis": int(doc['dosis']),
        "descripcion_vacuna": doc['descripcion_vacuna'],
        "actualizado_al": pd.to_datetime(doc['actualizado_al']),
    }
    return document


# Insert a document into a collection (MongoDB)
def insert_data(data, str, collection='vacunados'):
    documents = []
    c = 0
    mongo = Mongo_client.MongoDB(str, 'vacunados')
    for index, row in data.iterrows():
        try:
            documents.append(validate_squema(row))
        except Exception as e:
            insert_documents(documents, mongo, collection)
            documents.clear()
            c =+ 1
    
    print('Errors: {}'.format(c))
    

def insert_documents(documents, mongo, collection='vacunados'):
    # Insert documents
    try:
        # Insert data into MongoDB
        inserted = mongo.insert_many(collection, documents)
        print('Insert complete, count: {}'.format(len(inserted.inserted_ids)))
    except Exception as e:
        print(e)


def main(all):
    cluster1_str = 'mongodb+srv://admin:admin@cluster1.clwqv.mongodb.net/vacunados?retryWrites=true&w=majority'
    cluster2_str = 'mongodb+srv://cluster2:cluster2@cluster2.pehss.mongodb.net/vacunados?retryWrites=true&w=majority'
    cluster3_str = 'mongodb+srv://cluster3:cluster3@cluster3.p51yy.mongodb.net/vacunados?retryWrites=true&w=majority'


    # Drop no relevants columns
    mean_index = '3000000'
    filter = all[all['cedula'] != 'MENOR DE EDAD']
    del all
    gc.collect()
    
    # Seperate data into three collections
    cluster1_data = filter[filter['cedula'] < mean_index]
    #insert_data(cluster1_data, cluster1_str)
    print('Cluster 1: {}'.format(cluster1_data.shape))  
    del cluster1_data
    gc.collect()

    cluster2_data = filter[(filter['cedula'] >= mean_index) & (filter['cedula'] < '5000000')]
    #insert_data(cluster2_data, cluster2_str)
    print('Cluster 2: {}'.format(cluster2_data.shape))
    del cluster2_data
    gc.collect()
    
    cluster3_data = filter[filter['cedula'] >= '5000000']
    #insert_data(cluster3_data, cluster3_str)
    print('Cluster 3: {}'.format(cluster3_data.shape))
    del cluster3_data
    gc.collect()




main(pd.read_csv('./vacunados.csv', sep=';'))
