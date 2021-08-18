const Application = require("../../models/application");
const applicationValidation = require("../../validations/application");

// Create New Job Application
const createJobApplication = async (req, res) => {
  try {
    // validate before creating new job application
    const { error } = applicationValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let applicant = await Application.find({ email: req.body.email });
    let jobId = req.body.jobId;

    // save new job application
    const application = new Application({ ...req.body });
    await application.save();

    res.status(201).json({
      status: "success",
      msg: "You have successfully applied!",
      application,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = createJobApplication;
