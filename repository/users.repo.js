const { User } = require("../models");
const { StatusCodes } = require("../app_constants");
const ApiError = require("../utils/api_error");

//? One User
module.exports.getOneUser = async function (userId) {
  const user = await User.findById(userId).populate("postscount");
  return user;
};

//? All Users
module.exports.getAllUsers = async function () {
  const users = await User.find(); //.populate("postscount");
  return users;
};

module.exports.getUserByEmail = async function (email) {
  const user = await User.findOne({
    email: email,
  }).populate("postscount");

  // if (!user) {
  //   throw new ApiError(
  //     `there is no user with this email`,
  //     StatusCodes.NOT_FOUND
  //   );
  // }

  return user;
};

module.exports.updateOneUser = async function (userId, updateObj) {
  const document = await User.findByIdAndUpdate(userId, updateObj, {
    new: true,
  }).populate("postscount");

  if (!document) {
    throw new ApiError(`No user for this id ${userId}`, StatusCodes.NOT_FOUND);
  }
  // Trigger "save" event when update document
  document.save();

  return document;
};

module.exports.createUser = async function (createObj) {
  const document = await User.create(createObj);

  return document;
};
