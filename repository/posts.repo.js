const { Post } = require("../models");
const { CustomPagesLabels } = require("../app_constants");

/**
 * Retrieves all posts from the database.
 * @async
 * @function getAllPosts
 * @param {number} pageIndex - The index of the page to retrieve.
 * @param {number} limitCount - The maximum number of posts to retrieve.
 * @returns {Promise<Object>} An object containing the retrieved posts.
 */
module.exports.getAllPosts = async (pageIndex, limitCount) => {
  // TODO try to implement apiFeatures & database logic
  const allPosts = await Post.paginate(
    {},
    {
      page: pageIndex,
      limit: limitCount,
      lean: true,
      customLabels: CustomPagesLabels,
    }
  );
  return allPosts;
};

/**
 * Retrieves a single post from the database.
 * @async
 * @function getOnePost
 * @param {string} postId - The ID of the post to retrieve.
 * @returns {Promise<Object>} An object containing the retrieved post.
 */
module.exports.getOnePost = async (postId) => {
  const post = Post.findById(postId);
  return post;
};

/**
 * Retrieves all posts from a specific section of the forum.
 * @async
 * @function getPostsBySection
 * @param {number} pageIndex - The index of the page to retrieve.
 * @param {number} limitCount - The maximum number of posts to retrieve.
 * @param {string} sectionId - The ID of the section to retrieve posts from.
 * @returns {Promise<Object>} An object containing the retrieved posts.
 */
module.exports.getPostsBySection = async (pageIndex, limitCount, sectionId) => {
  const posts = await Post.paginate(
    { sectionId: sectionId },
    {
      page: pageIndex,
      limit: limitCount,
      lean: true,
      customLabels: CustomPagesLabels,
    }
  );
  return posts;
};

/**
 * Retrieves all posts created by a specific user.
 * @async
 * @function getPostsByUser
 * @param {number} pageIndex - The index of the page to retrieve.
 * @param {number} limitCount - The maximum number of posts to retrieve.
 * @param {string} userId - The ID of the user to retrieve posts from.
 * @returns {Promise<Object>} An object containing the retrieved posts.
 */
module.exports.getPostsByUser = async (pageIndex, limitCount, userId) => {
  const Posts = await Post.paginate(
    { userId: userId },
    {
      page: pageIndex,
      limit: limitCount,
      lean: true,
      customLabels: CustomPagesLabels,
    }
  );
  return Posts;
};

/**
 * Retrieves all posts created by a specific user in a specific section of the forum.
 * @async
 * @function getUserPostsBySection
 * @param {number} pageIndex - The index of the page to retrieve.
 * @param {number} limitCount - The maximum number of posts to retrieve.
 * @param {string} userId - The ID of the user to retrieve posts from.
 * @param {string} sectionId - The ID of the section to retrieve posts from.
 * @returns {Promise<Object>} An object containing the retrieved posts.
 */
module.exports.getUserPostsBySection = async (
  pageIndex,
  limitCount,
  userId,
  sectionId
) => {
  const Posts = await Post.paginate(
    { userId: userId, sectionId: sectionId },
    {
      page: pageIndex,
      limit: limitCount,
      lean: true,
      customLabels: CustomPagesLabels,
    }
  );
  return Posts;
};

/**
 * Retrieves the total number of posts in each section of the forum.
 * @async
 * @function getSectionsPostsCount
 * @returns {Promise<Array>} An array of objects containing the section ID, section name, and total number of posts in that section.
 */
module.exports.getSectionsPostsCount = async () => {
  const result = await Post.aggregate([
    {
      $lookup: {
        from: "sections",
        localField: "sectionId",
        foreignField: "_id",
        as: "section",
      },
    },
    {
      $group: {
        _id: { sectionid: "$sectionId", sectionname: "$section.name" },
        totalposts: { $sum: 1 },
      },
    },
  ]);

  return result;
};

/**
 * Retrieves the total number of posts created by each user.
 * @async
 * @function getUsersPostsCount
 * @returns {Promise<Array>} An array of objects containing the user ID, user name, and total number of posts created by that user.
 */
module.exports.getUsersPostsCount = async () => {
  const usersData = await Post.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $group: {
        _id: { userid: "$userId", username: "$user.name" },
        totalposts: { $sum: 1 },
      },
    },
  ]);
  return usersData;
};

/**
 * Retrieves the total number of posts in the database.
 * @async
 * @function getPostsCount
 * @returns {Promise<number>} The total number of posts in the database.
 */
module.exports.getPostsCount = async () => {
  return await Post.countDocuments();
};
