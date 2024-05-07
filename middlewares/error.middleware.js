const ApiError = require("../utils/api_error");
const { StatusCodes } = require("../app_constants");
require("dotenv").config();

const sendErrorForDev = (err, res) =>
  res.status(err.statusCode).json({
    success: err.success,
    error: err,
    message: err.message,
    stack: err.stack,
  });

const sendErrorForProd = (err, res) =>
  res.status(err.statusCode).json({
    success: err.success,
    message: err.message,
  });

function globalErrorMiddleware(err, req, res, next) {
  err.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  err.success = err.success || false;
  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(err, res);
  } else {
    if (err.name === "JsonWebTokenError")
      err = new ApiError(
        "Invalid token, please login again..",
        StatusCodes.UN_AUHROIZED
      );
    if (err.name === "TokenExpiredError")
      err = new ApiError(
        "Expired token, please login again..",
        StatusCodes.UN_AUHROIZED
      );

    sendErrorForProd(err, res);
  }
}

module.exports = globalErrorMiddleware;
