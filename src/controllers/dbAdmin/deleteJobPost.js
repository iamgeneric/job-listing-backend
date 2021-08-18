const Job = require("../../models/job");

const deleteJobPost = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job)
      return res
        .status(404)
        .json({ status: "failed", msg: `Job with ID ${req.params.id} not found!` });
    res.status(200).json({
      status: "success",
      msg: `Job with ID ${job._id} successfully deleted.`,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = deleteJobPost;
