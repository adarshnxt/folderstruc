import {
  ADDRESS_DETAILS_PERMANENT,
  ADDRESS_DETAILS_PERMANENT_FAILURE,
  ADDRESS_DETAILS_PERMANENT_SUCCESS,
  ADDRESS_DETAILS_QDE,
  ADDRESS_DETAILS_QDE_FAILURE,
  ADDRESS_DETAILS_QDE_SUCCESS,
  ADD_CONTACT_DETAIL,
  ADD_CONTACT_DETAIL_FAILURE,
  ADD_CONTACT_DETAIL_SUCCESS,
  ADD_EMPLOYEE_DETAILS,
  ADD_EMPLOYEE_DETAILS_FAILURE,
  ADD_EMPLOYEE_DETAILS_SUCCESS,
  DELETE_DOCUMENT,
  DELETE_DOCUMENT_FAILURE,
  DELETE_DOCUMENT_SUCCESS,
  DELETE_UTILITY_DOCUMENT,
  DELETE_UTILITY_DOCUMENT_FAILURE,
  DELETE_UTILITY_DOCUMENT_SUCCESS,
  GET_ALT_CONTACT_DETAIL,
  GET_ALT_CONTACT_DETAIL_FAILURE,
  GET_ALT_CONTACT_DETAIL_SUCCESS,
  GET_PINCODE,
  GET_PINCODE_FAILURE,
  GET_PINCODE_SUCCESS,
  GET_QDE_DETAILS,
  GET_QDE_DETAILS_FAILURE,
  GET_QDE_DETAILS_SUCCESS,
  GET_QDE_ENTITY_LIST,
  GET_QDE_ENTITY_LIST_FAILURE,
  GET_QDE_ENTITY_LIST_SUCCESS,
  GET_QDE_LOAN,
  GET_QDE_LOAN_FAILURE,
  GET_QDE_LOAN_SUCCESS,
  GET_QDE_SCHEME,
  GET_QDE_SCHEME_FAILURE,
  GET_QDE_SCHEME_SUCCESS,
  GET_REFERENCE_DETAILS,
  GET_REFERENCE_DETAILS_FAILURE,
  GET_REFERENCE_DETAILS_SUCCESS,
  GET_RESIDENT_TYPE_FAILURE,
  GET_RESIDENT_TYPE_SUCCESS,
  GET_UTILITY_DETAILS,
  GET_UTILITY_DETAILS_FAILURE,
  GET_UTILITY_DETAILS_SUCCESS,
  RESET_QDE,
  RESET_UPLOADED_PAN,
  SAVE_FAMILY_REF,
  SAVE_FAMILY_REF_FAILURE,
  SAVE_FAMILY_REF_SUCCESS,
  SAVE_LOAN_DETAILS,
  SAVE_LOAN_DETAILS_FAILURE,
  SAVE_LOAN_DETAILS_SUCCESS,
  SAVE_NONFAMILY_REF,
  SAVE_NONFAMILY_REF_FAILURE,
  SAVE_NONFAMILY_REF_SUCCESS,
  SAVE_PANGST_FAILURE,
  SAVE_PANGST_SUCCESS,
  SAVE_POI,
  SAVE_POI_FAILURE,
  SAVE_POI_SUCCESS,
  SAVE_SCHEME_FAILURE,
  SAVE_SCHEME_SUCCESS,
  SAVE_UPDATE_BUSINESS_DETAILS,
  SAVE_UPDATE_BUSINESS_DETAILS_FAILURE,
  SAVE_UPDATE_BUSINESS_DETAILS_SUCCESS,
  SAVE_UTILITY_BILL,
  SAVE_UTILITY_BILL_FAILURE,
  SAVE_UTILITY_BILL_SUCCESS,
  SUBMIT_TO_CREDIT,
  SUBMIT_TO_CREDIT_FAILURE,
  SUBMIT_TO_CREDIT_SUCCESS,
  UPLOAD_DOC_FAILURE,
  UPLOAD_DOC_SUCCESS,
  UPLOAD_POA_DOC,
  UPLOAD_POA_DOC_FAILURE,
  UPLOAD_POA_DOC_SUCCESS,
  UPLOAD_POI_DOC,
  UPLOAD_POI_DOC_FAILURE,
  UPLOAD_POI_DOC_SUCCESS,
  VERIFY_DL_FAILURE,
  VERIFY_DL_SUCCESS,
  VERIFY_PAN,
  VERIFY_PAN_FAILURE,
  VERIFY_PAN_SUCCESS,
  VERIFY_VOTER_FAILURE,
  VERIFY_VOTER_SUCCESS,
  SAVE_PERSONAL_DETAILS_SUCCESS,
  SAVE_PERSONAL_DETAILS_FAILURE,
  UPLOAD_SELFIE,
  UPLOAD_SELFIE_SUCCESS,
  UPLOAD_SELFIE_FAILURE,
  DELETE_UPLOADED_SELFIE,
  DELETE_UPLOADED_SELFIE_FAILURE,
  DELETE_UPLOADED_SELFIE_SUCCESS,
  GET_MAX_AMT,
  GET_MAX_AMT_SUCCESS,
  GET_MAX_AMT_FAILURE,
  RESET_QDE_SCHEMES_SUCCESS,
} from "../Constants";

