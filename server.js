require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const SECRET_SESSION = process.env.SECRET_SESSION;
const rapidapi_key = process.env.rapidapi_key;
const passport = require('./config/ppConfig');
const flash = require('connect-flash');
const axios = require('axios');
var methodOverride = require('method-override');


const isLoggedIn = require('./middleware/isLoggedIn')

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);
app.use(methodOverride('_method'));

app.use(session({
  secret: SECRET_SESSION, // secret/session cookie: what we actually giving the user to use our site /
  resave: false, // resave: save the session even if it's modified, make this false
  saveUninitialized: true // saveUninitialized if we have a new session, we'll save it, therefore
}))

// initialize passport and run session as middleware
app.use(passport.initialize());
app.use(passport.session());

// flash create temporary messages
app.use(flash());

// middleware to have our messages accessible for every view
app.use((req,res,next)=> {
  // before every route, we will attached our current user to res.local
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', (req, res) => {     
  res.render('index', {alerts: res.locals.alerts});
});

app.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});
app.get('/error', (req, res) => {
  res.render('error');
});

app.use('/auth', require('./routes/auth'));
app.use('/search', require('./routes/search'));
app.use('/favorites', require('./routes/favorites'));


const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${port} 🎧`);
});

module.exports = server;
