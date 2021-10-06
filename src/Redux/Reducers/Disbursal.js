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

const initialState = {
  disbursal: {},
  disbursalDetails: {},
};

function disbsReducer(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_DISBS:
      return { ...state };

    case GET_DISBS:
      return { ...state, disbursalDetails: {} };

    case DELETE_DISBS_SUCCESS:
    case UPLOAD_DISBS_SUCCESS:
    case GET_DISBS_SUCCESS:
      return { ...state, disbursalDetails: action.payload };

    case GET_DISBS_FAILURE:
      return { ...state, disbursalDetails: {} };

    default:
      return state;
  }
}
export default disbsReducer;
