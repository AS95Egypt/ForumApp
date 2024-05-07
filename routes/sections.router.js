const express = require("express");
const SectionsService = require("../services/sections.services");
const SectionValidator = require("../services/sections.validator");

const router = express.Router();

//------- /Section
router
  .route("/section/")
  // get all sections
  .get(SectionsService.getAllSections)
  // add new section
  .post(SectionValidator.createSectionValidator, SectionsService.createSection);

// write a route to delete a section permanently by id like the sample below

//-------- /section/:id
router
  .route("/section/:id")
  // get one section
  .get(SectionValidator.getSectionInfoValidator, SectionsService.getSectionInfo)
  // update Section
  .put(SectionValidator.updateSectionValidator, SectionsService.updateSection);

//-------- activate section
router.put(
  "/section/activate/:id",
  SectionValidator.activateSectionValidator,
  SectionsService.activateSection
);

//-------- deactivate section
router.put(
  "/section/deactivate/:id",
  SectionValidator.deActivateSectionValidator,
  SectionsService.deactivateSection
);

module.exports = router;
