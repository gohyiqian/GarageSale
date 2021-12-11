import axios from "axios";
import { actions as shopActions } from "./shopSlice";

// CREATE SHOP
export const createShop = () => async (dispatch, getState) => {
  try {
    dispatch(shopActions.addShopStart());

    const {
      user: { userInfo },
    } = getState();

    const authConfig = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/shops/create/", {}, authConfig);
    dispatch(shopActions.addShopSuccess(data));
  } catch (err) {
    dispatch(shopActions.addShopFailure(err.message));
  }
};

// EDIT SHOP
export const updateShop = (shop) => async (dispatch, getState) => {
  try {
    dispatch(shopActions.updateShopStart());

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
      `/api/shops/update/${shop.shop_id}`,
      shop,
      authConfig
    );
    dispatch(shopActions.updateShopSuccess(data));
  } catch (err) {
    dispatch(shopActions.updateShopFailure(err.message));
  }
};

// GET A SHOP
export const getShop = (id) => async (dispatch) => {
  try {
    dispatch(shopActions.shopDetailStart());
    const { data } = await axios.get(`/api/shops/${id}`);
    dispatch(shopActions.shopDetailSuccess(data));
  } catch (err) {
    dispatch(shopActions.shopDetailFailure(err.message));
  }
};
