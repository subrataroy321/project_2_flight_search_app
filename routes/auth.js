const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');
const flash = require('connect-flash')

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/signup', (req,res)=> {
  if(req.body.password === req.body.confirmPassword) {
    db.user.findOrCreate({
      where: { email: req.body.email },
      defaults: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        contactNo: req.body.contactNo,
        password: req.body.password,
        countryCode: req.body.countryCode
      }
    })
    .then(([user,created])=> {
      console.log(created);
      if(created) {
        console.log(`${user.email} was created`);
        passport.authenticate('local', {
          successRedirect: '/',
          successFlash: 'Account Created and logged in'
        })(req,res);
      } else {
        req.flash('error','Email already exists try again')
        res.redirect('/auth/signup')
      }
    })
    .catch(error=> {
      console.log('Error', error);
      res.redirect('/auth/signup');
    })

  } 
  else {
    // sends a message thats password doesnot matchs with confirm password and stay on the same page
    req.flash('error','Confirm password does not matchs')
    res.redirect('/auth/signup');
  }
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  successFlash: 'Successfully logged in. Welcome',
  failureRedirect: '/auth/login',
  failureFlash: 'Either email or password incorrect. Please try again'
}))


router.get('/logout', (req,res)=> {
  req.logOut();
  req.flash('success','See you soon. Logging Out');
  res.redirect('/');
})

module.exports = router;
