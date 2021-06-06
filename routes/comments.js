var express = require('express'),
    router = express.Router({ mergeParams: true }),
    Movie = require('../models/movie'),
    middleware = require('../middleware'),
    Comment = require('../models/comment');

// add comments

// router.get('/new', middleware.isLoggedIn, function (req, res) {
//     Movie.findById(req.params.id, function (err, foundMovie) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.render("comments/new.ejs", { movie: foundMovie });
//         }
//     });
// });

router.post('/', middleware.isLoggedIn, function (req, res) {
    Movie.findById(req.params.id, function (err, foundMovie) {
        if (err) {
            console.log(err);
            res.redirect('/movie');
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.author.image    = req.user.image;
                    comment.save();
                    foundMovie.comments.push(comment);
                    foundMovie.save();
                    req.flash('success', 'Your comment is added!');
                    res.redirect('/movie/' + foundMovie._id);
                }
            });
        }
    });
});

// edit comment 

router.put('/:comment_id', middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect('back');
        } else {
            req.flash('success', 'You edit your comment!');
            res.redirect('/movie/' + req.params.id)
        }
    });
});

// delete comment

router.delete('/:comment_id', middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect('back');
        } else {
            req.flash('success', 'You delete your comment!');
            res.redirect('back');
        }
    });
});

module.exports = router;