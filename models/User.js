const { mongoose, Schema } = require("../db");

// Crear esquema y modelo User...
const userSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    password: String,
    bio: String,
    profilePic: {
      type: String,
      required: false,
    },
    tweetsList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tweet",
      },
    ],
    followingUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followersUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
