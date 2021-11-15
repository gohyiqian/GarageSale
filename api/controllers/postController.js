const router = require("express").Router();
const { verifyAdmin } = require("./verifyToken");
const multer = require("multer");

// const path = require("path");
// console.log(path.join(__dirname, "/public/images"));

// MULTER DiskStorage
// upload to public/images folder first
// to refactor and upload to external databases
// app.use("/images", express.static(path.join(__dirname, "/public/images")));

// storage destination
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  // determine the of uploaded file in the folder
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + ".jpeg");
  },
});

const upload = multer({ storage: storage });

app.post("/", verifyAdmin, upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
