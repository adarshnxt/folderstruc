import { post,get } from "../../Utility/httpInterceptor";

//call loanDetail
export const loanDetails = async (objBody = {}, type) => {
  try {
    const response = await post(`/cwc-sales/qde/${type}`, objBody, false).then(
      (res) => {
        return res.data;
      }
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

//load details save
export const loanDetailsSave = (objBody = {}) => async () => {
  try {
    const response = await post(
      "/cwc-sales/qde/saveorupdateqdeloandetails",
      objBody,
      false
    ).then((res) => {
      return res;
    });
    return response;
  } catch (err) {
    return err;
  }
};

//getQdeLead
export const getQdeLead = (objBody = {}) => async () => {
  try {
    const response = await post(
      "/cwc-sales/qde/getqdeseciondetails",
      objBody,
      false
    ).then((res) => {
      return res.data;
    });
    return response;
  } catch (err) {
    return err;
  }
};

// export const dealerList = (objBody = {}) => async () => {
//   try {
//     const response = await post(
//       "/cwc-sales/master/getDealerList",
//       objBody,
//       false
//     ).then((res) => {
//       console.log(res)
//       return res;
//     });
//     return response;
//   } catch (err) {
//     return err;
//   }
// };

export const dealerList = async (objBody = {}, type) => {
  try {
    const response = await post(
      `/cwc-sales/master/getDealerList`,
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

// export const dealerList = async () => {
//   const res = await get(`/cwc-sales/master/getDealerList`);
//   console.log("Dealer list Fetched....!", res);
//   return res;
// };
// cwc - sales / master / getDealerList;