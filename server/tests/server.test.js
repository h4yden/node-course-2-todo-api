const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server'); // ./ relative path ../ is back a directory.
const {Listing} = require('./../models/listing');


// This clears the database (testing lifecycle method) before the test cases
beforeEach((done) => {
    Listing.deleteMany({}).then(() => {
        done();
    });
});

describe('POST /listings', () => {
    
    
    // it('should create a new listing', (done) => {
    //     var text = 'Test listings text';

    //     request(app)
    //     .post('/listings')
    //     .send({
    //         text: text
    //     })
    //     .expect(200)
    //     .expect((res) => {
    //         expect(res.body.text).toBe(text);
    //     })
    //     .end((err, res) => {
    //         if(err){
    //             return done(err);
    //         }
    //         Listing.find().then((listings) => {
    //             expect(listings.length).toBe(1);
    //             expect(listings[0].text).toBe(text);
    //             done();
    //         }).catch((e) => done(e))
    //     });
    // })
    
     it('should not create a listing with bad data', function (done) {
        let text = '';

        request(app)
        .post('/listings')
        .send({text})
        .expect(400)
        .expect((res) => {
            expect(res.body.text).toBe(undefined);
            //console.log(res.body.text);
        })
        .end((err, res) => {
            if(err){
                return done(err);
            }
            done();
        })
        
    })
});