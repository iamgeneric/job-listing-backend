const Joi = require("joi");

const applicationValidation = (application) => {
  const schema = Joi.object({
    surname: Joi.string().min(2).max(255).required(),
    firstName: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
  }).unknown();

  return schema.validate(application);
};

module.exports = applicationValidation;
