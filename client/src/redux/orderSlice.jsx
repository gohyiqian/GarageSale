import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const orderAdapter = createEntityAdapter();

const orderSlice = createSlice({
  name: "order",
  initialState: orderAdapter.getInitialState({
    status: "idle",
    error: null,
  }),
  reducers: {
    orderAddOne: orderAdapter.addOne,
    orderAddMany: orderAdapter.addMany,
    orderUpdate: orderAdapter.updateOne,
    orderRemove: orderAdapter.removeOne,
  },
});

//export all reducer actions for use in components
export const { actions } = orderSlice;

export const orderSelectors = orderAdapter.getSelectors(
  (state) => state.orderItems
);

export const orderReducer = orderSlice.reducer;
