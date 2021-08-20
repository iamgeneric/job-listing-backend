const router = require("express").Router();

// Import route logic functions from route controller
const employerBasic = require("../controllers/employerBasic");

// Set routes for Employer Acount Basic Operations
router.post("/signup", employerBasic.signUp);
router.post("/signin", employerBasic.signIn);
router.get("/logout", employerBasic.logOut);

module.exports = router;
