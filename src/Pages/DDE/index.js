import { Steps } from "antd";
import isEmpty from "lodash/isEmpty";
import React, { Component } from "react";
import { connect } from "react-redux";
import { setHeading } from "../../Redux/Action/App";
import {
  deleteSalarySlips,
  fetchBankDetails,
  fetchDDeDetails,
  refreshAndFetchBankDetails,
  saveBankDetail,
} from "../../Redux/Services/Dde";
import DDEbank from "./DDEbank";
import DDEitr from "./DDEitr";
import "./style.scss";
import { getLoanSummary } from "../../Redux/Services/LoanSummary";

class DDE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      freezUserData: null,
    };
  }

  componentDidMount() {
    this.props.setHeadingValue("Detailed Data Entry");
    this.props.fetchDDeDetails({
      applicantUniqueId: this.props.match.params.id,
    });
    if (
      this.props.history.location.state &&
      this.props.history.location.state.stepper
    ) {
      this.changeStep(this.props.history.location.state.stepper);
    }
    // let userData = localStorage.getItem("UserData");
    // let userDataCopy = JSON.parse(userData);
    // console.log(
    //   "-->",
    //   this.props.dde &&
    //     this.props.dde.ddeDetails &&
    //     this.props.dde.ddeDetails.pangstdetails &&
    //     this.props.dde.ddeDetails.pangstdetails.leadCode
    // );
    
  }

  changeStep = (current) => {
    this.setState({
      currentStep: current,
    });
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.dde.getDdeDetails !== this.props.dde.getDdeDetails &&
      this.props.dde.getDdeDetails
    ) {
      this.props.fetchDDeDetails({
        applicantUniqueId: this.props.match.params.id,
      });
      
    }
    if(prevProps.dde.ddeDetails !== this.props.dde.ddeDetails &&
      this.props.dde.ddeDetails){
        let userData = localStorage.getItem("UserData");
        let userDataCopy = JSON.parse(userData);
        let mainApplicantUniqueId = this.props && this.props.dde && this.props.dde.ddeDetails && this.props.dde.ddeDetails.mainApplicantUniqueId;
        this.props.getLoanSummary({
          applicant_uniqueid: mainApplicantUniqueId,
          // applicant_uniqueid: this.props.match.params.id,
          lead_code:
            this.props.dde &&
            this.props.dde.ddeDetails &&
            this.props.dde.ddeDetails.pangstdetails &&
            this.props.dde.ddeDetails.pangstdetails.leadCode,
          roleId: userDataCopy.roleId,
        });
      }
      if (
      this.props.Summary &&
      this.props.Summary.loansummary !== prevProps.Summary.loansummary
      ) {
      this.setState({
        freezUserData:
          this.props.Summary &&
          this.props.Summary.loansummary &&
          this.props.Summary.loansummary.data &&
          this.props.Summary.loansummary.data.mainapplicant &&
          this.props.Summary.loansummary.data.mainapplicant.loanAgreementFlag,
      });
    }
  }

  getSection = (individual) => {
    if (individual) {
      switch (this.state.currentStep) {
        case 0:
          return (
            <DDEbank
              changeStep={this.changeStep}
              match={this.props.match}
              dde={this.props.dde}
              fetchBankDetails={this.props.fetchBankDetails}
              saveBankDetail={this.props.saveBankDetail}
              refreshAndFetchBankDetails={this.props.refreshAndFetchBankDetails}
              deleteSalarySlips={this.props.deleteSalarySlips}
              history={this.props.history}
              freezeCase={this.state.freezUserData}
              freezeUser={this.props.Summary &&
                this.props.Summary.loansummary &&
                this.props.Summary.loansummary.data &&
                this.props.Summary.loansummary.data.modelAccess &&
                this.props.Summary.loansummary.data.modelAccess[0] &&
                this.props.Summary.loansummary.data.modelAccess[0].read}
            />
          );
        case 1:
          return (
            <DDEitr
              history={this.props.history}
              changeStep={this.changeStep}
              match={this.props.match}
              dde={this.props.dde}
              freezeCase={this.state.freezUserData}
              freezeUser={
                this.props.Summary &&
                this.props.Summary.loansummary &&
                this.props.Summary.loansummary.data &&
                this.props.Summary.loansummary.data.ModelAccess &&
                this.props.Summary.loansummary.data.ModelAccess[0] &&
                this.props.Summary.loansummary.data.ModelAccess[0].read
              }
            />
          );
        default:
          return null;
      }
    }
  };

  render() {
    const { ddeDetails } = this.props.dde;
    let individual = !isEmpty(ddeDetails)
      ? ddeDetails.pangstdetails &&
        ddeDetails.pangstdetails.customerType === "individual"
      : false;

    const section = this.getSection(individual);

console.log("thid.ptopd-->", this.props)
    const freezeUser =
      this.props.Summary &&
      this.props.Summary.loansummary &&
      this.props.Summary.loansummary.data &&
      this.props.Summary.loansummary.data.ModelAccess &&
      this.props.Summary.loansummary.data.ModelAccess[0] &&
      this.props.Summary.loansummary.data.ModelAccess[0].read;

    return (
      <div className={"qdeContainer"}>
        <div className={"stepsWrapper"}>
          <div className={"stepsContainer"}>
            <Steps
              labelPlacement={"vertical"}
              size={"small"}
              current={this.state.currentStep}
              onChange={this.changeStep}>
              {!individual && <Steps.Step title="GST Verification" />}
              <Steps.Step
                title="Bank Details"
              />
              <Steps.Step
                title="ITR Verification"
              />
              {!individual && <Steps.Step title="Financial Statement" />}
            </Steps>
          </div>
        </div>
        <div className={"qdeContentWrapper"}>
          <div className={"qdeContentContainer"}>{section}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    leads: state.leads,
    dde: state.dde,
    Summary: state.Summary,
  };
};

const mapDispatchToProps = {
  setHeadingValue: (payload) => async (dispatch) => {
    dispatch(setHeading(payload));
  },
  getLoanSummary,
  fetchDDeDetails,
  saveBankDetail,
  fetchBankDetails,
  refreshAndFetchBankDetails,
  deleteSalarySlips,
};
export default connect(mapStateToProps, mapDispatchToProps)(DDE);
