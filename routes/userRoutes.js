const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const tweetController = require("../controllers/tweetController");
const makeUserAvailableInViews = require("../middlewares/makeUserAvailableInViews");

router.get("/register", userController.create);
router.post("/register", userController.store);
router.use(ensureAuthenticated);
router.get("/", userController.index);
router.get("/:username", userController.show);

router.get("/:id/followers", userController.showFollowers);
router.get("/:id/following", userController.showFollowing);
router.get("/followers/:id", userController.followers);
router.get("/following/:id", userController.followings);

module.exports = router;
