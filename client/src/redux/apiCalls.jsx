import { actions } from "./userSlice";
import axios from "axios";

// USER LOGIN
export const login = (username, password) => async (dispatch) => {
  try {
    dispatch(actions.loginStart());
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login/",
      { username: username, password: password },
      config
    );

    dispatch(actions.loginSuccess(data));
  } catch (err) {
    dispatch(actions.loginFailure(err));
  }
};

// USER REGISTER
export const register = (username, email, password) => async (dispatch) => {
  try {
    dispatch(actions.registerStart());
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

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
    dispatch(actions.registerFailure(err));
  }
};
