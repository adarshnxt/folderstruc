import { get, post } from "../../Utility/httpInterceptor";
import { te, ts } from "../../Utility/ReduxToaster";
import { loading } from "../Action/App";
import {
  addContactDetailsFailure,
  addContactDetailsSuccess,
  addEmployeeDetailsFailure,
  addEmployeeDetailsSuccess,
  addressDetailsQdeFailure,
  addressDetailsQdeSuccess,
  deleteDocument,
  deleteDocumentFailure,
  deleteDocumentSuccess,
  deleteUtilityDocument,
  deleteUtilityDocumentFailure,
  deleteUtilityDocumentSuccess,
  getAltContactDetailsFailure,
  getAltContactDetailsSuccess,
  getEntityList,
  getEntityListFailure,
  getEntityListSuccess,
  getLoanData,
  getLoanDataFailure,
  getLoanDataSuccess,
  getPincodeDetails,
  getPincodeDetailsFailure,
  getPincodeDetailsSuccess,
  getQdeDetails,
  getQdeDetailsFailure,
  getQdeDetailsSuccess,
  getQdeSchemesData,
  getQdeSchemesDataFailure,
  getQdeSchemesDataSuccess,
  getResidentTypesFailure,
  getResidentTypesSuccess,
  getUtilityDocDetailsFailure,
  getUtilityDocDetailsSuccess,
  resetUploadPan,
  saveFamilyReferenceFailure,
  saveFamilyReferenceSuccess,
  saveLoanDetails,
  saveLoanDetailsFailure,
  saveLoanDetailsSuccess,
  saveNonFamilyReferenceFailure,
  saveNonFamilyReferenceSuccess,
  savePanGstFailure,
  savePanGstSuccess,
  savePOIFailure,
  savePOISuccess,
  saveSchemeFailure,
  saveSchemeSuccess,
  saveUpdateBusinessdetailsFailure,
  saveUpdateBusinessdetailsSuccess,
  saveUtilityFailure,
  saveUtilitySuccess,
  submitToCredit,
  submitToCreditFailure,
  submitToCreditSuccess,
  uploadDocumentFailure,
  uploadDocumentSuccess,
  uploadPOADocumentsFailure,
  uploadPOADocumentsSuccess,
  uploadPOIDocumentsFailure,
  uploadPOIDocumentsSuccess,
  verifyDlFailure,
  verifyDlSuccess,
  verifyPan,
  verifyPanDetailsFailure,
  verifyPanDetailsSuccess,
  verifyVoterFailure,
  verifyVoterSuccess,
  savePersonalDetailsSuccess,
  savePersonalDetailsFailure,
  uploadSelfieSuccess,
  uploadSelfieFailure,
  deleteUploadedSelfieSuccess,
  deleteUploadedSelfieFailure,
  getMaxAmount,
  getMaxAmountSuccess,
  getMaxAmountFailure,
  resetQdeSchemeSuccess,
} from "../Action/Qde";
import { teal } from "@material-ui/core/colors";

export const getQdeEntityList = (objBody = {}) => async (dispatch) => {
  dispatch(loading(true));
  dispatch(getEntityList());
  try {
    const response = await get(
      "/cwc-sales/qde/gettypeofcompany",
      objBody,
      false
    );
    return dispatch(getEntityListSuccess(response.data.data));
  } catch (err) {
    dispatch(getEntityListFailure(err));
  } finally {
    dispatch(loading(false));
  }
};

export const uploadDocument = (objBody = {}) => async (dispatch) => {
  console.log("inside uploadDocument service", objBody);
  dispatch(loading(true));
  const zipFiles = require("jszip")();
  zipFiles.file(objBody.file.name, objBody.file);
  const content = await zipFiles.generateAsync({ type: "blob" });
  content.name = `${new Date().getTime()}.zip`;
  try {
    const response = await post(
      "/cwc-sales/wrapper/panDetails",
      { file: content, ...objBody.data },
      false,
      true
    );
    // const response = {
    //   data: {
    //     data: {
    //       dateOfbirth: "02/09/1993",
    //       fatherName: "RAJENDRA MODI",
    //       panName: "RASHMI BHARTI",
    //       panNo: "BYYPB5290A",
    //       statusCode: "101",
    //     },
    //     error: false,
    //     message: "Pan details fetched successfully",
    //     statusCode: "200",
    //   },
    //   error: false,
    // };

    if (!response.data.error) {
      return dispatch(
        uploadDocumentSuccess({
          ...response.data.data,
          originalFile: objBody.file,
        })
      );
    } else {
      return dispatch(uploadDocumentFailure(response.data));
    }
  } catch (err) {
    dispatch(uploadDocumentFailure(err));
  } finally {
    dispatch(loading(false));
  }
};

