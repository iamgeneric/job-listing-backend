const router = require("express").Router();

// Import route logic functions from route controller
const employerBasics = require("../controllers/employer/employerBasics");
const employerUpdate = require("../controllers/employer/employerUpdate");
const createJobPost = require("../controllers/job/createJobPost");
const deleteJobPost = require("../controllers/job/deleteJobPost");
const updateJobPost = require("../controllers/job/updateJobPost");

// Import authentication middleware
const authorize = require("../middlewares/authorize");

// Set routes for Employer Acount Basic Operations
router.post("/signup", employerBasics.signUp);
router.post("/signin", employerBasics.signIn);
router.get("/logout", employerBasics.logOut);

// protected job post CRUD routes
router.post("/job/create", authorize, createJobPost);
router.put("/job/update/:id", authorize, updateJobPost);
router.delete("/job/delete/:id", authorize, deleteJobPost);

// Set protected routes for Employer Account Administration Operations
router.get("/", authorize, employerUpdate.getAccountInfo);
router.put("/update", authorize, employerUpdate.editAccountInfo);
router.put("/change-password", authorize, employerUpdate.changePassword);

module.exports = router;
