const express = require("express");
const app = express();
const cors = require("cors")
const database = require("./config/database.js");

// fetch database, app listen
database.connectDatabase(app);
console.log("...waiting for database connection...");

// body parser, cors
app.use(express.json());
app.use(cors());

// import routes
const jobRoutes = require("./src/routes/job");

app.get("/jobs", (req, res) => res.json("Job Listing App"));
app.use("/", jobRoutes);
