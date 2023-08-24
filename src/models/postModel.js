const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  title: {
    type: String,
    required: [true, `A post must have a title`],
  },
  content: {
    type: String,
    required: [true, `A post must have an content`],
  },
  author: {
    type: Schema.ObjectId,
    ref: "author",
    required: [true, "A post must have an author"],
  },
  tags: {
    type: [String],
    default: ["tech", "programming"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

postSchema.index({ author: 1 });

const Post = new model("post", postSchema);
module.exports = Post;
