const passport = require("passport");
// const localStr = require('../models/localAuth');
const mongoose = require("mongoose");
const crypto = require("crypto");
mongoose.Promise = global.Promise;
const user = mongoose.model("user");
const _ = require("lodash");

const checkValidationErrors = req => {};

exports.gregister = (req, res) => {
  res.render("register");
};

exports.valReg = (req, res, next) => {
  _.map(req.body, val => {
    req.sanitizeBody(val);
  });

  req.checkBody("username", "username is not valid! ").notEmpty();
  req.checkBody("email", "Email is not valid! ").isEmail();
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
      ispublic,
      dateRegistered: Date.now()
    }),
    req.body.password,
    function(err, user) {
      if (err) {
        console.log("err @ register2db", err);
        if (err.errors) {
          const errorKeys = Object.keys(err.errors);
          errorKeys.forEach(key => req.flash("error", err.errors[key].message));
        } else {
          req.flash("error", err.message);
        }

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

exports.showEditAccount = (req, res) => {
  res.render("editAccount");
};

exports.updateAccountDetails = (req, res, next) => {
  const operations = [
    "rmAcc",
    "email",
    "username",
    "password",
    "ispublic",
    "blogDescription"
  ];
  let operation = operations.find(op => {
    console.log(req.body[op]);
    return req.body[op] != undefined;
  });
  let updProp;

  if (operation === undefined) {
    req.flash("error", "Make sure to fill needed fields");
    return res.render("editAccount", {
      flashes: req.flash()
    });
  }

  if (operation === "password" || operation === "confirmPassword") {
    next();
    // password procedure
    req
      .checkBody("confirmPassword", "Password confirmation failed!")
      .equals(req.body.password);
  }

  console.log(req.user.username);

  switch (operation) {
    case "username":
      updProp = { $set: { username: req.body[operation] } };
      break;
    case "ispublic":
      updProp = { $set: { ispublic: req.body[operation] } };
      break;
    case "blogDescription":
      updProp = { $set: { blogDescription: req.body[operation] } };
      break;
    case "email":
      req.checkBody("email", "Email is not valid! ").isEmail();
      updProp = { $set: { email: req.body[operation] } };
      break;
  }

  const valErrors = req.validationErrors();

  if (valErrors) {
    valErrors.forEach(function(element) {
      req.flash("error", element.msg);
    });

    return res.render("editAccount", {
      userInfo: req.body,
      flashes: req.flash()
    });
  }

  user
    .findOneAndUpdate({ _id: req.user._id }, updProp, { new: true })
    .then(updUser => {
      console.log(updUser);
      req.flash("success", "User updated");
      res.render("editAccount", {
        flashes: req.flash()
      });
    })
    .catch(err => {
      console.log("err @ register2db", err);
      if (err.errors) {
        const errorKeys = Object.keys(err.errors);
        errorKeys.forEach(key => req.flash("error", err.errors[key].message));
      } else {
        req.flash("error", err.message);
        res.render("editAccount", {
          flashes: req.flash()
        });
      }
    });
};
