const {dao} = require('../database/DAO');

exports.controller = class Controller {
    constructor() {
        this.dao = new dao([
            'mongodb+srv://admin:admin@cluster1.clwqv.mongodb.net/vacunados?retryWrites=true&w=majority',
            'mongodb+srv://cluster2:cluster2@cluster2.pehss.mongodb.net/vacunados?retryWrites=true&w=majority',
            'mongodb+srv://cluster3:cluster3@cluster3.p51yy.mongodb.net/vacunados?retryWrites=true&w=majority',
            'mongodb+srv://cluster4:LXHs2fCvsvAWYBqm@cluster4.veqxo.mongodb.net/vacunados?retryWrites=true&w=majority'
        ]);
    }


    /**
    * @param none
    * @returns {Promise|Array}
    */
    async wakeUp() {
        try {
            return await this.dao.connect();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    /**
     * @param {number} id
     * @returns {Promise|Array}
     * @throws {Error}
    */
    async getDocument(id) {
        try {
            let ci = Number(id);
            return await this.dao.findDocument(ci);
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    
    /**
     * @param {string} name
     * @param {string} lastName
     * @param {boolean} isFirstName
     * @param {boolean} isLastName
     * @returns {Promise|Array}
    */
    async searchDocument(name, lastName, isFirstName=true, isLastName=true) {
        if (isFirstName && isLastName) {
            return await this.dao.findDocuments(
                '^' + name.toUpperCase(),
                '^' + lastName.toUpperCase()
                );
        }else if (isFirstName && !isLastName) {
            return await this.dao.findDocuments(
                '^' + name.toUpperCase(),
                lastName.toUpperCase()
            );
        }else if (!isFirstName && isLastName) {
            return await this.dao.findDocuments(
                name.toUpperCase(),
                '^' + lastName.toUpperCase()
            );
        } else {
            return await this.dao.findDocuments(
                name.toUpperCase(),
                lastName.toUpperCase()
            );
        }
    }
}