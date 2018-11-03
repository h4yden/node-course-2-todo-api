const expect = require('expect');
const request = require('supertest');
var {ObjectID} = require('mongodb');

const {app} = require('./../server'); // ./ relative path ../ is back a directory.
const {Listing} = require('./../models/listing');


const dummyListings = [{
    _id: new ObjectID(),
    text: 'Listing 1'
},
{   
    _id: new ObjectID(),
    text: 'Listing 2'
}]


// This clears the database (testing lifecycle method) before the test cases
beforeEach( async() => {
    await Listing.deleteMany({});
    await Listing.insertMany(dummyListings);
});

// decribe each request case
describe('POST /listings', () => {
    
    it('should create a new listing', (done) => {
        var text = 'Test listings text';

        request(app)
        .post('/listings')
        .send({
            text: text
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if(err){
                return done(err);
            }
            Listing.find({text}).then((listings) => {
                expect(listings.length).toBe(1);
                expect(listings[0].text).toBe(text);
                done();
            }).catch((e) => done(e))
        });
    })
    
     it('should not create a listing with bad data', function (done) {
        request(app)
        .post('/listings')
        .send({text: ''})
        .expect(400)
        .expect((res) => {
            expect(res.body.text).toBe(undefined);
            //console.log(res.body.text);
        })
        .end((err, res) => {
            if(err){
                return done(err);
            }
            Listing.find().then( function(listings){
                expect(listings.length).toBe(2);
                done();
            }).catch((e) => {
                done(e)
            })
        })
        
    })
});

// --------------TEST SUITE for GET /listings request--------
describe('GET /listings', () => { //just a title for the test suite
    //GET request test.
    it('should return all listings', async () => { //name for a test in the test suite
        await request(app)
        .get('/listings') //this defines the actual api call
        .expect(200) //expect a success status
        .expect((res) => { //custom expect test function
            expect(res.body.serverListings.length).toBe(2);
        })
    });
});

// --------------TEST SUITE for GET /listings/:id request--------
describe('GET /listings/:id', () => { //just a title for the test suite
    //GET request test.
    it('should get the requested listing', async () => { //name for a test in the test suite.
        await request(app)
        .get(`/listings/${dummyListings[0]._id}`) //this defines the actual api call
        .expect(200) //expect a success status
        .expect((res) => { //custom expect test function
            //console.log(`TEST BODY:${JSON.stringify(res)}`);
            expect(res.body.theListing.text).toBe(dummyListings[0].text);
        })
    });

    it('should return 404 if listing not found', async() => {
        const hexId = new ObjectID().toHexString();
        
        await request(app)
        .get(`/listings/${hexId}`)
        .expect(404)        
    });

    it('should return 404 for non-object ids', async() => {
        await request(app)
        .get(`/listings/sfkgjbsdjkfb`)
        .expect(404) 
    });

    // it('should return 404 if listing not found', (done) => {
    //     request(app)
    //     .get(`/listings/5bdce3f27355960c5cc629fa`)
    //     .expect(404)
    //     .end(done);        
    // });

    // it('should return 404 for non-object ids', (done) => {
    //     request(app)
    //     .get(`/listings/sfkgjbsdjkfb`)
    //     .expect(404) 
    //     .end(done);
    // });
});
