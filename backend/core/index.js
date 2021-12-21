let controller_class = require('./controller.js');
var express = require('express');
var app = express();
var PORT = 3000;
let controller

//Setting up the server
app.set('port', process.env.PORT || PORT);


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // website you wish to  allow to connet    
    res.setHeader('Access-Control-Allow-Origin','https://educardenas97.github.io');
    // request method you wish to allow
    res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTION, PUT, PATCH');
    // request headers you wish to allow 
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type,Authorization');   
    // set to true if you need the website to include  cookies  in the  request  sent 
    // to the API (eg. in case you can see sessions )
    res.setHeader('Access-Control-Allow-Credentials','false');
    // pass to the next layer of middleware
    next();
});

app.get('/', async (req, res) => {
    // Setting the response
    res.set({
        'Content-Type': 'application/json'
    });
    res.status(200)
    res.end();
});

// Without middleware
app.get('/cedula', async (req, res) => {
    res.set({
        'Content-Type': 'application/json'
    });
    const response = await controller.getDocument(req.query.cedula);
    res.status(200);
    res.json(response);
    res.end();
});


app.get('/search', async (req, res) => {
    res.set({
        'Content-Type': 'application/json'
    });
    
    const response = await controller.searchDocument(
        req.query.nombre, 
        req.query.apellido, 
        req.query.isFirstName === 'true' ? true : false, 
        req.query.isLastName === 'true' ? true : false
    );
    res.status(200);
    res.json(response);
    res.end();
})


app.listen(app.get('port'), async function(err){
    if (err) console.log(err);
    controller = new controller_class.controller();
    await controller.wakeUp();
    if (controller.isConnected === false) {
        console.log('Database is down');
    }
});

exports.app = app;