export const verifyPanDetails = (objBody = {}) => async (dispatch) => {
  dispatch(loading(true));
  dispatch(verifyPan());
  try {
    const response = await post(
      "/cwc-sales/wrapper/wrapperAPI",
      objBody,
      false
    );
    if (response.data.gstStatus && response.data.gstStatus === "Failed") {
      return dispatch(verifyPanDetailsFailure());
    }
    // const response = {
    //   data: {
    //     error: false,
    //     message: "Pan verification successfull",
    //     score: 0.8201388,
    //     statusCode: "200",
    //   },
    //   error: false,
    // };
    if (!response.data.data.error) {
      ts(response.data.message);
      return dispatch(verifyPanDetailsSuccess());
    } else {
      te(response.data.message);
      dispatch(verifyPanDetailsFailure());
    }
  } catch (err) {
    dispatch(verifyPanDetailsFailure());
  } finally {
    dispatch(loading(false));
  }
};

export const savePanGst = (objBody = {}) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const response = await post("/cwc-sales/pangst/savePanGst", objBody, false);
    if (!response.data.error) {
      ts(response.data.message);
      return dispatch(savePanGstSuccess(response.data));
    } else {
      te(response.data.message);
      dispatch(savePanGstFailure(response.data));
    }
  } catch (err) {
    dispatch(savePanGstFailure());
  } finally {
    dispatch(loading(false));
  }
};

export const saveScheme = (objBody = {}) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const response = await post(
      "/cwc-sales/qde/saveschemedata",
      objBody,
      false
    );
    if (!response.data.error) {
      ts(response.data.message);
      return dispatch(saveSchemeSuccess());
    } else {
      dispatch(saveSchemeFailure());
    }
  } catch (err) {
    console.log("err", err);
    dispatch(saveSchemeFailure());
  } finally {
    dispatch(loading(false));
  }
};

export const resetUploadedPan = (objBody = {}, deleteUpload = false) => async (
  dispatch
) => {
  dispatch(loading(true));
  try {
    dispatch(resetUploadPan());
    if (deleteUpload) {
      const response = await post(
        "/cwc-sales/pangst/deletePanGst",
        objBody,
        false
      );
      if (!response.data.error) {
        ts(response.data.message);
      } else {
        te(response.data.message);
      }
    }
  } catch (err) {
  } finally {
    dispatch(loading(false));
  }
};

export const saveUpdateBusinessDetailsService = (objBody = {}) => async (
  dispatch
) => {
  console.log(objBody, "Business DETAILS ADDED");
  dispatch(loading(true));
  try {
    const response = await post(
      "/cwc-sales/qde/saveorupdatebusinessinformationdetails",
      objBody,
      false
    );
    if (!response.data.error) {
      ts(response.data.message);
      return dispatch(saveUpdateBusinessdetailsSuccess(response.data.data));
    } else te(response.data.message);
  } catch (err) {
    te("Sorry, Something went wrong.");
    dispatch(saveUpdateBusinessdetailsFailure(err));
  } finally {
    dispatch(loading(false));
  }
};

export const saveReference = (objBody = {}) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const response = await post(
      "/cwc-sales/qde/saveorupdatefamilyref",
      objBody,
      false
    );
    if (!response.data.error) {
      ts(response.data.message);
      return dispatch(saveFamilyReferenceSuccess(response.data));
    } else {
      te(response.data.message);
      dispatch(saveFamilyReferenceFailure(response.data));
    }
  } catch (err) {
    dispatch(saveFamilyReferenceFailure(err));
  } finally {
    dispatch(loading(false));
  }
};

