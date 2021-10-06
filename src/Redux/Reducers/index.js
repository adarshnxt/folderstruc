import { reducer as toastr } from "react-redux-toastr";
import { combineReducers } from "redux";
import app from "./App";
import dashboard from "./Dashboard";
import dde from "./Dde";
import leads from "./Leads";
import Summary from "./LoanSummary";
import login from "./Login";
import qde from "./Qde";
import loanAgreement from "./LoanAgreement";
import repayment from "./Repayment";
import disbursal from "./Disbursal";

export default combineReducers({
  app,
  dashboard,
  dde,
  leads,
  login,
  qde,
  Summary,
  toastr,
  loanAgreement,
  repayment,
  disbursal,
});
