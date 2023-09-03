const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const tweetRoutes = require("./tweetRoutes");

module.exports = (app) => {
  app.use("/", userRoutes);
  app.use("/api", authRoutes);
};