export const saveNonFamReference = (objBody = {}) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const response = await post(
      "/cwc-sales/qde/saveorupdatenonfamilyref",
      objBody,
      false
    );
    if (!response.data.error) {
      // objBody.callback(response.data);
      ts(response.data.message);
      return dispatch(saveNonFamilyReferenceSuccess(response.data));
    } else {
      te(response.data.message);
      dispatch(saveNonFamilyReferenceFailure(response.data));
    }
  } catch (err) {
    dispatch(saveNonFamilyReferenceFailure(err));
  } finally {
    dispatch(loading(false));
  }
};

export const saveEmployeeDetails = (objBody = {}) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const response = await post(
      "/cwc-sales/addetails/saveEmploymentDetails",
      objBody,
      false
    );
    if (!response.data.error) {
      ts(response.data.message);
      return dispatch(addEmployeeDetailsSuccess(response.data));
    } else {
      te(response.data.message);
      dispatch(addEmployeeDetailsFailure(response.data));
    }
  } catch (err) {
    dispatch(addEmployeeDetailsFailure(err));
  } finally {
    dispatch(loading(false));
  }
};

export const getPincodeDetail = async (objBody = {}) => {
  try {
    const response = await get(
      `/cwc-sales/addetails/getStateCityByPin?pincode=${objBody.pincode}`,
      {},
      false
    );
    if (!response.data.error) {
      ts(response.data.message);
      return response.data.data;
    } else {
      te("Invalid Pincode");
      return {};
    }
  } catch (err) {
    return {};
  } finally {
    // dispatch(loading(false));
  }
};

export const addAlternateContactDetails = (objBody = {}) => async (
  dispatch
) => {
  dispatch(loading(true));
  try {
    const response = await post(
      "/cwc-sales/addetails/saveAltContactDetails",
      objBody,
      false
    );
    if (!response.data.error) {
      ts(response.data.message);
      return dispatch(addContactDetailsSuccess(response.data));
    } else {
      te(response.data.message);
      dispatch(addContactDetailsFailure(response.data));
    }
  } catch (err) {
    dispatch(addContactDetailsFailure(err));
  } finally {
    dispatch(loading(false));
  }
};

export const getAlternateContactDetails = (objBody = {}) => async (
  dispatch
) => {
  try {
    const response = await get(
      "/cwc-sales/addetails/getAltContactDetails",
      objBody,
      false
    );
    if (!response.data.error) {
      return dispatch(getAltContactDetailsSuccess(response.data.data));
    } else {
      dispatch(getAltContactDetailsFailure());
    }
  } catch (err) {
    dispatch(getAltContactDetailsFailure(err));
  } finally {
  }
};

export const uploadPOIDocs = (objBody = {}) => async (dispatch) => {
  dispatch(loading(true));
  const zipFiles = require("jszip")();
  objBody.front && zipFiles.file(objBody.front.file.name, objBody.front.file);
  objBody.back && zipFiles.file(objBody.back.file.name, objBody.back.file);
  const content = await zipFiles.generateAsync({ type: "blob" });
  content.name = `${new Date().getTime()}.zip`;
  try {
    const response = await post(
      "/cwc-sales/addetails/kycDocDetails",
      { file: content, ...objBody.data },
      false,
      true
    );
    if (!response.data.error) {
      ts(response.data.message);
      return dispatch(
        uploadPOIDocumentsSuccess({
          ...response.data.data,
        })
      );
    } else {
      te(response.data.message);
      dispatch(uploadPOIDocumentsFailure(response.data));
    }
  } catch (err) {
    dispatch(uploadPOIDocumentsFailure(err));
  } finally {
    dispatch(loading(false));
  }
};

export const getResidentTypes = (objBody = {}) => async (dispatch) => {
  try {
    const response = await get(
      "/cwc-sales/master/getresidensetype",
      objBody,
      false
    );
    if (!response.data.error) {
      return dispatch(getResidentTypesSuccess(response.data.data));
    } else {
      dispatch(getResidentTypesFailure());
    }
  } catch (err) {
    dispatch(getResidentTypesFailure(err));
  } finally {
  }
};

