var Movie   = require('../models/movie');
var Comment = require('../models/comment');
var User    = require('../models/user');

var middlewareObj = {};


// check Admin

middlewareObj.checkAdmin = function(req, res, next){
    if(req.isAuthenticated()){
        User.findById(req.user._id, function(err, currentUser){
            if(err){
                req.flash('error', 'You can not acess this page!');
                res.redirect('back');
            } else {
                if( currentUser.status === 'admin' || currentUser.status === 'boss' ){ //equals เป็น function ในการเช็คค่าว่าข้อมูลเท่ากับข้อมูลใน DB รึเปล่า
                    return next();
                }
            }
        });
    } else {
        req.flash('error', 'You need to sign in first!');
        res.redirect('back');
    }
};



// check commentOwner

middlewareObj.checkCommentOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if ( err ) {
                req.flash('error', 'Comment not found :( ');
                res.redirect('back');
            } else {
                if ( foundComment.author.id.equals(req.user._id) || req.user.status === 'admin' || req.user.status === 'boss' ) { //equals เป็น function ในการเช็คค่าว่าข้อมูลเท่ากับข้อมูลใน DB รึเปล่า
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