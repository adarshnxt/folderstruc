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

const initialState = {
  leadListType: "Lead",
  commonLeads: {},
  leads: {},
  coapplicantGuarantor: {},
  dealerLeads: [],
  dsaLeads: [],
  loading: null,
  addSuccess: null,
  updateSuccess: null,
  deleteSuccess: false,
  createConsentSuccess: false,
  verifyConcentSuccess: null,
  fetchLeadDetailsSuccess: null,
  getCoapplicantGuarantorDetails: null,
  createConsentCGSuccess: false,
  verifyCGConcentSuccess: null,
  addSuccessCoapplicant: null,
  branchList: null,
};

function leadsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LEAD_LIST_TYPE:
      return { ...state, leadListType: action.payload };
    case SAVE_LEAD_DETAILS:
      return { ...state, commonLeads: action.payload };
    case POST_ADD_LEAD:
      return { ...state, loading: true, addSuccess: null };
    case POST_ADD_LEAD_SUCCESS:
      return {
        ...state,
        leads: action.payload,
        loading: false,
        addSuccess: true,
        fetchLeadDetailsSuccess: null,
      };
    case POST_ADD_LEAD_FAILURE:
      const { data, ...rest } = action.payload;
      return {
        ...state,
        leads: { ...state.leads, ...rest },
        loading: false,
        addSuccess: false,
        fetchLeadDetailsSuccess: null,
      };

    case ADD_DEALER_LEAD:
      return { ...state, loading: true, addSuccess: null };
    case ADD_DEALER_LEAD_SUCCESS:
      return {
        ...state,
        dealerLeads: action.payload,
        loading: false,
        addSuccess: true,
      };
    case ADD_DEALER_LEAD_FAILURE:
      return { ...state, dealerLeads: {}, loading: false, addSuccess: false };

    case ADD_DSA_LEAD:
      return { ...state, loading: true, addSuccess: null };
    case ADD_DSA_LEAD_SUCCESS:
      return {
        ...state,
        dsaLead: action.payload,
        loading: false,
        addSuccess: true,
      };
    case ADD_DSA_LEAD_FAILURE:
      return { ...state, dsaLead: {}, loading: false, addSuccess: false };

    case CREATE_CONSENT_SUCCESS:
      return { ...state, createConsentSuccess: true };
    case CREATE_CONSENT_FAILURE:
      return { ...state, createConsentSuccess: false };

    case DELETE_LEAD:
      return { ...state, loading: true, deleteSuccess: false };
    case DELETE_LEAD_SUCCESS:
      return {
        ...state,
        leads: { ...state.leads, ...action.payload },
        loading: false,
        deleteSuccess: true,
      };
    case DELETE_LEAD_FAILURE:
      return {
        ...state,
        leads: { ...state.leads, ...action.payload },
        loading: false,
        deleteSuccess: false,
      };
    case RESET_DELETE_LEAD:
      return {
        ...state,
        deleteSuccess: false,
      };

    case UPDATE_LEAD:
      return { ...state, loading: true, updateSuccess: null };
    case UPDATE_LEAD_SUCCESS:
      return {
        ...state,
        leads: action.payload,
        loading: false,
        updateSuccess: true,
      };
    case UPDATE_LEAD_FAILURE:
      return { ...state, leads: {}, loading: false, updateSuccess: false };

    case VERIFY_CONCENT:
      return { ...state, verifyConcentSuccess: null };

    case VERIFY_CONCENT_SUCCESS:
      return { ...state, verifyConcentSuccess: true };

    case VERIFY_CONCENT_FAILURE:
      return { ...state, verifyConcentSuccess: false };

    case GET_DEALERLIST_SUCCESS:
    case GET_DEALERLIST_FAILURE:
      return { ...state, dealerLeads: action.payload };

    case GET_DSALIST_SUCCESS:
    case GET_DSALIST_FAILURE:
      return { ...state, dsaLeads: action.payload };

    case GET_LEAD_DETAILS:
      return { ...state, fetchLeadDetailsSuccess: null, addSuccess: null };

    case GET_LEAD_DETAILS_SUCCESS:
      return {
        ...state,
        leads: action.payload,
        fetchLeadDetailsSuccess: true,
        createConsentSuccess: false,
      };
    case GET_LEAD_DETAILS_FAILURE:
      return {
        ...state,
        leads: action.payload,
        fetchLeadDetailsSuccess: false,
      };

    case ADD_COAPPLICANT_GUARANTOR:
      return { ...state, loading: true, addSuccessCoapplicant: null };
    case ADD_COAPPLICANT_GUARANTOR_SUCCESS:
      return {
        ...state,
        coapplicantGuarantor: action.payload,
        loading: false,
        addSuccessCoapplicant: true,
        getCoapplicantGuarantorDetails: null,
        // addSuccess: true,
        // fetchLeadDetailsSuccess: true,
      };
    case ADD_COAPPLICANT_GUARANTOR_FAILURE:
      const { data1, ...rest1 } = action.payload;
      return {
        ...state,
        coapplicantGuarantor: { ...state.coapplicantGuarantor, ...rest1 },
        loading: false,
        addSuccessCoapplicant: false,
        getCoapplicantGuarantorDetails: null,
        // addSuccess: false,
        // fetchLeadDetailsSuccess: null,
      };

    case GET_COAPPLICANT_GUARANTOR_DETAILS_BY_COAPPLICANTUNIQUEID:
      return {
        ...state,
        loading: true,
        // addSuccessCoapplicant: null,
        getCoapplicantGuarantorDetails: null,
      };
    case GET_COAPPLICANT_GUARANTOR_DETAILS_BY_COAPPLICANTUNIQUEID_SUCCESS:
      return {
        ...state,
        coapplicantGuarantor: action.payload,
        addSuccessCoapplicant: false,
        loading: false,
        addSuccessCoapplicant: false,
        getCoapplicantGuarantorDetails: true,
        createConsentCGSuccess: false,
      };
    case GET_COAPPLICANT_GUARANTOR_DETAILS_BY_COAPPLICANTUNIQUEID_FAILURE:
      // const { data1, ...rest1 } = action.payload;
      return {
        ...state,
        coapplicantGuarantor: { ...state.coapplicantGuarantor },
        loading: false,
        // addSuccessCoapplicant: false,
        getCoapplicantGuarantorDetails: false,
      };

    case DELETE_COAPPLICANT_GUARANTOR:
      return { ...state, loading: true, deleteSuccess: null };
    case DELETE_COAPPLICANT_GUARANTOR_SUCCESS:
      return {
        ...state,
        coapplicantGuarantor: {
          ...state.coapplicantGuarantor,
          ...action.payload,
        },
        loading: false,
        deleteSuccess: true,
      };
    case DELETE_COAPPLICANT_GUARANTOR_FAILURE:
      return {
        ...state,
        coapplicantGuarantor: {
          ...state.coapplicantGuarantor,
          ...action.payload,
        },
        loading: false,
        deleteSuccess: false,
      };

    case CREATE_CONSENT_COAPPLICANT_GUARANTOR_SUCCESS:
      return { ...state, createConsentCGSuccess: true };
    case CREATE_CONSENT_COAPPLICANT_GUARANTOR_FAILURE:
      return { ...state, createConsentCGSuccess: false };

    case VERIFY_COAPPLICANT_GUARANTOR_CONCENT:
      return { ...state, verifyCGConcentSuccess: null };

    case VERIFY_COAPPLICANT_GUARANTOR_CONCENT_SUCCESS:
      return { ...state, verifyCGConcentSuccess: true };

    case VERIFY_COAPPLICANT_GUARANTOR_CONCENT_FAILURE:
      return { ...state, verifyCGConcentSuccess: false };

    case GET_BRANCH:
      return { ...state, addSuccess: null };

    case GET_BRANCH_SUCCESS:
      return { ...state, branchList: action.payload };
    case GET_BRANCH_FAILURE:
      return {
        ...state,
        branchList: action.payload,
      };

    case RESET_LEADS:
      return initialState;

    default:
      return state;
  }
}

export default leadsReducer;
