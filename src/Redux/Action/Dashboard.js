import { GET_COUNT, GET_COUNT_FAILURE, GET_COUNT_SUCCESS } from "../Constants";
import {GET_USER_BY_EMP_ID, GET_USER_BY_EMP_ID_SUCCESS, GET_USER_BY_EMP_ID_FAILURE} from "../Constants"

export const getCount = (obj) => {
  return { type: GET_COUNT, payload: {} };
};

export const getCountSuccess = (obj) => {
  return { type: GET_COUNT_SUCCESS, payload: obj };
};

export const getCountFailure = (obj) => {
  return { type: GET_COUNT_FAILURE, payload: {} };
};

export const getUserById = (user) =>{
  return {type: GET_USER_BY_EMP_ID, payload: {}};
}

export const getUserByIdSuccess = (user) =>{
  return {type: GET_USER_BY_EMP_ID_SUCCESS, user};
}

export const getUserByIdFailure = (user) =>{
  return {type: GET_USER_BY_EMP_ID_FAILURE, payload: {}};
}