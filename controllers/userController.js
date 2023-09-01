const User = require("../models/User");
const Tweet = require("../models/Tweet");
const formidable = require("formidable");

// Display a listing of the resource.
async function index(req, res) {
  const userLogged = req.user;
  const user = req.user;
  const followingList = await User.findById(user._id)
    .populate({
      path: "followingUsers",
      populate: { path: "tweetsList", options: { limit: 3, sort: { createdAt: -1 } } },
    })
    .sort({ tweetList: -1 });
  const followings = followingList.followingUsers.map((following) => following);
  return res.render("pages/home", { user, followings, userLogged });
}

// Display the specified resource.
async function show(req, res) {
  const userLogged = req.user;
  if (req.params.username !== "favicon.ico") {
    const user = await User.findOne({ username: req.params.username }).populate({
      path: "tweetsList",
      options: { limit: 20, sort: { createdAt: -1 } },
    });
    return res.render("pages/profile", { user, userLogged });
  }
}

async function showFollowers(req, res) {
  const userLogged = req.user;
  const user = await User.findOne({ username: req.params.id }).populate("followersUsers");
  const followers = user.followersUsers.map((follower) => follower);
  return res.render("pages/followers", { user, followers, userLogged });
}

async function showFollowing(req, res) {
  const userLogged = req.user;
  const user = await User.findOne({ username: req.params.id }).populate("followingUsers");
  const followings = user.followingUsers.map((following) => following);
  return res.render("pages/following", { user, followings, userLogged });
}

async function followers(req, res) {
  const user = req.user;

  //const follower = await User.findOneAndUpdate({ username: req.params.id });
  const follower = await User.findOne({ username: req.params.id });

  if (!user.followingUsers.includes(follower.id)) {
    user.followingUsers.push(follower);
    user.save();
    follower.followersUsers.push(user);
    follower.save();
  }

  return res.redirect(`/${user.username}/following`);
}

async function followings(req, res) {
  const user = req.user;
  //const follower = await User.findOneAndUpdate({ username: req.params.id });
  const following = await User.findOne({ username: req.params.id });
  console.log("entro al followings");

  if (user.followingUsers.includes(following.id)) {
    user.followingUsers.remove(following);
    user.save();
    following.followersUsers.remove(user);
    following.save();
  }

  return res.redirect(`/${user.username}/following`);
}

// Show the form for creating a new resource
async function create(req, res) {
  return res.render("pages/register");
}

// Store a newly created resource in storage.
async function store(req, res) {
  // console.log(req.body);
  const form = formidable({
    multiples: false,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });
  form.parse(req, async (err, fields, files) => {
    console.log("Entramos a crear");
    try {
      const user = await User.create({
        firstname: `${fields.firstname}`,
        lastname: `${fields.lastname}`,
        username: `${fields.username}`,
        password: `${fields.password}`,
        email: `${fields.email}`,
        profilePic: `${files.profilePic.newFilename}`,
      });
      res.redirect("/");
    } catch (error) {
      // console.log("error", error);
    }
  });
}

// // Show the form for editing the specified resource.
// async function edit(req, res) {}

// // Update the specified resource in storage.
// async function update(req, res) {}

// // Remove the specified resource from storage.
// async function destroy(req, res) {}

// // Otros handlers...
// // ...

module.exports = {
  index,
  show,
  create,
  store,
  showFollowers,
  showFollowing,
  followers,
  followings,
};
