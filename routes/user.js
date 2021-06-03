var express = require('express'),
    router = express.Router(),
    multer  = require('multer'),
    path    = require('path'),
    storage = multer.diskStorage({ 
        destination: function(req, file, callback){ 
            callback(null, './public/uploads/user/');
        },
        filename:  function(req, file, callback){ 
            callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    }),
    imageFilter = function(req, file, callback){ 
        if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) { 
            return callback(new Error('Only JPG JPEG PNG and GIF images files are allowed!'), false);
        }
        callback(null, true);
    },
    upload = multer({storage: storage, fileFilter: imageFilter}),

    User    = require('../models/user');
    

router.get('/profile/:id', isLoggedIn, function (req, res) {
    User.findById(req.params.id).exec(function (err, foundUsers) {
        if (err) {
            console.log(err);
        } else {
            User.findById(req.params.id).populate('likes').exec(function(err, likedMovies){
                if (err) {
                    console.log(err);
                } else {
                    res.render('index/profile.ejs', { User: foundUsers, movie: likedMovies });
                }
            });
        }
    });
});


router.post('/profile/:id', isLoggedIn, upload.single('image'), function (req, res){
    User.findByIdAndUpdate(req.params.id,
        {
            image: '/uploads/user/' + req.file.filename
        },
        function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log("Updated User : ", result);
                res.redirect('back');
            }
        });
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};



module.exports = router;