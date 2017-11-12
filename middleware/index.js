exports.isLogged = (req, res, next) => {
  console.log(req.user);
  if (!req.user) {
    req.flash("error", "You need to log in first");
    return res.render("homepage", {
      flashes: req.flash()
    });
  }
  next();
};
