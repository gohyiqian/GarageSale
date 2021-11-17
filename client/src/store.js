import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "./redux/postSlice";
import { userReducer } from "./redux/userSlice";

const store = configureStore({
  reducer: {
    posts: postReducer,
    users: userReducer,
  },
});

export default store;
