const express = require("express");
const Post = require("./../models/postModel");
const { APIError } = require("../utils/apiError");

exports.createPost = async (req, res, next) => {
  try {
    if (!req.body.author) req.body.author = req.params.authorId;

    const newPost = await Post.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        post: newPost,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    let filter = {};
    if (req.params.authorId) filter = { author: req.params.authorId };
    const posts = await Post.find(filter);
    res.status(200).json({
      status: "success",
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate({
      path: "author",
      select: "name",
    });

    if (!post) {
      return next(APIError.notFound(`There is no post with the ID: ${id}`));
    }
    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = req.body;

    let post = await Post.findById(id);
    if (!post) {
      return next(APIError.notFound(`No matching post with the ID`));
    }
    if (!update) {
      return next(
        APIError.badRequest(`Kindly input the field to be updated`, 400)
      );
    }

    post = await Post.findByIdAndUpdate(id, update);
    res.status(201).json({
      status: "success",
      message: `Post updated successfuly`,
      post,
    });
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const postToDelete = await Post.findById(id);
    if (!postToDelete) {
      return next(APIError.notFound(`No matching post with the ID: ${id}`));
    }

    await Post.findByIdAndDelete(id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
