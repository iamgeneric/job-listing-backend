const Job = require("../../models/job");
const Application = require("../../models/application");
const applicationValidation = require("../../validations/application");

// Create New Job Application
const applyForJob = async (req, res) => {
  try {
    // validate before creating new job application
    const { error } = applicationValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // fetch job id
    const job = await Job.findById(req.params.id);
    if (!job)
      return res.status(404).json({
        status: "failed",
        msg: `Job not found!`,
      });

    // if jobseeker has already applied for job, prevent reapplication
    let jobId = req.params.id;
    let applicationExists = await Application.findOne({
      email: req.body.email,
      jobId,
    });
    if (applicationExists)
      return res.json({ msg: "You have already applied!" });

    // save new job application
    const application = new Application({ ...req.body, jobId });
    await application.save();

    res.status(201).json({
      status: "success",
      msg: "You have successfully applied!",
      application,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = applyForJob;
