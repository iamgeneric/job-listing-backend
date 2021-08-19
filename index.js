const express = require("express");
const app = express();
const cors = require("cors");
const database = require("./config/database.js");

// fetch database, app listen
database.connectDatabase(app);
console.log("...waiting for database connection...");

// body parser, cors
app.use(express.json());
app.use(cors());

// import routes and set base route
const jobRoutes = require("./src/routes/job");
const employerRoutes = require("./src/routes/employer");
app.use("/", jobRoutes);
app.use("/", employerRoutes);
