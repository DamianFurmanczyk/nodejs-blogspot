const passport = require('passport');
const localStr = require('../models/passportLocalAuth');
const mongoose = require('mongoose');
const crypto = require('crypto');
mongoose.Promise = global.Promise;
const user = mongoose.model('user');

exports.gregister = (req, res) => {
  res.render('register');
};

exports.valReg = (req, res, next) => {
  req.sanitizeBody('username');
  req
    .checkBody('username', 'Username is not valid! ')
    .notEmpty();
  req
    .checkBody('email', 'That email is not valid! ')
    .isEmail();
  req.sanitizeBody('email');

  req
    .checkBody('password', 'Password fields cannot be empty!')
    .notEmpty();
  req
    .checkBody('confirm-password', 'Password confirmation failed!')
    .equals(req.body.password);

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
    res.render('homepage');
  }
};

exports.pregister = (req, res) => {};