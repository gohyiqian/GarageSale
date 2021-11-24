import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const cartAdapter = createEntityAdapter();

const cartSlice = createSlice({
  name: "cart",
  initialState: cartAdapter.getInitialState({
    cart: [],
    status: "idle",
  }),
  reducers: {
    cartAddOne: cartAdapter.addOne,
    cartAddMany: cartAdapter.addMany,
    cartUpdate: cartAdapter.updateOne,
    cartRemove: cartAdapter.removeOne,
  },
});

export const { actions } = cartSlice;
export const cartSelectors = cartAdapter.getSelectors((state) => state.cart);
export const cartReducer = cartSlice.reducer;
