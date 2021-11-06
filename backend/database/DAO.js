const {db} = require('./DB.js');

exports.dao = class DAO {
    constructor(strConnectionString) {
        this.clusters = [];
        for (let i = 0; i < strConnectionString.length; i++) {
            this.clusters[i] = new db(strConnectionString[i], "vacunados", "vacunados");
        }
    }

    async connect() {
        for (let i = 0; i < this.clusters.length; i++) {
            try {
                await this.clusters[i].connect();
            } catch (error) {
                console.log(error);
                throw error;
            }
        }
        return await this.clusters[0].findOne();
    }

    async findDocument(cedula) {
        if (cedula < 2500000)
            //cluster 1
            return await this.clusters[0].findDocument(cedula);
        else if ((cedula >= 2500000) && (cedula < 4200000))
            //cluster 2
            return await this.clusters[1].findDocument(cedula);
        else if ((cedula >= 4200000) && (cedula < 5500000)) 
            //cluster 3
            return await this.clusters[2].findDocument(cedula);
        else if (cedula >= 5500000)
            //cluster 4
            return await this.clusters[3].findDocument(cedula);
    }

    async findDocuments(nombre, apellido) {
        let documents = [];
        for (let i = 0; i < this.clusters.length; i++){
            let result = await this.clusters[i].findDocuments(nombre, apellido);
            if (result.length > 0)
                result.forEach(element => {
                    documents.push(element);
                });
        }
        return documents;
    }
        
}
