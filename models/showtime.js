var mongoose = require('mongoose');

var showtimeSchema = new mongoose.Schema({
    date : String,
    time: String,
    theater: Number,
    seats: {
        type: [String],
        default: [ 'A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4' ],
    },
     
    cinema: String,
    movies: String,

    booking_ticket: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'booking'
        },
    ],
});

module.exports = mongoose.model('Showtime', showtimeSchema);