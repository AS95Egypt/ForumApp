const express = require("express");
const PostsServices = require("../services/posts.services"); // TODO index import ?
const PostValidator = require("../services/posts.validator"); // TODO index import ?
const router = express.Router();

//------ /post
router
  .route("/post")
  // get all posts
  .get(PostsServices.getAllPosts)
  // add new post
  .post(PostValidator.createPostValidator, PostsServices.createPost);

//------ get posts by section
router.get(
  "/post/section/:sectionId",
  PostValidator.getPostsBySectionValidator,
  PostsServices.getPostsBySection
);

//------ get posts by user
router.get(
  "/post/user/:userId",
  PostValidator.getPostsByUserValidator,
  PostsServices.getPostsByUser
);

//------ get user posts by section
router.get(
  "/post/section/:sectionId/user/:userId",
  PostValidator.getUserPostsBySectionValidator,
  PostsServices.getPostsByUser
);

//------- /post/:id
router
  .route("/post/:id")
  // get one post
  .get(PostValidator.getPostInfoValidator, PostsServices.getPostInfo)
  // update post
  .put(PostValidator.udpatePostValidator, PostsServices.updatePost)
  // delete post
  .delete(PostValidator.deletePostValidator, PostsServices.deletePost);

module.exports = router;
