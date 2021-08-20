const router = require("express").Router();

// Import route logic functions from route controller
const employerBasics = require("../controllers/employer/employerBasics");
const employerUpdate = require("../controllers/employer/employerUpdate");
const createJobPost = require("../controllers/job/createJobPost");
const deleteJobPost = require("../controllers/job/deleteJobPost");
const updateJobPost = require("../controllers/job/updateJobPost");

// // Import authentication middleware
// const authorize = require("../middlewares/authorize");

// Set routes for Employer Acount Basic Operations
router.post("/signup", employerBasics.signUp);
router.post("/signin", employerBasics.signIn);
router.get("/logout", employerBasics.logOut);

// Protected job post CRUD routes
router.post("/job/create", createJobPost);
router.put("/job/update/:id", updateJobPost);
router.delete("/job/delete/:id", deleteJobPost);

// Set protected routes for Employer Account Administration Operations
router.get("/", employerUpdate.getAccountInfo);
router.put("/update", employerUpdate.editAccountInfo);
router.put("/change-password", employerUpdate.changePassword);

module.exports = router;
