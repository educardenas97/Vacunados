class Api {
    constructor(url) {
        this.url = url;
    }

    async request(url, data, method='GET') {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        //Request options for the API
        let requestOptions = {
            method: method,
            headers: myHeaders,
            redirect: 'follow'
        };        

        //Request the data from the API
        let res = await fetch(this.url + url + '?' + new URLSearchParams(data, requestOptions));
        let json = await res.json();
        return json;
    }
}


export class VacunadosApi extends Api {
    constructor(url) {
        super(url);
        this.isConnected = false;
    }

    async wakeUp() {
        try {
            let res = await super.request('wakeUp');
            this.isConnected = true;
            return res;
        } catch (error) {
            this.isConnected = false;
            throw error;            
        }
    }

    async getDocument(id) {
        try {
            let res = await super.request('cedula', {cedula: id});
            return res;
        } catch (error) {
            this.isConnected = false;
            throw error;
        }
    }

    async searchDocuments(data) {
        try {
            let res = await super.request('search', data);
            return res;
        } catch (error) {
            this.isConnected = false;
            throw error;
        }
    }
}