const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  title: {
    type: String,
    required: true,
    max: 255,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    max: 1000,
    trim: true,
  },
  content:{
    type:String,
    required: true,
    max: 5000,
  },
  location: {
    type: String,
    default: "",
  },
  keyword: {
    type: String,
    default: "",
  },
  datePosted: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Job", jobSchema);
