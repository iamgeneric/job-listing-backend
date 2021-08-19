const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  jobId: {
    type: String,
    required: true,
    trim: true,
  },
  // employerId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Employer",
  //   required: true,
  // },
  surname: {
    type: String,
    max: 50,
    required: true,
    trim: true,
  },
  firstName: {
    type: String,
    max: 50,
    required: true,
    trim: true,
  },
  // middleName: {
  //   type: String,
  //   max: 50,
  //   default: "",
  //   trim: true,
  // },
  email: {
    type: String,
    max: 255,
    required: true,
    trim: true,
  },
  // NIN: {
  //   type: String,
  //   max: 11,
  //   required: true,
  //   default: "",
  // },
  // phoneNo: {
  //   type: String,
  //   max: 20,
  //   required: true,
  //   trim: true,
  // },
  // dateOfBirth: {
  //   type: Date,
  //   required: true,
  // },
  // stateOfOrigin: {
  //   type: String,
  //   max: 50,
  //   required: true,
  //   trim: true,
  // },
  // nationality: {
  //   type: String,
  //   max: 50,
  //   required: true,
  //   trim: true,
  // },
  // gender: {
  //   type: String,
  //   max: 20,
  //   required: true,
  //   trim: true,
  // },
  // education: {
  //   type: String,
  //   max: 20,
  //   required: true,
  //   trim: true,
  // },
  resume: {
    type: String,
    max: 255,
    required: true,
    trim: true,
  },
  applicationDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Application", applicationSchema);
