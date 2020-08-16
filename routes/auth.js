const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/signup', (req,res)=> {
  if(req.body.password === req.body.confirmPassword) {
    db.user.findOrCreate({
      where: {email: req.body.email},
      defaults: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        contactNo: req.body.contactNo,
        password: req.body.password,
        countryCode: req.body.countryCode
      }
    })
    .then(([user,created])=> {
      if(created) {
        res.redirect('/');
      } else {
        res.redirect('/auth/signup')
      }
    })
    .catch(error=> {
      console.log('Error', error);
      res.redirect('/auth/signup');
    })

  } else {
    // sends a message thats password doesnot matchs with confirm password and stay on the same page
    res.redirect('/auth/signup');
  }
})

module.exports = router;
