import {
  ADD_COAPPLICANT_GUARANTOR,
  ADD_COAPPLICANT_GUARANTOR_FAILURE,
  ADD_COAPPLICANT_GUARANTOR_SUCCESS,
  ADD_DEALER_LEAD,
  ADD_DEALER_LEAD_FAILURE,
  ADD_DEALER_LEAD_SUCCESS,
  ADD_DSA_LEAD,
  ADD_DSA_LEAD_FAILURE,
  ADD_DSA_LEAD_SUCCESS,
  CREATE_CONSENT_COAPPLICANT_GUARANTOR_FAILURE,
  CREATE_CONSENT_COAPPLICANT_GUARANTOR_SUCCESS,
  CREATE_CONSENT_FAILURE,
  CREATE_CONSENT_SUCCESS,
  DELETE_COAPPLICANT_GUARANTOR,
  DELETE_COAPPLICANT_GUARANTOR_FAILURE,
  DELETE_COAPPLICANT_GUARANTOR_SUCCESS,
  DELETE_LEAD,
  DELETE_LEAD_FAILURE,
  DELETE_LEAD_SUCCESS,
  GET_BRANCH,
  GET_BRANCH_FAILURE,
  GET_BRANCH_SUCCESS,
  GET_COAPPLICANT_GUARANTOR_DETAILS_BY_COAPPLICANTUNIQUEID,
  GET_COAPPLICANT_GUARANTOR_DETAILS_BY_COAPPLICANTUNIQUEID_FAILURE,
  GET_COAPPLICANT_GUARANTOR_DETAILS_BY_COAPPLICANTUNIQUEID_SUCCESS,
  GET_DEALERLIST_FAILURE,
  GET_DEALERLIST_SUCCESS,
  GET_DSALIST_FAILURE,
  GET_DSALIST_SUCCESS,
  GET_LEAD_DETAILS,
  GET_LEAD_DETAILS_FAILURE,
  GET_LEAD_DETAILS_SUCCESS,
  POST_ADD_LEAD,
  POST_ADD_LEAD_FAILURE,
  POST_ADD_LEAD_SUCCESS,
  RESET_DELETE_LEAD,
  RESET_LEADS,
  SAVE_LEAD_DETAILS,
  SET_LEAD_LIST_TYPE,
  UPDATE_LEAD,
  UPDATE_LEAD_FAILURE,
  UPDATE_LEAD_SUCCESS,
  VERIFY_COAPPLICANT_GUARANTOR_CONCENT,
  VERIFY_COAPPLICANT_GUARANTOR_CONCENT_FAILURE,
  VERIFY_COAPPLICANT_GUARANTOR_CONCENT_SUCCESS,
  VERIFY_CONCENT,
  VERIFY_CONCENT_FAILURE,
  VERIFY_CONCENT_SUCCESS,
} from "../Constants/index";

export const postAddLead = (obj) => {
  return { type: POST_ADD_LEAD, payload: {} };
};

export const saveLeadDetails = (obj) => {
  return { type: SAVE_LEAD_DETAILS, payload: obj };
};
export const postAddLeadSuccess = (obj) => {
  return { type: POST_ADD_LEAD_SUCCESS, payload: obj };
};

export const postAddLeadFailure = (obj) => {
  return { type: POST_ADD_LEAD_FAILURE, payload: obj };
};

// DSA LEAD
export const addLeadDsa = (obj) => {
  return { type: ADD_DSA_LEAD, payload: {} };
};

export const addLeadDsaSuccess = (obj) => {
  return { type: ADD_DSA_LEAD_SUCCESS, payload: obj };
};

export const addLeadDsaFailure = (obj) => {
  return { type: ADD_DSA_LEAD_FAILURE, payload: {} };
};

//dealer LEAD
export const addLeadDealer = (obj) => {
  return { type: ADD_DEALER_LEAD, payload: {} };
};

export const addLeadDealerSuccess = (obj) => {
  return { type: ADD_DEALER_LEAD_SUCCESS, payload: obj };
};

export const addLeadDealerFailure = (obj) => {
  return { type: ADD_DEALER_LEAD_FAILURE, payload: {} };
};

//for creating consent
export const createConsentSuccess = (obj) => {
  return { type: CREATE_CONSENT_SUCCESS, payload: true };
};

export const createConsentFailure = (obj) => {
  return { type: CREATE_CONSENT_FAILURE, payload: false };
};

//for Deleting leads
export const deleteLead = (obj) => {
  return { type: DELETE_LEAD, payload: {} };
};

export const deleteLeadSuccess = (obj) => {
  return { type: DELETE_LEAD_SUCCESS, payload: obj };
};

export const deleteLeadFailure = (obj) => {
  return { type: DELETE_LEAD_FAILURE, payload: obj };
};

export const resetDeleteLead = (obj) => {
  return { type: RESET_DELETE_LEAD, payload: obj };
};

