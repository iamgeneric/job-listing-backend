const Employer = require("../../models/employer");
const bcrypt = require("bcryptjs");
const employerValidation = require("../../models/employer");

// Fetch Current Employer Details
exports.getAccountInfo = async (req, res) => {
  try {
    const employer = await Employer.findById(req.employer.id);
    res.json(employer);
  } catch (err) {
    console.log(err);
  }
};

// Update Account Information
exports.editAccountInfo = async (req, res) => {
  try {
    let employer = await Employer.findById(req.employer.id);

    // Limit employer info changes via this route to only the following
    const { companyName, location, address, phoneNo } = req.body;

    // Employer can update or leave out any of these fields
    if (companyName) employer.companyName = companyName;
    if (location) employer.location = location;
    if (address) employer.address = address;
    if (phoneNo) employer.phoneNo = phoneNo;

    await employer.save();
    res.send(employer);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

// Change Account Password
exports.changePassword = async (req, res) => {
  // validate request body
  const { error } = employerValidation.passwordChange(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if employer old password is correct
  let employer = await Employer.findById(req.employer.id);
  const validPassword = await bcrypt.compare(
    req.body.oldPassword,
    employer.password
  );
  if (!validPassword)
    return res.status(400).json({
      success: false,
      msg: "Invalid Old Password.",
    });

  // Hash new password and replace
  const password = await bcrypt.hash(req.body.newPassword, 12);
  employer.password = password;
  await employer.save();

  res.status(200).json({
    status: "success",
    msg: "Your password has been updated!",
    employer,
  });
};
