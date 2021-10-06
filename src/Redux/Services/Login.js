import axios from "axios";
import { BASE_URL } from "../../Utility/Config";
import { te } from "../../Utility/ReduxToaster";
import { loading } from "../Action/App";
require("dotenv").config();

//http://182.74.108.186:8093/cwc-credit/authentication/authenticate

export const getLoginModule =
  (objBody = {}) =>
  async (dispatch) => {
    try {
      const URL = `${BASE_URL}`;

      const response = await axios.post(
        `${URL}/cwc-credit/authentication/authenticate`,
        objBody
      );

      if (response.data.error) {
        console.log(response.data.message);
        te(response.data.message);
      } else {
        const FrontendURL = `${window.location.protocol}//${window.location.hostname}`;
        const REDIRECT_URL = `${FrontendURL}/credit/token`;
        localStorage.setItem("ctoken", response.data.token);
        window.location.replace(
          `${REDIRECT_URL}?search=${response.data.token}&empId=${response.data.data.employeeId}&branch=${response.data.data.branchName}&roleId=${response.data.data.roleId}`
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(loading(false));
    }
  };

export const disbursementModule =
  (objBody = {}) =>
  async (dispatch) => {
    try {
      const URL = `${BASE_URL}`;

      const response = await axios.post(
        `${URL}/cwc-disbursement/authentication/authenticate`,
        objBody
      );

      if (response.data.error) {
        console.log(response.data.message);
        te(response.data.message);
      } else {
        const FrontendURL = `${window.location.protocol}//${window.location.hostname}`;
        const REDIRECT_URL = `${FrontendURL}/disbs/token`;
        localStorage.setItem("dtoken", response.data.token);
        window.location.replace(
          `${REDIRECT_URL}?search=${response.data.token}&empId=${response.data.data.employeeId}&branch=${response.data.data.branchName}&roleId=${response.data.data.roleId}`
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(loading(false));
    }
  };
