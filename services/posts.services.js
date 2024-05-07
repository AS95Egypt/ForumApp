// Packages
const asyncHandler = require("express-async-handler");
const { PostsRepo } = require("../repository");
const { Post } = require("../models");
const routeHandler = require("../utils/routes_handlers");

// Utils
const { DEFAULT_PAGE_SIZE } = require("../app_constants");

//? get All Posts
module.exports.getAllPosts = routeHandler.getAll(Post);

//? Create Post
module.exports.createPost = routeHandler.createOne(Post); //! passing the model

//? Get Post Info
module.exports.getPostInfo = routeHandler.getOne(Post);

//? Update Post
module.exports.updatePost = routeHandler.updateOne(Post);

//? Delete Post
module.exports.deletePost = routeHandler.deleteOne(Post);

//? get posts by section
module.exports.getPostsBySection = asyncHandler(async (req, res) => {
  const pageIndex = parseInt(req.query.page) || 1;
  const limitCount = parseInt(req.query.limit) || DEFAULT_PAGE_SIZE;

  const sectionPosts = await PostsRepo.getPostsBySection(
    pageIndex,
    limitCount,
    req.params.sectionId
  );
  res.json({ success: true, data: sectionPosts });
});

//? get posts by user
module.exports.getPostsByUser = asyncHandler(async (req, res) => {
  const pageIndex = parseInt(req.query.page) || 1;
  const limitCount = parseInt(req.query.limit) || DEFAULT_PAGE_SIZE;

  const userPosts = await PostsRepo.getPostsByUser(
    pageIndex,
    limitCount,
    req.params.userId
  );
  res.json({ success: true, data: userPosts });
});

//? get user's posts by section
module.exports.getUserPostsBySection = asyncHandler(async (req, res) => {
  const pageIndex = parseInt(req.query.page) || 1;
  const limitCount = parseInt(req.query.limit) || DEFAULT_PAGE_SIZE;

  const posts = await PostsRepo.getUserPostsBySection(
    pageIndex,
    limitCount,
    req.params.userId,
    req.params.sectionId
  );
  res.json({ success: true, data: posts });
});
