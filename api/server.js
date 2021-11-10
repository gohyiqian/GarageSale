const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

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
app.use(cors());
app.use(express.json());

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
