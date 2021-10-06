import { get, post } from "../../Utility/httpInterceptor";
import {
  getCount,
  getCountFailure,
  getCountSuccess,
} from "../Action/Dashboard";
import {
  getUserById,
  getUserByIdSuccess,
  getUserByIdFailure,
} from "../Action/Dashboard";
import { loading } from "../Action/App";

export const getDashboardCounts = (objBody = {}) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const response = await post("/cwc-sales/lead/getLeadCount", objBody, false);
    return dispatch(getCountSuccess(response.data.data));
  } catch (err) {
    dispatch(getCountFailure(err));
  } finally {
    dispatch(loading(false));
  }
};

export const getUserByIdGlobally = (
  objBody = {},
  employeeId = "VI12345"
) => async (dispatch) => {
  dispatch(getUserById());
  try {
    const response = await post(
      `/cwc-sales/user/getUserByEmployeeId?employeeId=${employeeId}`,
      objBody,
      false
    );
    dispatch(getUserByIdSuccess(response));
  } catch (err) {
    dispatch(getUserByIdFailure(err));
  }
};
