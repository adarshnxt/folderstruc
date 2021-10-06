import { get, post } from "../../Utility/httpInterceptor";
import { te, ts } from "../../Utility/ReduxToaster";
import { loading } from "../Action/App";
import {
  saveRepaymentSuccess,
  saveRepaymentFailure,
  saveCommentSuccess,
  saveCommentFailure,
  getRepaymentSuccess,
  getRepaymentFailure,
  getCommentSuccess,
  getCommentFailure,
} from "../Action/Repayment";

//------------------------------------------PDA----------------------
export const saveUpdateRepayment = (objBody = {}) =>
  async (dispatch) => {
    dispatch(loading(true));
    try {
      const response = await post(
        "/cwc-sales/repayment/save",
        objBody,
        false
      );
      if (!response.data.error) {
        ts(response.data.message);
        return dispatch(saveRepaymentSuccess(response.data));
      } else {
        te(response.data.message);
        dispatch(saveRepaymentFailure(response.data));
      }
    } catch (err) {
      dispatch(saveRepaymentFailure());
    } finally {
      dispatch(loading(false));
    }
  };

  export const saveUpdateComment = (objBody = {}) =>
    async (dispatch) => {
      dispatch(loading(true));
      try {
        const response = await post(
          "/cwc-sales/repayment/submit",
          objBody,
          false
        );
        if (!response.data.error) {
          ts(response.data.message);
          return dispatch(saveCommentSuccess(response.data));
        } else {
          te(response.data.message);
          dispatch(saveCommentFailure(response.data));
        }
      } catch (err) {
        dispatch(saveCommentFailure());
      } finally {
        dispatch(loading(false));
      }
    };

    export const getRepaymentData =
      (objBody = {}) =>
      async (dispatch) => {
        dispatch(loading(true));
        try {
          const response = await post(
            "/cwc-sales/repayment/get",
            objBody,
            false
          );
          if (!response.data.error) {
            ts(response.data.message);
            return dispatch(getRepaymentSuccess(response.data));
          } else {
            te(response.data.message);
            dispatch(getRepaymentFailure(response.data));
          }
        } catch (err) {
          dispatch(getRepaymentFailure());
        } finally {
          dispatch(loading(false));
        }
      };

    export const getCommentData =
      (objBody = {}) =>
      async (dispatch) => {
        dispatch(loading(true));
        try {
          const response = await post(
            "/cwc-sales/repayment/getdisbursement",
            objBody,
            false
          );
          if (!response.data.error) {
            ts(response.data.message);
            return dispatch(getCommentSuccess(response.data));
          } else {
            te(response.data.message);
            dispatch(getCommentFailure(response.data));
          }
        } catch (err) {
          dispatch(getCommentFailure());
        } finally {
          dispatch(loading(false));
        }
      };

//-------------------------------------------------------------------

