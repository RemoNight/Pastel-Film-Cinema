var express     = require('express'),
    router      = express.Router(),
    User        = require('../models/user'),
    Movie       = require('../models/movie'),
    passport    =  require('passport');
    

router.get('/', function(req, res){
    Movie.find().sort({rating: -1}).limit(3).exec(function(err, rankMovies){
        if(err){
            console.log(err);
        } else {
            Movie.find({type: "showing"}, function(err, showingMovies){
                if(err){
                    console.log.apply(err);
                } else {
                    Movie.find({type: "coming"}, function(err, comingMovies){
                        if(err){
                            console.log(err);
                        } else {
                            res.render('index/home.ejs', { ranks: rankMovies, showing: showingMovies, coming: comingMovies});
                        }
                    });  
                }
            });
        }
    });
}); 



router.get('/movie', function(req, res){
    Movie.find({type: "showing"}, function(err, showingMovies){
        if(err){
            console.log(err);
        } else {
            Movie.find({type: "coming"}, function(err, comingMovies){
                if(err){
                    console.log(err);
                } else {
                    res.render('movies/index.ejs', {showing: showingMovies, coming: comingMovies, sort: 'All'});
                }
            });
        }
    });
});


router.get('/register', function(req, res){
    res.render('index/register.ejs');
});

router.post('/register', function(req, res){
    var newUser = new User({username: req.body.username, firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, myfav: req.body.myfav});
    User.register(newUser, req.body.password, function(err, user){
        if(err) {
            console.log(err);
            req.flash('error', err.message);
            return res.render('index/register');
        }
        passport.authenticate('local')(req, res, function(){
            req.flash('success', 'Welcome to PastelFilm' + user.username);
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res){
    res.render('index/login.ejs');
});

router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/',
        failureRedirect: '/login',
        successFlash: true,
        failureFlash: true,
        successFlash: 'Successfully log in',
        failureFlash: 'Invalid username or password'
    }), function(res, res){       
});

router.get('/profile', function(req, res){
    res.render('index/profile.ejs');
});

router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'Logged you out successfully');
    res.redirect('/');
});




module.exports = router;