const initialState = {
  entityList: [],
  pangst: {
    data: {},
  },
  loading: null,
  panVerified: false,
  reference: {
    familyref: {},
    nonfamilyref: {},
  },
  uploadedDocumentData: {
    success: {},
    error: {},
  },
  savePanGst: null,
  saveUpdateBusinessDetails: {},
  addsuccess: null,
  employeeDetails: {},
  pincodeDetails: null,
  alternateContactDetails: null,
  getaltContactDetails: null,
  getQdeSectionDetails: {},
  uploadPOI: null,
  getQdeDetails: null,
  addressDetails: null,
  uploadPOA: null,
  utilityBillDetails: null,
  POIDetails: null,
  getLoanData: null,
  customerData: null,
  customerCreateSuccess: null,
  isSchemeSucess: false,
  saveLoanDetails: null,
  deleteSuccess: null,
  deleteDocument: {},
  uploadLoanDetailsSuccess: false,
  loanDetailsSuccess: false,
  submitToCredit: null,
  submited: null,
  addKYCSuccess: false,
  addUtilitySuccess: false,
  addPermanentSuccess: false,
  addEmployeeSuccess: false,
  addOfficeSuccess: false,
  verifyPan: null,
  verifyPanFlag: false,
  verifyDl: null,
  verifyVoterFlag: null,
  verifyVoter: null,
  getUtilityDocDetails: null,
  personalDetails: {
    data: {},
  },
  savePersonalDetails: null,
  uploadSelfie: null,
  deleteUploadedSelfie: null,
  getMaxAmount: null,
  isSelfieDeleted: false,
  familyRefSuccess: false,
  nonFamilyRefSuccess: false,
  resetData: null,
  docUploadSuccess: null,
  utilityDocUploadSuccess: null,
};

function qdeReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_QDE:
      return initialState;
    case GET_QDE_ENTITY_LIST:
      return { ...state, loading: true };
    case GET_QDE_ENTITY_LIST_SUCCESS:
      return { ...state, entityList: action.payload, loading: false };
    case GET_QDE_ENTITY_LIST_FAILURE:
      return { ...state, entityList: [], loading: false };
    case VERIFY_PAN:
      return { ...state, panVerified: false };
    case VERIFY_PAN_FAILURE:
      return { ...state, panVerified: false };
    case VERIFY_PAN_SUCCESS:
      return { ...state, panVerified: true };
    case UPLOAD_DOC_FAILURE:
      return {
        ...state,
        uploadedDocumentData: { success: {}, error: action.payload },
      };
    case UPLOAD_DOC_SUCCESS:
      return {
        ...state,
        uploadedDocumentData: { success: action.payload, error: {} },
      };
    case RESET_UPLOADED_PAN:
      return {
        ...state,
        uploadedDocumentData: initialState.uploadedDocumentData,
        resetData: true,
        panVerified: false,
      };
    case SAVE_PANGST_SUCCESS:
      return {
        ...state,
        pangst: action.payload,
        savePanGst: true,
        getQdeDetails: true,
        resetData: false,
      };

    case SAVE_PANGST_FAILURE:
      return {
        ...state,
        pangst: {},
        savePanGst: false,
        getQdeDetails: false,
      };
    case SAVE_SCHEME_FAILURE:
      return { ...state, isSchemeSucess: false };
    case SAVE_SCHEME_SUCCESS:
      return { ...state, isSchemeSucess: true, getQdeDetails: true };

    case SAVE_UPDATE_BUSINESS_DETAILS:
      return { ...state, loading: true, addsuccess: null };
    case SAVE_UPDATE_BUSINESS_DETAILS_SUCCESS:
      return {
        ...state,
        saveUpdateBusinessDetails: action.payload,
        loading: false,
        addsuccess: true,
      };
    case SAVE_UPDATE_BUSINESS_DETAILS_FAILURE:
      return {
        ...state,
        saveUpdateBusinessDetails: {},
        loading: true,
        addsuccess: false,
      };

    case SAVE_FAMILY_REF:
      return {
        ...state,
        reference: { ...state.reference, familyref: {} },
        loading: true,
        addsuccess: false,
        getQdeDetails: false,
      };

    case SAVE_FAMILY_REF_SUCCESS:
      return {
        ...state,
        reference: { ...state.reference, familyref: action.payload },
        loading: false,
        addsuccess: true,
        getQdeDetails: true,
        familyRefSuccess: true,
      };

    case SAVE_FAMILY_REF_FAILURE:
      return {
        ...state,
        reference: { ...state.reference, familyref: {} },
        loading: true,
        addsuccess: false,
      };

    case SAVE_NONFAMILY_REF:
      return {
        ...state,
        reference: { ...state.reference, nonfamilyref: {} },
        loading: true,
        addsuccess: false,
        getQdeDetails: false,
      };

    case SAVE_NONFAMILY_REF_SUCCESS:
      return {
        ...state,
        reference: { ...state.reference, nonfamilyref: action.payload },
        loading: false,
        addsuccess: true,
        getQdeDetails: true,
        nonFamilyRefSuccess: true,
      };

    case SAVE_NONFAMILY_REF_FAILURE:
      return {
        ...state,
        reference: { ...state.reference, nonfamilyref: {} },
        loading: true,
        addsuccess: false,
      };
    case GET_REFERENCE_DETAILS:
      return {
        ...state,
      };
    case GET_REFERENCE_DETAILS_SUCCESS:
      return {};
    case GET_REFERENCE_DETAILS_FAILURE:
      return {};

    case ADD_EMPLOYEE_DETAILS:
      return { ...state, loading: true, addSuccess: null };
    case ADD_EMPLOYEE_DETAILS_SUCCESS:
      return {
        ...state,
        employeeDetails: action.payload,
        loading: false,
        addSuccess: true,
        getQdeDetails: true,
        addEmployeeSuccess: true,
      };
    case ADD_EMPLOYEE_DETAILS_FAILURE:
      const { data, ...rest1 } = action.payload;
      return {
        ...state,
        loading: false,
        addSuccess: false,
        addEmployeeSuccess: false,
      };
    case GET_PINCODE:
      return { ...state, pincodeDetails: null, loading: true };
    case GET_PINCODE_SUCCESS:
      return { ...state, pincodeDetails: action.payload, loading: false };
    case GET_PINCODE_FAILURE:
      return { ...state, pincodeDetails: {}, loading: false };

    case ADD_CONTACT_DETAIL:
      return { ...state, loading: true, addSuccess: null };
    case ADD_CONTACT_DETAIL_SUCCESS:
      return {
        ...state,
        alternateContactDetails: action.payload,
        loading: false,
        addSuccess: true,
        getQdeDetails: true,
      };
    case ADD_CONTACT_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        addSuccess: false,
      };

    case GET_ALT_CONTACT_DETAIL:
      return {
        ...state,
        getaltContactDetails: null,
        loading: true,
        addsuccess: false,
      };
    case GET_ALT_CONTACT_DETAIL_SUCCESS:
      return {
        ...state,
        getaltContactDetails: action.payload,
        loading: false,
        addsuccess: true,
      };
    case GET_ALT_CONTACT_DETAIL_FAILURE:
      return {
        ...state,
        getaltContactDetails: {},
        loading: false,
        addsuccess: false,
      };

    case UPLOAD_POI_DOC:
      return { ...state, loading: true };
    case UPLOAD_POI_DOC_SUCCESS:
      return {
        ...state,
        uploadPOI: action.payload,
        loading: false,
        docUploadSuccess: true,
      };
    case UPLOAD_POI_DOC_FAILURE:
      const { data4, ...rest4 } = action.payload;
      return {
        ...state,
        uploadPOI: { ...state.uploadPOI, ...rest4 },
        loading: false,
        docUploadSuccess: true,
      };

    case GET_QDE_DETAILS:
      return {
        ...state,
        getQdeSectionDetails: {},
        loading: true,
        getQdeDetails: false,
      };
    case GET_QDE_DETAILS_SUCCESS:
      const { pangstdetails } = action.payload.data;
  
      return {
        ...state,
        getQdeSectionDetails: action.payload,
        loading: false,
        panVerified: pangstdetails
          ? pangstdetails.verifyStatus === "Approved"
          : false,
      };
    case GET_QDE_DETAILS_FAILURE:
      return {
        ...state,
        getQdeSectionDetails: {},
        loading: false,
        getQdeDetails: false,
      };

    case ADDRESS_DETAILS_QDE:
      return { ...state, loading: true, addSuccess: null };
    case ADDRESS_DETAILS_QDE_SUCCESS:
      return {
        ...state,
        addressDetails: action.payload,
        loading: false,
        addSuccess: true,
        getQdeDetails: true,
        addOfficeSuccess: action.payload.type !== "permanent",
        addPermanentSuccess: action.payload.type === "permanent",
      };
    case ADDRESS_DETAILS_QDE_FAILURE:
      return {
        ...state,
        loading: false,
        addSuccess: false,
        addOfficeSuccess: action.payload.type !== "permanant",
        addPermanentSuccess: action.payload.type === "permanant",
      };

    case GET_RESIDENT_TYPE_SUCCESS:
      return {
        ...state,
        residentType: action.payload,
      };

    case GET_RESIDENT_TYPE_FAILURE:
      return {
        ...state,
        residentType: {},
      };

    case VERIFY_DL_SUCCESS:
      return {
        ...state,
        verifyDl: action.payload,
        verifyPanFlag: true,
      };

    case VERIFY_DL_FAILURE:
      return {
        ...state,
        verifyDl: {},
        verifyPanFlag: false,
      };

    case UPLOAD_POA_DOC:
      return { ...state, loading: true };
    case UPLOAD_POA_DOC_SUCCESS:
      return {
        ...state,
        uploadPOA: action.payload,
        loading: false,
        utilityDocUploadSuccess: true,
      };
    case UPLOAD_POA_DOC_FAILURE:
      const { data5, ...rest5 } = action.payload;
      return {
        ...state,
        uploadPOA: { ...state.uploadPOA, ...rest5 },
        loading: false,
        utilityDocUploadSuccess: false,
      };

    case SAVE_UTILITY_BILL:
      return {
        ...state,
        loading: true,
        addSuccess: null,
        addUtilitySuccess: null,
      };
    case SAVE_UTILITY_BILL_SUCCESS:
      return {
        ...state,
        utilityBillDetails: action.payload,
        loading: false,
        getQdeDetails: true,
        addUtilitySuccess: true,
      };
    case SAVE_UTILITY_BILL_FAILURE:
      return {
        ...state,
        loading: false,
        addSuccess: false,
        addUtilitySuccess: false,
      };

    case SAVE_POI:
      return { ...state, loading: true, addSuccess: null };
    case SAVE_POI_SUCCESS:
      return {
        ...state,
        POIDetails: action.payload,
        loading: false,
        getQdeDetails: true,
        addKYCSuccess: true,
      };
    case SAVE_POI_FAILURE:
      return {
        ...state,
        loading: false,
        addSuccess: false,
        addKYCSuccess: false,
      };

    case VERIFY_VOTER_SUCCESS:
      return {
        ...state,
        verifyVoter: action.payload,
        verifyVoterFlag: true,
      };

    case VERIFY_VOTER_FAILURE:
      return {
        ...state,
        verifyVoter: {},
        verifyVoterFlag: false,
      };

    case GET_QDE_LOAN:
      return {
        ...state,
        loading: true,
        getLoanData: null,
        addSuccess: false,
      };
    case GET_QDE_LOAN_SUCCESS:
      return {
        ...state,
        getLoanData: action.payload,
        loading: false,
        addSuccess: true,
      };
    case GET_QDE_LOAN_FAILURE:
      return {
        ...state,
        getLoanData: {},
        loading: false,
        addSuccess: false,
      };

    case GET_QDE_SCHEME:
      return {
        ...state,
        loading: true,
        customerData: null,
        customerCreateSuccess: null,
      };
    case GET_QDE_SCHEME_SUCCESS:
      return {
        ...state,
        customerData: action.payload,
        loading: false,
        customerCreateSuccess: true,
      };
    case GET_QDE_SCHEME_FAILURE:
      return {
        ...state,
        customerData: {},
        loading: false,
        customerCreateSuccess: false,
      };

    case RESET_QDE_SCHEMES_SUCCESS:
      return {
        ...state,
        customerCreateSuccess: null,
      };

    case SAVE_LOAN_DETAILS:
      return {
        ...state,
        loading: true,
        addsuccess: false,
        getQdeDetails: false,
        loanDetailsSuccess: false,
      };

    case SAVE_LOAN_DETAILS_SUCCESS:
      return {
        ...state,
        saveLoanDetails: action.payload,
        loading: false,
        addsuccess: true,
        getQdeDetails: true,
        loanDetailsSuccess: true,
      };

    case SAVE_LOAN_DETAILS_FAILURE:
      return {
        ...state,
        saveLoanDetails: {},
        loading: true,
        addsuccess: false,
        loanDetailsSuccess: false,
      };

    case DELETE_DOCUMENT:
      return {
        ...state,
        loading: true,
        deleteDocument: {},
      };
    case DELETE_DOCUMENT_SUCCESS:
      return {
        ...state,
        deleteDocument: {
          ...state.deleteDocument,
          ...action.payload,
          deleteSuccess: true,
        },
        loading: false,
        docUploadSuccess: false,
        getQdeDetails: true,
      };
    case DELETE_DOCUMENT_FAILURE:
      return {
        ...state,
        deleteDocument: {
          ...state.deleteDocument,
          ...action.payload,
          deleteSuccess: false,
        },
        loading: false,
      };

    case SUBMIT_TO_CREDIT:
      return { ...state, loading: true, submited: null };
    case SUBMIT_TO_CREDIT_SUCCESS:
      return {
        ...state,
        submitToCredit: action.payload,
        loading: false,
        submited: true,
      };
    case SUBMIT_TO_CREDIT_FAILURE:
      return {
        ...state,
        loading: false,
        submited: false,
      };
    case ADDRESS_DETAILS_PERMANENT:
      return { ...state, loading: true, addSuccess: null };
    case ADDRESS_DETAILS_PERMANENT_SUCCESS:
      return {
        ...state,
        addressDetails: action.payload,
        loading: false,
        addSuccess: true,
        getQdeDetails: true,
        addPermanentSuccess: true,
      };
    case ADDRESS_DETAILS_PERMANENT_FAILURE:
      return {
        ...state,
        loading: false,
        addSuccess: false,
        addPermanentSuccess: false,
      };

    case GET_UTILITY_DETAILS:
      return { ...state, loading: true };
    case GET_UTILITY_DETAILS_SUCCESS:
      return {
        ...state,
        getUtilityDocDetails: action.payload,
        loading: false,
      };
    case GET_UTILITY_DETAILS_FAILURE:
      const { data1, ...rest7 } = action.payload;
      return {
        ...state,
        getUtilityDocDetails: { ...state.getUtilityDocDetails, ...rest7 },
        loading: false,
      };

    case DELETE_UTILITY_DOCUMENT:
      return {
        ...state,
        loading: true,
        deleteDocument: {},
        deleteSuccess: null,
      };
    case DELETE_UTILITY_DOCUMENT_SUCCESS:
      return {
        ...state,
        deleteDocument: { ...state.deleteDocument, ...action.payload },
        loading: false,
        deleteSuccess: true,
        getQdeDetails: true,
        utilityDocUploadSuccess: false,
      };
    case DELETE_UTILITY_DOCUMENT_FAILURE:
      return {
        ...state,
        deleteDocument: { ...state.deleteDocument, ...action.payload },
        loading: false,
        deleteSuccess: false,
      };

    //-----------------------------PERSONAL DETAILS--------------
    case SAVE_PERSONAL_DETAILS_SUCCESS:
      return {
        ...state,
        addSuccess: true,
        personalDetails: action.payload,
        savePersonalDetails: true,
        getQdeDetails: true,
      };

    case SAVE_PERSONAL_DETAILS_FAILURE:
      return {
        ...state,
        personalDetails: {},
        savePersonalDetails: false,
        getQdeDetails: false,
      };

    case UPLOAD_SELFIE:
      return { ...state, loading: true };

    case UPLOAD_SELFIE_SUCCESS:
      return { ...state, uploadSelfie: action.payload, loading: false };

    case UPLOAD_SELFIE_FAILURE:
      return { ...state, uploadSelfie: [], loading: false };

    case DELETE_UPLOADED_SELFIE:
      return { ...state, loading: true };

    case DELETE_UPLOADED_SELFIE_SUCCESS:
      return {
        ...state,
        deleteUploadedSelfie: action.payload,
        loading: false,
        isSelfieDeleted: true,
        uploadSelfie: null,
      };

    case DELETE_UPLOADED_SELFIE_FAILURE:
      return { ...state, deleteUploadedSelfie: [], loading: false };

    case GET_MAX_AMT:
      return {
        ...state,
        loading: true,
      };
    case GET_MAX_AMT_SUCCESS:
      return {
        ...state,
        getMaxAmount: action.payload,
        loading: false,
      };
    case GET_MAX_AMT_FAILURE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
export default qdeReducer;
