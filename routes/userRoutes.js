const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get(
  "/",
  checkJwt({ secret: "UnStringMuyPeroMuySecreto", algorithms: ["HS256"] }),
  userController.index,
);

router.get("/users", userController.show);

module.exports = router;
