import { post } from "../httpInterceptor";

export const getReferenceDetailsService = (objBody = {}) => {
  return post(`/cwc-sales/qde/getreferencedetails`, {
    lead_code: objBody.lead_code,
    applicant_uniqueid: objBody.applicant_uniqueid,
  }).then((res) => {
    // objBody.callbackgetreff(res);

    return res;
  });
};
