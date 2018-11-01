var mongoose = require('mongoose');
// in mongoose we make models for each type of document so that documents have a bit more order. Heaps of options to define what is expected - type is defined below 
var Listing = mongoose.model('Listing', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = {Listing};