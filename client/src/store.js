import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./redux/cartSlice";
import { productReducer } from "./redux/productSlice";
import { userReducer } from "./redux/userSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    users: userReducer,
    cart: cartReducer,
  },
});

export default store;
