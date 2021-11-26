import { actions } from "./userSlice";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(actions.loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(actions.loginSuccess(res.data));
  } catch (err) {
    dispatch(actions.loginFailure());
  }
};
