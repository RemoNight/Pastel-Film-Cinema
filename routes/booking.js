var express     = require('express'),
    router      = express.Router({mergeParams: true}),
    passport    = require('passport'),
    middleware = require('../middleware'),
    Showtime     = require('../models/showtime'),
    Booking     = require('../models/booking'),
    Movie      = require('../models/movie'),
    Cinema     = require('../models/cinema');

router.get('/:id', function(req, res){
    Showtime.findById(req.params.id, function(err, foundShowtime){
        if(err){
            console.log(err);
        } else {
            Cinema.findById(foundShowtime.cinema, function(err, foundCinemas){
                if(err){
                    console.log(err);
                } else {
                    Movie.findById(foundShowtime.movies, function(err, foundMovies){
                        if(err){
                            console.log(err);
                        } else {
                            res.render('booking/booking.ejs', {Showtime: foundShowtime, Cinemas: foundCinemas, Movies: foundMovies});
                        }
                    });
                }
            });
        }
    });
});

router.post('/:id', middleware.isLoggedIn, function(req, res){
    Showtime.findById(req.params.id, function(err, foundShowtime){
        if(err){
            console.log(err);
        } else {
            Booking.create(req.body.booking, function(err, booking){
                if(err){
                    console.log(err);
                } else {
                    booking.user.id = req.user._id;
                    booking.user.username = req.user.username;
                    booking.save();
                    foundShowtime.booking_ticket.push(booking);
                    foundShowtime.save();

                    if( req.body.A1 == 'y') {
                        bookingSeat('A1', booking._id);
                    }
                    if( req.body.A2 == 'y') {
                        bookingSeat('A2', booking._id);
                    }
                    if( req.body.A3 == 'y') {
                        bookingSeat('A3', booking._id);
                    }
                    if( req.body.A4 == 'y') {
                        bookingSeat('A4', booking._id);
                    }
                    if( req.body.B1 == 'y') {
                        bookingSeat('B1', booking._id);
                    }
                    if( req.body.B2 == 'y') {
                        bookingSeat('B2', booking._id);
                    }
                    if( req.body.B3 == 'y') {
                        bookingSeat('B3', booking._id);
                    }
                    if( req.body.B4 == 'y') {
                        bookingSeat('B4', booking._id);
                    }
                    if( req.body.C1 == 'y') {
                        bookingSeat('C1', booking._id);
                    }
                    if( req.body.C2 == 'y') {
                        bookingSeat('C2', booking._id);
                    }
                    if( req.body.C3 == 'y') {
                        bookingSeat('C3', booking._id);
                    }
                    if( req.body.C4 == 'y') {
                        bookingSeat('C4', booking._id);
                    }
                    if( req.body.D1 == 'y') {
                        bookingSeat('D1', booking._id);
                    }
                    if( req.body.D2 == 'y') {
                        bookingSeat('D2', booking._id);
                    }
                    if( req.body.D3 == 'y') {
                        bookingSeat('D3', booking._id);
                    }
                    if( req.body.D4 == 'y') {
                        bookingSeat('D4', booking._id);
                    }

                    res.redirect('/user/profile/' + req.user._id );
                    
                }
            });
        }
    });
    
    function bookingSeat(seat, booking) {
        Showtime.findByIdAndUpdate(req.params.id, { $pull: { seats: seat } }, function(err, foundShowtime){
            if(err){
                console.log(err);
            } else {
                Booking.findByIdAndUpdate(booking._id, { $push: { seats: seat } }, function(err, foundBooking) {
                    if(err){
                        console.log(err);
                    } else {
                        console.log('Reserve Seat : ' + seat);
                    }
                });
            }
        });
    }
});

module.exports = router;