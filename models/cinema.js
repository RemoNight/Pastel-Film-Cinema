var mongoose = require('mongoose');

var cinemaSchema = new mongoose.Schema({
    name: String,
    area: String,
    tel: String,
    slogan: String,
    image: String,
    logo: String,
});

module.exports = mongoose.model('Cinema', cinemaSchema);