export const verifyDl = (objBody = {}) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const response = await post(
      "/cwc-sales/addetails/dlVerifyDetails",
      objBody,
      false
    );
    if (!response.data.error) {
      ts(response.data.message);
      return dispatch(verifyDlSuccess(response.data.data));
    } else {
      te(response.data.message);
      dispatch(verifyDlFailure(response.data));
    }
  } catch (err) {
    dispatch(verifyDlFailure(err));
  } finally {
    dispatch(loading(false));
  }
};

export const uploadPOADocs = (objBody = {}) => async (dispatch) => {
  dispatch(loading(true));
  const zipFiles = require("jszip")();
  zipFiles.file(objBody.front.file.name, objBody.front.file);
  const content = await zipFiles.generateAsync({ type: "blob" });
  content.name = `${new Date().getTime()}.zip`;
  try {
    const response = await post(
      "/cwc-sales/utility/uploadUtilityDoc",
      { file: content, ...objBody.data },
      false,
      true
    );
    if (!response.data.error) {
      ts(response.data.message);
      return dispatch(
        uploadPOADocumentsSuccess({
          ...response.data.data,
        })
      );
    } else {
      te(response.data.message);
      dispatch(uploadPOADocumentsFailure(response.data));
    }
  } catch (err) {
    dispatch(uploadPOADocumentsFailure(err));
  } finally {
    dispatch(loading(false));
  }
};

export const getQdeDetail = (objBody = {}) => async (dispatch) => {
  dispatch(loading(true));
  dispatch(getQdeDetails());
  try {
    const response = await post(
      "/cwc-sales/qde/getqdedetailsbyapplicantuniqid",
      objBody,
      false
    );
    if (!response.data.error) {
      // ts(response.data.message);
      return dispatch(getQdeDetailsSuccess(response.data));
    } else {
      dispatch(getQdeDetailsFailure(response.data));
    }
  } catch (err) {
    dispatch(getQdeDetailsFailure(err));
  } finally {
    dispatch(loading(false));
  }
};

export const saveAddressDetails = (objBody = {}, type) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const response = await post(
      "/cwc-sales/addetails/saveAddressDetails",
      objBody,
      false
    );
    if (!response.data.error) {
      ts(response.data.message);
      dispatch(addressDetailsQdeSuccess({ ...response.data, type }));
    } else {
      te(response.data.message);
      dispatch(addressDetailsQdeFailure({ ...response.data, type }));
    }
  } catch (err) {
    dispatch(addressDetailsQdeFailure({ ...err, type }));
  } finally {
    dispatch(loading(false));
  }
};

