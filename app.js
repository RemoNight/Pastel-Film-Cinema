const   express         = require('express'),
        app             = express(),
        bodyParser      = require('body-parser'),
        mongoose        = require('mongoose'),
        flash           = require('connect-flash'),
        methodOverride  = require('method-override'),
        passport        = require('passport'),
        LocalStrategy   = require('passport-local'),
        Movie           = require('./models/movie'),
        Comment         = require('./models/comment'),
        User            = require('./models/user'),
        seedDB          =  require('./seeds');

var commentRoutes       = require('./routes/comments'),
    cinemaRoutes        = require('./routes/cinemas'),
    movieRoutes         = require('./routes/movies'),
    userRoutes          = require('./routes/user'),
    showtimeRoutes      = require('./routes/showtime'),
    bookingRoutes       = require('./routes/booking'),
    indexRoutes         = require('./routes/index');

mongoose.connect('mongodb://localhost/projectV3');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine','ejs');
// app.use(express.static(__dirname + 'public'));
app.use(express.static('./public'));
app.use(methodOverride('_method'));
app.use(flash());
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
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});



app.use('/', indexRoutes);
app.use('/user', userRoutes);
app.use('/movie', movieRoutes);
app.use('/cinema', cinemaRoutes);
app.use('/booking', bookingRoutes);
app.use('/showtime', showtimeRoutes);
app.use('/movie/:id/comments', commentRoutes);

app.listen(3000, function(){
    console.log('Server is started.');
});    