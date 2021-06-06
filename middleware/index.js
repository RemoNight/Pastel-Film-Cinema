var Movie   = require('../models/movie');
var Comment = require('../models/comment');

var middlewareObj = {};

// check movieOwner

middlewareObj.checkMovieOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Movie.findById(req.params.id, function(err, foundMovie){
            if ( err ) {
                req.flash('error', 'Movie not found :( ');
                res.redirect('back');
            } else {
                if ( req.user.isAdmin ) { //equals เป็น function ในการเช็คค่าว่าข้อมูลเท่ากับข้อมูลใน DB รึเปล่า
                    next();
                } else {
                    req.flash('error', 'You dont have permission to do this action!');
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', 'You need to sign in first!');
        res.redirect('back');
    }
}

// check commentOwner

middlewareObj.checkCommentOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if ( err ) {
                req.flash('error', 'Comment not found :( ');
                res.redirect('back');
            } else {
                if ( foundComment.author.id.equals(req.user._id) || req.user.isAdmin ) { //equals เป็น function ในการเช็คค่าว่าข้อมูลเท่ากับข้อมูลใน DB รึเปล่า
                    next();
                } else {
                    req.flash('error', 'You dont have permission to do this action.');
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', 'You need to sign in first!');
        res.redirect('back');
    }
}

// Log in

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You need to sign in first!');
    res.redirect('/login');
}

module.exports = middlewareObj;