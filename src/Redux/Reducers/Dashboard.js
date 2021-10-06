import { GET_COUNT, GET_COUNT_FAILURE, GET_COUNT_SUCCESS } from "../Constants";
const initialState = {
  count: [],
  loading: null,
};

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNT:
      return { ...state, loading: true };
    case GET_COUNT_SUCCESS:
      return { ...state,count:action.payload, loading: false };
    case GET_COUNT_FAILURE:
      return { ...state, count: [], loading: false };
    default:
      return state;
  }
}
export default dashboardReducer;
