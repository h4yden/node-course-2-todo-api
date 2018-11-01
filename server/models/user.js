var mongoose = require('mongoose');
// in mongoose we make models for each type of document so that documents have a bit more order. Heaps of options to define what is expected - type is defined below 
var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

module.exports = {User};