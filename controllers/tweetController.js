const Tweet = require("../models/Tweet");
const User = require("../models/User");

// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function show(req, res) {
  const users = await Tweet.find().populate("author").populate("likes");
  return res.json(users);
}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {
  const user = await User.findById(req.auth.id);

  try {
    const tweet = await Tweet.create({
      content: req.body.content,
      author: user._id,
      likes: [],
    });
    user.tweetsList.push(tweet);
    user.save();
    return res.redirect("/");
  } catch (error) {
    console.log("Error al obtener los datos", error);
  }
}

// Show the form for editing the specified resource.
async function edit(req, res) {}

async function tweetLike(req, res) {
  const user = req.user;
  //const follower = await User.findOneAndUpdate({ username: req.params.id });
  const tweet = await Tweet.findOne({ _id: req.params.id });

  if (!tweet.likes.includes(user.id)) {
    tweet.likes.push(user);
    tweet.save();
  } else {
    tweet.likes.remove(user);
    tweet.save();
  }
  return res.redirect("/");
}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {
  try {
    const tweetId = req.body.tweetId;
    await Tweet.findByIdAndRemove(tweetId);
    res.json("Tweet borrado");
  } catch (error) {
    console.log("Error al eliminar tweet", error);
  }
}

// Otros handlers...
// ...

module.exports = {
  show,
  store,
  tweetLike,
  destroy,
};
