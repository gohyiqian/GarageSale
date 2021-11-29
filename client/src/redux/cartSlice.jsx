import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const cartAdapter = createEntityAdapter();

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    shippingAddress: JSON.parse(localStorage.getItem("shippingAddress")) || {},
    status: "idle",
  },
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const itemExistInCart = state.cartItems.find(
        (x) => x.productId === item.productId
      );
      if (itemExistInCart) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.productId === itemExistInCart.productId ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    },

    removeFromCart(state, action) {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) => x.productId !== action.payload
        ),
      };
    },

    incrementQty(state, action) {
      const item = state.cartItems.find((item) => item.id === action.payload);
      item.quantity++;
    },

    decrementQty(state, action) {
      const item = state.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        const index = state.cartItems.findIndex(
          (item) => item.id === action.payload
        );
        state.splice(index, 1);
      } else {
        item.quantity--;
      }
    },

    saveShippingAress(state, action) {
      return {
        ...state,
        shippingAddress: action.payload,
      };
    },

    savePaymentMethod(state, action) {
      return {
        ...state,
        PaymentMethod: action.payload,
      };
    },

    cartReset(state, action) {
      return {
        ...state,
        cartItems: [],
        shippingAddress: {},
      };
    },
    // cartAddOne: cartAdapter.addOne,
    // cartAddMany: cartAdapter.addMany,
    // cartUpdate: cartAdapter.updateOne,
    cartRemove: cartAdapter.removeOne,
  },
});

//export all reducer actions for use in components
export const { actions } = cartSlice;
// console.log(actions);
export const cartSelectors = cartAdapter.getSelectors(
  (state) => state.cartItems
);
// console.log(cartSelectors);
export const cartReducer = cartSlice.reducer;
