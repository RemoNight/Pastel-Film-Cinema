var mongoose = require('mongoose');

var movieSchema = new mongoose.Schema({
    name: String,
    image: String,
    date: String,
    time: String,
    genre: String,
    actors: String,
    trailer: String,
    rating: Number,
    type: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

module.exports = mongoose.model('Movie', movieSchema);
// var newMovie = mongoose.model('Movie', movieSchema);
// const allmoives = newMovie

// .find({}, "name", function(err, movie) {
//     if (err) console.log(err);
//     console.log(movie);
//     }).sort([["name", 1],]);
    

