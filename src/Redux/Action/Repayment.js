import {
  SAVE_REPAYMENT_SUCCESS,
  SAVE_REPAYMENT_FAILURE,
  SAVE_COMMENT_SUCCESS,
  SAVE_COMMENT_FAILURE,
  GET_REPAYMENT_SUCCESS,
  GET_REPAYMENT_FAILURE,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAILURE,
} from "../Constants";

//----------------------Repayment----------------------------
export const saveRepaymentSuccess = (obj) => {
  return { type: SAVE_REPAYMENT_SUCCESS, payload: obj };
};

export const saveRepaymentFailure = (obj) => {
  return { type: SAVE_REPAYMENT_FAILURE, payload: obj };
};


export const saveCommentSuccess = (obj) => {
  return { type: SAVE_COMMENT_SUCCESS, payload: obj };
};

export const saveCommentFailure = (obj) => {
  return { type: SAVE_COMMENT_FAILURE, payload: obj };
};


export const getRepaymentSuccess = (obj) => {
  return { type: GET_REPAYMENT_SUCCESS, payload: obj };
};

export const getRepaymentFailure = (obj) => {
  return { type: GET_REPAYMENT_FAILURE, payload: {} };
};


export const getCommentSuccess = (obj) => {
  return { type: GET_COMMENT_SUCCESS, payload: obj };
};

export const getCommentFailure = (obj) => {
  return { type: GET_COMMENT_FAILURE, payload: {} };
};
//------------------------------------------------------


