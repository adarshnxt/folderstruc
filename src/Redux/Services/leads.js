import { get, post } from "../../Utility/httpInterceptor";
import { te, ts } from "../../Utility/ReduxToaster";
import { loading } from "../Action/App";
import {
  addCoapplicantGuarantor,
  addCoapplicantGuarantorFailure,
  addCoapplicantGuarantorSuccess,
  addLeadDealerFailure,
  addLeadDealerSuccess,
  addLeadDsaFailure,
  addLeadDsaSuccess,
  createConsentCoapplicantGuarantorFailure,
  createConsentCoapplicantGuarantorSuccess,
  createConsentFailure,
  createConsentSuccess,
  deleteCoapplicantGuarantor,
  deleteCoapplicantGuarantorFailure,
  deleteCoapplicantGuarantorSuccess,
  deleteLead,
  deleteLeadFailure,
  deleteLeadSuccess,
  getCoapplicantGuarantorDetailsByCoapplicantIdFailure,
  getCoapplicantGuarantorDetailsByCoapplicantIdSuccess,
  getDealerListFailure,
  getDealerListSuccess,
  getDsaListFailure,
  getDsaListSuccess,
  getLeadDetail,
  getLeadDetailsFailure,
  getLeadDetailsSuccess,
  postAddLeadFailure,
  postAddLeadSuccess,
  resetLeads,
  saveLeadDetails,
  updateLeadFailure,
  updateLeadSuccess,
  verifyCoapplicantGuarantorConcent,
  verifyCoapplicantGuarantorConcentFailure,
  verifyCoapplicantGuarantorConcentSuccess,
  verifyConcent,
  verifyConcentFailure,
  verifyConcentSuccess,
  getBranchList,
  getBranchListSuccess,
  getBranchListFailure,
  resetDeleteLead,
} from "../Action/Leads";

export const saveCommonLeadDetails =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(saveLeadDetails(objBody));
  };

export const postAddDirectLeads =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(loading(true));
    try {
      const response = await post("/cwc-sales/lead/addLead", objBody, false);
      if (response.data.error) {
        dispatch(postAddLeadFailure());
        ts(response.data.message);
      } else {
        te(response.data.message);
        return dispatch(postAddLeadSuccess(response.data.data));
      }
    } catch (err) {
      dispatch(postAddLeadFailure(err));
    } finally {
      dispatch(loading(false));
    }
  };

export const postAddDsaLead =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(loading(true));
    try {
      const response = await post("/cwc-sales/lead/addLead", objBody, false);
      if (response.data.error) {
        dispatch(addLeadDsaFailure());
        te(response.data.message);
      } else {
        ts(response.data.message);
        return dispatch(addLeadDsaSuccess(response.data.data));

      }
    } catch (err) {
      dispatch(addLeadDsaFailure(err));
    } finally {
      dispatch(loading(false));
    }
  };

export const postAddDealerLead =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(loading(true));
    try {
      const response = await post("/cwc-sales/lead/addLead", objBody, false);

      if (response.data.error) {
        te(response.data.message);
        dispatch(addLeadDealerFailure());
      } else {
        ts(response.data.message);
        return dispatch(addLeadDealerSuccess(response.data.data));
      }
    } catch (err) {
      dispatch(addLeadDealerFailure(err));
    } finally {
      dispatch(loading(false));
    }
  };

// for creating concent
export const createConcent =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(loading(true));
    try {
      const response = await post(`/cwc-sales/lead/createConsent`, objBody);
      ts(response.data.message);
      return dispatch(createConsentSuccess());
    } catch (err) {
      dispatch(createConsentFailure(err));
    } finally {
      dispatch(loading(false));
    }
  };

// for verify Consent
export const verifyConsent =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(loading(true));
    dispatch(verifyConcent());
    try {
      const response = await post(`/cwc-sales/lead/verifyConsent`, objBody);
      if (!response.data.error) {
        dispatch(verifyConcentSuccess());
      } else {
        dispatch(verifyConcentFailure());
        te("Invalid OTP");
      }
    } catch (err) {
    } finally {
      dispatch(loading(false));
    }
  };

