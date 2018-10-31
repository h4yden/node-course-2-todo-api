// const MongoClient = require('mongodb').MongoClient;
// const {MongoClient} = require('mongodb'); //identical above but uses destructuring.

 const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj); We can make our own Ids but best to leave to mongodb

//this is the url of the mongodb database (AWS firebase heroku etc.)
MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {
    if (error){
        return console.log('We were unable to connect to the db server');
    }
    console.log('Connected to MongoDB Server');
    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'something to do',
    //     completed: false
    // }, (error, result) => {
    //     if (error){
    //         return console.log('error when inserting Todo', error);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // })

    // New users collection by inserting a new doc (user instance) into into it  (name, age, location)

    // db.collection('Users').insertOne({ /*Insert Doc here */}, (err,res) => { /**Callback function that is returned when the new collection is installed. Here we get given an error and result argument that we can use to error check and check the result is what we expected */})

    // db.collection('Users').insertOne({ name: 'Bob', age: 34, location: 'AKL'}, (error,result) => {
    //     if (error){
    //         return console.log('error when inserting Todo', error);
    //         }
    //         console.log(JSON.stringify(result.ops, undefined, 2));
    //         console.log(result.ops[0]._id.getTimestamp());
    //  })


    client.close();
});

