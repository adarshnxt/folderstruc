import { post } from "../httpInterceptor";
import { te, ts } from "../../Utility/ReduxToaster";
import _ from "lodash";

export const getIfscDetails = async (objBody = {}, type) => {
  try {
    const response = await post(
      `/cwc-sales/qde/getBankDetailsFromIfsc`,
      objBody,
      false
    ).then((res) => {
      return res.data;
    });
    if (response.data) {
      ts(response.message);
      return response.data;
    } else {
      te("Please enter valid IFSC code");
      let error = false;
      return error;
    }
  } catch (err) {
    return err;
  }
};
