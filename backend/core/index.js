let controller_class = require('./controller.js');
var express = require('express');
var app = express();
var PORT = 3000;
let controller = new controller_class.controller();

//Setting up the server
app.set('port', process.env.PORT || PORT);


app.use(function (req, res, next) {
    // website you wish to  allow to connet    
    res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:5500');
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

app.get('/wakeUp', async (req, res) => {
    // Setting the response
    res.set({
        'Content-Type': 'application/json'
    });

    const response = await controller.wakeUp();
    res.json(response);
    res.end();
});

// Without middleware
app.get('/cedula', async (req, res) => {
    // Setting the response
    res.set({
        'Content-Type': 'application/json'
    });

    const response = await controller.getDocument(req.query.cedula);
    // Sending the response
    res.json(response);
    res.end();
});

app.get('/search', async (req, res) => {
    // Setting the response
    res.set({
        'Content-Type': 'application/json'
    });

    console.log(req.query);

    const response = await controller.searchDocument(
        req.query.nombre, 
        req.query.apellido, 
        req.query.isFirstName === 'true', 
        req.query.isLastName === 'true'
    );
    console.log(response.length);
    // Sending the response
    res.json(response);
    res.end();
})

// Loop
app.listen(app.get('port'), function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});