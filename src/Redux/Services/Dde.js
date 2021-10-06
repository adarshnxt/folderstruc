import { get, post } from "../../Utility/httpInterceptor";
import { te, ts } from "../../Utility/ReduxToaster";
import { loading } from "../Action/App";
import {
  deleteSalarySlip,
  deleteSalarySlipFailure,
  deleteSalarySlipSuccess,
  getDDeDetails,
  getDDeDetailsFailure,
  getDDeDetailsSuccess,
  refreshBankDetails,
  refreshBankDetailsFailure,
  refreshBankDetailsSuccess,
  saveBankDetails,
  saveBankDetailsFailure,
  saveBankDetailsSuccess,
  sendItrLink,
  sendItrLinkSuccess,
  sendItrLinkFailure,
  verifyCreds,
  verifyCredsSuccess,
  verifyCredsFailure,
  uploadItrDocs,
  uploadItrDocsSuccess,
  uploadItrDocsFailure,
  deleteUploadITR,
  deleteUploadITRSuccess,
  deleteUploadITRFailure,
} from "../Action/Dde";

export const fetchDDeDetails =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(loading(true));
    dispatch(getDDeDetails());
    try {
      const response = await post(
        "/cwc-sales/dde/getDdeDetails",
        objBody,
        false
      );
      // const response = {
      //   // data: {
      //   //   applicantUniqueId: "98765432141616327969764",
      //   //   leadCode: "UTWDLR21032021172929",
      //   //   panandgst: {
      //   //     customerType: "individual",
      //   //     occupationType: "salaried",
      //   //   },
      //   //   scheme: "fasttrack", //DDE mandatory for income proof
      //   //   itr: {},
      //   //   bankDetails: {
      //   //     collectR: {},
      //   //     salarySlips: {},
      //   //   },
      //   // },
      //   // error: false,
      //   // message: "Data fetched succesfully",
      //   data: {
      //     applicantUniqueId: "70099998821615790525033",
      //     leadCode: "UTWDLR21032021172929",
      //     currentDate: "Timestamp",
      //     scheme: "Fasttrack",
      //     pangstdetails: {
      //       customerType: "individual",
      //       occupationType: "salaried",
      //     },
      //     itr: {
      //       mode: "link",
      //       pdfPath: "/var/www/html/cwc-document/70099998821615790525033",
      //     },
      //     bankDetails: {
      //       collectR: {
      //         emailId: "prasad@gmail.com",
      //       },
      //       salarySlip: [
      //         "/var/www/html/cwc-document/Salary Slip/70099998821615790525033/June/CWC.postman_collection (10).json",
      //         "/var/www/html/cwc-document/Salary Slip/70099998821615790525033/July/AnalyticsFox_API_Contract_Sample (1).docx",
      //         "/var/www/html/cwc-document/Salary Slip/70099998821615790525033/May/DDE.postman_collection.json",
      //       ],
      //     },
      //   },
      //   error: false,
      //   message: "DDE Details Fetch Successfully.",
      //   statusCode: "200",
      // };
      if (!response.data.error) {
        dispatch(getDDeDetailsSuccess(response.data.data));
        //success
      } else {
        //failure
        dispatch(getDDeDetailsFailure({}));
      }
    } catch (err) {
      console.error(err);
      dispatch(getDDeDetailsFailure({}));
    } finally {
      dispatch(loading(false));
    }
  };

export const saveBankDetail =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(loading(true));
    dispatch(saveBankDetails());
    const zipFiles = require("jszip")();

    console.log("jsonstring", objBody);

    objBody.data.map((item) => {
      console.log(item.monthName);
    });

    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let now = new Date();
    // getMonth method returns the month of the date (0-January :: 11-December)
    let previousMonth1 = months[now.getMonth() - 1];

    let previousMonth2 = months[now.getMonth() - 2];

    let previousMonth3 = months[now.getMonth() - 3];

    const payload = JSON.stringify(
      objBody.data.map((item, index) => {
        let name, arr;
        if (item.monthName == previousMonth3) {
          name = item.docName.replace(".pdf", `(1).pdf`);
          arr = objBody.fileListArray[index].file.name.replace(
            ".pdf",
            `(1).pdf`
          );
        } else if (item.monthName == previousMonth2) {
          name = item.docName.replace(".pdf", `(2).pdf`);
          arr = objBody.fileListArray[index].file.name.replace(
            ".pdf",
            `(2).pdf`
          );
        } else {
          name = item.docName.replace(".pdf", `(3).pdf`);
          arr = objBody.fileListArray[index].file.name.replace(
            ".pdf",
            `(3).pdf`
          );
        }
        item.docName = name;
        zipFiles.file(arr, name);
        console.log(objBody.fileListArray[index]);
        return item;
      })
    );
    // return;

    // return;
    console.log(payload);
    const content = await zipFiles.generateAsync({ type: "blob" });
    console.log(content);
    content.name = `${new Date().getTime()}.zip`;
    try {
      const response = await post(
        "/cwc-sales/dde/saveBankDetails",
        { file: content, addInfo: payload },
        false,
        true
      );
      if (!response.data.error) {
        ts(response.data.message);
        return dispatch(saveBankDetailsSuccess(response.data.data));
      } else {
        te(response.data.message);
        dispatch(saveBankDetailsFailure());
      }
    } catch (err) {
      console.error(err);
      dispatch(saveBankDetailsFailure());
    } finally {
      dispatch(loading(false));
    }
  };

