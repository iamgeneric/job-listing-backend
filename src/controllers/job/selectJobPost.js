const Job = require("../../models/job")

const selectJobPost = async (req, res) => {
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

  module.exports = selectJobPost