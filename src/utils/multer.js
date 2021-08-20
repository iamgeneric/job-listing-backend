const multer = require("multer");
const path = require("path");

// Set storage engine for resume
const storage = multer.diskStorage({
  // Destination for files
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/resume");
  },

  // Add extension for files
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        "." +
        req.body.surname +
        "_" +
        req.body.firstName +
        path.extname(file.originalname)
    );
  },
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fieldSize: 1024 * 1024 * 10 }, // set max. file size = 10 MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

// Check File Type
const checkFileType = (file, cb) => {
  // Allowed ext
  const fileTypes = /pdf/;
  // Check ext
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    return cb("Error: PDF only!");
  }
};

module.exports = upload.single("resume");
