var express     = require('express'),
    router      = express.Router({mergeParams: true}),
    passport    = require('passport'),
    middleware = require('../middleware'),
    Showtime     = require('../models/showtime'),
    Movie      = require('../models/movie'),
    Cinema     = require('../models/cinema'),
    User        = require('../models/user');


router.get('/:cid/:mid', function(req, res){
    Cinema.findById(req.params.cid, function(err, foundCinemas){
        if(err){
            console.log(err);
        } else {
            Movie.findById(req.params.mid, function(err, foundMovies){
                if(err){
                    console.log(err);
                } else {
                    res.render('booking/showtime.ejs', {Cinemas: foundCinemas, Movies: foundMovies});
                    
                }
            });
        }
    });
});


router.post('/:cid/:mid', function(req, res){
    Showtime.find({ date: req.body.showtime.date, time: req.body.showtime.time, cinema: req.params.cid, movies: req.params.mid }, function(err, result){
        if (err) {
            console.log(err);
        } else if ( !result.length ) {
            req.body.showtime.cinema  = req.params.cid;
            req.body.showtime.movies  = req.params.mid;
            Showtime.create(req.body.showtime, function(err, thisShowtime){
                if(err){
                    console.log(err);
                } else {
                    res.redirect('/booking/' + thisShowtime._id);
                }
            });
        } else {
            result.forEach(function(oldShowtime){
                res.redirect('/booking/' + oldShowtime._id);
            });
        }
    });
});

module.exports = router;