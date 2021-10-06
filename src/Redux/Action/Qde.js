import {
  ADD_CONTACT_DETAIL,
  ADD_CONTACT_DETAIL_FAILURE,
  ADD_CONTACT_DETAIL_SUCCESS,
  ADD_EMPLOYEE_DETAILS,
  ADD_EMPLOYEE_DETAILS_FAILURE,
  ADD_EMPLOYEE_DETAILS_SUCCESS,
  GET_ALT_CONTACT_DETAIL,
  GET_ALT_CONTACT_DETAIL_FAILURE,
  GET_ALT_CONTACT_DETAIL_SUCCESS,
  GET_PINCODE,
  GET_PINCODE_FAILURE,
  GET_PINCODE_SUCCESS,
  GET_QDE_ENTITY_LIST,
  GET_QDE_ENTITY_LIST_FAILURE,
  GET_QDE_ENTITY_LIST_SUCCESS,
  GET_REFERENCE_DETAILS,
  GET_REFERENCE_DETAILS_FAILURE,
  GET_REFERENCE_DETAILS_SUCCESS,
  GET_RESIDENT_TYPE_FAILURE,
  GET_RESIDENT_TYPE_SUCCESS,
  RESET_QDE,
  RESET_UPLOADED_PAN,
  SAVE_FAMILY_REF,
  SAVE_FAMILY_REF_FAILURE,
  SAVE_FAMILY_REF_SUCCESS,
  SAVE_NONFAMILY_REF,
  SAVE_NONFAMILY_REF_FAILURE,
  SAVE_NONFAMILY_REF_SUCCESS,
  SAVE_PANGST_FAILURE,
  SAVE_PANGST_SUCCESS,
  SAVE_SCHEME_FAILURE,
  SAVE_SCHEME_SUCCESS,
  SAVE_UPDATE_BUSINESS_DETAILS,
  SAVE_UPDATE_BUSINESS_DETAILS_FAILURE,
  SAVE_UPDATE_BUSINESS_DETAILS_SUCCESS,
  UPLOAD_DOC_FAILURE,
  UPLOAD_DOC_SUCCESS,
  UPLOAD_POI_DOC,
  UPLOAD_POI_DOC_FAILURE,
  UPLOAD_POI_DOC_SUCCESS,
  VERIFY_DL_FAILURE,
  VERIFY_DL_SUCCESS,
  VERIFY_PAN,
  VERIFY_PAN_FAILURE,
  VERIFY_PAN_SUCCESS,
  GET_QDE_DETAILS,
  GET_QDE_DETAILS_SUCCESS,
  GET_QDE_DETAILS_FAILURE,
  ADDRESS_DETAILS_QDE,
  ADDRESS_DETAILS_QDE_SUCCESS,
  ADDRESS_DETAILS_QDE_FAILURE,
  UPLOAD_POA_DOC,
  UPLOAD_POA_DOC_SUCCESS,
  UPLOAD_POA_DOC_FAILURE,
  SAVE_UTILITY_BILL,
  SAVE_UTILITY_BILL_SUCCESS,
  SAVE_UTILITY_BILL_FAILURE,
  SAVE_POI,
  SAVE_POI_SUCCESS,
  SAVE_POI_FAILURE,
  VERIFY_VOTER,
  VERIFY_VOTER_SUCCESS,
  VERIFY_VOTER_FAILURE,
  GET_QDE_LOAN,
  GET_QDE_LOAN_SUCCESS,
  GET_QDE_LOAN_FAILURE,
  GET_QDE_SCHEME,
  GET_QDE_SCHEME_SUCCESS,
  GET_QDE_SCHEME_FAILURE,
  SAVE_LOAN_DETAILS,
  SAVE_LOAN_DETAILS_SUCCESS,
  SAVE_LOAN_DETAILS_FAILURE,
  DELETE_DOCUMENT,
  DELETE_DOCUMENT_SUCCESS,
  DELETE_DOCUMENT_FAILURE,
  SUBMIT_TO_CREDIT,
  SUBMIT_TO_CREDIT_SUCCESS,
  SUBMIT_TO_CREDIT_FAILURE,
  ADDRESS_DETAILS_PERMANENT,
  ADDRESS_DETAILS_PERMANENT_SUCCESS,
  ADDRESS_DETAILS_PERMANENT_FAILURE,
  GET_UTILITY_DETAILS,
  GET_UTILITY_DETAILS_SUCCESS,
  GET_UTILITY_DETAILS_FAILURE,
  DELETE_UTILITY_DOCUMENT,
  DELETE_UTILITY_DOCUMENT_SUCCESS,
  DELETE_UTILITY_DOCUMENT_FAILURE,
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

export const getEntityList = (obj) => {
  return { type: GET_QDE_ENTITY_LIST, payload: {} };
};

export const getEntityListSuccess = (obj) => {
  return { type: GET_QDE_ENTITY_LIST_SUCCESS, payload: obj };
};

export const getEntityListFailure = (obj) => {
  return { type: GET_QDE_ENTITY_LIST_FAILURE, payload: obj };
};

export const verifyPan = (obj) => {
  return { type: VERIFY_PAN, payload: obj };
};

export const verifyPanDetailsSuccess = (obj) => {
  return { type: VERIFY_PAN_SUCCESS, payload: obj };
};

export const verifyPanDetailsFailure = (obj) => {
  return { type: VERIFY_PAN_FAILURE, payload: obj };
};

export const uploadDocumentSuccess = (obj) => {
  return { type: UPLOAD_DOC_SUCCESS, payload: obj };
};

export const uploadDocumentFailure = (obj) => {
  return { type: UPLOAD_DOC_FAILURE, payload: obj };
};

export const savePanGstSuccess = (obj) => {
  return { type: SAVE_PANGST_SUCCESS, payload: obj };
};

export const savePanGstFailure = (obj) => {
  return { type: SAVE_PANGST_FAILURE, payload: obj };
};

export const resetUploadPan = (obj) => {
  return { type: RESET_UPLOADED_PAN, payload: obj };
};

export const saveSchemeSuccess = (obj) => {
  return { type: SAVE_SCHEME_SUCCESS, payload: obj };
};

export const saveSchemeFailure = (obj) => {
  return { type: SAVE_SCHEME_FAILURE, payload: obj };
};

export const saveUpdateBusinessdetails = (obj) => {
  return { type: SAVE_UPDATE_BUSINESS_DETAILS, payload: {} };
};

export const saveUpdateBusinessdetailsSuccess = (obj) => {
  return { type: SAVE_UPDATE_BUSINESS_DETAILS_SUCCESS, payload: obj };
};

export const saveUpdateBusinessdetailsFailure = (obj) => {
  return { type: SAVE_UPDATE_BUSINESS_DETAILS_FAILURE, payload: {} };
};

export const resetPan = () => {
  return { type: RESET_QDE };
};

export const saveFamilyReference = (obj) => {
  return { type: SAVE_FAMILY_REF, payload: {} };
};

export const saveFamilyReferenceSuccess = (obj) => {
  console.log("SUCCESSS", obj);
  return { type: SAVE_FAMILY_REF_SUCCESS, payload: obj };
};

export const saveFamilyReferenceFailure = (obj) => {
  return { type: SAVE_FAMILY_REF_FAILURE, payload: {} };
};

export const saveNonFamilyReference = (obj) => {
  return { type: SAVE_NONFAMILY_REF, payload: {} };
};

export const saveNonFamilyReferenceSuccess = (obj) => {
  return { type: SAVE_NONFAMILY_REF_SUCCESS, payload: obj };
};

export const saveNonFamilyReferenceFailure = (obj) => {
  return { type: SAVE_NONFAMILY_REF_FAILURE, payload: {} };
};

export const getReferenceDetails = (obj) => {
  return { type: GET_REFERENCE_DETAILS, payload: {} };
};
export const getReferenceDetailsSuccess = (obj) => {
  return { type: GET_REFERENCE_DETAILS_SUCCESS, payload: obj };
};
export const getReferenceDetailsFailure = (obj) => {
  return { type: GET_REFERENCE_DETAILS_FAILURE, payload: {} };
};

export const addEmployeeDetails = (obj) => {
  return { type: ADD_EMPLOYEE_DETAILS, payload: {} };
};

export const addEmployeeDetailsSuccess = (obj) => {
  return { type: ADD_EMPLOYEE_DETAILS_SUCCESS, payload: obj };
};

export const addEmployeeDetailsFailure = (obj) => {
  return { type: ADD_EMPLOYEE_DETAILS_FAILURE, payload: {} };
};

export const getPincodeDetails = (obj) => {
  return { type: GET_PINCODE, payload: {} };
};

export const getPincodeDetailsSuccess = (obj) => {
  return { type: GET_PINCODE_SUCCESS, payload: obj };
};

export const getPincodeDetailsFailure = (obj) => {
  return { type: GET_PINCODE_FAILURE, payload: {} };
};

export const addContactDetails = (obj) => {
  return { type: ADD_CONTACT_DETAIL, payload: {} };
};

export const addContactDetailsSuccess = (obj) => {
  return { type: ADD_CONTACT_DETAIL_SUCCESS, payload: obj };
};

export const addContactDetailsFailure = (obj) => {
  return { type: ADD_CONTACT_DETAIL_FAILURE, payload: {} };
};

export const getAltContactDetails = (obj) => {
  return { type: GET_ALT_CONTACT_DETAIL, payload: {} };
};

export const getAltContactDetailsSuccess = (obj) => {
  return { type: GET_ALT_CONTACT_DETAIL_SUCCESS, payload: obj };
};

export const getAltContactDetailsFailure = (obj) => {
  return { type: GET_ALT_CONTACT_DETAIL_FAILURE, payload: {} };
};

export const uploadPOIDocuments = (obj) => {
  return { type: UPLOAD_POI_DOC, payload: {} };
};

export const uploadPOIDocumentsSuccess = (obj) => {
  return { type: UPLOAD_POI_DOC_SUCCESS, payload: obj };
};

export const uploadPOIDocumentsFailure = (obj) => {
  return { type: UPLOAD_POI_DOC_FAILURE, payload: {} };
};

export const getQdeDetails = (obj) => {
  return { type: GET_QDE_DETAILS, payload: {} };
};
export const getQdeDetailsSuccess = (obj) => {
  return { type: GET_QDE_DETAILS_SUCCESS, payload: obj };
};
export const getQdeDetailsFailure = (obj) => {
  return { type: GET_QDE_DETAILS_FAILURE, payload: {} };
};

export const addressDetailsQde = (obj) => {
  return { type: ADDRESS_DETAILS_QDE, payload: {} };
};

export const addressDetailsQdeSuccess = (obj) => {
  return { type: ADDRESS_DETAILS_QDE_SUCCESS, payload: obj };
};

export const addressDetailsQdeFailure = (obj) => {
  return { type: ADDRESS_DETAILS_QDE_FAILURE, payload: {} };
};

export const getResidentTypesSuccess = (obj) => {
  return { type: GET_RESIDENT_TYPE_SUCCESS, payload: obj };
};

export const getResidentTypesFailure = (obj) => {
  return { type: GET_RESIDENT_TYPE_FAILURE, payload: {} };
};

export const verifyDlSuccess = (obj) => {
  return { type: VERIFY_DL_SUCCESS, payload: obj };
};

export const verifyDlFailure = (obj) => {
  return { type: VERIFY_DL_FAILURE, payload: {} };
};

export const uploadPOADocuments = (obj) => {
  return { type: UPLOAD_POA_DOC, payload: {} };
};

export const uploadPOADocumentsSuccess = (obj) => {
  return { type: UPLOAD_POA_DOC_SUCCESS, payload: obj };
};

export const uploadPOADocumentsFailure = (obj) => {
  return { type: UPLOAD_POA_DOC_FAILURE, payload: {} };
};

export const saveUtility = (obj) => {
  return { type: SAVE_UTILITY_BILL, payload: {} };
};

export const saveUtilitySuccess = (obj) => {
  return { type: SAVE_UTILITY_BILL_SUCCESS, payload: obj };
};

export const saveUtilityFailure = (obj) => {
  return { type: SAVE_UTILITY_BILL_FAILURE, payload: {} };
};

export const savePOI = (obj) => {
  return { type: SAVE_POI, payload: {} };
};

export const savePOISuccess = (obj) => {
  return { type: SAVE_POI_SUCCESS, payload: obj };
};

export const savePOIFailure = (obj) => {
  return { type: SAVE_POI_FAILURE, payload: {} };
};

export const verifyVoterSuccess = (obj) => {
  return { type: VERIFY_VOTER_SUCCESS, payload: obj };
};

export const verifyVoterFailure = (obj) => {
  return { type: VERIFY_VOTER_SUCCESS, payload: {} };
};

export const getLoanData = (obj) => {
  return { type: GET_QDE_LOAN, payload: {} };
};
export const getLoanDataSuccess = (obj) => {
  return { type: GET_QDE_LOAN_SUCCESS, payload: obj };
};
export const getLoanDataFailure = (obj) => {
  return { type: GET_QDE_LOAN_FAILURE, payload: {} };
};

export const getQdeSchemesData = (obj) => {
  return { type: GET_QDE_SCHEME, payload: {} };
};
export const getQdeSchemesDataSuccess = (obj) => {
  return { type: GET_QDE_SCHEME_SUCCESS, payload: obj };
};
export const getQdeSchemesDataFailure = (obj) => {
  return { type: GET_QDE_SCHEME_FAILURE, payload: {} };
};

export const resetQdeSchemeSuccess = (obj) => {
  return { type: RESET_QDE_SCHEMES_SUCCESS, payload: {} };
};


export const saveLoanDetails = (obj) => {
  return { type: SAVE_LOAN_DETAILS, payload: {} };
};

export const saveLoanDetailsSuccess = (obj) => {
  return { type: SAVE_LOAN_DETAILS_SUCCESS, payload: obj };
};

export const saveLoanDetailsFailure = (obj) => {
  return { type: SAVE_LOAN_DETAILS_FAILURE, payload: {} };
};

export const deleteDocument = (obj) => {
  return { type: DELETE_DOCUMENT, payload: {} };
};

export const deleteDocumentSuccess = (obj) => {
  return { type: DELETE_DOCUMENT_SUCCESS, payload: obj };
};

export const deleteDocumentFailure = (obj) => {
  return { type: DELETE_DOCUMENT_FAILURE, payload: {} };
};

export const submitToCredit = (obj) => {
  return { type: SUBMIT_TO_CREDIT, payload: {} };
};

export const submitToCreditSuccess = (obj) => {
  return { type: SUBMIT_TO_CREDIT_SUCCESS, payload: obj };
};

export const submitToCreditFailure = (obj) => {
  return { type: SUBMIT_TO_CREDIT_FAILURE, payload: {} };
};
export const addressDetailsPermanent = (obj) => {
  return { type: ADDRESS_DETAILS_PERMANENT, payload: {} };
};

export const addressDetailsPermanentSuccess = (obj) => {
  return { type: ADDRESS_DETAILS_PERMANENT_SUCCESS, payload: obj };
};

export const addressDetailsPermanentFailure = (obj) => {
  return { type: ADDRESS_DETAILS_PERMANENT_FAILURE, payload: {} };
};

export const getUtilityDocDetails = (obj) => {
  return { type: GET_UTILITY_DETAILS, payload: {} };
};

export const getUtilityDocDetailsSuccess = (obj) => {
  return { type: GET_UTILITY_DETAILS_SUCCESS, payload: obj };
};

export const getUtilityDocDetailsFailure = (obj) => {
  return { type: GET_UTILITY_DETAILS_FAILURE, payload: {} };
};

export const deleteUtilityDocument = (obj) => {
  return { type: DELETE_UTILITY_DOCUMENT, payload: {} };
};

export const deleteUtilityDocumentSuccess = (obj) => {
  return { type: DELETE_UTILITY_DOCUMENT_SUCCESS, payload: obj };
};

export const deleteUtilityDocumentFailure = (obj) => {
  return { type: DELETE_UTILITY_DOCUMENT_FAILURE, payload: {} };
};

//----------------------PERSONAL DETAILS----------------------------

export const savePersonalDetailsSuccess = (obj) => {
  return { type: SAVE_PERSONAL_DETAILS_SUCCESS, payload: obj };
};

export const savePersonalDetailsFailure = (obj) => {
  return { type: SAVE_PERSONAL_DETAILS_FAILURE, payload: obj };
};


export const uploadSelfie = (obj) => {
  return { type: UPLOAD_SELFIE, payload: {} };
};

export const uploadSelfieSuccess = (obj) => {
  return { type: UPLOAD_SELFIE_SUCCESS, payload: obj };
};

export const uploadSelfieFailure = (obj) => {
  return { type: UPLOAD_SELFIE_FAILURE, payload: {} };
};


export const deleteUploadedSelfie = (obj) => {
  return { type: DELETE_UPLOADED_SELFIE, payload: {} };
};

export const deleteUploadedSelfieSuccess = (obj) => {
  return { type: DELETE_UPLOADED_SELFIE_SUCCESS, payload: obj };
};

export const deleteUploadedSelfieFailure = (obj) => {
  return { type: DELETE_UPLOADED_SELFIE_FAILURE, payload: {} };
};

export const getMaxAmount = (obj) => {
  return { type: GET_MAX_AMT, payload: {} };
};
export const getMaxAmountSuccess = (obj) => {
  return { type: GET_MAX_AMT_SUCCESS, payload: obj };
};
export const getMaxAmountFailure = (obj) => {
  return { type: GET_MAX_AMT_FAILURE, payload: {} };
};