//deleting lead
export const deleteLeadByLeadId =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(deleteLead());
    try {
      const response = await post("/cwc-sales/lead/deleteLead", objBody, false);
      return dispatch(deleteLeadSuccess());
    } catch (err) {
      dispatch(deleteLeadFailure(err));
    } finally {
      // dispatch(resetDeleteLead())
    }
  };

//updating Leads
export const updateLeads =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(loading(true));
    try {
      const response = await post("/cwc-sales/lead/addLead", objBody, false);
      return dispatch(updateLeadSuccess(response.data.data));
    } catch (err) {
      dispatch(updateLeadFailure(err));
    } finally {
      dispatch(loading(false));
    }
  };

export const fetchDealerDetails =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(loading(true));
    try {
      const response = await post(`/cwc-sales/master/getDealerList`, objBody);
      // const response = { data: { error: false } };
      if (response.data.error) {
        dispatch(getDealerListFailure());
      } else {
        dispatch(getDealerListSuccess(response.data.data));
        // dispatch(getDsaListSuccess([9, 8, 7, 6]));
      }
    } catch (err) {
      dispatch(getDealerListFailure());
    } finally {
      dispatch(loading(false));
    }
  };

export const fetchDsaDetails = () => async (dispatch) => {
  loading(true);
  try {
    const response = await get(`/cwc-sales/user/getDsaCodeList`);
    // const response = { data: { error: false } };
    if (response.data.error) {
      dispatch(getDsaListFailure());
    } else {
      dispatch(getDsaListSuccess(response.data.data));
      // dispatch(getDsaListSuccess([9, 8, 7, 6]));
    }
  } catch (err) {
    dispatch(getDsaListFailure());
  } finally {
    dispatch(loading(false));
  }
};

export const addLead =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(loading(true));
    try {
      const response = await post("/cwc-sales/lead/addLead", objBody, false);
      if (response.data.error) {
        te(response.data.message);
        dispatch(postAddLeadFailure(response.data));
      } else {
        ts(response.data.message);
        return dispatch(postAddLeadSuccess(response.data));

      }
    } catch (err) {
      dispatch(postAddLeadFailure(err));
    } finally {
      dispatch(loading(false));
    }
  };

export const getLeadDetails =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(loading(true));
    dispatch(getLeadDetail());
    try {
      const response = await get(
        `/cwc-sales/lead/getLeadDetails?id=${objBody.id}`
      );
      // const response = { data: { error: false } };

      if (response.data.error) {
        dispatch(getLeadDetailsFailure(response.data));
      } else {
        return dispatch(getLeadDetailsSuccess(response.data));
      }
    } catch (err) {
      dispatch(getLeadDetailsFailure(err));
    } finally {
      dispatch(loading(false));
    }
  };

//deleting lead
export const deleteLeads =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(loading(true));
    dispatch(deleteLead());
    try {
      const response = await post("/cwc-sales/lead/deleteLead", objBody, false);
      if (!response.data.error) {
        ts(response.data.message);
        return dispatch(deleteLeadSuccess(response.data));
      } else {
        return dispatch(deleteLeadFailure(response.data));
      }
    } catch (err) {
      dispatch(deleteLeadFailure(err));
    } finally {
      dispatch(loading(false));
    }
  };

// for add co-applicant and guarantor
export const addCoapplicantGuarantorService =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(loading(true));
    dispatch(addCoapplicantGuarantor());
    try {
      const response = await post(
        "/cwc-sales/coapplicant/addbasicdetails",
        objBody,
        false
      );
      if (response.data.error) {
        dispatch(addCoapplicantGuarantorFailure(response.data));
      } else {
        return dispatch(addCoapplicantGuarantorSuccess(response.data));
      }
    } catch (err) {
      dispatch(addCoapplicantGuarantorFailure(err));
    } finally {
      dispatch(loading(false));
    }
  };