export const getUtilityBillDetails = (objBody = {}) => async (dispatch) => {
  dispatch(loading(true));
  // dispatch(getQdeDetails());
  try {
    let url;
    const CORS_URL = "";
    if (objBody.type === "elBill") {
      url =
        CORS_URL +
        "https://uc9q5045lj.execute-api.us-east-2.amazonaws.com/Test/electricity-bill-authentication";
    } else if (objBody.type === "gBill") {
      url =
        CORS_URL +
        "https://uc9q5045lj.execute-api.us-east-2.amazonaws.com/Test/lpg-id-authentication";
    } else if (objBody.type === "lBill") {
      url =
        CORS_URL +
        "https://uc9q5045lj.execute-api.us-east-2.amazonaws.com/Test/telephone-landline-authentication";
    }
    const response = await post(url, objBody, false, false, true);
    // console.log(response, "ROEPONSEEEEEEEEEEEEEEEEEEEEEEEEEE");

    // const response = {
    //   error: false,
    //   data: {
    //     statusCode: "200",
    //     status: "success",
    //     KarzaStatusCode: "101",
    //     requestId: "7725374c-c4c0-4de0-8435-c02d90344882",
    //     data: {
    //       bill_no: "",
    //       bill_due_date: "13-03-2021",
    //       consumer_number: "102452589",
    //       bill_amount: "",
    //       amount_payable: "4090.00",
    //       address: "SHOP IN-217-A G/F F/P  SHAHPUR JAT  NEW DELHI 110049",
    //       bill_issue_date: "",
    //       bill_date: "",
    //       mobile_number: "9268920233",
    //       consumer_name: "SHRI  BHAGWAN",
    //       email_address: "rahulpanwar04@gmail.com",
    //       total_amount: "",
    //     },
    //     message: "Data pulled successfully!",
    //     error: false,
    //   },
    // };

    //for gasBill
    // const response = {
    //   error: false,
    //   data: {
    //     statusCode: "200",
    //     status: "success",
    //     KarzaStatusCode: "101",
    //     requestId: "8cb9dad8-cb6c-4e5c-8854-a72ae75131c9",
    //     data: {
    //       status: "",
    //       DistributorAddress: "",
    //       SubsidizedRefillConsumed: "",
    //       DistributorCode: "",
    //       pin: "",
    //       BankName: "",
    //       DistributorName: "SHIVSHAKTI BHARATGAS AGENCY",
    //       IFSCCode: "",
    //       "city/town": "",
    //       AadhaarNo: "",
    //       ConsumerContact: "",
    //       ApproximateSubsidyAvailed: "",
    //       ConsumerEmail: "",
    //       ConsumerNo: "10000000050431060",
    //       ConsumerName: "MRS SUSHAMA M SHIRHATTI",
    //       GivenUpSubsidy: "",
    //       BankAccountNo: "",
    //       LastBookingDate: "",
    //       ConsumerAddress: "PLNO 125PUSHPA AJANTA NR NANDIVALI TELEPHONE EX",
    //       TotalRefillConsumed: "",
    //     },
    //     message: "Data pulled successfully!",
    //     error: false,
    //   },
    // };

    //for Landline bill
    // const response = {
    //   error: false,
    //   data: {
    //     statusCode: "200",
    //     status: "success",
    //     KarzaStatusCode: "101",
    //     requestId: "b71a2e21-61a8-4b9e-a232-ffd84405084b",
    //     data: {
    //       name: "GOLF DESTINATION",
    //       telephone_no: "0124-2570960",
    //       address: "RHS 1 SECTOR 42-43 RAPID METRO STATION GURGAON 122009",
    //     },
    //     message: "Data pulled successfully!",
    //     error: false,
    //   },
    // };

    if (!response.data.error) {
      ts(response.data.message);
      return dispatch(getUtilityDocDetailsSuccess(response.data));
    } else {
      te(response.data.message);
      dispatch(getUtilityDocDetailsFailure(response.data));
    }
  } catch (err) {
    dispatch(getUtilityDocDetailsFailure(err));
  } finally {
    dispatch(loading(false));
  }
};

export const saveUtilityBillDetail = (objBody = {}) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const response = await post(
      "/cwc-sales/utility/saveOrUpdateUtilityBill",
      objBody,
      false
    );
    if (!response.data.error) {
      ts(response.data.message);
      return dispatch(saveUtilitySuccess(response.data));
    } else {
      te(response.data.message);
      dispatch(saveUtilityFailure(response.data));
    }
  } catch (err) {
    dispatch(saveUtilityFailure(err));
  } finally {
    dispatch(loading(false));
  }
};

export const savePOIDetails = (objBody = {}) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const response = await post(
      "/cwc-sales/addetails/saveOrUpdateDocument",
      objBody,
      false
    );
    if (!response.data.error) {
      ts(response.data.message);
      return dispatch(savePOISuccess(response.data));
    } else {
      te(response.data.message);
      dispatch(savePOIFailure(response.data));
    }
  } catch (err) {
    dispatch(savePOIFailure(err));
  } finally {
    dispatch(loading(false));
  }
};

export const verifyVoter = (objBody = {}) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const response = await post(
      "/cwc-sales/addetails/voterVerifyDetails",
      objBody,
      false
    );
    if (!response.data.error) {
      ts(response.data.message);
      return dispatch(verifyVoterSuccess(response.data.data));
    } else {
      te(response.data.message);
      dispatch(verifyVoterFailure(response.data));
    }
  } catch (err) {
    dispatch(verifyVoterFailure(err));
  } finally {
    dispatch(loading(false));
  }
};

export const getLoanInfo = (objBody = {}) => async (dispatch) => {
  dispatch(loading(true));
  dispatch(getLoanData());
  try {
    const response = await post(
      "/cwc-sales/qde/getqdesuccessresponse",
      objBody,
      false
    );
    if (!response.data.error) {
      ts(response.data.message);
      return dispatch(getLoanDataSuccess(response.data));
    } else {
      dispatch(getLoanDataFailure(response.data));
    }
  } catch (err) {
    dispatch(getLoanDataFailure(err));
  } finally {
    dispatch(loading(false));
  }
};

