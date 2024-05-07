const { Section } = require("../models");
const ApiError = require("../utils/api_error");

module.exports.getOneSection = async function (sectionId) {
  const section = await Section.findById(sectionId).populate("postscount");
  return section;
};

module.exports.getAllSections = async function () {
  const sections = await Section.find().populate("postscount");
  return sections;
};

// write an export function like below to delete a section permanently by id using findByIdAndDelete method
module.exports.deleteOneSection = async function (sectionId) {
  const section = await Section.findByIdAndDelete(sectionId);

  return section;
};

module.exports.updateOneSection = async function (sectionId, updateObj) {
  const document = await Section.findByIdAndUpdate(sectionId, updateObj, {
    new: true,
  }).populate("postscount");

  if (!document) {
    throw new ApiError(
      `No section for this id ${sectionId}`,
      StatusCodes.NOT_FOUND
    );
  }
  // Trigger "save" event when update document
  document.save();

  return document;
};
