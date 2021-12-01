import { actions } from "./productSlice";
import axios from "axios";

// const config = {
//   headers: {
//     "Content-type": "application/json",
//   },
// };

// GET A PRODUCT
export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch(actions.productDetailStart());
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch(actions.productDetailSuccess(data));
  } catch (err) {
    dispatch(actions.productDetailFailure(err.message));
  }
};

//  GET TOP PRODUCTS
export const getTopProduct = () => async (dispatch) => {
  try {
    dispatch(actions.productTopStart());
    const { data } = await axios.get(`/api/products/top`);
    dispatch(actions.productTopSuccess(data));
  } catch (err) {
    dispatch(actions.productTopFailure(err.message));
  }
};

// CREATE PRODUCT - ADMIN
export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch(actions.productCreateStart());
    const {
      userLogin: { userInfo },
    } = getState();

    const authConfig = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/products/create/`, {}, authConfig);
    dispatch(actions.productCreateSuccess(data));
  } catch (err) {
    dispatch(actions.productCreateFailure(err.message));
  }
};

// UPDATE PRODUCT -  ADMIN
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch(actions.productUpdateStart());
    const {
      userLogin: { userInfo },
    } = getState();

    const authConfig = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `/api/products/update/${product.id}`,
      product,
      authConfig
    );
    dispatch(actions.productUpdateSuccess(data));
  } catch (err) {
    dispatch(actions.productUpdateFailure(err.message));
  }
};

// DELETE PRODUCT -  ADMIN
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch(actions.productDeleteStart());
    const {
      userLogin: { userInfo },
    } = getState();

    const authConfig = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/products/delete/${id}`, authConfig);
    dispatch(actions.productDeleteSuccess(data));
  } catch (err) {
    dispatch(actions.productDeleteFailure(err.message));
  }
};
