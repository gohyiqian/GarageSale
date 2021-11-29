import { actions } from "./userSlice";
import axios from "axios";

const config = {
  headers: {
    "Content-type": "application/json",
  },
};

// USER LOGIN
export const login = (username, password) => async (dispatch) => {
  try {
    dispatch(actions.loginStart());
    const { data } = await axios.post(
      "/api/users/login/",
      { username: username, password: password },
      config
    );
    dispatch(actions.loginSuccess(data));
  } catch (err) {
    dispatch(actions.loginFailure(err.message));
  }
};

// USER REGISTER
export const register = (username, email, password) => async (dispatch) => {
  try {
    dispatch(actions.registerStart());
    const { data } = await axios.post(
      "/api/users/register/",
      {
        username: username,
        email: email,
        password: password,
      },
      config
    );

    dispatch(actions.registerSuccess(data));
  } catch (err) {
    dispatch(actions.registerFailure(err.message));
  }
};

// ADMIN GET ALL USERS
export const getAllUsers = () => async (dispatch, getState) => {
  try {
    dispatch(actions.allUsersStart());

    const {
      userLogin: { userInfo },
    } = getState();

    const authConfig = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/`, authConfig);
    dispatch(actions.allUsersSuccess(data));
  } catch (err) {
    dispatch(actions.allUsersFailure(err.message));
  }
};

// ADMIN GET USER DETAILS BY ID
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(actions.userDetailsByIdStart());

    const {
      userLogin: { userInfo },
    } = getState();

    const authConfig = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/users/${id}/`, authConfig);
    dispatch(actions.userDetailsByIdSuccess(data));
  } catch (err) {
    dispatch(actions.userDetailsByIdFailure(err.message));
  }
};

// ADMIN UPDATE USER
export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch(actions.userUpdateStart());
    const {
      userLogin: { userInfo },
    } = getState();

    const authConfig = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.patch(
      `/api/users/update/${user._id}/`,
      authConfig
    );
    dispatch(actions.userUpdateSuccess(data));
  } catch (err) {
    dispatch(actions.userUpdateFailure(err.message));
  }
};

// ADMIN DELETE USER
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch(actions.userDeleteStart());
    const {
      userLogin: { userInfo },
    } = getState();

    const authConfig = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`/api/users/delete/${id}/`, authConfig);
    dispatch(actions.userDeleteSuccess(data));
  } catch (err) {
    dispatch(actions.userDeleteFailure(err.message));
  }
};

// GET A PRODUCT
