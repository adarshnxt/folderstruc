import {
  GET_LOAN_SUMMARY_FAILURE,
  GET_LOAN_SUMMARY_SUCCESS,
  UPLOAD_LOAN_AGREEMENT,
  UPLOAD_LOAN_AGREEMENT_SUCCESS,
  UPLOAD_LOAN_AGREEMENT_FAILURE,
  REQUEST_ESERVICE,
  REQUEST_ESERVICE_FAILURE,
  REQUEST_ESERVICE_SUCCESS,
  GET_ESERVICE,
  GET_ESERVICE_FAILURE,
  GET_ESERVICE_SUCCESS,
  RESET_LOAN_SUMMARY,
} from "../Constants/";

const initialState = {
  loansummary: {},
  loanAgreement: [],
  requestEservice: "",
  getEservice: "",
  loading: null,
  deleteUploadedLoanAgreement: null,
  summaryFlags: null,
};

function loanSummaryReducer(state = initialState, action) {
  switch (action.type) {
    //getting Loan Summary
    case GET_LOAN_SUMMARY_SUCCESS:
      const data = action.payload;
      return { ...state, loansummary: data, summaryFlags: true };

    case GET_LOAN_SUMMARY_FAILURE:
      return { ...state, loansummary: {}, summaryFlags: false };

    //requesting Eservice
    case REQUEST_ESERVICE:
      return { ...state, loading: true };

    case REQUEST_ESERVICE_SUCCESS:
      return { ...state, requestEservice: action.payload, loading: false };

    case REQUEST_ESERVICE_FAILURE:
      return { ...state, requestEservice: [], loading: false };

    //getting Eservice
    case GET_ESERVICE:
      return { ...state, loading: true };

    case GET_ESERVICE_SUCCESS:
      return { ...state, getEservice: action.payload, loading: false };

    case GET_ESERVICE_FAILURE:
      return { ...state, getEservice: [], loading: false };

    case RESET_LOAN_SUMMARY:
      return { ...initialState };
    default:
      return state;
  }
}

export default loanSummaryReducer;
