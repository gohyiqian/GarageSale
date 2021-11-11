const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const multer = require("multer");
require("dotenv").config();
const path = require("path");
// console.log(path.join(__dirname, "/public/images"));

const userRoute = require("./controllers/userController");
const authRoute = require("./controllers/authController");
const productRoute = require("./controllers/productController");
const cartRoute = require("./controllers/cartController");
const orderRoute = require("./controllers/orderController");
const stripeRoute = require("./controllers/stripeController");
const cors = require("cors");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

// MIDDLEWARES
// enables for all routes
app.use(cors());
app.use(express.json());
app.use(cookieParser());

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
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (error) {
    console.error(error);
  }
});

// test send cookie to client
// app.get("/send", (req, res) => {
//   res.cookie("loggedin", "asasasasas", {
//     expires: new Date(Date.now() + 9000),
//     httpOnly: true,
//   });
//   res.send("Cookie sent!");
// });

//  ROUTES
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
