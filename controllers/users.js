const passport = require("passport");
// const localStr = require('../models/localAuth');
const mongoose = require("mongoose");
const crypto = require("crypto");
mongoose.Promise = global.Promise;
const user = mongoose.model("user");

exports.gregister = (req, res) => {
  res.render("register");
};

exports.valReg = (req, res, next) => {
  _.map(req.body, val => {
    req.sanitizeBody(val);
  });

  req.checkBody("username", "username is not valid! ").notEmpty();
  req.checkBody("email", "That email is not valid! ").isEmail();
  req.checkBody("ispublic", "Choose user privacy!").notEmpty();

  req.checkBody("password", "Password fields cannot be empty!").notEmpty();
  req
    .checkBody("confirmPassword", "Password confirmation failed!")
    .equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    errors.forEach(function(element) {
      req.flash("error", element.msg);
    });

    res.render("register", {
      userInfo: req.body,
      flashes: req.flash()
    });
  } else {
    return next();
  }
};

exports.register2DB = (req, res, next) => {
  const { email, username, ispublic } = req.body;
  user.register(
    new user({
      email,
      username,
      ispublic
    }),
    req.body.password,
    function(err, user) {
      if (err) {
        console.log("errors @ register2DB");
        console.log("errors @ register2DB");
        console.log("errors @ register2DB");
        console.log("errors @ register2DB");

        const errorKeys = Object.keys(err.errors);
        errorKeys.forEach(key => req.flash("error", err.errors[key].message));
        res.render("register", {
          userInfo: req.body,
          flashes: req.flash()
        });
        // if end
      } else {
        return next();
      }
    }
  );
};

exports.authUser = passport.authenticate("local", {
  failureRedirect: "/login",
  failureFlash: "Failed Login!",
  successRedirect: "/",
  successFlash: "You are now logged in!"
});

exports.logout = (req, res) => {
  req.logout();
  req.flash("success", "logged out");
  res.redirect("/");
};

exports.login = (req, res) => {
  res.render("login");
};

exports.email2lower = (req, res) => {
  req.body.email = req.body.email.toLowerCase();
  next();
};
