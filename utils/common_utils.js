const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// TODO: move to security utils
module.exports.generateJWT = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// TODO: move to security utils / user utils
module.exports.encryptPassword = async function (password) {
  const salt = process.env.PASSWORD_SALT;
  const encryptedPass = await bcrypt.hash(password, salt);
  return encryptedPass;
  //return password;
};

// TODO document all functions like this
/**
 * this function accepts body and return javascript object which contains body fields exists in mongoose model only.
 * @param {mongoose.model} a - Mongoose model
 * @param {Object} b - request body object
 * @returns {Object} new object with matched properties
 */
module.exports.mapBodyToModel = (model, body) => {
  const docFields = {};
  const modelFields = Object.keys(model.schema.paths);

  for (const key in body) {
    if (modelFields.includes(key)) {
      docFields[key] = body[key];
    }
  }
  return docFields;
};
