require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const SECRET_SESSION = process.env.SECRET_SESSION;
const EMAILJS_USER_ID = process.env.EMAILJS_USER_ID;
const passport = require('./config/ppConfig');
const flash = require('connect-flash');
const axios = require('axios');
const methodOverride = require('method-override');
const db = require('./models');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionStore = new SequelizeStore({
  db: db.sequelize,
  expiration: 1000 * 60 * 30 // session expires after 30 min
});


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
  saveUninitialized: true, // saveUninitialized if we have a new session, we'll save it, therefore
  store: sessionStore
}))
sessionStore.sync();
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

// get route for index page
app.get('/', (req, res) => {    
  if(typeof user == 'undefined'){ 
    res.render('index', {alerts: res.locals.alerts});
  } else { 
    res.render('index', {alerts: res.locals.alerts, user: user});
  }
});

// get route for profile page ## only access when user logged in
app.get('/profile', isLoggedIn, (req, res) => {
  db.user.findOne({
    where: {id: req.user.id}
  })
  .then(user=> {
    res.render('profile', {user: user.dataValues});
  })
});

// put route for updating password 
// Problem: password is not hashing before storing into database
app.put('/profile/changePassword', isLoggedIn, (req,res)=> {
  db.user.findOne({
    where: {id: req.user.id}
  })
  .then(user=> {
    if(req.user.validPassword(req.body.currentPassword)) {
      if(req.body.newPassword === req.body.confirmNewPassword) {
        user.update({password: req.body.newPassword})
        .then(user => {
          req.flash('success','Password Updated')
          res.redirect('/profile');
        })
      } else {
        req.flash('error','New Password and Confirm New Password did not matched')
        res.redirect('/profile');
      }
    } else {
      req.flash('error','Current Password invalid')
      res.redirect('/profile');
    }
  })
})

// get route for contact page
app.get('/contact', (req, res) => {
  res.render('contact');
});

// post route for sending contact us info

// app.post('/contact/send', (req,res)=> {
//   console.log(`contactform`)
//   axios.post('https://api.emailjs.com/api/v1.0/email/send-form',{
//     data: {
//       service_id: 'gmail',
//       template_id: 'template_2NY7o97Q',
//       user_id: EMAILJS_USER_ID
//     }
//   }).then(()=> {
//     req.flash('success','Message Sent');
//     res.redirect('/contact');
//   }).catch(error=> {
//     req.flash('error','Opps... Something went wrong. try again.');
//     res.redirect('/contact');
//   })
// })

// get route for error page
app.get('/error', (req, res) => {
  res.render('error');
});

app.use('/auth', require('./routes/auth'));
app.use('/search', require('./routes/search'));
app.use('/favorites',isLoggedIn, require('./routes/favorites'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${port} 🎧`);
});

module.exports = server;
