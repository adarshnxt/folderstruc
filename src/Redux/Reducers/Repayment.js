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

const initialState = {
  getQdeDetails: null,
  repayment: {
    data: {},
  },
  saveRepayment: null,
  comment:{
    data:{}
  },
  saveComment: null,
  repay:[],
  disbsComment:[],
  repaymentSuccess:false
};

function repaymentReducer(state = initialState, action) {
  switch (action.type) {
    //-----------------------------Repayment-----------------------------
    case SAVE_REPAYMENT_SUCCESS:
      return {
        ...state,
        addSuccess: true,
        repayment: action.payload,
        saveRepayment: true,
        getQdeDetails: true,
        repaymentSuccess:true
      };

    case SAVE_REPAYMENT_FAILURE:
      return {
        ...state,
        repayment: {},
        saveRepayment: false,
        getQdeDetails: false,
      };

    case SAVE_COMMENT_SUCCESS:
      return {
        ...state,
        addSuccess: true,
        comment: action.payload,
        saveComment: true,
        getQdeDetails: true,
      };

    case SAVE_COMMENT_FAILURE:
      return {
        ...state,
        comment: {},
        saveComment: false,
        getQdeDetails: false,
      };

    case GET_REPAYMENT_SUCCESS:
      return {
        ...state,
        repay: action.payload,
      };

    case GET_REPAYMENT_FAILURE:
      return {
        ...state,
        repay: [],
      };

    case GET_COMMENT_SUCCESS:
      return {
        ...state,
        disbsComment: action.payload,
      };

    case GET_COMMENT_FAILURE:
      return {
        ...state,
        disbsComment: [],
      };
    //-----------------------------------------------------------------

    default:
      return state;
  }
}
export default repaymentReducer;
