const {dao} = require('../database/DAO');

exports.controller = class Controller {
    constructor() {
        this.dao = new dao(['mongodb://localhost:27017/']);
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