export const fetchBankDetails =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(loading(true));
    try {
      // const response = await post("asd", objBody, false);
      const response = {
        data: {
          message: "Request sent successfully.",
          statuscode: "200",
          error: false,
          data: {},
        },
      };
      if (!response.data.error) {
        //success
      } else {
        //failure
      }
    } catch (err) {
    } finally {
      dispatch(loading(false));
    }
  };

export const refreshAndFetchBankDetails =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(loading(true));
    dispatch(refreshBankDetails());
    try {
      // const response = await post("asd", objBody, false);
      const response = {};
      response.data = {
        message: "Bank Details Fetch Successfully",
        statuscode: "200",
        error: false,
        data: {
          requestId: "",
          bankDetails: [
            {
              bankName: "HDFC Bank",
              stmtCount: "2",
              attachments: [
                {
                  url: "asd/asd/asd/",
                  statementId: "1",
                  name: "asd.asd",
                },
                {
                  url: "asd/asd/asd",
                  statementId: "2",
                  name: "asd.asd",
                },
              ],
            },
            {
              bankName: "ICICI Bank",
              stmtCount: "2",
              attachments: [
                {
                  url: "qwewqe/qwe/we/",
                  statementId: "4",
                  name: "asd.asd",
                },
                {
                  url: "/qweqw/bvb/er",
                  statementId: "5",
                  name: "asd.asd",
                },
              ],
            },
          ],
        },
      };
      if (!response.data.error) {
        //success
        dispatch(refreshBankDetailsSuccess(response.data.data));
      } else {
        //failure
        dispatch(refreshBankDetailsFailure({}));
      }
    } catch (err) {
    } finally {
      dispatch(loading(false));
    }
  };

export const deleteSalarySlips =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(loading(true));
    dispatch(deleteSalarySlip());
    try {
      const response = await post(
        "/cwc-sales/dde/deleteDocumentById",
        objBody,
        false
      );

      if (!response.data.error) {
        ts(response.data.message);
        return dispatch(deleteSalarySlipSuccess(response.data));
      } else {
        te(response.data.message);
        return dispatch(deleteSalarySlipFailure(response.data));
      }
    } catch (err) {
      dispatch(deleteSalarySlipFailure(err));
    } finally {
      dispatch(loading(false));
    }
  };

export const sendItrLinkDetails =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(loading(true));
    dispatch(sendItrLink());
    try {
      const response = await post(
        "/cwc-sales/dde/sendITRLinkToCustomer",
        objBody,
        false
      );
      if (!response.data.error) {
        dispatch(sendItrLinkSuccess(response.data.data));
        ts(response.data.message);
        //success
      } else {
        //failure
        dispatch(sendItrLinkFailure({}));
        te(response.data.message);
      }
    } catch (err) {
      console.error(err);
      dispatch(sendItrLinkFailure({}));
    } finally {
      dispatch(loading(false));
    }
  };

export const verifyItrCreds =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(loading(true));
    dispatch(verifyCreds());
    try {
      const response = await post(
        "/cwc-sales/dde/verifyITRCredential",
        objBody,
        false
      );
      if (!response.data.error) {
        dispatch(verifyCredsSuccess(response.data.data));
        ts(response.data.message);
        //success
      } else {
        //failure
        dispatch(verifyCredsFailure({}));
        te(response.data.message);
      }
    } catch (err) {
      console.error(err);
      dispatch(verifyCredsFailure({}));
    } finally {
      dispatch(loading(false));
    }
  };

export const uploadItrDocuments =
  (objBody = {}) =>
  async (dispatch) => {
    dispatch(loading(true));
    try {
      const response = await post(
        "/cwc-sales/dde/uploadITRDocument",
        objBody,
        false,
        true
      );
      if (!response.data.error) {
        ts(response.data.message);
        return dispatch(
          uploadItrDocsSuccess({
            ...response.data,
            // originalFile: objBody.file,
          })
        );
      } else {
        te(response.data.message);
        return dispatch(uploadItrDocsFailure(response.data));
      }
    } catch (err) {
      dispatch(uploadItrDocsFailure(err));
    } finally {
      dispatch(loading(false));
    }
  };

export const deleteITRCreds = (path, appId) => async (dispatch) => {
  dispatch(loading(true));
  dispatch(deleteUploadITR());
  try {
    const response = await get(
      `/cwc-sales/dde/deleteITRDocument?filePath=${path}&applicantUniqueId=${appId}`,
      false
    );
    if (!response.data.error) {
      ts(response.data.message);
      return dispatch(deleteUploadITRSuccess(response.data));
    } else {
      te(response.data.message);
      return dispatch(deleteUploadITRFailure(response.data));
    }
  } catch (err) {
    dispatch(deleteUploadITRFailure(err));
  } finally {
    dispatch(loading(false));
  }
};

export const resetDDE = () => async (dispatch) => {};
