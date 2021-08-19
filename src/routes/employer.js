const router = require("express").Router();

// Import route logic functions from route controller
const employerBasics = require("../controllers/employer/employerBasics");
const employerUpdate = require("../controllers/employer/employerUpdate");

// Import authentication middleware
const authorize = require("../middlewares/authorize");

// Set routes for Employer Acount Basic Operations
router.post("/signup", employerBasics.signUp);
router.post("/signin", employerBasics.signIn);
router.get("/logout", employerBasics.logOut);

// Set protected routes for Employer Account Administration Operations
router.get("/", authorize, employerUpdate.getAccountInfo);
router.put("/update", authorize, employerUpdate.editAccountInfo);
router.put("/change-password", authorize, employerUpdate.changePassword);

module.exports = router;
