const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");

router.get("/login", pagesController.login);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
);

router.get("/logout", function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      return next(err);
    }
    console.log("hiciste logout");
    res.redirect("/login");
  });
});

module.exports = router;
