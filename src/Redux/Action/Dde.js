import {
  GET_BANK_DETAILS,
  GET_BANK_DETAILS_FAILURE,
  GET_BANK_DETAILS_SUCCESS,
  GET_DDE_DETAILS,
  GET_DDE_DETAILS_FAILURE,
  GET_DDE_DETAILS_SUCCESS,
  REFRESH_BANK_DETAILS,
  REFRESH_BANK_DETAILS_FAILURE,
  REFRESH_BANK_DETAILS_SUCCESS,
  SAVE_BANK_DETAILS,
  SAVE_BANK_DETAILS_FAILURE,
  SAVE_BANK_DETAILS_SUCCESS,
  DELETE_SALARY_SLIP,
  DELETE_SALARY_SLIP_SUCCESS,
  DELETE_SALARY_SLIP_FAILURE,
  UPLOAD_ITR_DOC,
  UPLOAD_ITR_DOC_SUCCESS,
  UPLOAD_ITR_DOC_FAILURE,
  SEND_ITR_LINK,
  SEND_ITR_LINK_SUCCESS,
  SEND_ITR_LINK_FAILURE,
  VERIFY_ITR_CREDS,
  VERIFY_ITR_CREDS_SUCCESS,
  VERIFY_ITR_CREDS_FAILURE,
  DELETE_ITR_UPLOAD,
  DELETE_ITR_UPLOAD_SUCCESS,
  DELETE_ITR_UPLOAD_FAILURE,
  RESET_DDE,

} from "../Constants";

export const getDDeDetails = (obj) => {
  return { type: GET_DDE_DETAILS, payload: {} };
};

export const getDDeDetailsSuccess = (obj) => {
  return { type: GET_DDE_DETAILS_SUCCESS, payload: obj };
};

export const getDDeDetailsFailure = (obj) => {
  return { type: GET_DDE_DETAILS_FAILURE, payload: obj };
};

export const getBankDetails = (obj) => {
  return { type: GET_BANK_DETAILS, payload: {} };
};

export const getBankDetailsSuccess = (obj) => {
  return { type: GET_BANK_DETAILS_SUCCESS, payload: obj };
};

export const getBankDetailsFailure = (obj) => {
  return { type: GET_BANK_DETAILS_FAILURE, payload: obj };
};

export const refreshBankDetails = (obj) => {
  return { type: REFRESH_BANK_DETAILS, payload: {} };
};

export const refreshBankDetailsSuccess = (obj) => {
  return { type: REFRESH_BANK_DETAILS_SUCCESS, payload: obj };
};

export const refreshBankDetailsFailure = (obj) => {
  return { type: REFRESH_BANK_DETAILS_FAILURE, payload: obj };
};

export const saveBankDetails = (obj) => {
  return { type: SAVE_BANK_DETAILS, payload: {} };
};

export const saveBankDetailsSuccess = (obj) => {
  return { type: SAVE_BANK_DETAILS_SUCCESS, payload: obj };
};

export const saveBankDetailsFailure = (obj) => {
  return { type: SAVE_BANK_DETAILS_FAILURE, payload: obj };
};

export const deleteSalarySlip = (obj) => {
  return { type: DELETE_SALARY_SLIP, payload: {} };
};

export const deleteSalarySlipSuccess = (obj) => {
  return { type: DELETE_SALARY_SLIP_SUCCESS, payload: obj };
};

export const deleteSalarySlipFailure = (obj) => {
  return { type: DELETE_SALARY_SLIP_FAILURE, payload: obj };
};

export const uploadItrDocs = (obj) => {
  return { type: UPLOAD_ITR_DOC, payload: {} };
};

export const uploadItrDocsSuccess = (obj) => {
  return { type: UPLOAD_ITR_DOC_SUCCESS, payload: obj };
};

export const uploadItrDocsFailure = (obj) => {
  return { type: UPLOAD_ITR_DOC_FAILURE, payload: obj };
};

export const sendItrLink = (obj) => {
  return { type: SEND_ITR_LINK, payload: {} };
};

export const sendItrLinkSuccess = (obj) => {
  return { type: SEND_ITR_LINK_SUCCESS, payload: obj };
};

export const sendItrLinkFailure = (obj) => {
  return { type: SEND_ITR_LINK_FAILURE, payload: obj };
};

export const verifyCreds = (obj) => {
  return { type: VERIFY_ITR_CREDS, payload: {} };
};

export const verifyCredsSuccess = (obj) => {
  return { type: VERIFY_ITR_CREDS_SUCCESS, payload: obj };
};

export const verifyCredsFailure = (obj) => {
  return { type: VERIFY_ITR_CREDS_FAILURE, payload: obj };
};

export const deleteUploadITR = (obj) => {
  return { type: DELETE_ITR_UPLOAD, payload: {} };
};

export const deleteUploadITRSuccess = (obj) => {
  return { type: DELETE_ITR_UPLOAD_SUCCESS, payload: obj };
};

export const deleteUploadITRFailure = (obj) => {
  return { type: DELETE_ITR_UPLOAD_FAILURE, payload: obj };
};

export const resetDDE = () => {
  return { type: RESET_DDE };
};