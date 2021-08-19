const Joi = require("joi");

const applicationValidation = (application) => {
  const schema = Joi.object({
    jobId: Joi.string().min(2).max(255).required(),
    surname: Joi.string().min(2).max(255).required(),
    firstName: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    NIN: Joi.string().min(11).max(11).required().email(),
    phoneNo: Joi.string().min(6).max(20).required().email(),
    dateOfBirth: Joi.string().min(2).max(255).required().email(),
    stateOfOrigin: Joi.string().min(2).max(50).required().email(),
    nationality: Joi.string().min(2).max(50).required().email(),
    gender: Joi.string().min(2).max(50).required().email(),
    education: Joi.string().min(2).max(50).required().email(),
    resume: Joi.string().min(2).max(255).required().email(),
  }).unknown();

  return schema.validate(application);
};

module.exports = applicationValidation;
