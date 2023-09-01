const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const tweetController = require("../controllers/tweetController");

router.use(ensureAuthenticated);
router.get("/:id", tweetController.destroy);
router.post("/", tweetController.tweetStore);
router.get("/like/:id", tweetController.tweetLike);

module.exports = router;
