const Job = require("../../models/job");
const jobValidation = require("../../validations/job");

// Create New Job
const createJobPost = async (req, res) => {
  try {
    // validate before creating new job post
    const { error } = jobValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // save new job post
    const job = new Job({ ...req.body});
    await job.save();

    res.status(201).json({ status: "success", msg: "New job posted.", job });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = createJobPost;
