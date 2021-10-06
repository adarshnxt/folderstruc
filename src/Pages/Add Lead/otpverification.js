import { Button, Checkbox } from "antd";
import { HmacSHA224 } from "crypto-js";
import isEmpty from "lodash/isEmpty";
import React from "react";
import OtpInput from "react-otp-input";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { resetLeads } from "../../Redux/Action/Leads";
import {
  createConcent,
  createConcentCoapplicantGuarantor,
  getCoapplicantGuarantorByCoapplicantIdService,
  verifyConsent,
  verifyConsentCoapplicantGuarantor,
} from "../../Redux/Services/leads";
import { public_url } from "../../Utility/Constant";
import { te, ts } from "../../Utility/ReduxToaster";
import { getLeadByLeadCode } from "../../Utility/Services/LeadList";
import "./style.css";
class Otpverification extends React.Component {
  state = {
    otp: "",
    showResults: true,
    isShow: false,
    leadDeatils: {},
    coapplicantGuarantorDetails: {},
    checkboxCheckedFirst: false,
    checkboxCheckedSecond: false,
  };

  componentDidMount() {
    this.fetchLeadDetails();
    if (this.props.leads.verifyConcentSuccess) {
      if (this.props.leads.commonLeads.productId) {
        this.props.history.push(
          `/leadLists/${this.props.leads.commonLeads.productId}`
        );
      }
      //  else {
      //   this.props.history.push(`/dashboard`);
      // }
    } else {
      this.fetchLeadDetails();
    }
    let { journeyType } = this.props.match.params;
    if (journeyType == "co-applicant" || journeyType === "guarantor") {
      this.props.getCoapplicantGuarantorByCoapplicantIdService({
        coapplicantUniqueId: this.props.match.params.id,
      });
    }
    if (
      this.props.leads.coapplicantGuarantor &&
      this.props.leads.coapplicantGuarantor.data &&
      this.props.leads.coapplicantGuarantor.data.consentStatus &&
      this.props.leads.coapplicantGuarantor.data.consentStatus.toLowerCase() !==
        "consent pending"
    ) {
      const productid =
        this.props.leads.coapplicantGuarantor &&
        this.props.leads.coapplicantGuarantor.data &&
        this.props.leads.coapplicantGuarantor.data.productId;
      this.props.history.push(`${public_url.leadLists}/${productid}`);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.leads.verifyConcentSuccess !==
        prevProps.leads.verifyConcentSuccess &&
      this.props.leads.verifyConcentSuccess
    ) {
      ts("Consent verified successfully");
      const { id, journeyType } = this.props.match.params;
      this.props.history.push(
        `/${journeyType}/qde/add/${this.state.leadDeatils.applicantUniqueId}`
      );
    } else if (
      this.props.leads.verifyCGConcentSuccess !==
        prevProps.leads.verifyCGConcentSuccess &&
      this.props.leads.verifyCGConcentSuccess
    ) {
      ts("Consent verified successfully");
      const { id, journeyType } = this.props.match.params;
      this.props.history.push(
        `/${journeyType}/qde/add/${
          this.props.leads.coapplicantGuarantor.data &&
          this.props.leads.coapplicantGuarantor.data.coapplicantUniqueId
        }`
      );
    }

    if (
      this.props.leads.coapplicantGuarantor.data !==
      prevProps.leads.coapplicantGuarantor.data
    ) {
      if (
        this.props.leads.coapplicantGuarantor &&
        this.props.leads.coapplicantGuarantor.data &&
        this.props.leads.coapplicantGuarantor.data.consentStatus &&
        this.props.leads.coapplicantGuarantor.data.consentStatus ===
          "Consent Approved"
      )
        this.props.history.push(
          `/leadLists/${
            this.props.leads.coapplicantGuarantor &&
            this.props.leads.coapplicantGuarantor.data &&
            this.props.leads.coapplicantGuarantor.data.productId
          }`
        );
    }
  }

  handleChange = (otp) => {
    this.setState({ showResults: false });
    this.setState({ otp });
  };

