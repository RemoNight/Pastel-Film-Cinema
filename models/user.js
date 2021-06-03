var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    password: String,
    confirmpassword: String,
    likes : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Liked',
            autopopulate: true
        }
    ],
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('User', UserSchema);