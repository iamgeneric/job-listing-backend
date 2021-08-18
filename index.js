const express = require("express");
const app = express();
const database = require("./config/database.js");

// generate ngrok URL, fetch database, app listen
database.connectDatabase(app);
// database.generateNgrokURL();
console.log("...waiting for database connection...");

// import and use body parser
app.use(express.json());

// import routes
const jobRoutes = require("./src/routes/job");

app.get("/", (req, res) => res.json("Job Listing App"));
app.use("/jobs", jobRoutes);
