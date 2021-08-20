const router = require("express").Router();

const uploadResume = require("../utils/multer");
const browseJobPosts = require("../controllers/job/browseJobs");
const selectJobPost = require("../controllers/job/selectJobPost");
const searchJobPosts = require("../controllers/job/searchJobPost");
const applyForjob = require("../controllers/job/applyForJob");

// unprotected routes
router.get("/", browseJobPosts);
router.get("/query", searchJobPosts); // location or keyword
router.get("/:id", selectJobPost);
router.post("/apply/:id", uploadResume, applyForjob);

module.exports = router;
