var express = require('express'),
    router  = express.Router(),
    Movie  = require('../models/movie'),
    User    = require('../models/user'),
    Liked   = require('../models/liked');


// router.get('/', function(req, res){
//     Movie.find({}, function(err, allMovies){
//         if(err){
//             console.log(err);
//         } else {
//             res.render('movies/index.ejs', {movie: allMovies});
//         }
//     });
// });


router.post('/', isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var date = req.body.date;
    var time = req.body.time;
    var actors = req.body.actor;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newMovie = {name:name, image:image, date: date, author: author};
    Movie.create(newMovie, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect('/movie');
        }
    });
});

// add new movie

router.get('/new', isLoggedIn, function(req,res){
    res.render('movies/new.ejs');
});


// comments

router.get("/:id", function(req, res){
    Movie.findById(req.params.id).populate('comments').exec(function(err, foundMovie){
        if(err){
            console.log(err);
        } else {
            res.render("movies/show.ejs", {movie: foundMovie});
        }
    });
});


// sorting genre

router.get('/genre-showing/:genre', function(req, res){
    Movie.find({type: 'coming'}, function(err, found_comingMovie){
        if(err){
            console.log(err);
        } else {
            Movie.find({type: 'showing', genre: new RegExp(req.params.genre, 'i')}, function(err, found_showingMovie){
                if(err){
                    console.log(err); 
                } else {
                    res.render('movies/index.ejs', {coming: found_comingMovie, showing: found_showingMovie, sort: req.params.genre});
                }
            });
        }
    });
});

router.get('/genre-coming/:genre', function(req, res){
    Movie.find({type: 'coming', genre: new RegExp(req.params.genre, 'i')}, function(err, found_comingMovie){
        if(err){
            console.log(err);
        } else {
            Movie.find({type: 'showing'}, function(err, found_showingMovie){
                if(err){
                    console.log(err); 
                } else {
                    res.render('movies/index.ejs', {coming: found_comingMovie, showing: found_showingMovie, sort: req.params.genre});
                }
            });
        }
    });
});

// router.get('/genre-coming/:genre', function(req, res){
//     Movie.find({type: 'showing', genre: new RegExp(req.params.genre, 'i')}, function(err, found_showingMovie){
//         if(err){
//             console.log(err);
//         } else {
//             Movie.find({type: 'coming', genre: new RegExp(req.params.genre, 'i')}, function(err, found_comingMovie){
//                 if(err){
//                     console.log(err); 
//                 } else {
//                     res.render('movies/index.ejs', {coming: found_comingMovie, showing: found_showingMovie, sort: req.params.genre});
//                 }
//             });
//         }
//     });
// });

// router.get('/genre-showing/:genre', function(req, res){
//     Movie.find({genre: new RegExp(req.params.genre, 'i')}, function(err, found_showingMovie){
//         if(err){
//             console.log(err); 
//         } else {
//             res.render('movies/index.ejs', {showing: found_showingMovie, sort: req.params.genre});
//         }
//     });
// });

// router.get('/genre-coming/:genre', function(req, res){
//     Movie.find({genre: new RegExp(req.params.genre, 'i')}, function(err, found_comingMovie){
//         if(err){
//             console.log(err); 
//         } else {
//             res.render('movies/index.ejs', {coming: found_comingMovie, sort: req.params.genre});
//         }
//     });
// });





// search movie

router.post('/search-movie',function(req,res){
    console.log("Trying to search movie... " + req.body.search);
    var name = req.body.search;
    res.redirect('/movie/search-movie/' + name);
});

router.get('/search-movie/:name', function(req,res){
    Movie.find({name: new RegExp(req.params.name, 'i')}, function(err, found_showingMovie){
        if(err){
            console.log(err);
        } else {
            Movie.find({name: new RegExp(req.params.name, 'i')}, function(err, found_comingMovie){
                if(err) {
                    console.log(err);
                } else {
                    res.render('movies/index.ejs', {showing: found_showingMovie, coming: found_comingMovie, sort: "All"});
                }
            });
            
        }
    });
});

// liked

router.post('/:id/like', isLoggedIn, function(req, res){
    User.findById(req.user._id, function(err, foundUsers){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            Liked.create({}, function(err, like){
                if(err){
                    console.log(err);
                } else {
                    Movie.findById(req.params.id, function(err, foundMovie){
                        if(err){
                            console.log(err);
                        } else {
                            like.movies.id      = req.params.id;
                            like.movies.image   = foundMovie.image;
                            like.movies.name    = foundMovie.name;
                            like.save();
                            foundUsers.likes.push(like);
                            foundUsers.save();
                            res.redirect('back');
                        }
                    });
                }
            });
        }
    });
});

router.post('/:id/unlike', isLoggedIn, function(req, res){
    User.update( {_id: req.user._id}, { $pull: { likes: req.params.id } } ).exec(function(err){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            Liked.findByIdAndRemove(req.params.id, function(err){
                if(err){
                    console.log(err);
                } else {
                    res.redirect('back');
                }
            });
        }
    });
});



// isLoggedIn

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;