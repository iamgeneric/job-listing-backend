const Job = require("../models/job");
const Application = require("../models/application");
const jobValidation = require("../validations/job");

// Create New Job Post
exports.createJobPost = async (req, res) => {
  try {
    // validate before creating new job post
    const { error } = jobValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // save new job post
    const employerId = req.employer.id;
    const job = new Job({ ...req.body, employerId });
    await job.save();

    res.status(201).json({ status: "success", msg: "New job posted.", job });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get All Job Posts Created by Signed-In Employer
exports.getEmployerJobPosts = async (req, res) => {
  try {
    const jobs = await Job.find({ employerId: req.employer.id });
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

// Get All Applications to Job Post Created by Signed-In Employer
exports.getApplicationsForEmployer = async (req, res) => {
  try {
    const applications = await Application.find({ employerId: req.employer.id });
    if (applications.length === 0)
      return res
        .status(200)
        .json({ status: "success", msg: "There are no applications!" });
    res.json(applications);
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

// Update Job Post
exports.updateJobPost = async (req, res) => {
  try {
    let job = await Job.findOne({ _id: req.params.id });
    if (!job)
      return res.status(404).json({
        status: "failed",
        msg: `Job with ID ${req.params.id} not found!`,
      });

    // Limit job post changes via this route to only the following
    const { title, description, location, keyword } = req.body;

    // User can update or leave out any of these fields
    if (title) job.title = title;
    if (description) job.description = description;
    if (location) job.location = location;
    if (keyword) job.keyword = keyword;
    await job.save();

    res.status(200).json({
      status: "success",
      msg: "Job post has been updated",
      job,
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

// Delete Job Post
exports.deleteJobPost = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job)
      return res.status(404).json({
        status: "failed",
        msg: `Job with ID ${req.params.id} not found!`,
      });
    res.status(200).json({
      status: "success",
      msg: `Job with ID ${job._id} successfully deleted.`,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
