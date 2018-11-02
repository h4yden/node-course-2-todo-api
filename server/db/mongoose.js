const mongoose = require('mongoose');

//Tell mongoose we want to use promoises
mongoose.Promise = global.Promise;

//mongoose takes care of the connection  - our code is simpler
mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true });

module.exports = {
    mongoose
}