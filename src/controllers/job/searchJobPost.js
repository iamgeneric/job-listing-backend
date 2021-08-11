const Job = require("../../models/job");

const searchJobPosts= async (req, res) => {
  try {
    if (req.query.keyword) {
      const jobs = await Job.find({keyword: `${req.query.keyword}`});
      console.log(jobs)
      if (jobs.length === 0)
        return res
          .status(200)
          .json({ status: "success", msg: `There are no job posts with ${req.query.keyword}!` });
      res.json(jobs);
    }
    if (req.query.location ) {
      const jobs = await Job.find({location: `${req.query.location}`});
    if (jobs.length === 0)
      return res
        .status(200)
        .json({ status: "success", msg: `There are no job posts for ${req.query.location}!` });
    res.json(jobs);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

  module.exports = searchJobPosts