let find = require('./database.js');
var express = require('express');
var app = express();
var PORT = 3000;

//Setting up the server
app.set('port', process.env.PORT || PORT);


app.use(function (req, res, next) {
    // website you wish to  allow to connet    
    res.setHeader('Access-Control-Allow-Origin','https://educardenas97.github.io');
    // request method you wish to allow
    res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTION, PUT, PATCH, DELETE');
    // request headers you wish to allow 
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type,Authorization');   
    // set to true if you need the website to include  cookies  in the  request  sent 
    // to the API (eg. in case you can see sessions )
    res.setHeader('Access-Control-Allow-Credentials','false');
    // pass to the next layer of middleware
    next();
});

// Without middleware
app.get('/cedula', async function(req, res){
    // Setting the response
    res.set({
        'Content-Type': 'application/json'
    });
    // Getting the data
    const response = await find.find(req.query.cedula, req.query.cedula < 3000000 ? 1 : 0);
    console.log(response);
    // Sending the response
    res.json(response);
    res.end();
});

// Loop
app.listen(app.get('port'), function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});