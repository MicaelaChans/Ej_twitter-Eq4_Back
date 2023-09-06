const express = require("express");
const router = express.Router();
const tweetController = require("../controllers/tweetController");
const { expressjwt: checkJwt } = require("express-jwt");

router.get("/", tweetController.show);
router.post(
  "/",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  tweetController.store,
);
router.get("/:id", tweetController.destroy);
router.get("/like/:id", tweetController.tweetLike);

module.exports = router;
