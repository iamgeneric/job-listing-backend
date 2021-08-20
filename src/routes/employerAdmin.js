const router = require("express").Router();

// Import route logic functions from route controller
const employerAdmin = require("../controllers/employerAdmin");
const jobAdmin = require("../controllers/jobAdmin");

// Protected job post CRUD routes
router.get("/job", jobAdmin.getEmployerJobPosts);
router.get("/job", jobAdmin.getApplicationsForEmployer);
router.post("/job/create", jobAdmin.createJobPost);
router.put("/job/update/:id", jobAdmin.updateJobPost);
router.delete("/job/delete/:id", jobAdmin.deleteJobPost);

// Set protected routes for Employer Account Administration Operations
router.get("/account", employerAdmin.getAccountInfo);
router.put("/account/update", employerAdmin.editAccountInfo);
router.put("/account/change-password", employerAdmin.changePassword);

module.exports = router;