export const createCustomer = (objBody = {}) => async (dispatch) => {
  dispatch(loading(true));
  dispatch(getQdeSchemesData());
  try {
    const response = await post(
      "/cwc-sales/customer/createOrUpdateCustomer",
      objBody,
      false
    );
    if (!response.data.error) {
      ts(response.data.message);
      return dispatch(getQdeSchemesDataSuccess(response.data.data));
    } else {
      te(response.data.message);
      dispatch(getQdeSchemesDataFailure(response.data));
      dispatch(loading(false));
    }
  } catch (err) {
    dispatch(getQdeSchemesDataFailure(err));
  } finally {
    dispatch(resetQdeSchemeSuccess());
    dispatch(loading(false));
  }
};

export const saveLoanDetail = (objBody = {}) => async (dispatch) => {
  dispatch(loading(true));
  dispatch(saveLoanDetails());
  try {
    const response = await post(
      "/cwc-sales/qde/saveorupdateqdeloandetails",
      objBody,
      false
    );
    if (!response.data.error) {
      ts(response.data.message);
      return dispatch(saveLoanDetailsSuccess(response.data));
    } else {
      te(response.data.message);
      dispatch(saveLoanDetailsFailure(response.data));
    }
  } catch (err) {
    dispatch(saveLoanDetailsFailure());
  } finally {
    dispatch(loading(false));
  }
};

export const deleteDocuments = (objBody = {}) => async (dispatch) => {
  dispatch(loading(true));
  dispatch(deleteDocument());
  try {
    const response = await post(
      "/cwc-sales/addetails/deleteDocument",
      objBody,
      false
    );
    if (!response.data.error) {
      return dispatch(deleteDocumentSuccess(response.data));
    } else {
      dispatch(deleteDocumentFailure(response.data));
    }
  } catch (err) {
    dispatch(deleteDocumentFailure());
  } finally {
    dispatch(loading(false));
  }
};

