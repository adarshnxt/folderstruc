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
  DELETE_UPLOADED_LOAN_AGREEMENT,
  DELETE_UPLOADED_LOAN_AGREEMENT_SUCCESS,
  DELETE_UPLOADED_LOAN_AGREEMENT_FAILURE,
  DOWNLOAD_LOAN_AGREEMENT,
  DOWNLOAD_LOAN_AGREEMENT_SUCCESS,
  DOWNLOAD_LOAN_AGREEMENT_FAILURE,
} from "../Constants/";

const initialState = {
  loanAgreement: [],
  requestEservice: "",
  getEservice: "",
  loading: null,
  uploadLoanAgreement: null,
  deleteUploadedLoanAgreement: null,
  downloadLoanAgreement: null,
  deleteLoanAgreeflag: null,
};

function loanAgreementReducer(state = initialState, action) {
  switch (action.type) {
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

    //uploading Loan Agreeent
    case UPLOAD_LOAN_AGREEMENT:
      return { ...state, loading: true };

    case UPLOAD_LOAN_AGREEMENT_SUCCESS:
      return { ...state, uploadLoanAgreement: action.payload, loading: false };

    case UPLOAD_LOAN_AGREEMENT_FAILURE:
      return { ...state, uploadLoanAgreement: [], loading: false };

    //deleting uploaded Loan Agreement
    case DELETE_UPLOADED_LOAN_AGREEMENT:
      return { ...state, loading: true };

    case DELETE_UPLOADED_LOAN_AGREEMENT_SUCCESS:
      return {
        ...state,
        deleteUploadedLoanAgreement: action.payload,
        deleteLoanAgreeflag: true,
        uploadLoanAgreement: null,
        loading: false,
      };

    case DELETE_UPLOADED_LOAN_AGREEMENT_FAILURE:
      return { ...state, deleteUploadedLoanAgreement: [], loading: false };

    case DOWNLOAD_LOAN_AGREEMENT:
      return { ...state, loading: true };

    case DOWNLOAD_LOAN_AGREEMENT_SUCCESS:
      return {
        ...state,
        downloadLoanAgreement: action.payload,
        loading: false,
      };

    case DOWNLOAD_LOAN_AGREEMENT_FAILURE:
      return { ...state, downloadLoanAgreement: null, loading: false };

    default:
      return state;
  }
}

export default loanAgreementReducer;
