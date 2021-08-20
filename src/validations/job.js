const Joi = require("joi");

const jobValidation = (jobPost) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(255).required(),
    description: Joi.string().min(2).max(5000).required(),
    category: Joi.string().min(2).max(5000).required(),
    location: Joi.string().min(2).max(255).required(),
    objectives: Joi.string().min(2).max(5000).required(),
    skillsRequired: Joi.string().min(2).max(5000).required(),
    knowledgeRequired: Joi.string().min(2).max(5000).required(),
    keyword: Joi.string().min(2).max(255).required(),
  }).unknown();

  return schema.validate(jobPost);
};

module.exports = jobValidation;
