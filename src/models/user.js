const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employerSchema = new Schema({
  companyName: {
    type: String,
    required: true,
    max: 255,
    trim: true,
  },
  coporateEmail: {
    type: String,
    required: true,
    max: 255,
    trim: true,
  },

  companyLocation: {
    type: String,
    required: true,
    max: 255,
    trim: true,
  },
  coporateAdresss: {
    type: String,
    required: true,
    max: 255,
    trim: true,
  },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: "Employer" },
});

module.exports = mongoose.model("Employer", employerSchema);
