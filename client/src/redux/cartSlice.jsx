import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const cartAdapter = createEntityAdapter();

const cartSlice = createSlice({
  name: "cart",
  initialState: cartAdapter.getInitialState({
    // products: [],
    // quantity: 0,
    // total: 0,
    status: "idle",
  }),
  reducers: {
    // state.products.push(action.payload);
    // state.quantity += 1;
    // state.total += action.payload.price * action.payload.quantity;
    addToCart: (state, action) => {
      const itemExists = state.find((item) => item.id === action.payload.id);
      if (itemExists) {
        itemExists.quantity++;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQty: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      item.quantity++;
    },
    decrementQty: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        const index = state.findIndex((item) => item.id === action.payload);
        state.splice(index, 1);
      } else {
        item.quantity--;
      }
    },
    removeFromCart: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload);
      state.splice(index, 1);
    },
    cartAddOne: cartAdapter.addOne,
    cartAddMany: cartAdapter.addMany,
    cartUpdate: cartAdapter.updateOne,
    cartRemove: cartAdapter.removeOne,
  },
});

//export all reducer actions for use in components
export const { actions } = cartSlice;
// console.log(actions);
export const cartSelectors = cartAdapter.getSelectors((state) => state.cart);
// console.log(cartSelectors);
export const cartReducer = cartSlice.reducer;
