const router = require("express").Router();
const auth = require("../middleware/auth");
const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
//add post
router.post("/", async (req, res) => {
  //retrive date from the request
  const { username, content } = req.body;

  // construct the post model
  const newComment = new Comment({
    username,
    content,
  });
  //save model
  try {
    const savedComment = await newComment.save();
    res.json(savedComment);
  } catch (err) {
    console.error(err);
  }
});

//get all posts
router.get("/", async (req, res) => {
  const comments = await Comment.find();
  res.json(comments);
});

module.exports = router;
