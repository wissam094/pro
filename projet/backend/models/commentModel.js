const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const commentSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    content: String,
    post_id: { type: ObjectId, ref: "Post" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comments", commentSchema);
