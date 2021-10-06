import { get } from "../../Utility/httpInterceptor";
import { post } from "../httpInterceptor";

// fetch/get sectors
export const fetchSectors = (objBody = {}) => {
  return get(`/cwc-sales/qde/getsectormaster`, objBody).then((res) => {
    return res;
  });
};

// fetch/get industry
export const fetchIndustries = (objBody = {}) => {
  return get(`/cwc-sales/qde/getindustrylist`, objBody).then((res) => {
    return res;
  });
};

// fetch/get subIndustry
export const fetchSubIndustries = (sectorcode) => {
  return get(`/cwc-sales/qde/getsubindustrylist?sectorcode=${sectorcode}`).then(
    (res) => {
      console.log("Sub-industry Fetched....!", res);
      return res;
    }
  );
};

// fetch segments
export const fetchSegments = (objBody = {}) => {
  return get(`/cwc-sales/qde/getsegmentlist`, objBody).then((res) => {
    return res;
  });
};

export const getBusinessDetails = (objBody = {}) => {

  return post(`/cwc-sales/qde/getqdeseciondetails`, {
    lead_code: objBody.lead_code,
    applicant_uniqueid: objBody.applicant_uniqueid,
  }).then((res) => {
    // objBody.callbackgetreff(res);
    return res;
  });
};
