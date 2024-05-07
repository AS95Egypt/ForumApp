module.exports.SuccessMsgs = {
  sectionActivated: "section has activated.",
  sectionDeactivated: "section has deactivated.",
};
module.exports.FailureMsgs = {};
module.exports.ValidationMsgs = {
  postIdRequired: "Post id is required",
  invalidPostId: "Invalid post id",
  invalidSectionId: "Invalid section id",
  userIdRequired: "User id is required",
  SectionIdRequired: "Section id is required",
  userIdNotFound: (userId) => `No user found for this id ${userId}`,
  userIdIsNotActive: (userId) => `User with id ${userId} is not active`,
};
