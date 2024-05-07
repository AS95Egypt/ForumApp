const { validationResult } = require("../utils/validator");
const { StatusCodes } = require("../app_constants");

function validationMiddleware(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: errors.array() });
  }
  next();
}

module.exports = validationMiddleware;
