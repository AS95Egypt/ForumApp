const { User } = require("../models");
const { UsersRepo } = require("../repository");
const { StatusCodes, Gender } = require("../app_constants");
const { generateJWT, encryptPassword } = require("../utils/common_utils");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/api_error");
const routeHandler = require("../utils/routes_handlers");

//? get All Users
module.exports.getAllUsers = routeHandler.getAll(User, "postscount");

//? Register User
module.exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, active, gender } = req.body;
  const encryptedPassword = await encryptPassword(password);

  // if (!Object.values(Gender).includes(gender)) {
  //   throw new Error(`Invalid gender value`);
  // }

  const newUser = await UsersRepo.createUser({
    name,
    gender,
    email,
    password: encryptedPassword,
    active,
  });

  res.status(StatusCodes.CREATED).json({
    success: true,
    data: {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      active: newUser.active,
      gender: newUser.gender,
      postscount: 0,
      token: generateJWT(newUser._id),
    },
    message: "user created successfully",
  });
});

//? Login User
module.exports.loginUser = asyncHandler(async (req, res, next) => {
  const user = await UsersRepo.getUserByEmail(req.body.email);

  // check user exist
  if (!user) {
    return next(new ApiError(`User not found`, StatusCodes.NOT_FOUND));
  }

  // check user is Active
  if (!user.active) {
    return next(new ApiError(`this user is not active`, StatusCodes.FORBIDDEN));
  }

  bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
    if (err) {
      // when not match
      return next(
        new ApiError(
          "Authentication failed, wrong password",
          StatusCodes.UN_AUHROIZED
        )
      );
    }

    if (isMatch) {
      // return them in json
      return res.json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          password: user.password,
          active: user.active,
          gender: user.gender,
          postscount: user.postscount,
          token: generateJWT(user._id),
        },
        message: "User login successfully",
      });
    } else {
      return next(
        new ApiError(
          "Authentication failed, wrong password",
          StatusCodes.UN_AUHROIZED
        )
      );
    }
  });
});

//? Get User Info
//module.exports.getUserInfo = routeHandler.getOne(User, "postscount");
module.exports.getUserInfo = async (req, res, next) => {
  const { id } = req.params;
  // 1) Build query
  let query = User.findById(id).populate("postscount");

  // 2) Execute query
  const document = await query.lean();

  if (!document) {
    return next(
      new ApiError(`No document for this id ${id}`, StatusCodes.NOT_FOUND)
    );
  }
  res.json({ success: true, data: document });
};

//? Update User
module.exports.updateUser = asyncHandler(async (req, res) => {
  const updatedUser = await UsersRepo.updateOneUser(req.params.id, {
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
  });

  res.json({
    success: true,
    data: {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      password: updatedUser.password,
      active: updatedUser.active,
      gender: updatedUser.gender,
      postscount: updatedUser.postscount,
    },
    message: "user updated successfully",
  });
});

//? Activate User
module.exports.activateUser = asyncHandler(async (req, res) => {
  // Deactivate
  const newUser = await UsersRepo.updateOneUser(req.params.id, {
    active: true,
  });

  res.json({
    success: true,
    data: {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      active: newUser.active,
      gender: newUser.gender,
      postscount: newUser.postscount,
    },
    message: "User has activated.",
  });
});

//? Deactivate User
module.exports.deactivateUser = asyncHandler(async (req, res) => {
  // Deactivate
  const newUser = await UsersRepo.updateOneUser(req.params.id, {
    active: false,
  });

  res.json({
    success: true,
    data: {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      active: newUser.active,
      gender: newUser.gender,
      postscount: newUser.postscount,
    },
    message: "User has deactivated.",
  });
});
