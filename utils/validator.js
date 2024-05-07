const { User } = require("../models");
const { ExpressValidator } = require("express-validator");

const customValidators = {
  emailExists: async (value) => {
    // >>> check if user already exists
    const userExisted = await User.findOne({ email: value }).exec();
    if (userExisted) {
      throw new Error("E-mail already in use");
    } else {
      return true;
    }
  },
};

const customSanitizers = {
  sanitizeObjecId: (value) => {
    const regex = /[^a-zA-Z0-9\s]/g;
    return value.replaceAll(regex, "");
  },
  sanitizeEmail: (value) => {
    const regex = /[^a-zA-Z0-9.@\s]/g;
    return value.replaceAll(regex, "");
  },
};

module.exports = new ExpressValidator(customValidators, customSanitizers);
