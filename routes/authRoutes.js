const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");
const authController = require("../controllers/authController");

router.post("/tokens", authController.tokens);

module.exports = router;
