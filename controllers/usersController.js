const passport = require('passport');
// const localStr = require('../models/localAuth');
const mongoose = require('mongoose');
const crypto = require('crypto');
mongoose.Promise = global.Promise;
const user = mongoose.model('user');

exports.gregister = (req, res) => {
  res.render('register');
};

exports.valReg = (req, res, next) => {
  req.sanitizeBody('username');
  console.log(req.body.username);
  req
    .checkBody('username', 'username is not valid! ')
    .notEmpty();
  req
    .checkBody('email', 'That email is not valid! ')
    .isEmail();
  req.sanitizeBody('email');

  req
    .checkBody('password', 'Password fields cannot be empty!')
    .notEmpty();
  req
    .checkBody('confirmPassword', 'Password confirmation failed!')
    .equals(req.body.password);
  // req   .checkBody('ispublic', 'Choose user privacy!')   .notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    errors
      .forEach(function (element) {
        req.flash('error', element.msg);
      });

    res.render('register', {
      body: req.body,
      flashes: req.flash()
    });
  } else {
    return next();
  }
};

exports.register2DB = (req, res, next) => {

  user
    .register(new user({email: req.body.email, username: req.body.username, ispublic: req.body.ispublic}), req.body.password, function (err, user) {
      if (err) {
        console.log('errors @ register2DB');

        console.log(err);

        const errorKeys = Object.keys(err.errors);
        errorKeys.forEach(key => req.flash('error', err.errors[key].message));
        res.redirect('back');
        // if end
      } else {
        return next();
      }
    });
};

exports.authUser = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login!',
  successRedirect: '/',
  successFlash: 'You are now logged in!'
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'logged out');
  res.redirect('/');
};

exports.loginM = (req, res, next) => {
  console.log(req.body);
  next();
};

exports.login = (req, res) => {
  res.render('login');
};

exports.email2lower = (req, res) => {
  req.body.email = req
    .body
    .email
    .toLowerCase();
  next();
};