export const getKycOther = async (objBody = {}, type) => {
  try {
    const response = await get(
      `/cwc-sales/master/getkycdocumentlist`,
      objBody,
      false
    ).then((res) => {
      return res.data;
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getUtilityOther = async (objBody = {}, type) => {
  try {
    const response = await get(
      `/cwc-sales/master/getutilitybilltype`,
      objBody,
      false
    ).then((res) => {
      return res.data;
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getDesignationDetails = async (objBody = {}, type) => {
  try {
    const response = await get(
      `/cwc-sales/qde/gettypeofdesignation`,
      objBody,
      false
    ).then((res) => {
      return res.data;
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getCityForPOA = async (objBody = {}, type) => {
  try {
    const response = await get(
      `/cwc-sales/master/getcitylist`,
      objBody,
      false
    ).then((res) => {
      return res.data;
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getElectricityCompanyName = async (objBody = {}, type) => {
  try {
    const response = await get(
      `/cwc-sales/master/getelectricompanycodelist`,
      objBody,
      false
    ).then((res) => {
      return res.data;
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const submitToCreditModule = (objBody = {}) => async (dispatch) => {
  dispatch(loading(true));
  dispatch(submitToCredit());
  try {
    const response = await post(
      "/cwc-sales/lead/loanApplication",
      objBody,
      false
    );
    if (!response.data.error) {
      ts(response.data.message);
      return dispatch(submitToCreditSuccess(response.data));
    } else {
      te(response.data.message);
      dispatch(submitToCreditFailure(response.data));
    }
  } catch (err) {
    dispatch(submitToCreditFailure());
  } finally {
    dispatch(loading(false));
  }
};

export const deleteUtilityDocuments = (objBody = {}) => async (dispatch) => {
  dispatch(loading(true));
  dispatch(deleteUtilityDocument());
  try {
    const response = await post(
      "/cwc-sales/utility/deleteUtilityBill",
      objBody,
      false
    );
    if (!response.data.error) {
      return dispatch(deleteUtilityDocumentSuccess(response.data));
    } else {
      dispatch(deleteUtilityDocumentFailure(response.data));
    }
  } catch (err) {
    dispatch(deleteUtilityDocumentFailure());
  } finally {
    dispatch(loading(false));
  }
};

export const getEmploymentIndustry = async (objBody = {}, type) => {
  try {
    const response = await get(
      `/cwc-sales/master/getEmploymentIndustry`,
      objBody,
      false
    ).then((res) => {
      return res.data;
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

//---------------------PERSONAL DETAILS----------------------

export const saveUpdatePersonalDetails = (objBody = {}) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const response = await post(
      "/cwc-sales/qde/saveOrUpdatePersonalDetails",
      objBody,
      false
    );
    if (!response.data.error) {
      ts(response.data.message);
      return dispatch(savePersonalDetailsSuccess(response.data));
    } else {
      te(response.data.message);
      dispatch(savePersonalDetailsFailure(response.data));
    }
  } catch (err) {
    dispatch(savePersonalDetailsFailure());
  } finally {
    dispatch(loading(false));
  }
};

export const getQualificationList = async (objBody = {}, type) => {
  try {
    const response = await get(
      `/cwc-sales/master/getQualification`,
      objBody,
      false
    ).then((res) => {
      return res.data;
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getRelationWithMainApplicantList = async (objBody = {}, type) => {
  try {
    const response = await get(
      `/cwc-sales/master/getRelationWithMainApplicant`,
      objBody,
      false
    ).then((res) => {
      return res.data;
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getRelationWithNomineeList = async (objBody = {}, type) => {
  try {
    const response = await get(
      `/cwc-sales/master/getRelationWithNominee`,
      objBody,
      false
    ).then((res) => {
      return res.data;
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getEmploymentConstitution = async (objBody = {}, type) => {
  try {
    const response = await get(
      `/cwc-sales/master/getEmploymentConstitution`,
      objBody,
      false
    ).then((res) => {
      return res.data;
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getMaritalStatusList = async (objBody = {}, type) => {
  try {
    const response = await get(
      `/cwc-sales/master/getMaritalStatus`,
      objBody,
      false
    ).then((res) => {
      return res.data;
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getBankAccountTypeList = async (objBody = {}, type) => {
  try {
    const response = await get(
      `/cwc-sales/master/getBankAccountType`,
      objBody,
      false
    ).then((res) => {
      return res.data;
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const uploadSelfie = (objBody = {}) => async (dispatch) => {
  dispatch(loading(true));
  const zipFiles = require("jszip")();
  zipFiles.file(objBody.file.name, objBody.file);
  const content = await zipFiles.generateAsync({ type: "blob" });
  content.name = `${new Date().getTime()}.zip`;
  dispatch(loading(true));
  try {
    const response = await 
    post(
      "/cwc-sales/qde/uploadSelfie",
      { file: content, personalInfo: objBody.personalInfo },
      false,
      true
    );
    if (!response.data.data.error) {
      ts(response.data.message);
      return dispatch(uploadSelfieSuccess(response.data.data));
    } else {
      teal(response.data.message);
      return dispatch(uploadSelfieFailure(response.data.data));
    }
  } catch (err) {
    dispatch(uploadSelfieFailure(err));
  } finally {
    dispatch(loading(false));
  }
};

export const deleteUploadedSelfie = (objBody = {}) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const response = await post("/cwc-sales/qde/deleteSelfie", objBody, false);
    if (!response.data.error) {
      ts(response.data.message);
      return dispatch(deleteUploadedSelfieSuccess(response.data.data));
    } else {
      te(response.data.message);
      return dispatch(deleteUploadedSelfieFailure(response.data.data));
    }
  } catch (err) {
    dispatch(deleteUploadedSelfieFailure(err));
  } finally {
    dispatch(loading(false));
  }
};

export const getMaxAmountValue = (objBody = {}) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const response = await post(
      "/cwc-sales/qde/getvehiclemaxamt",
      objBody,
      false
    );
    if (!response.data.error) {
      // ts(response.data.message);
      return dispatch(getMaxAmountSuccess(response.data.data));
    } else {
      dispatch(getMaxAmountFailure());
    }
  } catch (err) {
    console.log("err", err);
    dispatch(getMaxAmountFailure());
  } finally {
    dispatch(loading(false));
  }
};
