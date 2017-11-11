const _ = require("lodash");
const mongoose = require("mongoose");
const post = mongoose.model("post");

exports.gAddNewPost = (req, res) => {
  res.render("addPost");
};

exports.pAddPost = async (req, res) => {
  let errCount = 0;
  const tagsRegex = /^(([A-Z]|[0-9]|[a-z]| )+, )*([A-Z]|[0-9]|[a-z]| )+$/;

  _.map(req.body, val => {
    req.sanitizeBody(val);
  });

  req.body.date = Date.now();
  req.body._user = req.user.id;

  req.checkBody("title", "title field cannot be empty!").notEmpty();
  req.checkBody("content", "content field cannot be empty!").notEmpty();

  const errs = req.validationErrors();

  if (errs) {
    _.map(errs, err => {
      req.flash("error", err.msg);
      errCount++;
    });
  }

  if (!tagsRegex.test(req.body.tags)) {
    req.flash("error", "Wrong tags format");
    errCount++;
  }

  req.body.tags = req.body.tags.split(",").map(tag => tag.trim());

  console.log(req.body.tags);

  if (errCount > 0) {
    return res.render("addPost", {
      flashes: req.flash(),
      post: req.body
    });
  }

  const newPost = new post(req.body);
  const added = await newPost.save();

  res.render("addPost");
};
