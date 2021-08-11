const Job = require("../../models/job");

// Update Job Post
const updateJobPost = async (req, res) => {
  try {
    let job = await Job.findOne({_id: req.params.id});
    if (!job)
      return res
        .status(404)
        .json({
          status: "failed",
          msg: `Job with ID ${req.params.id} not found!`,
        });

    // Limit job post changes via this route to only the following
    const { title, description, location, keyword} = req.body;

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

module.exports = updateJobPost;
