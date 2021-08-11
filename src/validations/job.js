const Joi = require("joi");

const jobValidation = (jobPost) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(255).required(),
    description: Joi.string().min(2).max(1000).required(),
    content: Joi.string().min(2).max(5000).required(),
    location: Joi.string().min(2).max(255).required(),
    keyword: Joi.string().min(2).max(255).required(),
  }).unknown();

  return schema.validate(jobPost);
};

module.exports = jobValidation;
