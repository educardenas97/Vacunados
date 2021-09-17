const {MongoClient} = require('mongodb');

exports.db = class DB {
    constructor(str, database, collection) {
        this.str = str;
        this.database = database;
        this.collection_name = collection;
    }

    async connect() {
        this.client = new MongoClient(this.str);
        await this.client.connect();
        this.collection = await this.client.db(this.database).collection(this.collection_name);
    }

    async findDocument(cedula) {
        let documents = this.collection.find({cedula: parseInt(cedula)})
            .project({_id: 0})
            .sort({fecha_aplicacion: 1})
            .toArray();
        return documents;
    }

    async findDocuments(nombre, apellido) {
        let documents = await this.collection.find({
                'nombre': {'$regex': nombre}, 
                'apellido': {'$regex': apellido}
            })
            .project({_id: 0})
            .sort({fecha_aplicacion: 1})
            .toArray();

        return documents;
    }

    async findOne() {
        return await this.collection.findOne({});
    }
}