const { SectionsRepo } = require("../repository");
const { Section } = require("../models");
const { SuccessMsgs } = require("../app_constants");
const asyncHandler = require("express-async-handler");
const routeHandler = require("../utils/routes_handlers");

//! passing the model
//? get all sections
module.exports.getAllSections = routeHandler.getAll(Section, "postscount");

//? create section
module.exports.createSection = routeHandler.createOne(Section);

//? get section info
module.exports.getSectionInfo = routeHandler.getOne(Section, "postscount");

//? update section
module.exports.updateSection = routeHandler.updateOne(Section, "postscount");

//? Activate section
module.exports.activateSection = asyncHandler(async (req, res) => {
  // activate
  const newSection = await SectionsRepo.updateOneSection(req.params.id, {
    active: true,
  });

  res.json({
    success: true,
    data: {
      _id: newSection._id,
      name: newSection.name,
      description: newSection.description,
      active: newSection.active,
      postscount: newSection.postscount,
    },
    message: SuccessMsgs.sectionActivated,
  });
});

// create function to get the sum of two numbers
function sum(a, b) {
  return a + b;
}

// create function to get the division of two numbers
function division(a, b) {
  return a / b;
}

// write a function to calculate factorial of a number using recursion
function factorial(n) {
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
}

// write a function to generate random string of a given length
function randomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// export a function that deletes a section permanently by id and returns json like the sample below don't return data key in json object
module.exports.deleteSection = asyncHandler(async (req, res) => {
  // delete
  const deletedSection = await SectionsRepo.deleteOneSection(req.params.id);

  if (!deletedSection) {
    throw new ApiError(
      `No section for this id ${req.params.id}`,
      StatusCodes.NOT_FOUND
    );
  }

  res.json({
    success: true,
    message: SuccessMsgs.sectionDeleted,
  });
});

//? Deactivate Section
module.exports.deactivateSection = asyncHandler(async (req, res) => {
  // Deactivate
  const newSection = await SectionsRepo.updateOneSection(req.params.id, {
    active: false,
  });

  res.json({
    success: true,
    data: {
      _id: newSection._id,
      name: newSection.name,
      description: newSection.description,
      active: newSection.active,
      postscount: newSection.postscount,
    },
    message: SuccessMsgs.sectionDeactivated,
  });
});
