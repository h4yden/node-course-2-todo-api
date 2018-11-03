// npm exports
var express = require('express');
var bodyParser = require('body-parser');

// Local Imports
var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');//need to understand why destructured here
var {User} = require('./models/user');
var {Listing} = require('./models/listing');

// setup express app
var app = express();

//setup middleware that processes our body (into JSON)
app.use(bodyParser.json())

// ------------------POST LISTING--------------------------------------
// This is setting up a response to a POST request for the /listings api request. So when the server recieves a www.XXXXX.com/listings HTTP POST request (with some data in the request body) it will create a local variable and make the local variable equal to the data that was sent via the POST request.
app.post('/listings', (req,res) => {
    var listing = new Listing({
        text: req.body.text
    });

    //save the local variable to the database and then setup and send the 'res' variable back to the source of the HTTP POST request (this could be the verified data acceptance message or an error -  a status can also be sent in addition to the data - lots of options here)
    listing.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});


// ---------------GET LISTINGS--------------------------------------
// This is setting up a response to a request for the /listings api request. So when the server recieves a www.XXXXX.com/listings HTTP GET request it will send the data we decide should be returned for the /listings address.
app.get('/listings', async (req,res) => {
    try{
        const serverListings = await Listing.find();
        res.send({serverListings});
    }catch (e){
        res.status(400).send(`failed to get users due to error: ${e}`)
    }
});

// ---------------GET LISTING with Parameter --------------------------
// This is setting up a response to a request for the /listings api request. So when the server recieves a www.XXXXX.com/listings HTTP POST request (with some data in the request body) it will create a local variable and make the local variable equal to the data that was sent via the POST request.
app.get('/listings/:id', async (req,res) => {
   const id = req.params.id;
//    console.log('We have ID: ', id);
    //Valid using isValid
   if(!ObjectID.isValid(id)){
       //send 404 status if invalid
    //    console.log('invalid ID', ObjectID.isValid(id));
        return res.status(404).send();
   }
//    console.log('We are now past checking valid ID');
   //find listing by ID    
    try{
        let theListing = await Listing.findById(id);
        if(!theListing){
            // console.log('the listing is undefined so the id was valid but it didnt exist');    
            return res.status(404).send();
             }
         res.send({theListing});
        //  console.log('Should only get here if everything works well');
    }catch(e){
        res.status(400).send();
    }
});



//-------------Server Listen Port------------
app.listen(3000, () => {
    //console.log('Started on port 3000');
})

// toNotExist has been renamed in new expect toBeFalsy
//  toExist is now toBeTruthy
//  toBeA no longer exists so to replace we simply use a toBe and then use typeof
//  toNotBe() no longer exists. we can use not.toBe() (not. is used to reverse the method following it)
// Object.toMatchObject(partialObject)

module.exports = {app};