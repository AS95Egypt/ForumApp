// Http status codes
module.exports.StatusCodes = {
  //* 2**
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  //! 4**
  BAD_REQUEST: 400,
  UN_AUHROIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  //! 5**
  INTERNAL_SERVER_ERROR: 500,
};

module.exports.DatabaseEvents = {
  CONNECTED: "connected",
};

module.exports.DEFAULT_PAGE_SIZE = 10;

module.exports.Gender = {
  MALE: "Male",
  FEMALE: "Female",
};

module.exports.CustomPagesLabels = {
  docs: "data",
};
