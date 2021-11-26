import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./redux/cartSlice";
import { productReducer } from "./redux/productSlice";
import { userReducer } from "./redux/userSlice";
// import {orderReducer} from "./redux/orderSlice"

const store = configureStore({
  reducer: {
    products: productReducer,
    users: userReducer,
    cart: cartReducer,
    // order: orderReducer,
  },
});

export default store;
