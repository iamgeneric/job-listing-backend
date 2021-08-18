const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employerSchema = new Schema({
  companyName: {
    type: String,
    required: true,
    max: 255,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    max: 255,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    max: 255,
    trim: true,
  },
  phoneNo: {
    type: String,
    required: true,
    max: 20,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employer", employerSchema);
