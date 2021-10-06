import {
  UPLOAD_DISBS,
  UPLOAD_DISBS_SUCCESS,
  UPLOAD_DISBS_FAILURE,
  GET_DISBS,
  GET_DISBS_SUCCESS,
  GET_DISBS_FAILURE,
  DELETE_DISBS,
  DELETE_DISBS_SUCCESS,
  DELETE_DISBS_FAILURE,
} from "../Constants";

//----------------------DISBURSAL----------------------------
export const uploadDisbs = (obj) => {
  return { type: UPLOAD_DISBS, payload: {} };
};

export const uploadDisbsSuccess = (obj) => {
  return { type: UPLOAD_DISBS_SUCCESS, payload: obj };
};

export const uploadDisbsFailure = (obj) => {
  return { type: UPLOAD_DISBS_FAILURE, payload: obj };
};

export const getDibs = (obj) => {
  return { type: GET_DISBS, payload: {} };
};

export const getDibsSuccess = (obj) => {
  return { type: GET_DISBS_SUCCESS, payload: obj };
};

export const getDibsFailure = (obj) => {
  return { type: GET_DISBS_FAILURE, payload: obj };
};

export const deleteDisbs = (obj) => {
  return { type: DELETE_DISBS, payload: {} };
};

export const deleteDisbsSuccess = (obj) => {
  return { type: DELETE_DISBS_SUCCESS, payload: obj };
};

export const deleteDisbsFailure = (obj) => {
  return { type: DELETE_DISBS_FAILURE, payload: obj };
};
