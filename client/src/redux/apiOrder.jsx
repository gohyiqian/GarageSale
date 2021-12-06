import axios from "axios";
import { actions } from "./orderSlice";
import { actions as cartActions } from "./cartSlice";

// USER CREATE order
export const addOrder = (orderItems) => async (dispatch, getState) => {
  try {
    dispatch(actions.createOrderStart());
    const {
      user: { userInfo },
    } = getState();

    const authConfig = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `/api/orders/add/`,
      orderItems,
      authConfig
    );
    dispatch(actions.createOrderSuccess(data));

    // localStorage.setItem(
    //   "orderItems",
    //   JSON.stringify(getState().order.orders.orderItems)
    // );

    // clear cartItems after success order creation
    dispatch(cartActions.cartReset());
    localStorage.removeItem("cartItems");
  } catch (err) {
    dispatch(actions.createOrderFailure(err.message));
  }
};

// USER GET own order
export const getMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch(actions.getOrderStart());
    const {
      user: { userInfo },
    } = getState();

    const authConfig = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/`, authConfig);
    dispatch(actions.getOrderSuccess(data));
  } catch (err) {
    dispatch(actions.getOrderFailure(err.message));
  }
};

// GET order by ID
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(actions.getOrderByIdStart());
    const {
      user: { userInfo },
    } = getState();

    const authConfig = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}/`, authConfig);
    dispatch(actions.getOrderByIdSuccess(data));
  } catch (err) {
    dispatch(actions.getOrderByIdFailure(err.message));
  }
};

//  UPDATE order paid
export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch(actions.payOrderStart());

    const {
      user: { userInfo },
    } = getState();

    const authConfig = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.patch(
      `/api/orders/${id}/pay/`,
      paymentResult,
      authConfig
    );
    dispatch(actions.payOrderSuccess(data));
  } catch (err) {
    dispatch(
      actions.payOrderFailure(
        err.response ? err.response.data.detail : err.message
      )
    );
  }
};

//  ADMIN UPDATE order delivered
export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch(actions.deliverOrderStart());
    const {
      user: { userInfo },
    } = getState();

    const authConfig = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.patch(
      `/api/orders/${order.id}/deliver/`,
      {},
      authConfig
    );
    dispatch(actions.deliverOrderSuccess(data));
  } catch (err) {
    dispatch(actions.deliverOrderFailure(err.message));
  }
};

// ADMIN GET all orders
export const getAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch(actions.getAllOrdersStart());
    const {
      user: { userInfo },
    } = getState();

    const authConfig = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/all/`, authConfig);
    dispatch(actions.getAllOrdersSuccess(data));
  } catch (err) {
    dispatch(actions.getAllOrdersFailure(err.message));
  }
};
