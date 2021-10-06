import { loading } from "../Action/App";
import {
  uploadDisbs,
  uploadDisbsSuccess,
  uploadDisbsFailure,
  getDibsSuccess,
  getDibsFailure,
  getDibs,
} from "../Action/Disbursement";
import { get, post } from "../../Utility/httpInterceptor";
import { te, ts } from "../../Utility/ReduxToaster";
import { saveAs } from "file-saver";

export const getDisbursalDetails =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(loading(true));
    dispatch(getDibs());
    try {
      const response = await post(
        "/cwc-sales/disbursement/getDocuments",
        objBody
      );

      if (!response.data.error) {
        dispatch(getDibsSuccess(response.data.data));
        ts(response.data.message);
      } else {
        dispatch(getDibsFailure({}));
        te(response.data.message);
      }
    } catch (err) {
    } finally {
      dispatch(loading(false));
    }
  };

export const uploadDocument =
  (objBody = {}) =>
  async (dispatch) => {
    objBody.data.data = objBody.data.data.map((item, index) => {
      item.filename = objBody.file[index].name;

      return item.filename.slice(-5).split(".")[1] === "pdf" ||
        item.filename.slice(-5).split(".")[1] === "jpeg" ||
        item.filename.slice(-5).split(".")[1] === "jpg" ||
        item.filename.slice(-5).split(".")[1] === "png"
        ? item
        : te("Please upload valid document");
    });

    dispatch(loading(true));
    const zipFiles = require("jszip")();
    objBody.file.forEach((item) => {
      zipFiles.file(item.name, item);
    });

    const content = await zipFiles.generateAsync({ type: "blob" });
    content.name = `${new Date().getTime()}.zip`;
    // saveAs(content);

    try {
      const response = await post(
        "/cwc-sales/disbursement/uploadDocument",
        { file: content, disbursementInfo: JSON.stringify(objBody.data) },
        false,
        true
      );

      if (!response.data.error) {
        ts(response.data.message);
        return dispatch(
          uploadDisbsSuccess({
            ...response.data.data,
            originalFile: objBody.file,
          })
        );
      } else {
        return dispatch(uploadDisbsFailure(response.data));
      }
    } catch (err) {
      dispatch(uploadDisbsFailure(err));
    } finally {
      dispatch(loading(false));
    }
  };

export const deleteDocument =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(loading(true));
    try {
      const response = await post(
        "/cwc-sales/disbursement/deleteDocument",
        objBody
      );

      if (!response.data.error) {
        dispatch(getDibsSuccess(response.data.data));
        ts(response.data.message);
      } else {
        dispatch(getDibsFailure({}));
        te(response.data.message);
      }
    } catch (err) {
    } finally {
      dispatch(loading(false));
    }
  };

export const saveVehicleDetails =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(loading(true));
    try {
      const response = await post(
        "/cwc-sales/disbursement/uploadDocument",
        {
          disbursementInfo: JSON.stringify(objBody),
        },
        false,
        true
      );

      if (!response.data.error) {
        dispatch(uploadDisbsSuccess(response.data.data));
        ts(response.data.message);
      } else {
        dispatch(uploadDisbsFailure({}));
        te(response.data.message);
      }
    } catch (err) {
    } finally {
      dispatch(loading(false));
    }
  };
