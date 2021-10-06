import { LOADING, SET_HEADING } from "../Constants";

export const loading = (obj) => {
  return { type: LOADING, payload: obj };
};

export const setHeading = (obj) => {
  return { type: SET_HEADING, payload: obj };
};
