const router = require("express").Router();

const uploadResume = require("../utils/multer");
const jobBasic = require("../controllers/jobBasic");

// unprotected routes
router.get("/", jobBasic.browseJobPosts);
router.get("/search/query", jobBasic.searchJobPosts); // location or keyword
router.get("/job/:id", jobBasic.selectJobPost);
router.post("/apply/:id", uploadResume, jobBasic.applyForJob);

module.exports = router;
