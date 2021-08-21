const Joi = require("joi");

const applicationValidation = (application) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(255).required(),
    surname: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    NIN: Joi.string().min(11).max(11).required(),
    phoneNo: Joi.string().min(6).max(20).required(),
    dateOfBirth: Joi.string().min(2).max(255).required(),
    stateOfOrigin: Joi.string().min(2).max(50).required(),
    nationality: Joi.string().min(2).max(50).required(),
    gender: Joi.string().min(2).max(50).required(),
    education: Joi.string().min(2).max(50).required(),
  }).unknown();

  return schema.validate(application);
};

module.exports = applicationValidation;
