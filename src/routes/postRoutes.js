const express = require("express");
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const router = express.Router({ mergeParams: true });

router.route("/").get(getAllPosts).post(createPost);
router.route("/:id").get(getPostById).patch(updatePost).delete(deletePost);

module.exports = router;
