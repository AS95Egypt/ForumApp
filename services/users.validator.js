// models
//const User = require("../models/user_model");
// utils
const { Gender } = require("../app_constants");
const { UsersRepo } = require("../repository");
const validationMiddleware = require("../middlewares/validation.middleware");
const { param, body, validationResult } = require("../utils/validator");

const checkId = param("id").notEmpty().withMessage("please enter user id");
// .isMongoId()
// .withMessage("Invalid user id");

module.exports.registerUserValidator = [
  body("name").trim().isLength({ min: 3 }).notEmpty().withMessage("enter name"),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .notEmpty()
    .withMessage("enter password"),
  body("gender")
    .notEmpty()
    .withMessage("enter gender")
    .custom((gender) => {
      if (!Object.values(Gender).includes(gender)) {
        throw new Error(`Invalid gender value`);
      }
    }),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("enter email")
    .isEmail()
    .withMessage("email is not valid")
    .custom(async (email) => {
      user = await UsersRepo.getUserByEmail(email);
      if (user) {
        throw new Error(`This email already exists`);
      }
    }),
  validationMiddleware,
];

// TODO perform sanitization for all inputs
//? Login User Validator
module.exports.loginUserValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("enter email")
    .isEmail()
    .withMessage("email is not valid"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password is empty")
    .isLength({ min: 3 })
    .withMessage("too short password"),
  validationMiddleware,
];

//? Get User Info Validator
module.exports.getUserInfoValidator = [checkId, validationMiddleware];

//? Update Validator
module.exports.updateUserValidator = [
  body("name").trim().isLength({ min: 3 }).notEmpty().withMessage("enter name"),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .notEmpty()
    .withMessage("enter password"),
  body("gender").notEmpty().withMessage("enter gender"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("enter email")
    .isEmail()
    .withMessage("email is not valid"),

  validationMiddleware,
];

//? Activate User Validator
module.exports.activateUserValidator = [
  param("id")
    .notEmpty()
    .withMessage("please enter user id")
    .isMongoId()
    .withMessage("Invalid user id")
    .custom(async (userId) => {
      const user = await UsersRepo.getOneUser(userId);
      // check user exists
      if (!user) {
        throw new Error(`No User found for this id ${userId}`);
      }
      // check user active
      if (user.active) {
        throw new Error(`User with id ${userId} is already active`);
      }
    }),
  validationMiddleware,
];

//? Deactivate User Validator
module.exports.deActivateUserValidator = [
  checkId.custom(async (userId) => {
    const user = await UsersRepo.getOneUser(userId);
    // check user exists
    if (!user) {
      throw new Error(`No User found for this id ${userId}`);
    }
    // check user not active
    if (!user.active) {
      throw new Error(`User with id ${userId} is already not active`);
    }
  }),
  validationMiddleware,
];
