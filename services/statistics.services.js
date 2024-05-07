const { PostsRepo, SectionsRepo, UsersRepo } = require("../repository");
// const Post = require("../models/post_model");
// const User = require("../models/user_model");
// const Section = require("../models/section_model");
const { StatusCodes } = require("../app_constants");
const asyncHandler = require("express-async-handler");

module.exports.getStatisticsData = asyncHandler(async (req, res) => {
  const postsCount = await PostsRepo.getPostsCount();
  // ==== Using populate
  const sections = await SectionsRepo.getAllSections();
  const users = await UsersRepo.getAllUsers();

  // ==== Using aggregate
  const sectionsData = await PostsRepo.getSectionsPostsCount();
  const usersData = await PostsRepo.getUsersPostsCount();

  // Reponse
  return res.json({
    postscount: postsCount,
    sections: sections.map((s) => {
      return { name: s.name, postscount: s.postscount };
    }),
    sectionsData: sectionsData.map((s) => {
      return {
        sectionid: s._id.sectionid,
        sectionname: s._id.sectionname[0],
        totalposts: s.totalposts,
      };
    }),
    users: users,
    // users.map((u) => {
    //   return {
    //     name: u.name,
    //     email: u.email,
    //     active: u.active,
    //     postscount: u.postscount,
    //   };
    // }),
    usersData: usersData.map((u) => {
      return {
        userid: u._id.userid,
        username: u._id.username[0],
        totalposts: u.totalposts,
      };
    }),
  });
});
