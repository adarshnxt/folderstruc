import {
  GET_LOAN_SUMMARY,
  GET_LOAN_SUMMARY_FAILURE,
  GET_LOAN_SUMMARY_SUCCESS,
  RESET_LOAN_SUMMARY,
} from "../Constants";

//getting Loan Summary
export const getLoanSummary = (obj) => {
  return { type: GET_LOAN_SUMMARY, payload: obj };
};

export const getLoanSummarySuccess = (obj) => {
  return { type: GET_LOAN_SUMMARY_SUCCESS, payload: obj };
};

export const getLoanSummaryFailure = (obj) => {
  return { type: GET_LOAN_SUMMARY_FAILURE, payload: obj };
};

export const resetLoanSummary = () => {
  return { type: RESET_LOAN_SUMMARY };
};
