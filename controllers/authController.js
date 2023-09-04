const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authController = {
  tokens: async (req, res) => {
    console.log(req.body);
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.json({ error: "Wrong credentials..." });
    const validatePassword = user.password === req.body.password;
    if (!validatePassword) return res.json({ error: "Wrong credentials..." });
    const token = jwt.sign({ sub: user.id, username: user.username }, process.env.JWT_SECRET);
    res.send({ token });
  },
};

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
    const userFound = await User.findOne({ username: username });
    if (!userFound) return res.status(404).json({ error: "No se encontró usuario" });

    const verifyPass = await bcrypt.compare(password, userFound.password);

    if (!verifyPass) return res.status(404).json({ error: "Credenciales incorrectas" });

    jwt.sign({ id: userFound._id }, process.env.JWT_SECRET, { expiresIn: "1d" }, (err, token) => {
      if (err) return console.log(err);
      console.log({ token });
      return res.json(token);
    });

    console.log({ userFound });
    console.log("Usuario logeado!");
    return res.json(userFound);
  } catch (err) {
    console.log(err);
  }
};

const logout = async (req, res) => {
  res.send("Entraste en Login (backend)");

  return console.log("Usuario hizo logout!");
};

module.exports = { register, login, logout };
