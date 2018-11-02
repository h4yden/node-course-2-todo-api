const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server'); // ./ relative path ../ is back a directory.
const {Listing} = require('./../models/listing');


const dummyListings = [{
    text: 'Listing 1'
},
{
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
