//Sit server
// export const API_URL = "http://35.154.202.170/";
//stage server
//3.6.147.9

export const BASE_URL = `${window.location.protocol}//${
  window.location.hostname == "localhost"
    ? "app.creditwisecapital.in"
    : window.location.hostname
}`;

export const API_URL = `${BASE_URL}`;

//export const API_URL = `http://f123115413e5.ngrok.io`;

export const FrontendURL = `${window.location.protocol}//${window.location.hostname}:5000`;

export const FileUrl = `${window.location.protocol}//${window.location.hostname}/`;
