const Employer = require("../../models/employer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const employerValidation = require("../../validations/employer");

// EMPLOYER SIGN-UP =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
exports.signUp = async (req, res) => {
  try {
    // validate before creating new employer account
    const { error } = employerValidation.signUp(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if account already exists in database
    const emailExist = await Employer.findOne({ email: req.body.email });
    if (emailExist)
      return res
        .status(400)
        .json({ success: false, msg: "Email already exists!" });

    if (req.body.password !== req.body.confirmPassword) {
      return res.json({ success: false, msg: "Password does not match!" });
    }

    // Hash passwords
    password = await bcrypt.hash(req.body.password, 12);

    // Create employer account and store in database
    const employer = new Employer({ ...req.body, password });
    await employer.save();

    // Return new employer account details
    res.status(201).json({
      success: true,
      msg: `Employer ${employer._id} has been created.`,
      data: employer,
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

// EMPLOYER SIGN-IN =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
exports.signIn = async (req, res) => {
  // validate the entered user data
  const { error } = employerValidation.signIn(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if employer account exists in database
  const employer = await Employer.findOne({ email: req.body.email });
  if (!employer)
    return res
      .status(400)
      .json({ success: false, msg: "Invalid email or password." });

  // Check if password is correct
  const validPassword = await bcrypt.compare(
    req.body.password,
    employer.password
  );
  if (!validPassword)
    return res
      .status(400)
      .json({ success: false, msg: "Invalid email or password." });

  // Create a token
  const token = jwt.sign({ id: employer._id }, process.env.JWT_SECRET);

  // Assign token and send user details
  res.cookie("auth_token", token).status(200).json({
    success: true,
    msg: "Logged in successfully!",
    employerDetails: employer,
  });
};

// LOG OUT =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
exports.logOut = (req, res) => {
  return res
    .clearCookie("auth_token")
    .status(200)
    .json({ success: true, msg: "Successfully logged out!" });
};
