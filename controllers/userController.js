const User = require("../models/User");
const Tweet = require("../models/Tweet");
const formidable = require("formidable");

// Display a listing of the resource.
async function index(req, res) {
  return res.send("Funcionando...");
}

// Display the specified resource.
async function show(req, res) {
  const users = await User.find().populate({
    path: "followingUsers",
    path: "followersUsers",
    path: "tweetsList",
  });
  return res.json(users);
}

module.exports = {
  index,
  show,
};
