const Job = require("../../models/job");

const browseJobPosts = async (req, res) => {
  try {
    const jobs = await Job.find();
    if (items.length === 0)
      return res
        .status(200)
        .json({ status: "success", msg: "There are no jobs!" });
    res.json(jobs);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

const findJobPost = async (req, res) => {
    try {
      const job = await Job.findById(req.params.id );
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

  module.exports = {browseJobPosts,findJobPost};