  redirect = (e) => {
    if (this.props.match.params.journeyType === "applicant") {
      const payload = {};
      payload.leadCode = this.props.match.params.leadCode;
      payload.otp = this.state.otp;
      this.props.verifyConsent(payload);
    } else if (
      this.props.match.params.journeyType === "co-applicant" ||
      this.props.match.params.journeyType === "guarantor"
    ) {
      const payload = {};
      payload.lead_code = this.props.match.params.leadCode;
      payload.coapplicantUniqueId = this.props.match.params.id;
      payload.otp = this.state.otp;
      this.props.verifyConsentCoapplicantGuarantor(payload);
    }
  };

  resendOtp = (e) => {
    let { journeyType } = this.props.match.params;
    if (journeyType === "applicant") {
      let leadCode = this.props.match.params.leadCode;
      this.props.createConcent({ leadCode });
    }
    if (journeyType === "co-applicant" || journeyType === "guarantor") {
      let lead_code = this.props.match.params.leadCode;
      let coapplicantUniqueId = this.props.match.params.id;
      this.props.createConcentCoapplicantGuarantor({
        lead_code,
        coapplicantUniqueId,
      });
    }
  };

  fetchLeadDetails = () => {
    let { journeyType } = this.props.match.params;
    let id = this.props.match.params.id;
    if (journeyType === "applicant") {
      getLeadByLeadCode(id).then((response) => {
        if (response.error) {
          return;
        }
        if (response.data.error) {
          te(response.data.message);
          return;
        } else {
          this.setState({ leadDeatils: response.data.data }, () => {
            if (
              this.state.leadDeatils.consentStatus.toLowerCase() !==
              "consent pending"
            ) {
              this.props.history.push(
                // `${public_url.leadLists}/${this.state.leadDeatils.productId}`
                `/dashboard`
              );
            }
          });
        }
      });
    }
  };

  redirectToLeadList = () => {
    let { journeyType } = this.props.match.params;
    if (journeyType === "applicant") {
      const id = this.state.leadDeatils.productId;
      this.props.history.push(`${public_url.leadLists}/${id}`);
    } else if (
      (!isEmpty(this.props.leads.coapplicantGuarantor.data) &&
        journeyType == "co-applicant") ||
      journeyType === "guarantor"
    ) {
      const id = this.props.leads.coapplicantGuarantor.data.productId;
      this.props.history.push(`${public_url.leadLists}/${id}`);
    }
  };

