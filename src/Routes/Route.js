import React from "react";
import { Route, withRouter } from "react-router-dom";
import ConsentLink from "../Pages/Add Lead/consentRequestLink";
import Otpverification from "../Pages/Add Lead/otpverification";
import CollectR from "../Pages/CollectR/collectR";
import Dashboard from "../Pages/Dashboard/index";
import DDE from "../Pages/DDE";
import DDEitr from "../Pages/DDE/DDEitr";
import Login from "../Pages/Login";
import Qde from "../Pages/Qde";
import Success from "../Pages/Success/Success";
import LoanSummary from "../Pages/Summary";
import { public_url } from "../Utility/Constant";
import LoanAgreement from "../Pages/LoanAgreement";
import VerifyViaCreds from "./../Pages/DDE/VerifyViaCreds";
import SentLink from "../Pages/Add Lead/SentLink";
import LeadList from "../Pages/Add Lead/LeadList";
import Addleadz from "../Pages/Add Lead/";
import Repayment from "../Pages/Repayment/";
import Disbursement from "./../Pages/Disbursement/Disbursement";
class Routes extends React.Component {
  componentDidMount() {
    let { location } = this.props;
    let { pathname } = location;

    if (
      !localStorage.getItem("employeeId") &&
      !pathname.startsWith(`${public_url.collectR}/success`) &&
      !pathname.startsWith(`${public_url.collectR}/failure`) &&
      !pathname.startsWith(`${public_url.verifyViaCreds}`) &&
      !pathname.startsWith(`${public_url.SentLink}/success`) &&
      !pathname.startsWith(`${public_url.SentLink}/failure`) &&
      !pathname.startsWith(`${public_url.SentLink}/timeOver`) &&
      !pathname.startsWith(`${public_url.SentLink}/fiSuccess`) &&
      !pathname.startsWith(`${public_url.SentLink}/fiReject`) &&
      !pathname.startsWith(`${public_url.SentLink}/fiSubmit`)
    ) {
      this.props.history.push(public_url.login);
    }
  }
  render() {
    return (
      <React.Fragment>
        <Route exact path={public_url.landing_page} component={Login} />
        <Route
          exact
          path={`${public_url.consentLink}/:journey/:id`}
          component={ConsentLink}
        />
        <Route
          exact
          path={`${public_url.collectR}/:status`}
          component={CollectR}
        />
        <Route
          exact
          path={`${public_url.verifyViaCreds}/:id`}
          component={VerifyViaCreds}
        />
        <Route
          exact
          path={`${public_url.SentLink}/:sentStatus`}
          component={SentLink}
        />
        <Route exact path={public_url.login} component={Login} />
        <Route
          exact
          path={`/lead${public_url.addlead}/:type/:id`}
          component={Addleadz}
        />
        <Route exact path={public_url.dashboard} component={Dashboard} />
        <Route exact path={public_url.DDEitr} component={DDEitr} />
        <Route
          exact
          path={`/:journey${public_url.loanAgreement}/:id`}
          component={LoanAgreement}
        />
        <Route
          exact
          path={`/:journeyType${public_url.otpVerification}/:leadCode/:id`}
          component={Otpverification}
        />
        <Route
          exact
          path={`/:journey${public_url.dde}/:type/:id`}
          component={DDE}
        />
        <Route
          exact
          path={`/:journey${public_url.qde}/:type/:id`}
          component={Qde}
        />
        <Route
          exact
          path={`/:journey/:redirection${public_url.loanOffer}/:offerType/:id`}
          component={Success}
        />
        <Route
          exact
          path={`${public_url.leadLists}/:type`}
          component={LeadList}
        />
        <Route
          exact
          path={`${public_url.concentRequest}/:leadCode`}
          component={ConsentLink}
        />
        <Route
          exact
          path={`${public_url.loanSummary}/:id`}
          component={LoanSummary}
        />
        <Route
          exact
          path={`${public_url.repayment}/:id`}
          component={Repayment}
        />
        <Route
          exact
          path={`${public_url.disbursement}/:disbursement/:id`}
          component={Disbursement}
        />
      </React.Fragment>
    );
  }
}
export default withRouter(Routes);
