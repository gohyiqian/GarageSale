import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const orderAdapter = createEntityAdapter();

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: {},
    // shippingAddress: {},
    // paid: false,
    // delivered: false,
    status: "idle",
    error: null,
  },
  reducers: {
    // USER CREATE order
    createOrderStart: (state) => {
      state.status = "loading";
    },
    createOrderSuccess: (state, action) => {
      state.status = "success";
      state.orders = action.payload;
    },
    createOrderFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    createOrderReset: (state) => {
      state.status = "reset";
      state.orders = {};
    },

    // USER GET own order
    getOrderStart(state, action) {
      return {
        ...state,
        status: "loading",
      };
    },
    getOrderSuccess: (state, action) => {
      state.status = "success";
      state.orders = action.payload;
    },
    getOrderFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    getOrderReset: (state, action) => {
      state.orders = [];
    },

    // USER GET order by ID
    getOrderbyIdStart(state, action) {
      return {
        ...state,
        status: "loading",
      };
    },
    getOrderbyIdSuccess: (state, action) => {
      state.status = "success";
      state.orders = action.payload;
    },
    getOrderbyIdFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },

    // UPATE order pay
    // payOrderStart: (state, action) => {
    //   state.status = "loading";
    // },
    // payOrderSuccess: (state, action) => {
    //   state.status = "success";
    //   state.paid = true;
    // },
    // payOrderFailure: (state, action) => {
    //   state.status = "failed";
    //   state.error = action.payload;
    // },
    // payOrderReset(state, action) {
    //   state.status = "success";
    //   state.paid = false;
    // },

    // ADMIN UPDATE order deliver
    // deliverOrderStart: (state, action) => {
    //   state.status = "loading";
    // },
    // deliverOrderSuccess: (state, action) => {
    //   state.status = "success";
    //   state.delivered = true;
    // },
    // deliverOrderFailure: (state, action) => {
    //   state.status = "failed";
    //   state.error = action.payload;
    // },
    // deliveryOrderReset(state, action) {
    //   state.status = "success";
    //   state.delivered = false;
    // },

    // ADMIN get all orders
    getAllOrdersStart: (state, action) => {
      state.status = "loading";
    },
    getAllOrdersSuccess: (state, action) => {
      state.status = "success";
      state.orders = action.payload;
    },
    getAllOrdersFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

//export all reducer actions for use in components

export const { actions } = orderSlice;

export const orderSelectors = orderAdapter.getSelectors(
  (state) => state.orderItems
);

export const orderReducer = orderSlice.reducer;
