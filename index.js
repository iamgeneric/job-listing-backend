const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const database = require("./config/database.js");

// fetch database, app listen
database.connectDatabase(app);
console.log("...waiting for database connection...");

// body parser, cors
app.use(express.json());
app.use(cookieParser()); // Use cookies to set access token
app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use("/uploads/resume", express.static("public/uploads/resume"));

// Import Authorization Middleware
const authorize = require("./src/middlewares/authorize");

// import routes
const jobBasicRoutes = require("./src/routes/jobBasic");
const employerBasicRoutes = require("./src/routes/employerBasic");
const employerAdminRoutes = require("./src/routes/employerAdmin");

// Set base routes
app.use("/", jobBasicRoutes);
app.use("/employer", employerBasicRoutes);
app.use("/employer", authorize.protect, employerAdminRoutes);
