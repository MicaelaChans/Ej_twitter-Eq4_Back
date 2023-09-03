const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");
const authController = require("../controllers/authController");

// router.post("/tokens", authController.tokens);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;
