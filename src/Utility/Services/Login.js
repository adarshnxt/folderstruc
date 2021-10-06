import { post } from "../httpInterceptor";

export const postLogin = (objBody = {}) => {
  return post("/cwc-sales/authentication/authenticate", objBody, false).then(
    (res) => {
      return res;
    }
  );
};
export const postGetUserDetail = (employeeId, moduleName) => {
  return post(
    `/growth-source/user/getUserByEmployeeId?employeeId=${employeeId}&moduleName=${moduleName}`
  ).then((res) => {
    return res;
  });
};
