const   express         = require('express'),
        app             = express(),
        bodyParser      = require('body-parser'),
        mongoose        = require('mongoose'),
        passport        = require('passport'),
        LocalStrategy   = require('passport-local'),
        Collection      = require('./models/collection'),
        Movie           = require('./models/movie'),
        Comment         = require('./models/comment'),
        User            = require('./models/user'),
        seedDB          =  require('./seeds');

var commentRoutes       = require('./routes/comments'),
    movieRoutes         = require('./routes/movies'),
    userRoutes          = require('./routes/user'),
    indexRoutes         = require('./routes/index');

mongoose.connect('mongodb://localhost/projectV3');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine','ejs');
app.use(express.static(__dirname + 'public'));
// seedDB();

app.use(require('express-session')({
    secret: 'secret is always secret.',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

app.get('/cinema', function(req, res){
    res.render('cinema/cinema.ejs');
});




app.use('/', indexRoutes);
app.use('/user', userRoutes);
app.use('/movie', movieRoutes);
app.use('/movie/:id/comments', commentRoutes);

app.listen(3000, function(){
    console.log('Server is started.');
});    