// for get co-applicant and guarantor by coapplicantuniqueId
export const getCoapplicantGuarantorByCoapplicantIdService =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(loading(true));
    try {
      const response = await post(
        "/cwc-sales/coapplicant/getcoApplicantDetailsbyApplicantUniqid",
        objBody,
        false
      );
      if (response.data.error) {
        dispatch(
          getCoapplicantGuarantorDetailsByCoapplicantIdFailure(response.data)
        );
      } else {
        return dispatch(
          getCoapplicantGuarantorDetailsByCoapplicantIdSuccess(response.data)
        );
      }
    } catch (err) {
      dispatch(getCoapplicantGuarantorDetailsByCoapplicantIdFailure(err));
    } finally {
      dispatch(loading(false));
    }
  };

//deleting coApplicant and guarantor
export const deleteCoapplicantGuarantorService =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(loading(true));
    dispatch(deleteCoapplicantGuarantor());
    try {
      const response = await post(
        "/cwc-sales/coapplicant/deleteCoApplicantGurentor",
        objBody,
        false
      );
      if (!response.data.error) {
        ts(response.data.message);
        return dispatch(deleteCoapplicantGuarantorSuccess(response.data));
      } else {
        te(response.data.message);
        return dispatch(deleteCoapplicantGuarantorFailure(response.data));
      }
    } catch (err) {
      dispatch(deleteCoapplicantGuarantorFailure(err));
    } finally {
      dispatch(loading(false));
    }
  };

// for creating concent coApplicant and guarantor
export const createConcentCoapplicantGuarantor =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(loading(true));
    try {
      const response = await post(
        `/cwc-sales/coapplicant/createConsent`,
        objBody
      );
      ts(response.data.message);
      return dispatch(createConsentCoapplicantGuarantorSuccess());
    } catch (err) {
      dispatch(createConsentCoapplicantGuarantorFailure(err));
    } finally {
      dispatch(loading(false));
    }
  };

// for verify Consent coApplicant and guarantor
export const verifyConsentCoapplicantGuarantor =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(loading(true));
    dispatch(verifyCoapplicantGuarantorConcent());
    try {
      const response = await post(
        `/cwc-sales/coapplicant/verifyConsent`,
        objBody
      );
      if (!response.data.error) {
        dispatch(verifyCoapplicantGuarantorConcentSuccess());
      } else {
        dispatch(verifyCoapplicantGuarantorConcentFailure());
        te("Invalid OTP");
      }
    } catch (err) {
    } finally {
      dispatch(loading(false));
    }
  };

export const getBranch =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(loading(true));
    dispatch(getBranchList());
    try {
      const response = await get(
        `/cwc-sales/master/getBranchlist?employeeId=${objBody.employeeId}`
      );

      if (response.data.error) {
        dispatch(getBranchListFailure(response.data));
      } else {
        return dispatch(getBranchListSuccess(response.data));
      }
    } catch (err) {
      dispatch(getLeadDetailsFailure(err));
    } finally {
      dispatch(loading(false));
    }
  };

export const getLeadList =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(loading(true));
    let data = [];
    try {
      const response = await post(
        `/cwc-sales/lead/getLeadList`,
        objBody,
        false
      );
      if (!response.data.error) {
        ts(response.data.message);
        data = response.data.data ? response.data.data : [];
      } else {
        te(response.data.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(loading(false));
      return data;
    }
  };

// get all Leads by search
export const getAllLeadsBySearch =
  (body = {}) =>
  async (dispatch) => {
    // dispatch(loading(true));
    let data = {};
    dispatch(resetDeleteLead());
    try {
      const response = await post(
        `/cwc-sales/lead/getallleadsbysearch`,
        body,
        false
      );
      if (!response.data.error && !response.error) {
        data = response.data ? response.data : [];
      } else {
        te(response.data.message);
      }
    } catch (error) {
    } finally {
      dispatch(loading(false));
      return data;
    }
  };
