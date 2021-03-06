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
    location: String,
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

    

