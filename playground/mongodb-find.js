// const MongoClient = require('mongodb').MongoClient;
// const {MongoClient} = require('mongodb'); //identical above but uses destructuring.

 const {MongoClient, ObjectID} = require('mongodb'); //ObjectID is a function constructor for making ObjectIDs? Need to understand?

//  var user = {name: 'Greg', location: "WLG"};
//  var {name} = user; example of object destructuring

// var obj = new ObjectID(); How to call the ObjectID method
// console.log(obj);

//this is the url of the mongodb database (AWS firebase heroku etc.)
MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {
    if (error){
        return console.log('We were unable to connect to the db server');
    }
    console.log('Connected to MongoDB Server');
    const db = client.db('TodoApp');

//Generic find all docs in the Todos query    
    // db.collection('Todos').find().toArray().then((docs) => {
    //     console.log('Todos Collection');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (error) => {
    //     console.log('Unable to fetch Todos Collection', error);
    // });


//Query the collection with something more specific - find() can have a query input
    // db.collection('Todos').find({completed: true}).toArray().then((docs) => {
    //     console.log('Todos Collection');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (error) => {
    //     console.log('Unable to fetch Todos Collection', error);
    // });

//Query by _id. The ID is an 'objectID' type, not a string. Therefore we have to compare _id to a new ObjectID("5bda177c9bd5ac60a074d66b") as opposed to simply comparing to a string with the id characters

    // db.collection('Todos').find({
    //     _id: new ObjectID('5bda177c9bd5ac60a074d66b')}).toArray().then((docs) => {
    //     console.log('Todos Collection');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (error) => {
    //     console.log('Unable to fetch Todos Collection', error);
    // });

//Query the number of results - heaps of other options
    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos Count: ${count}`);
    //     //console.log(JSON.stringify(docs, undefined, 2));
    // }, (error) => {
    //     console.log('Unable to fetch Todos Collection', error);
    // });


// ----------------------------Challenge-------------------------
    // db.collection('Users').find({name: "Bob"}).toArray().then((docs) => {
    //     console.log('Users Collection');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (error) => {
    //     console.log('Unable to fetch Todos Collection', error);
    // });
    // Returns an array of users with name equal to XXX
// --------------------------------------------------------------------


    // client.close();
});

