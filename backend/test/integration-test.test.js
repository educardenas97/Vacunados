const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../core/index.js').app; 

chai.use(chaiHttp);

describe('GET /', async () => {
    it('Should return status code 200', async () => {
        const res = await chai.request(app).get('/')
        chai.assert.equal(res.status, 200);
    }).timeout(20000);
    
    it('Should return a array - Search request', async () => {
        const res = await chai
            .request(app)
            .get('/search?nombre=Eduardo&apellido=Gomez&isFirstName=true&isLastName=true')
        chai.assert.isArray(res.body);
        chai.assert.equal(res.status, 200);
    }).timeout(20000);

    it('Should return a array - Cedula request', async () => {
        const res = await chai.request(app).get('/cedula?cedula=2368364')
        chai.assert.isNotEmpty(res.body);
        chai.assert.isArray(res.body);
        chai.assert.lengthOf(res.body, 2);
        chai.assert.equal(res.status, 200);
    }).timeout(20000);

});
