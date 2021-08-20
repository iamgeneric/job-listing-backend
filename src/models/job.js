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
    max: 5000,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    max: 100,
    trim: true,
  },
  location: {
    type: String,
    default: "",
  },
  objectives: {
    type: String,
    required: true,
    max: 5000,
    trim: true,
  },
  skillsRequired: {
    type: String,
    required: true,
    max: 5000,
  },
  knowledgeRequired: {
    type: String,
    required: true,
    max: 5000,
    trim: true,
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
