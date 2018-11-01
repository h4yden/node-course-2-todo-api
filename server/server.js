// npm exports
var express = require('express');
var bodyParser = require('body-parser');

// Local Imports
var {mongoose} = require('./db/mongoose');//need to understand why destructured here
var {User} = require('./models/user');
var {Listing} = require('./models/listing');

// setup express app
var app = express();

//setup middleware that processes our body (into JSON)
app.use(bodyParser.json())

// This is setting up a response to a request for the /listings api request
app.post('/listings', (req,res) => {
    var listing = new Listing({
        text: req.body.text
    });

    listing.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});



app.listen(3000, () => {
    console.log('Started on port 3000');
})


