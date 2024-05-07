const express = require("express");
const UsersServices = require("../services/users.services");
const UsersValidator = require("../services/users.validator");
const router = express.Router();

// get all users
router.get("/user/", UsersServices.getAllUsers);

// login
router.post(
  "/user/login",
  UsersValidator.loginUserValidator,
  UsersServices.loginUser
);

// Register user
router.post(
  "/user/register",
  UsersValidator.registerUserValidator,
  UsersServices.registerUser
);

// ------- /user/:id
router
  .route("/user/:id")
  // get one user
  .get(/*UsersValidator.getUserInfoValidator,*/ UsersServices.getUserInfo)

  // update user
  .put(UsersValidator.updateUserValidator, UsersServices.updateUser);

// activate user
router.put(
  "/user/activate/:id",
  UsersValidator.activateUserValidator,
  UsersServices.activateUser
);

// deactivate user
router.put(
  "/user/deactivate/:id",
  UsersValidator.deActivateUserValidator,
  UsersServices.deactivateUser
);

module.exports = router;
