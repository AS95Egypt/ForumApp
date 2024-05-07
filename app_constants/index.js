const {
  StatusCodes,
  Gender,
  CustomPagesLabels,
  DEFAULT_PAGE_SIZE,
  DatabaseEvents,
} = require("./constants.js");

const { DBCollections } = require("./db_collections.js");

const { SuccessMsgs, FailureMsgs, ValidationMsgs } = require("./messages.js");

module.exports = {
  // Constants
  StatusCodes,
  Gender,
  CustomPagesLabels,
  DEFAULT_PAGE_SIZE,
  DatabaseEvents,

  // DB Collections
  DBCollections,

  // Messages
  SuccessMsgs,
  FailureMsgs,
  ValidationMsgs,
};
