const Job = require("../models/job");
const Application = require("../models/application");
const applicationValidation = require("../validations/application");

// Get All Job Posts
exports.browseJobPosts = async (req, res) => {
  try {
    const jobs = await Job.find();
    if (jobs.length === 0)
      return res
        .status(200)
        .json({ status: "success", msg: "There are no jobs!" });
    res.json(jobs);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

// Search Job Posts Using Location or Keyword Query
exports.searchJobPosts = async (req, res) => {
  try {
    // Search for job posts using keyword
    // localhost:4000/query?keyword=Engineering
    if (req.query.keyword) {
      const jobs = await Job.find({ keyword: `${req.query.keyword}` });
      if (jobs.length === 0)
        return res.status(200).json({
          status: "success",
          msg: `there are no job posts with ${req.query.keyword}!`,
        });
      res.json(jobs);
    }

    // Search for job posts using location
    // localhost:4000/query?location=Asaba
    if (req.query.location) {
      const jobs = await Job.find({ location: `${req.query.location}` });
      if (jobs.length === 0)
        return res.status(200).json({
          status: "success",
          msg: `there are no job posts for ${req.query.location}!`,
        });
      res.json(jobs);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

// Select Specific Job Post
exports.selectJobPost = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job)
      return res.status(404).json({
        status: "failed",
        msg: `Job not found!`,
      });
    res.json(job);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// Create New Job Application
exports.applyForJob = async (req, res) => {
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

    // If no resume uploaded, otherwise return resume link
    if (req.file == undefined)
      return res
        .status(200)
        .json({ status: "failed", msg: "Please attach resume!" });
    const resumeURI = `https://deltajob-ng.herokuapp.com/uploads/resume/${req.file.filename}`;

    // save new job application
    const application = new Application({
      ...req.body,
      jobId,
      resume: resumeURI,
    });
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
