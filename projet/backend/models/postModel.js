const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  resume: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  tags: { type: [String] },
  comments: [
    {
      text: String,
      postedBy: { type: ObjectId, ref: "User" },
    },
  ],
  html: { type: String, required: true },
});
module.exports = mongoose.model("Post", postSchema);
