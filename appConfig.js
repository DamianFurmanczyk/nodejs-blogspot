const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const passport = require('passport');
require('dotenv/config');

// non-node_modules requires
const routes = require("./routes/routes");
const helpers = require("./shared/helpers");

// handlers
const {flashValidationErrors, notFound, productionErrors} = require("./handlers/errHandlers");

const app = express();
app.use(express.static(path.join(__dirname, "static")));

app.use(session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(flash());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(expressValidator());

app.use(cookieParser());

// views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// passport passport.serializeUser(function (user, done) {     done(null,
// user.id); }); passport.deserializeUser(function (id, done) {     User
// .findById(id, function (err, user) {             done(err, user);         });
// }); app.use(passport.initialize()); app.use(passport.session()); custom
// middleware
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    res.locals.h = helpers;
    res.locals.flashes = req.flash();
    next();
});

// routes handling
app.use("/", routes);

// if default failed do: app.use(notFound); app.use(flashValidationErrors);
// app.use(productionErrors); listen and go!

module.exports = app;