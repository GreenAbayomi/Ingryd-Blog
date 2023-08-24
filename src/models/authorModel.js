const { Schema, model } = require("mongoose");
const validator = require("validator");

const authorSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, `An author must have a name`],
    },
    email: {
      type: String,
      required: [true, `An author must have an email`],
      validate: [validator.isEmail, "Please provide a valid email address"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, `An author must have a username`],
    },
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//virtual populate author & posts
authorSchema.virtual("posts", {
  ref: "post",
  foreignField: "author",
  localField: "_id",
});

const Author = new model("author", authorSchema);
module.exports = Author;
