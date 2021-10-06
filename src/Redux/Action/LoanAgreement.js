import {
  UPLOAD_LOAN_AGREEMENT,
  UPLOAD_LOAN_AGREEMENT_FAILURE,
  UPLOAD_LOAN_AGREEMENT_SUCCESS,
  REQUEST_ESERVICE,
  REQUEST_ESERVICE_FAILURE,
  REQUEST_ESERVICE_SUCCESS,
  GET_ESERVICE,
  GET_ESERVICE_FAILURE,
  GET_ESERVICE_SUCCESS,
  DELETE_UPLOADED_LOAN_AGREEMENT,
  DELETE_UPLOADED_LOAN_AGREEMENT_FAILURE,
  DELETE_UPLOADED_LOAN_AGREEMENT_SUCCESS,
  DOWNLOAD_LOAN_AGREEMENT,
  DOWNLOAD_LOAN_AGREEMENT_SUCCESS,
  DOWNLOAD_LOAN_AGREEMENT_FAILURE,
} from "../Constants";

//requesting Eservice
export const requestEservice = (obj) => {
  return { type: REQUEST_ESERVICE, payload: {} };
};

export const requestEserviceSuccess = (obj) => {
  return { type: REQUEST_ESERVICE_SUCCESS, payload: obj };
};

export const requestEserviceFailure = (obj) => {
  return { type: REQUEST_ESERVICE_FAILURE, payload: {} };
};

//getting Eservice
export const getEservice = (obj) => {
  return { type: GET_ESERVICE, payload: {} };
};

export const getEserviceSuccess = (obj) => {
  return { type: GET_ESERVICE_SUCCESS, payload: obj };
};

export const getEserviceFailure = (obj) => {
  return { type: GET_ESERVICE_FAILURE, payload: {} };
};

//uploading Loan Agreeent
export const uploadLoanAgreement = (obj) => {
  return { type: UPLOAD_LOAN_AGREEMENT, payload: {} };
};

export const uploadLoanAgreementSuccess = (obj) => {
  return { type: UPLOAD_LOAN_AGREEMENT_SUCCESS, payload: obj };
};

export const uploadLoanAgreementFailure = (obj) => {
  return { type: UPLOAD_LOAN_AGREEMENT_FAILURE, payload: {} };
};

//deleting uploaded Loan Agreement
export const deleteUploadedLoanAgreement = (obj) => {
  return { type: DELETE_UPLOADED_LOAN_AGREEMENT, payload: {} };
};

export const deleteUploadedLoanAgreementSuccess = (obj) => {
  return { type: DELETE_UPLOADED_LOAN_AGREEMENT_SUCCESS, payload: obj };
};

export const deleteUploadedLoanAgreementFailure = (obj) => {
  return { type: DELETE_UPLOADED_LOAN_AGREEMENT_FAILURE, payload: {} };
};
export const downloadLoanAgreement = (obj) => {
  return { type: DOWNLOAD_LOAN_AGREEMENT, payload: {} };
};

export const downloadLoanAgreementSuccess = (obj) => {
  return { type: DOWNLOAD_LOAN_AGREEMENT_SUCCESS, payload: obj };
};

export const downloadLoanAgreementFailure = (obj) => {
  return { type: DOWNLOAD_LOAN_AGREEMENT_FAILURE, payload: {} };
};
