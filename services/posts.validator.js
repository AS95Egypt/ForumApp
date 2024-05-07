// Utils
const { UsersRepo, SectionsRepo } = require("../repository");
const { StatusCodes, ValidationMsgs } = require("../app_constants");
const { param, check, body } = require("../utils/validator");
const validationMiddleware = require("../middlewares/validation.middleware");

// TODO arrange these uses

const checkId = param("id")
  .notEmpty()
  .withMessage(ValidationMsgs.postIdRequired)
  .isMongoId()
  .withMessage(ValidationMsgs.invalidPostId);

const checkUserId = check("userId")
  .notEmpty()
  .withMessage(ValidationMsgs.userIdRequired)
  .isMongoId()
  .withMessage("Invalid user id")
  .custom(async (userId) => {
    const user = await UsersRepo.getOneUser(userId);
    // check user exists
    if (!user) {
      throw new Error(ValidationMsgs.userIdNotFound(userId));
    }
    // check user active
    if (!user.active) {
      throw new Error();
    }
  });

const checkSectionId = check("sectionId")
  .notEmpty()
  .withMessage(ValidationMsgs.SectionIdRequired)
  .isMongoId()
  .withMessage(ValidationMsgs.invalidSectionId)
  .custom(async (sectionId) => {
    const section = await SectionsRepo.getOneSection(sectionId);
    // check section exists
    if (!section) {
      throw new Error(`No section found for this id ${sectionId}`);
    }
    // check section active
    if (!section.active) {
      throw new Error(`Section with id ${sectionId} is not active`);
    }
  });

//? Create Post Validator
module.exports.createPostValidator = [
  body("title")
    .notEmpty()
    .withMessage("please enter post title")
    .isLength({ min: 3, max: 50 })
    .withMessage("too short post title"),
  body("body")
    .notEmpty()
    .withMessage("please enter post body")
    .isLength({ min: 7, max: 255 })
    .withMessage("too short post body"),

  checkUserId,
  checkSectionId,

  validationMiddleware,
];

//? Get Post Info Validator
module.exports.getPostInfoValidator = [checkId, validationMiddleware];

//? Update Post Validator
module.exports.udpatePostValidator = [checkId, ...this.createPostValidator];

//? Get Posts by section Validator
module.exports.getPostsBySectionValidator = [
  checkSectionId,
  validationMiddleware,
];

//?  Get Posts by user validator
module.exports.getPostsByUserValidator = [checkUserId, validationMiddleware];

//? get User posts by section validator
module.exports.getUserPostsBySectionValidator = [
  checkUserId,
  checkSectionId,
  validationMiddleware,
];

//? Delete Post validator
module.exports.deletePostValidator = [checkId, validationMiddleware];
