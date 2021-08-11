const router = require("express").Router();

const createJobPost = require("../controllers/job/createJobPost");
const deleteJobPost = require("../controllers/job/deleteJobPost");
const {
  browseJobPosts,
  findJobPost,
} = require("../controllers/job/browseJobs");
const updateJobPost = require("../controllers/job/updateJobPost");
const searchJobPosts = require("../controllers/job/searchJobPost");

// unprotected routes
router.get("/", browseJobPosts);

// protected routes
router.post("/", createJobPost);
router.get("/query", searchJobPosts);
router.get("/:id", findJobPost);
router.put("/:id", updateJobPost);
router.delete("/:id", deleteJobPost);

module.exports = router;