  onChangeCheckbox1 = () => {
    this.setState({ checkboxCheckedFirst: !this.state.checkboxCheckedFirst });
  };
  onChangeCheckbox2 = () => {
    this.setState({ checkboxCheckedSecond: !this.state.checkboxCheckedSecond });
  };
  render() {
    let disabled = false;
    if (
      this.state.checkboxCheckedFirst != false &&
      this.state.checkboxCheckedSecond != false &&
      this.state.otp != ""
    ) {
      disabled = false;
    } else {
      disabled = true;
    }
    if (
      this.state.otp.length == 6 &&
      this.state.checkboxCheckedFirst != false &&
      this.state.checkboxCheckedSecond != false
    ) {
      disabled = false;
    } else {
      disabled = true;
    }
    const { leadDeatils } = this.state;
    const { customerEmail } = this.state.leadDeatils;
    String.prototype.replaceAt = function (index, replacement) {
      return (
        this.substr(0, index) +
        replacement +
        this.substr(index + replacement.length)
      );
    };

    let str = "";
    if (Object.keys(leadDeatils).length > 0) {
      str = leadDeatils.customerMobile.toString();
      str = str.replaceAt(2, "XXXXXX");
    }
    return (
      <>
        <div className="OtpVerificationContainer p-3">
          <div className="Source-Type-information-container">
            {this.props.match.params.journeyType === "applicant" && (
              <p className="Source-info ">
                <Checkbox
                  onClick={this.onChangeCheckbox1}
                  checked={this.state.checkboxCheckedFirst}
                >
                  &nbsp;
                </Checkbox>
                I, {leadDeatils.leadName} agree to the terms and conditions
                attached herewith.
              </p>
            )}

            {(this.props.match.params.journeyType === "co-applicant" ||
              this.props.match.params.journeyType === "guarantor") && (
              <p className="Source-info ">
                <Checkbox
                  onClick={this.onChangeCheckbox1}
                  checked={this.state.checkboxCheckedFirst}
                >
                  &nbsp;
                </Checkbox>
                I,{" "}
                {!isEmpty(this.props.leads.coapplicantGuarantor.data)
                  ? this.props.leads.coapplicantGuarantor.data.leadName
                  : ""}{" "}
                agree to the terms and conditions attached herewith.
              </p>
            )}

            <br />
            {this.props.match.params.journeyType === "applicant" && (
              <p className="Source-info ">
                <Checkbox
                  onClick={this.onChangeCheckbox2}
                  checked={this.state.checkboxCheckedSecond}
                >
                  &nbsp;
                </Checkbox>
                I, {leadDeatils.leadName} agree to the consent CreditWise
                Capital for collecting my Aadhaar/
                <br />
                <span style={{ paddingLeft: "6%" }}>
                  Driving licence and storing and using the same for KYC purpose
                </span>
                .
              </p>
            )}

            {(this.props.match.params.journeyType === "co-applicant" ||
              this.props.match.params.journeyType === "guarantor") && (
              <p className="Source-info ">
                <Checkbox
                  onClick={this.onChangeCheckbox2}
                  checked={this.state.checkboxCheckedSecond}
                >
                  &nbsp;
                </Checkbox>
                I,{" "}
                {!isEmpty(this.props.leads.coapplicantGuarantor.data)
                  ? this.props.leads.coapplicantGuarantor.data.leadName
                  : ""}{" "}
                agree to the consent CreditWise Capital for collecting my
                Aadhaar/
                <br />
                <span style={{ paddingLeft: "6%" }}>
                  Driving licence and storing and using the same for KYC purpose
                </span>
                .
              </p>
            )}
            <br />
            {this.props.match.params.journeyType === "applicant" && (
              <p>
                <span className="Source-Type">
                  An OTP has been sent to {str} &nbsp; &
                </span>

                <h2 className="Source-Type" style={{ textAlign: "center" }}>
                  {customerEmail}
                </h2>
              </p>
            )}

            {(this.props.match.params.journeyType === "co-applicant" ||
              this.props.match.params.journeyType === "guarantor") && (
              <p>
                <span className="Source-Type">
                  An OTP has been sent to &nbsp;
                  {!isEmpty(this.props.leads.coapplicantGuarantor.data)
                    ? this.props.leads.coapplicantGuarantor.data.customerMobile
                        .toString()
                        .replaceAt(2, "XXXXXX")
                    : ""}{" "}
                  &nbsp; &
                </span>
                <h2 className="Source-Type" style={{ textAlign: "center" }}>
                  {!isEmpty(this.props.leads.coapplicantGuarantor.data) &&
                    this.props.leads.coapplicantGuarantor.data.customerEmail}
                </h2>
              </p>
            )}
            <br />
            {this.state.showResults ? (
              <span className="Source-info">Enter OTP</span>
            ) : null}
            <OtpInput
              className="OTP-theme"
              value={this.state.otp}
              onChange={this.handleChange}
              numInputs={6}
              separator={<span>-</span>}
            />
            <br />
            <p className="resendOTP" onClick={this.resendOtp}>
              Resend OTP
            </p>
          </div>

          <div className="Source-Type-btn-Theme  mt-4 mb-2">
            <button
              className="cancle-button mr-3"
              onClick={this.redirectToLeadList}
            >
              Cancel
            </button>
            <Button
              className="save-button "
              onClick={this.redirect}
              disabled={disabled}
            >
              Proceed
            </Button>
          </div>
        </div>
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCoapplicantGuarantorByCoapplicantIdService: (payload) => {
      dispatch(getCoapplicantGuarantorByCoapplicantIdService(payload)); //same name as action.js
    },
    createConcent: (payload) => {
      dispatch(createConcent(payload)); //same name as action.js
    },
    createConcentCoapplicantGuarantor: (payload) => {
      dispatch(createConcentCoapplicantGuarantor(payload)); //same name as action.js
    },
    verifyConsent: (payload) => {
      dispatch(verifyConsent(payload));
    },
    verifyConsentCoapplicantGuarantor: (payload) => {
      dispatch(verifyConsentCoapplicantGuarantor(payload));
    },
    resetLeadsData: () => async (dispatch) => {
      dispatch(resetLeads());
    },
  };
}

const mapStateToProps = (state) => {
  return {
    leads: state.leads,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Otpverification));
