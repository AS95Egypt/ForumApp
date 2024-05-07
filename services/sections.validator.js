const { StatusCodes } = require("../app_constants");
const { SectionsRepo } = require("../repository");
const validationMiddleware = require("../middlewares/validation.middleware");
const { param, check, body } = require("../utils/validator");

const checkId = param("id")
  .notEmpty()
  .withMessage("please enter Section id")
  .isMongoId()
  .withMessage("Invalid Section id");

const checkSectionName = body("name")
  .notEmpty()
  .withMessage("please enter section name")
  .isLength({ min: 3, max: 50 })
  .withMessage("too short section name");

//? Create Section Validator
module.exports.createSectionValidator = [
  checkSectionName,
  validationMiddleware,
];

//? Get Section Info Validator
module.exports.getSectionInfoValidator = [checkId, validationMiddleware];

//? Update Section Validator
module.exports.updateSectionValidator = [
  checkId,
  checkSectionName,
  validationMiddleware,
];

//? Activate Section Validator
module.exports.activateSectionValidator = [
  param("id")
    .notEmpty()
    .withMessage("please enter Section id")
    .isMongoId()
    .withMessage("Invalid Section id")
    .custom(async (sectionId) => {
      const section = await SectionsRepo.getOneSection(sectionId);
      // check section exists
      if (!section) {
        throw new Error(`No section found for this id ${sectionId}`);
      }
      // check section active
      if (section.active) {
        throw new Error(`Section with id ${sectionId} is already active`);
      }
    }),
  validationMiddleware,
];

//? DeActivate Section Validator
module.exports.deActivateSectionValidator = [
  param("id")
    .notEmpty()
    .withMessage("please enter Section id")
    .isMongoId()
    .withMessage("Invalid section id")
    .custom(async (sectionId) => {
      const section = await SectionsRepo.getOneSection(sectionId);
      // check section exists
      if (!section) {
        throw new Error(`No section found for this id ${sectionId}`);
      }
      // check section is not active
      if (!section.active) {
        throw new Error(`Section with id ${sectionId} is already not active`);
      }
    }),
  validationMiddleware,
];
