import { post } from "../httpInterceptor";

export const QDEschemes = (objBody = {}) => async () => {
  try {
    const response = await post(
      "/cwc-sales/qde/saveschemedata",
      objBody,
      false
    );
    return response;
  } catch (err) {
    console.log("err", err);
    return err;
  }
};

export const QDEschemes2 = (objBody = {}) => async () => {
  try {
    const response = await post(
      "/cwc-sales/qde/getqdeseciondetails",
      objBody,
      false
    );
    return response;
  } catch (err) {
    console.log("err", err);
    return err;
  }
};

export const QdeSectionDetail = (objBody = {}) => async () => {
  try {
    const response = await post(
      "/cwc-sales/qde/getqdedetailsbyapplicantuniqid",
      objBody,
      false
    );
    return response;
  } catch (err) {
    console.log("err", err);
    return err;
  }
};

export const QDEschemesCustomerCreation = (objBody = {}) => async () => {
  try {
    const response = await post(
      "/cwc-sales/customer/createOrUpdateCustomer",
      objBody,
      false
    );
    return response;
  } catch (err) {
    console.log("err", err);
    return err;
  }
};

export const saveSchemes = async (objBody = {}) => {
  try {
    const response = await post(
      "/cwc-sales/qde/saveschemedata",
      objBody,
      false
    );
    return response;
  } catch (err) {
    return err;
  }
};
