const {dao} = require('../database/DAO');

exports.controller = class Controller {
    constructor() {
        this.dao = new dao([
            'mongodb+srv://admin:admin@cluster1.clwqv.mongodb.net/vacunados?retryWrites=true&w=majority',
            'mongodb+srv://cluster2:cluster2@cluster2.pehss.mongodb.net/vacunados?retryWrites=true&w=majority',
            'mongodb+srv://cluster3:cluster3@cluster3.p51yy.mongodb.net/vacunados?retryWrites=true&w=majority'
        ]);
    }

    async wakeUp() {
        try {
            return await this.dao.connect();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getDocument(cedula) {
        try {
            let ci = Number(cedula);
            return await this.dao.findDocument(ci);
        } catch (error) {
            console.error(error);
        }
    }

    async getDocuments(nombre, apellido, isFirstName=true, isLastName=true) {
        if (isFirstName && isLastName) {
            return await this.dao.findDocuments(
                '^' + nombre.upperCase(),
                '^' + apellido.upperCase()
                );
        }else if (isFirstName && !isLastName) {
            return await this.dao.findDocuments(
                '^' + nombre.upperCase(),
                apellido.upperCase()
            );
        }else if (!isFirstName && isLastName) {
            return await this.dao.findDocuments(
                nombre.upperCase(),
                '^' + apellido.upperCase()
            );
        } else {
            return await this.dao.findDocuments(
                nombre.upperCase(),
                apellido.upperCase()
            );
        }
    }
}