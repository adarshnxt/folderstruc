import { get, post } from "../../Utility/httpInterceptor";

export const getLeadListCounts = (objBody = {}) => async () => {
  try {
    const response = await post(
      `/cwc-sales/lead/getLeadList`,
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

export const getLeadByLeadCode = (id) => {
  return get(`/cwc-sales/lead/getLeadDetails?id=${id}`).then((res) => {
    console.log("getLeadByLeadCode", res, id);
    return res;
  });
};
