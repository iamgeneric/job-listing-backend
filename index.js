const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const database = require("./config/database.js");

// Import Authorization Middleware
const authorize = require("./src/controllers/authorize");

// fetch database, app listen
database.connectDatabase(app);
console.log("...waiting for database connection...");

// body parser, cors
app.use(cors());
app.use(express.json());
app.use(cookieParser()); // Use cookies to set access token
// app.use(express.urlencoded({ extended: true }));
// app.use("/uploads/resume", express.static("public/uploads/resume"));

// import routes
const jobBasicRoutes = require("./src/routes/jobBasic");
const employerBasicRoutes = require("./src/routes/employerBasic");
const employerAdminRoutes = require("./src/routes/employerAdmin");

// Landing page
app.get("/", (req, res) => {
  res.send("<h1>Job Listing App<h1>");
});

// Set base routes
app.use("/jobs", jobBasicRoutes);
app.use("/account", employerBasicRoutes);
app.use("/employer", authorize, employerAdminRoutes);
