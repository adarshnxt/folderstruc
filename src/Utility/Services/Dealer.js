import { get,post } from "../../Utility/httpInterceptor";

export const fetchDealerDetails = (objBody = {}) => {
  return post(`/cwc-sales/source-types/dealers`, objBody).then((res) => {
    return res;
  });
};