//updating Leads
export const updateLead = (obj) => {
  return { type: UPDATE_LEAD, payload: {} };
};

export const updateLeadSuccess = (obj) => {
  return { type: UPDATE_LEAD_SUCCESS, payload: obj };
};

export const updateLeadFailure = (obj) => {
  return { type: UPDATE_LEAD_FAILURE, payload: {} };
};

export const verifyConcent = () => {
  return { type: VERIFY_CONCENT, payload: {} };
};

export const verifyConcentSuccess = () => {
  return { type: VERIFY_CONCENT_SUCCESS, payload: {} };
};

export const verifyConcentFailure = () => {
  return { type: VERIFY_CONCENT_FAILURE, payload: {} };
};

export const getDealerListFailure = () => {
  return { type: GET_DEALERLIST_FAILURE, payload: [] };
};

export const getDealerListSuccess = (obj) => {
  return { type: GET_DEALERLIST_SUCCESS, payload: obj };
};

export const getDsaListSuccess = (obj) => {
  return { type: GET_DSALIST_SUCCESS, payload: obj };
};
export const getDsaListFailure = (obj) => {
  return { type: GET_DSALIST_FAILURE, payload: [] };
};

export const getLeadDetailsFailure = (obj) => {
  return { type: GET_LEAD_DETAILS_FAILURE, payload: obj };
};
export const getLeadDetailsSuccess = (obj) => {
  return { type: GET_LEAD_DETAILS_SUCCESS, payload: obj };
};

export const getLeadDetail = (obj) => {
  return { type: GET_LEAD_DETAILS, payload: obj };
};

export const resetLeads = (obj) => {
  return { type: RESET_LEADS };
};

// for co-applicant and guarantor
export const addCoapplicantGuarantor = (obj) => {
  return { type: ADD_COAPPLICANT_GUARANTOR, payload: {} };
};

export const addCoapplicantGuarantorSuccess = (obj) => {
  return { type: ADD_COAPPLICANT_GUARANTOR_SUCCESS, payload: obj };
};

export const addCoapplicantGuarantorFailure = (obj) => {
  return { type: ADD_COAPPLICANT_GUARANTOR_FAILURE, payload: obj };
};

export const getCoapplicantGuarantorDetailsByCoapplicantId = (obj) => {
  return {
    type: GET_COAPPLICANT_GUARANTOR_DETAILS_BY_COAPPLICANTUNIQUEID,
    payload: obj,
  };
};

export const getCoapplicantGuarantorDetailsByCoapplicantIdSuccess = (obj) => {
  return {
    type: GET_COAPPLICANT_GUARANTOR_DETAILS_BY_COAPPLICANTUNIQUEID_SUCCESS,
    payload: obj,
  };
};

export const getCoapplicantGuarantorDetailsByCoapplicantIdFailure = (obj) => {
  return {
    type: GET_COAPPLICANT_GUARANTOR_DETAILS_BY_COAPPLICANTUNIQUEID_FAILURE,
    payload: obj,
  };
};

export const deleteCoapplicantGuarantor = (obj) => {
  return { type: DELETE_COAPPLICANT_GUARANTOR, payload: {} };
};

export const deleteCoapplicantGuarantorSuccess = (obj) => {
  return { type: DELETE_COAPPLICANT_GUARANTOR_SUCCESS, payload: obj };
};

export const deleteCoapplicantGuarantorFailure = (obj) => {
  return { type: DELETE_COAPPLICANT_GUARANTOR_FAILURE, payload: obj };
};

//for creating consent coapplicant & guarantor

export const createConsentCoapplicantGuarantorSuccess = (obj) => {
  return { type: CREATE_CONSENT_COAPPLICANT_GUARANTOR_SUCCESS, payload: true };
};

export const createConsentCoapplicantGuarantorFailure = (obj) => {
  return { type: CREATE_CONSENT_COAPPLICANT_GUARANTOR_FAILURE, payload: false };
};

//for verifyling concent and guarantor
export const verifyCoapplicantGuarantorConcent = () => {
  return { type: VERIFY_COAPPLICANT_GUARANTOR_CONCENT, payload: {} };
};

export const verifyCoapplicantGuarantorConcentSuccess = () => {
  return { type: VERIFY_COAPPLICANT_GUARANTOR_CONCENT_SUCCESS, payload: {} };
};

export const verifyCoapplicantGuarantorConcentFailure = () => {
  return { type: VERIFY_COAPPLICANT_GUARANTOR_CONCENT_FAILURE, payload: {} };
};

export const getBranchList = (obj) => {
  return { type: GET_BRANCH, payload: {} };
};

export const getBranchListSuccess = (obj) => {
  return { type: GET_BRANCH_SUCCESS, payload: obj };
};

export const getBranchListFailure = (obj) => {
  return { type: GET_BRANCH_FAILURE, payload: {} };
};

export const setLeadListType = (obj) => {
  return { type: SET_LEAD_LIST_TYPE, payload: obj };
};
