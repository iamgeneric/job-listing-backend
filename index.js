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

// import routes and set base route
const jobRoutes = require("./src/routes/job");
const employerRoutes = require("./src/routes/employer");
app.use("/listing", jobRoutes);
app.use("/employer", employerRoutes);
