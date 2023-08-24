const express = require("express");
const {
  register,
  getAllAuthors,
  getAuthor,
} = require("./../controllers/authorController");
const postRouter = require("./postRoutes");
const router = express.Router();

router.use("/:authorId/posts", postRouter);

router.post("/register", register);
router.get("/", getAllAuthors);
router.get("/:id", getAuthor);

module.exports = router;
