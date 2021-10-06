const {
  GET_DDE_DETAILS,
  GET_DDE_DETAILS_SUCCESS,
  GET_DDE_DETAILS_FAILURE,
  GET_BANK_DETAILS,
  GET_BANK_DETAILS_SUCCESS,
  GET_BANK_DETAILS_FAILURE,
  REFRESH_BANK_DETAILS,
  REFRESH_BANK_DETAILS_SUCCESS,
  REFRESH_BANK_DETAILS_FAILURE,
  SAVE_BANK_DETAILS,
  SAVE_BANK_DETAILS_SUCCESS,
  SAVE_BANK_DETAILS_FAILURE,
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
} = require("../Constants");

const initialState = {
  ddeDetails: {},
  bankDetails: {
    collectR: null,
    addSuccess: null,
    deleteSuccess: null,
    uploadFileSuccess: false,
  },
  uploadFileDetails: [],
  itrLinkDetails: null,
  itrLinkSuccess: false,
  verifyItrCredentials: null,
  uploadItrDocs: null,
  uploadItrDocsSuccess: false,
  deleteItrSuccess: false,
  getDDESuccess: false,
  resetDdeData: null,
  deleteSuccessBank: null,
  getDdeDetails: null,
};
function ddeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DDE_DETAILS:
      return { ...initialState, getDdeDetails: false };

    case GET_DDE_DETAILS_SUCCESS:
      return {
        ...state,
        getDDESuccess: true,
        ddeDetails: action.payload,
      };
    case GET_DDE_DETAILS_FAILURE:
      return {
        ...state,
        getDDESuccess: false,
        ddeDetails: action.payload,
        getDdeDetails: false,
      };

    case SAVE_BANK_DETAILS:
      return { ...state, addSuccess: null, uploadFileSuccess: false };

    case SAVE_BANK_DETAILS_SUCCESS:
      return {
        ...state,
        uploadFileSuccess: true,
        getDdeDetails: true,
        uploadFileDetails: action.payload,
        addSuccess: action.type === SAVE_BANK_DETAILS_SUCCESS,
      };
    case SAVE_BANK_DETAILS_FAILURE:
      return {
        ...state,
        uploadFileSuccess: false,
        addSuccess: action.type === SAVE_BANK_DETAILS_SUCCESS,
      };

    case REFRESH_BANK_DETAILS:
      return state;

    case REFRESH_BANK_DETAILS_SUCCESS:
    case REFRESH_BANK_DETAILS_FAILURE:
      return {
        ...state,
        bankDetails: { ...state.bankDetails, collectR: action.payload },
      };

    case DELETE_SALARY_SLIP:
      return {
        ...state,
        bankDetails: {
          ...state.bankDetails,
          deleteSuccess: null,
        },
      };
    case DELETE_SALARY_SLIP_SUCCESS:
      return {
        ...state,
        bankDetails: {
          ...state.bankDetails,
          ...action.payload,
          deleteSuccess: true,
        },
      };
    case DELETE_SALARY_SLIP_FAILURE:
      return {
        ...state,
        bankDetails: {
          ...state.bankDetails,
          ...action.payload,
          deleteSuccess: false,
          getDdeDetails: true,
        },
      };

    case SEND_ITR_LINK:
      return { ...state, loading: true, addSuccess: null };
    case SEND_ITR_LINK_SUCCESS:
      return {
        ...state,
        itrLinkDetails: action.payload,
        itrLinkSuccess: true,
        loading: false,
        addSuccess: true,
        getDdeDetails: true,
      };
    case SEND_ITR_LINK_FAILURE:
      return {
        ...state,
        loading: false,
        itrLinkSuccess: false,
        addSuccess: false,
      };

    case VERIFY_ITR_CREDS:
      return { ...state, loading: true, addSuccess: null };
    case VERIFY_ITR_CREDS_SUCCESS:
      return {
        ...state,
        verifyItrCredentials: action.payload,
        loading: false,
        addSuccess: true,
      };
    case VERIFY_ITR_CREDS_FAILURE:
      return {
        ...state,
        loading: false,
        addSuccess: false,
      };

    case UPLOAD_ITR_DOC:
      return { ...state, loading: true };
    case UPLOAD_ITR_DOC_SUCCESS:
      return {
        ...state,
        uploadItrDocs: action.payload,
        uploadItrDocsSuccess: true,
        loading: false,
        getDdeDetails: true,
      };
    case UPLOAD_ITR_DOC_FAILURE:
      return {
        ...state,
        uploadItrDocs: null,
        uploadItrDocsSuccess: false,
        loading: false,
        getDdeDetails: true,
      };

    case DELETE_ITR_UPLOAD:
      return { ...state, deleteSuccess: null };
    case DELETE_ITR_UPLOAD_SUCCESS:
      return {
        ...state,
        deleteItrSuccess: true,
        itrLinkSuccess: false,
        uploadItrDocsSuccess: false,
        getDdeDetails: true,
      };
    case DELETE_ITR_UPLOAD_FAILURE:
      return {
        ...state,
        deleteItrSuccess: false,
        getDdeDetails: true,
      };
    case RESET_DDE:
      return initialState;

    default:
      return state;
  }
}

export default ddeReducer;
