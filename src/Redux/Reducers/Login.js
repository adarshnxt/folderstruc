import {
  GET_LOGIN_MODULE,
  GET_LOGIN_MODULE_FAILURE,
  GET_LOGIN_MODULE_SUCCESS,
} from "../Constants";
const initialState = {
  isLogin: false,
  getLoginModule: null,
  loading: null,
};

function addReducer(state = initialState, action) {
  switch (action.type) {
    case "login":
      return { ...state, ...action.payload, isLogin: true };
    case "logout":
      return { ...state, ...action.payload, isLogin: false };

    case GET_LOGIN_MODULE:
      return { ...state, loading: true };

    case GET_LOGIN_MODULE_SUCCESS:
      return { ...state, getLoginModule: action.payload, loading: false };

    case GET_LOGIN_MODULE_FAILURE:
      return { ...state, getLoginModule: null, loading: false };
    default:
      return state;
  }
}
export default addReducer;
