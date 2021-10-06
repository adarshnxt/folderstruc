import {
  GET_LOGIN_MODULE,
  GET_LOAN_SUMMARY_SUCCESS,
  GET_LOAN_SUMMARY_FAILURE
} from "../Constants";

//Sync action
export const syncLogin = (obj) => {
  if (obj && obj.token) {
    localStorage.setItem("accessToken", obj && obj.token);
  }

  localStorage.setItem("employeeId", obj.data && obj.data.employeeId);
  localStorage.setItem("id", obj.data && obj.data.id);
  localStorage.setItem("UserData", JSON.stringify(obj.data));
  delete obj.error;
  delete obj.statusCode;
  // obj.userData = userData
  return { type: "login", payload: obj };
};

export const syncLogout = (obj) => {
  console.log("Object", obj);
  localStorage.setItem("employeeId", "");
  localStorage.setItem("id", "");
  return { type: "logout", payload: {} };
};
export const login = (obj) => {
  console.log("Object", obj);
  localStorage.setItem("employeeId", "");
  localStorage.setItem("id", "");
  return { type: "logout", payload: {} };
};

//Async action

export const getLoginModules = () => {
  return { type: GET_LOGIN_MODULE, payload: {} };
};

export const getLoginModulesSuccess = (obj) => {
  return { type: GET_LOAN_SUMMARY_SUCCESS, payload: obj };
};

export const getLoginModulesFailure = (obj) => {
  return { type: GET_LOAN_SUMMARY_FAILURE, payload: {} };
};
