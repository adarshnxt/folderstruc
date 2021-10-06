import axios from "axios";
import { syncLogout } from "../Redux/Action/Login";
import { public_url } from "../Utility/Constant";
import { API_URL, BASE_URL } from "./Config";
import { getServerValidation, getToken } from "./Helper";
import { te } from "./ReduxToaster";

export const getFilePath = (filePath) =>
  filePath && filePath.replace("/var/www/html", BASE_URL);

export const get = (
  url,
  isPrivate = true,
  responseType = null,
  customUrl = false,
  headers
) => {
  let apiUrl = API_URL + url;
  if (customUrl) {
    apiUrl = url;
  }
  if (isPrivate && getToken()) {
    const isParam = apiUrl.includes("?");
    if (isParam) apiUrl = `${apiUrl}&&api_token=${getToken()}`;
    else apiUrl = `${apiUrl}?api_token=${getToken()}`;
  }
  const axiosObj = {
    method: "get",
    url: apiUrl,
  };
  headers = {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    "Access-Control-Allow-Origin": "*",
  };
  if (headers) {
    axiosObj.headers = headers;
  }
  if (responseType) axiosObj.responseType = responseType;
  return axios(axiosObj)
    .then((response) => handleResponse(response))
    .catch((error) => {
      console.log("return handleError(error)", error);
      return handleError(error);
    });
};
export const post = (
  url,
  bodyObj = {},
  isPrivate = true,
  mediaFile = false,
  uat = false
) => {
  const apiUrl = !uat ? API_URL + url : url;

  if (isPrivate && getToken()) {
    if (bodyObj instanceof FormData) bodyObj.append("api_token", getToken());
    else bodyObj.api_token = getToken();
  }
  if (mediaFile == true) {
    let formData = new FormData();
    console.log("bodyObj", bodyObj);
    Object.keys(bodyObj).map((key) => {
      formData.append(key, bodyObj[key]);
    });
    bodyObj = formData;
  }
  let header = {};
  if (!url.includes("authenticate")) {
    header = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Access-Control-Allow-Origin": "*",
    };
  }
  if (uat) {
    header["x-api-key"] = "n16HKWRvRq5ZwHTSrWm1o6BbuCT6PCVR62uotv3m";
    header["Access-Control-Allow-Origin"] = "*";
  }
  return axios
    .post(apiUrl, bodyObj, {
      headers: header,
    })
    .then((response) => handleResponse(response))
    .catch((error) => {
      console.log("error interceptor", error);
      return handleError(error);
    });
};
const handleResponse = (response) => {
  return {
    error: false,
    data: response.data,
  };
};
const handleError = (error) => {
  const { response } = error;
  let parsedError = response && JSON.parse(JSON.stringify(response.data));
  // console.log("handleError", parsedError, parsedError.statusCode, parsedError && parsedError.statusCode == 401)

  let errorMsg = "Sorry, something went wrong. Please try again.";
  if (response && response != undefined && response.status === 422) {
    // handle server validation
    if (response.data && response.data.errors)
      errorMsg = getServerValidation(response.data.errors) || errorMsg;
    else if (response.data.message) errorMsg = response.data.message;
  } else if (parsedError && parsedError.statusCode == 401) {
    // Unauthorized
    console.log("handleError", "inside 401");
    let element = document.getElementById("unauthorized-box");
    if (element) {
      element.style.display = "block";
      errorMsg = null;
    }
    syncLogout("credit_module");
    window.location.pathname = public_url.login;
    te(errorMsg);
  } else if (
    response &&
    response != undefined &&
    JSON.parse(JSON.stringify(response.data)).toString().includes("401")
  ) {
    // Unauthorized
    let element = document.getElementById("unauthorized-box");
    if (element) {
      element.style.display = "block";
      errorMsg = null;
    }
    syncLogout();
  } else if (errorMsg) {
    te(errorMsg);
  }
  return {
    error: true,
    message: response && response != undefined ? response.data.message : null,
    status: response && response != undefined ? response.status : null,
  };
};

export const awspost = (
  url,
  bodyObj = {},
  isPrivate = true,
  mediaFile = false,
  uat = false
) => {
  const apiUrl = !uat ? API_URL + url : url;

  if (isPrivate && getToken()) {
    if (bodyObj instanceof FormData) bodyObj.append("api_token", getToken());
    else bodyObj.api_token = getToken();
  }
  if (mediaFile == true) {
    let formData = new FormData();
    Object.keys(bodyObj).map((key) => {
      formData.append(key, bodyObj[key]);
    });
    bodyObj = formData;
  }
  return axios
    .post(apiUrl, bodyObj, {
      headers: {
        "x-api-key": "lksaflsajf",
      },
    })
    .then((response) => handleResponse(response))
    .catch((error) => handleError(error));
};
