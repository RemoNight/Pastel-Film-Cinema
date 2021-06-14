const { route } = require('./comments');

var express     = require('express'),
    router      = express.Router(),
    multer      = require('multer'),
    path        = require('path'),
    middleware  = require('../middleware'), 
    storage     = multer.diskStorage({ // multer diskstorage = เก็บที่ไหน
        destination: function(req, file, callback){ //callback บอกถึง folder ที่เราเก็บ file ไว้
            callback(null, './public/uploads/movies');
        },
        filename:  function(req, file, callback){ // file name = ที่จะเก็บชื่่ออะไร , fieldname = file ประเภทไหน , path.extname = เก็บนามสกุลไฟล์
            callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    }),
    imageFilter = function(req, file, callback){ //imageFilter กำหนดใหใช้ image ด้วยนามสกุลพวกนี้เท่านั้น (เป็นการอัพโหลดไฟล์แบบ image เลยตั้งชื่อยังงี้)
        if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) { // check ว่า user อัพมาเป็นนามสกุลไหน , เข้าถึงนามสกุลของไฟล์ได้โดย file.originalname
            return callback(new Error('Only JPG JPEG PNG and GIF images files are allowed!'), false);
        }
        callback(null, true);
    },
    upload = multer({storage: storage, fileFilter: imageFilter}),// กำหนดการอัพโหลด ใช้งานผ่าน packet multer ยังไง

    Comment = require('../models/comment'),
    Cinema  = require('../models/cinema'),
    Movie   = require('../models/movie'),
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



// add new movie

router.post('/', middleware.isLoggedIn, upload.single('image'), function(req, res){ // .single = กรณีไฟล์เดียว ถ้า .field = อัพหลายไฟล์ , 'image' มาจาก name='image' ของ movies/new.ejs บรรทัดที่ 15
    // req.body.movie // พวก name rating type และ บลาๆ ถูกเก็บไว้ในนี้แล้ว จาก movie[name]
    req.body.movie.image = '/uploads/movies/' + req.file.filename;  // เก็บ path ของ file ที่ถูกอัพโหลดขึ้นมาใน folder ชื่อ upload
    req.body.movie.author = {
        id: req.user._id,
        username: req.user.username
    };
    // var newMovie = {
    //     name:name,      image:image,    date: date, 
    //     time: time,     actors: actors, trailer: trailer, 
    //     rating: rating, type: type,     author: author
    // };
    Movie.create(req.body.movie, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            req.flash('success', 'Your movie is created');
            res.redirect('/movie');
        }
    });
});


router.get('/new', middleware.isLoggedIn, function(req,res){
    res.render('movies/new.ejs');
});


// edit movie 

router.get('/:id/edit', middleware.checkAdmin, function(req, res){
    Movie.findById(req.params.id, function(err, foundMovie){
        if(err){
            console.log(err);
        } else {
            res.render('movies/edit.ejs', {movie: foundMovie});
        }
    })
});

router.put('/:id', upload.single('image'), function(req, res){
    if(req.file) {
        req.body.movie.image = '/uploads/movies/' + req.file.filename;
    }
    Movie.findByIdAndUpdate(req.params.id, req.body.movie, function(err, updatedMovie){ // req.body.movie มาจาก edit.ejs ในส่วนของ name="movie[name]" (movie == movie) เป็นต้น 
        if(err){
            res.redirect('/movie/');
        } else {
            req.flash('success', 'You edit your movie!');
            res.redirect('/movie/' + req.params.id);
        }
    });
});


// delete movie

router.delete('/:id', middleware.checkAdmin, function(req, res){
    Movie.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/movie/');
        } else {
            req.flash('success', 'You delete your movie!');
            res.redirect('/movie/');
        }
    });
});



//show movie & comment on show.ejs

router.get("/:id", function(req, res){
    Movie.findById(req.params.id).populate('comments').exec(function(err, foundMovie){
        if(err){
            console.log(err);
        } else {
            res.render("movies/show.ejs", { movie: foundMovie });
        }
    });
});


// show movie and show time on showtime.ejs

router.get("/:id/showtime", function(req, res){
    Movie.findById(req.params.id).populate('comments').exec(function(err, foundMovie){
        if(err){
            console.log(err);
        } else {
            Cinema.find({}, function(err, allCinema){
                if(err){
                    console.log(err);
                } else {
                    res.render('movies/showtime.ejs', { movie: foundMovie, Cinema: allCinema });
                }
            });
        }
    });
});



// edit comment

router.get('/:id/:comment_id/edit', middleware.checkCommentOwner, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect('back');
        } else {
            Movie.findById(req.params.id).populate('comments').exec(function(err, foundMovie){
                if(err){
                    console.log(err);
                } else {
                    res.render('comments/edit.ejs', { comment: foundComment, movie: foundMovie });
                }
            });    
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

router.post('/:id/like', middleware.isLoggedIn, function(req, res){
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

router.post('/:id/unlike', middleware.isLoggedIn, function(req, res){
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





module.exports = router;