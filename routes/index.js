const publicRoutes = require("./publicRoutes");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const tweetRoutes = require("./tweetRoutes");

// const privateRoutes = require("./privateRoutes");

module.exports = (app) => {
  app.use("/", authRoutes);
  app.use("/", userRoutes);
  app.use("/tweet", tweetRoutes);
  app.use("/", publicRoutes);
};
