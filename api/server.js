const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const userRoute = require("./controllers/userController");
const authRoute = require("./controllers/authController");
const productRoute = require("./controllers/productController");
const cartRoute = require("./controllers/cartController");
const orderRoute = require("./controllers/orderController");
const stripeRoute = require("./controllers/stripeController");
const postRoute = require("./controllers/postController");
const cors = require("cors"); // still unclear on CORS

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
app.use("/api/upload", postRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
