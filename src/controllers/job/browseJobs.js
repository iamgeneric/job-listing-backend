const Job = require("../../models/job");

const browseJobPosts = async (req, res) => {
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

module.exports = browseJobPosts ;
