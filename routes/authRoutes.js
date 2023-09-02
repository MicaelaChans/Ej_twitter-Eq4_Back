const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");
const authController = require("../controllers/authCotroller");
/*
router.get("/login", pagesController.login);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
);
*/

authRouter.post("/tokens", authController.tokens);

/*
router.get("/logout", function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      return next(err);
    }
    console.log("hiciste logout");
    res.redirect("/login");
  });
});
*/

module.exports = router;
