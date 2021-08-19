const router = require("express").Router();

const createJobPost = require("../controllers/job/createJobPost");
const deleteJobPost = require("../controllers/job/deleteJobPost");
const browseJobPosts = require("../controllers/job/browseJobs");
const selectJobPost = require("../controllers/job/selectJobPost")
const updateJobPost = require("../controllers/job/updateJobPost");
const searchJobPosts = require("../controllers/job/searchJobPost");
const applyForjob = require("../controllers/job/applyForJob");

// unprotected routes
router.get("/", browseJobPosts);
router.get("/query", searchJobPosts); // location or keyword
router.get("/:id", selectJobPost);
router.post("/apply/:id", applyForjob);

// protected routes
router.post("admin/", createJobPost);
router.put("admin/:id", updateJobPost);
router.delete("admin/:id", deleteJobPost);

module.exports = router;
