const express = require("express");
const app = express();
const database = require("./config/database");


// Generate ngrok URL, fetch database, app listen
database.connectDatabase(app);
database.generateNgrokURL();
console.log("...waiting for database connection...");

app.get("/", (req, res) => {
    res.send("<h1>Job Listing App<h1>");
  });