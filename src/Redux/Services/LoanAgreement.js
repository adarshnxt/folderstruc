import { loading } from "../Action/App";
import { te, ts } from "../../Utility/ReduxToaster";
import {
  uploadLoanAgreementSuccess,
  uploadLoanAgreementFailure,
  requestEserviceFailure,
  requestEserviceSuccess,
  getEserviceFailure,
  getEserviceSuccess,
  deleteUploadedLoanAgreementSuccess,
  deleteUploadedLoanAgreementFailure,
  downloadLoanAgreementSuccess,
  downloadLoanAgreementFailure,
} from "../Action/LoanAgreement";
import { post } from "../../Utility/httpInterceptor";
import { teal } from "@material-ui/core/colors";

//requesting Eservice
export const requestEservice =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(loading(true));
    try {
      const response = await post(
        "/cwc-sales/eService/requestEservice",
        objBody,
        false
      );
      if (!response.data.error) {
        ts(response.data.message);
        return dispatch(requestEserviceSuccess(response.data.data));
      } else {
        te(response.data.message);
        dispatch(requestEserviceFailure(response.data.data));
      }
    } catch (err) {
      dispatch(requestEserviceFailure(err));
    } finally {
      dispatch(loading(false));
    }
  };

//getting Eservice
export const getEservice =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(loading(true));
    try {
      const response = await post(
        "/cwc-sales/eService/getEservice",
        objBody,
        false
      );
      return dispatch(getEserviceSuccess(response.data.data));
    } catch (err) {
      dispatch(getEserviceFailure(err));
    } finally {
      dispatch(loading(false));
    }
  };

//uploading Loan Agreeent
export const uploadLoanAgreement =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(loading(true));
    const zipFiles = require("jszip")();
    zipFiles.file(objBody.file.name, objBody.file);
    const content = await zipFiles.generateAsync({ type: "blob" });
    content.name = `${new Date().getTime()}.zip`;
    dispatch(loading(true));
    try {
      const response = await post(
        "/cwc-sales/eService/uploadLoanAgreement",
        { file: content, loanInfo: objBody.loanInfo },
        false,
        true
      );
      if (!response.data.data.error) {
        ts(response.data.message);
        return dispatch(uploadLoanAgreementSuccess(response.data.data));
      } else {
        teal(response.data.message);
        return dispatch(uploadLoanAgreementFailure(response.data.data));
      }
    } catch (err) {
      dispatch(uploadLoanAgreementFailure(err));
    } finally {
      dispatch(loading(false));
    }
  };

//deleting uploaded Loan Agreement
export const deleteUploadedLoanAgreement =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(loading(true));
    try {
      const response = await post(
        "/cwc-sales/eService/deleteLoanAgreement",
        objBody,
        false
      );
      if (!response.data.error) {
        ts(response.data.message);
        return dispatch(deleteUploadedLoanAgreementSuccess(response.data.data));
      } else {
        te(response.data.message);
        return dispatch(deleteUploadedLoanAgreementFailure(response.data.data));
      }
    } catch (err) {
      dispatch(deleteUploadedLoanAgreementFailure(err));
    } finally {
      dispatch(loading(false));
    }
  };

export const downloadLoanAgreementData =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(loading(true));
    try {
      const response = await post(
        "/cwc-sales/eService/downloadLoanAgreement",
        objBody,
        false
      );
      if (response.data.status !== "failed") {
        ts(response.data.message);
        return dispatch(downloadLoanAgreementSuccess(response.data.data));
      } else {
        te(response.data.data.message);
        return dispatch(downloadLoanAgreementFailure());
      }
    } catch (err) {
      dispatch(downloadLoanAgreementFailure(err));
    } finally {
      dispatch(loading(false));
    }
  };
