var express = require('express'),
    router  = express.Router(),
    multer = require('multer'),
    path = require('path'),
    middleware = require('../middleware'),

    storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './public/uploads/cinemas/');
        },
        filename: function (req, file, callback) {
            callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        },
    }),
    imageFilter = function (req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
            return callback(new Error('Only JPG, jpeg, PNG and GIF image files are allowed!'), false);
        }
        callback(null, true);
    },
    upload = multer({
        storage: storage,
        fileFilter: imageFilter,
    }),

    Cinema  = require('../models/cinema');
    Movie   = require('../models/movie');
    User    = require('../models/user');


router.get('/', function(req, res){
    Cinema.find({area: 'bangkok'}, function(err, bangkokCinemas){
        if(err){
            console.log(err);
        } else {
            Cinema.find({area: 'central'}, function(err, centralCinemas){
                if(err) {
                    console.log(err);
                } else {
                    Movie.find({}, function(err, allMovies){
                        if(err) {
                            console.log(err);
                        } else {
                             res.render('cinema/cinema.ejs', {Bangkok: bangkokCinemas, Central: centralCinemas, movie: allMovies});
                        }
                    });
                }
            });
        }
    });
});


// search movie

router.post('/search-cinema',function(req,res){
    console.log("Trying to search cinema... " + req.body.search);
    var name = req.body.search;
    res.redirect('/cinema/search-cinema/' + name);
});

router.get('/search-cinema/:name', function(req,res){
    Cinema.find({ name: new RegExp(req.params.name, 'i')}, function(err, bangkokfoundCinema){
        if(err){
            console.log(err);
        } else {
            Cinema.find({name: new RegExp(req.params.name, 'i')}, function(err, centralfoundCinema){
                if(err){
                    console.log(err);
                } else {
                    res.render('cinema/cinema.ejs', { Bangkok: bangkokfoundCinema, Central: centralfoundCinema, sort: "All"});
                }
            });
        }
    });
});



//  Create a new cinema

router.get('/new', middleware.checkAdmin, function(req,res){
    res.render('cinema/new.ejs');
});

router.post('/new', upload.fields([{ name: 'image' }, { name: 'logo' } ]), function(req, res){
    req.body.cinema.image = '/uploads/cinemas/' + req.files['image'][0].filename;
    req.body.cinema.logo = '/uploads/cinemas/' + req.files['logo'][0].filename;
    Cinema.create(req.body.cinema, function(err, newCinemas){
        if(err){
            console.log(err);
        } else {
            res.redirect('/cinema');
        }
    });
});


//  Edit a cinema

router.get('/:id/edit', middleware.checkAdmin,  function(req, res){
    Cinema.findById(req.params.id, function( err, foundCinemas ){
        if(err) {
            console.log(err);
        } else {
            res.render('cinema/edit.ejs', {Cinemas: foundCinemas})
        }
    });
});

router.put('/:id', upload.fields([{ name: 'image' }, { name: 'logo' }]), function(req, res){
    if ( req.files['image'] ){
        req.body.cinema.image = '/images/cinema/uploads/' + req.files['image'][0].filename;
    }
    if ( req.files['logo'] ){
        req.body.cinema.logo = '/images/cinema/uploads/' + req.files['logo'][0].filename;
    }
    Cinema.findByIdAndUpdate(req.params.id, req.body.cinema, function( err, updatedCinemas ){
        if(err) {
            console.log(err);
            res.redirect('/cinema/')
        } else {
            res.redirect('/cinema/' + req.params.id);
        }
    });
});


//  Delete a cinema

router.delete('/:id', function(req, res){
    Cinema.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect('/cinema');
        }
    })
});



//  Show movies that are available in the cinema

router.get('/:id', function(req,res){
    Cinema.findById(req.params.id).exec(function(err, foundCinemas){
        if(err){
            console.log(err);
        } else {
            Movie.find({type: 'showing'}, function(err, allMovies){
                if(err){
                    console.log(err);
                } else {
                    res.render('cinema/show.ejs', {Movies: allMovies, Cinemas: foundCinemas});
                }
            });
        }
    });
});

module.exports = router;
