const express = require("express");
const passport = require("passport");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const middleware = require("../middleware");

const mainC = require("../controllers/main");
const usersC = require("../controllers/users");
const blogsC = require("../controllers/blogs");

// uwaga plan: zamiast async await -response jako middleware/endware ktore albo
// responsuje albo nextuje z errorem

router.get("/", mainC.getHomepage);

router.get("/register", usersC.gregister);
router.post("/register", usersC.valReg, usersC.register2DB, usersC.authUser);

router.get("/logout", middleware.isLogged, usersC.logout);
router.get("/login", usersC.login);
router.post("/login", usersC.authUser);

router.get("/newPost", middleware.isLogged, blogsC.gAddNewPost);
router.post("/addPost", middleware.isLogged, blogsC.pAddPost, blogsC.showBlog);

router.get("/browse", blogsC.showBlogs);
router.get("/browse/blog/:userID", blogsC.showBlog);
router.get("/blog/:userID", blogsC.showBlog);

module.exports = router;
