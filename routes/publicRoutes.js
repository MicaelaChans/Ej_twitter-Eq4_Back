const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const userController = require("../controllers/userController");

router.get("*", function (req, res) {
  res.status(404).render("pages/404");
});

module.exports = router;
