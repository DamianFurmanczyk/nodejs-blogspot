var mongoose = require("mongoose");
var User = mongoose.model("user");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

const local = passport.use(new LocalStrategy(function (username, password, done) {
    User
        .findOne({
            username: username
        }, function (err, User) {
            if (err) {
                return done(err);
            }
            if (!User) {
                return done(null, false);
            }
            return done(null, User);
        });
}));

module.export = local;