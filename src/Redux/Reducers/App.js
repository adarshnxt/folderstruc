import { LOADING, SET_HEADING } from "../Constants";
const initialState = {
  loading: false,
  heading: "",
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.payload };

    case SET_HEADING:
      return { ...state, heading: action.payload };

    default:
      return state;
  }
}
export default appReducer;
