const Joi = require("joi");

// =-=-=-=-=-= Employer Sign-Up Validation =-=-=-=-=-=
const employerSignUpValidation = (employer) => {
  const schema = Joi.object({
    companyName: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    location: Joi.string().min(2).max(255).required(),
    address: Joi.string().min(2).max(255).required(),
    phoneNo: Joi.string().min(2).max(255).required(),
    password: Joi.string().min(8).max(255).required(),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")),
  }).unknown();

  return schema.validate(employer);
};

// =-=-=-=-=-= Employer Sign-In Validation =-=-=-=-=-=
const employerSignInValidation = (employer) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  }).unknown();

  return schema.validate(employer);
};

// =-=-=-=-=-= Employer Password Change Validation =-=-=-=-=-=
const passwordChangeValidation = (employer) => {
  const schema = Joi.object({
    oldPassword: Joi.string().min(6).max(255).required(),
    newPassword: Joi.string().min(6).max(255).required(),
    confirmNewPassword: Joi.string().required().valid(Joi.ref("newPassword")),
  }).unknown();

  return schema.validate(employer);
};

module.exports = {
  employerSignUpValidation,
  employerSignInValidation,
  passwordChangeValidation,
};
