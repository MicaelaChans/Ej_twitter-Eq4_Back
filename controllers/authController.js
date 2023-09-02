const User = require("../models/User");
const jwt = require("jsonwebtoken");

const authController = {
  tokens: async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.json({ error: "Wrong credentials..." });
    const validatePassword = user.password === req.body.password;
    if (!validatePassword) return res.json({ error: "Wrong credentials..." });
    const token = jwt.sign({ sub: user.id, username: user.username }, process.env.JWT_SECRET);
    res.send({ token });
  },
};
module.exports = authController;
