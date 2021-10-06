import { loading } from "../Action/App";
import {
  getLoanSummaryFailure,
  getLoanSummarySuccess,
  resetLoanSummary,
} from "../Action/LoanSummary";
import { get, post } from "../../Utility/httpInterceptor";

//getting Loan Summary
export const getLoanSummary =
  (objBody = {}) =>
  async (dispatch) => {
    console.log("loanSummary");
    dispatch(loading(true));
    try {
      const response = await post(
        "/cwc-sales/casesummary/getcasesummarydetails",
        objBody
      );

      if (!response.data.error) {
        dispatch(getLoanSummarySuccess(response.data));
      } else {
        dispatch(getLoanSummaryFailure(response.data));
      }
    } catch (err) {
    } finally {
      dispatch(loading(false));
    }
  };

export const reset =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(resetLoanSummary());
  };
