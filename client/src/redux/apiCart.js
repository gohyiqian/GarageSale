import axios from "axios";
import { actions } from "./cartSlice";

export const addToCartAction = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  try {
    dispatch(
      actions.addToCart({
        productId: data.id,
        name: data.name,
        image: data.image,
        price: data.price,
        stockCount: data.stockCount,
        qty,
      })
    );
  } catch (err) {
    console.log(err);
  }
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCartAction = (id) => (dispatch, getState) => {
  dispatch(actions.removeFromCart(id));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddressAction = (data) => (dispatch) => {
  dispatch(actions.saveShippingAddress(data));
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethodAction = (data) => (dispatch) => {
  dispatch(actions.savePaymentMethod(data));
};
