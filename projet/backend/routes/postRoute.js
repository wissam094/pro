const router = require("express").Router();
const auth = require("../middleware/auth");
const Post = require("../models/postModel");

//add post
router.post("/", async (req, res) => {
  //retrive date from the request
  const { title, resume, createdAt, tags, html } = req.body;
  // construct the post model
  const newPost = new Post({
    title,
    resume,
    createdAt,
    tags,
    html,
    resume,
  });
  //save model
  try {
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (err) {
    console.error(err);
  }
});

//get all posts
router.get("/", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});
// get 1 post
router.get("/:id", async (req, res) => {
  const post = await Post.findById({ _id: req.params.id });
  res.json(post);
});

// delete post
router.delete("/:id", async (req, res) => {
  const todo = await Post.findOne({ _id: req.params.id });
  if (!todo)
    return res.status(400).json({
      msg: "not find post",
    });
  const deletedTodo = await Post.findByIdAndDelete(req.params.id);
  res.json(deletedTodo);
});

// comment
router.put("/comment", auth, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});
module.exports = router;
