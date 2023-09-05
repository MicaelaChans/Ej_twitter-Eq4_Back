const express = require("express");
const router = express.Router();
const tweetController = require("../controllers/tweetController");

router.get("/:id", tweetController.destroy);
router.post("/", tweetController.tweetStore);
router.get("/like/:id", tweetController.tweetLike);

module.exports = router;
