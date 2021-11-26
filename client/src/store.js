import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./redux/cartSlice";
import { productReducer } from "./redux/productSlice";
import { userReducer } from "./redux/userSlice";
// import {orderReducer} from "./redux/orderSlice"

const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
    cart: cartReducer,
    // order: orderReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
