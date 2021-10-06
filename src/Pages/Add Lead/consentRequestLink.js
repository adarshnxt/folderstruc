import React from "react";
import "./style.css";
import { public_url } from "../../Utility/Constant";
import SentLinkImg from "../../assets/Images/verified.svg";
import {
  getLeadDetails,
  getCoapplicantGuarantorByCoapplicantIdService,
} from "../../Redux/Services/leads";
import { connect } from "react-redux";
import { te, tw } from "../../Utility/ReduxToaster";

class ConsentLink extends React.Component {
  state = {
    otp: "",
    showResults: true,
  };

  handleChange = (otp) => {
    this.setState({ showResults: false });
    this.setState({ otp });
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    if (this.props.match.params.journey === "applicant") {
      this.props.getLeadDetails({ id });
    }
    if (
      this.props.match.params.journey === "co-applicant" ||
      this.props.match.params.journey === "guarantor"
    ) {
      this.props.getCoapplicantGuarantorByCoapplicantIdService({
        coapplicantUniqueId: id,
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.journey === "applicant") {
      if (
        this.props.leads &&
        this.props.leads.leads &&
        this.props.leads.leads.data &&
        // prevProps.leads.leads.data.consentStatus === "Consent Pending" &&
        this.props.leads.leads.data.consentStatus !== "Consent Pending"
      ) {
        const { id, journey } = this.props.match.params;
        this.props.history.push(
          `/${journey}/qde/add/${this.props.leads.leads.data.applicantUniqueId}`
        );
      }
    } else if (
      this.props.match.params.journey === "co-applicant" ||
      this.props.match.params.journey === "guarantor"
    ) {
      if (
        this.props.leads &&
        this.props.leads.coapplicantGuarantor &&
        this.props.leads.coapplicantGuarantor.data &&
        // prevProps.leads.leads.data.consentStatus === "Consent Pending" &&
        this.props.leads.coapplicantGuarantor.data.consentStatus !==
          "Consent Pending"
      ) {
        const { id, journey } = this.props.match.params;
        this.props.history.push(
          `/${journey}/qde/add/${this.props.leads.coapplicantGuarantor.data.coapplicantUniqueId}`
        );
      }
    }
  }

  
  redirectToQde = () => {
    // consentStatus: "Consent Pending";

    const id = this.props.match.params.id;
    if (this.props.match.params.journey === "applicant") {
      this.props.getLeadDetails({ id });
    }
    if (
      this.props.match.params.journey === "co-applicant" ||
      this.props.match.params.journey === "guarantor"
    ) {
      this.props.getCoapplicantGuarantorByCoapplicantIdService({
        coapplicantUniqueId: id,
      });
    }
      if (
        this.props.leads &&
        this.props.leads.leads &&
        this.props.leads.leads.data &&
        // prevProps.leads.leads.data.consentStatus === "Consent Pending" &&
        this.props.leads.leads.data.consentStatus.toLowerCase() ===
          "consent pending"
      ) {
        // te("Consent not verified.");
      }
  };

  redirectToLeadList = () => {
    if (this.props.match.params.journey === "applicant") {
      this.props.history.push(
        `/lead/applicant/view/${
          this.props.leads.leads &&
          this.props.leads.leads.data &&
          this.props.leads.leads.data.id
        }`
      );
    }
    if (
      this.props.match.params.journey === "co-applicant" ||
      this.props.match.params.journey === "guarantor"
    ) {
      this.props.history.push(
        `/lead/${this.props.match.params.journey}/view/${
          this.props.leads.coapplicantGuarantor &&
          this.props.leads.coapplicantGuarantor.data &&
          this.props.leads.coapplicantGuarantor.data.coapplicantUniqueId
        }`
      );
    }
  };
  render() {
    const data =
      this.props.leads && this.props.leads.leads && this.props.leads.leads.data;
    const coApplicantData =
      this.props.leads &&
      this.props.leads.coapplicantGuarantor &&
      this.props.leads.coapplicantGuarantor.data;

    return (
      <>
        <div className="SentLinkContainer p-3">
          <div className="Source-Type-information-container">
            <br />
            <img src={SentLinkImg} className="SentImage" /> <br />
            <div className="consent-info">
              Consent request link has been sent on your
            </div>
            <div className="consent-info"> email address and mobile number</div>
            <br />
          </div>
          <div className="border-top" style={{ margin: "0% 10%" }}>
            <br />
            <div className="row align-items-center ">
              <div className="col-4">
                <div className="sent-info">Customer Name</div>
                <div>
                  <p className="sent-data">
                    {this.props.match.params.journey === "applicant"
                      ? data && data.firstName + " " + data.lastName
                      : coApplicantData &&
                        coApplicantData.firstName +
                          " " +
                          coApplicantData.lastName}
                  </p>
                </div>
              </div>
              <div className="col-4">
                <div className="sent-info">Mobile Number</div>
                <div>
                  <p className="sent-data">
                    {this.props.match.params.journey === "applicant"
                      ? data && data.customerMobile
                      : coApplicantData && coApplicantData.customerMobile}
                  </p>
                </div>
              </div>
              <div className="col-4">
                <div className="sent-info">Email Address</div>
                <div>
                  <p className="sent-data">
                    {this.props.match.params.journey === "applicant"
                      ? data && data.customerEmail
                      : coApplicantData && coApplicantData.customerEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="Source-Type-btn-Theme  mt-4 mb-2">
            <button
              className="save-button mr-2"
              onClick={this.redirectToLeadList}>
              Cancel
            </button>
            <button className="save-button" onClick={this.redirectToQde}>
              Verify
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { leads: state.leads };
};

const mapDispatchToProps = {
  getLeadDetails,
  getCoapplicantGuarantorByCoapplicantIdService,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsentLink);

// export default ConsentLink;
