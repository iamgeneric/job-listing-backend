const Job = require("../../models/job")

// Update Job Post
const updateJobPost = async (req, res) => {
  try {
    let job = await Job.findOne({ _id: req.params.id, user: req.user.id });
    if (!job)
      return res
        .status(404)
        .json({ status: "failed", msg: `Job with ID ${_id} not found!` });

    // Limit job post changes via this route to only the following
    const { title, description } = req.body;

    // User can update or leave out any of these fields
    if (title) job.title = title;
    if (description) job.description = description;
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

module.exports = updateJobPost;
