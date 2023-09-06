const User = require("../models/User");
const Tweet = require("../models/Tweet");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const register = async (req, res) => {
  const { firstname, lastname, email, username, password /*profilePic*/ } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname: firstname,
      lastname: lastname,
      email: email,
      username: username,
      password: passwordHash,
      /*profilePic: profilePic*/
    });
    const registeredUser = await newUser.save();
    console.log(newUser);

    jwt.sign(
      { id: registeredUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) return console.log(err);
        console.log({ token });
        return res.json(token);
      },
    );
    res.json(registeredUser);
    return console.log("Usuario y token creados!");
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userFound = await User.findOne({ username: username })
      .populate("followersUsers")
      .populate("followingUsers")
      .populate("tweetsList");

    if (!userFound) return res.json({ error: "Credenciales incorrectas" });

    const verifyPass = await bcrypt.compare(password, userFound.password);

    if (!verifyPass) return res.json({ error: "Credenciales incorrectas" });

    console.log(userFound.id);
    const selfTweets = await Tweet.find({ author: userFound.id }).populate("author");
    const followingTweets = await Tweet.find({
      author: { $in: userFound.followingUsers },
    }).populate("author");

    jwt.sign({ id: userFound._id }, process.env.JWT_SECRET, { expiresIn: "1d" }, (err, token) => {
      if (err) return console.log(err);
      return res.json({ token: token, userFound, followingTweets, selfTweets });
    });
  } catch (err) {
    console.log(err);
  }
};

const logout = async (req, res) => {
  res.send("Entraste en Login (backend)");

  return console.log("Usuario hizo logout!");
};

module.exports = { register, login, logout };
