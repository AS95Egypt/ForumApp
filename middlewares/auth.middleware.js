// packages
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();

// app
const { StatusCodes } = require("../app_constants");

function timingSafeEqual(op1, op2) {
  const hash = crypto.createHash("sha512");
  return crypto.timingSafeEqual(
    hash.copy().update(op1).digest(),
    hash.copy().update(op2).digest()
  );
}

// authenticate API Key
exports.authApiKeyMiddleware = function (req, res, next) {
  const apiKey = req.header("api-key");

  if (
    apiKey &&
    timingSafeEqual(
      apiKey,
      //"763db502a8e8f06c79481f63ed3db8b8"
      process.env.API_KEY
    )
  ) {
    next();
  } else {
    return res.status(StatusCodes.UN_AUHROIZED).send({
      success: false,
      message: "Unauthorized API Key",
    });
  }
};

// authenticate Employee using API Token
exports.authTokenMiddleware = async function (req, res, next) {
  const unAuthorizedRoutes = ["/user/login", "/user/register"];

  if (unAuthorizedRoutes.includes(req.url)) {
    return next();
  } else {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return next(
        new ApiError(
          "You are not login, Please login to get access this route",
          401
        )
      );
    }
    try {
      token = req.headers.authorization.split(" ")[1];

      const payload = jwt.verify(token, process.env.JWT_SECRET);
      if (payload) {
        return next();
        // check id is valid
        // TODO: Its not place to check the ID is valid or not
        // TODO: we here test the validity of token only
        // if (!mongoose.Types.ObjectId.isValid(payload.id)) {
        //   return res.status(StatusCodes.BADREQUEST).json({
        //     success: false,
        //     data: null,
        //     message: "Invalid user id",
        //   });
        // }
        // const user = await User.findById(payload.id);
        // if (user) {
        //   if (user.active) {
        //     return next();
        //   } else {
        //     // execulde this path from this check
        //     if (!req.url.includes("/activate/")) {
        //       return res.status(StatusCodes.FORBIDDEN).json({
        //         success: false,
        //         data: null,
        //         message: "this user is not active",
        //       });
        //     } else {
        //       return next();
        //     }
        //   }
        // } else {
        //   return res.status(StatusCodes.NOTFOUND).json({
        //     success: false,
        //     message: "User not found",
        //   });
        // }
      } else {
        return res.status(StatusCodes.UN_AUHROIZED).json({
          success: false,
          data: null,
          message: "user is not authorized, invalid token",
        });
      }
    } catch (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: err.message });
    }
    // } else {
    //   return res.status(StatusCodes.UNAUHROIZED).json({
    //     success: false,
    //     data: null,
    //     message: "user is not authorized, not token provided",
    //   });
  }
};
