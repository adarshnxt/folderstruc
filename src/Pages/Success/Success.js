import { Button, Col, Modal, Row } from "antd";
import { isEmpty } from "lodash";
import React from "react";
import { connect } from "react-redux";
import { getLoanInfo, submitToCreditModule } from "../../Redux/Services/Qde";
import { te } from "../../Utility/ReduxToaster";
import { QuestionCircleOutlined } from "@ant-design/icons";
import Tooltip from "@material-ui/core/Tooltip";
import "./style.scss";
import { TextField } from "@material-ui/core";
import { getLoanSummary } from "../../Redux/Services/LoanSummary";
import { setHeading } from "../../Redux/Action/App";

class Success extends React.Component {
  state = {
    cif_id: null,
    value: 1,
    name: this.props.location.state ? this.props.location.state.name : "",
    lead_code: this.props.location.state
      ? this.props.location.state.leadCode
      : "",
    c_id: this.props.location.state ? this.props.location.state.c_id : "",
    visible: false,
    visibleBox1: false,
    comment: null,
    disable: true,
  };

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  showModal = () => {
    if (
      !isEmpty(this.props.qde.getLoanData) &&
      this.props.qde.getLoanData.data.qdeflag
    ) {
      this.setState({ visible: true });
    } else {
      te(
        "Please complete the details for Co-Applicant / Guarantor and then submit the loan case."
      );
    }
  };

  showModal1 = () => {
    this.setState({ visibleBox1: true });
  };
  handleOk = () => {
    this.setState({ visible: false });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleOk1 = () => {
    this.setState({ visibleBox1: false });
  };

  handleCancel1 = () => {
    this.setState({ visibleBox1: false });
  };

  componentDidMount() {
    this.props.setHeadingValue("Loan Offer");
    const name = this.props.location.state
      ? this.props.location.state.name
      : "";
    this.setState({ name });
    const lead_code = this.props.location.state
      ? this.props.location.state.leadCode
      : "";
    this.setState({ lead_code });
    const cif = this.props.location.state ? this.props.location.state.cif : "";
    this.setState({ cif_id: cif });
    const c_id = this.props.location.state
      ? this.props.location.state.c_id
      : "";
    this.setState({ c_id });
    let ddeflag = true;
    this.props.getLoanInfo({
      applicant_uniqueid: this.props.match.params.id,
      ddeflag: this.props.match.params.redirection === "dde" && ddeflag,
    });
    let userData = localStorage.getItem("UserData");
    let userDataCopy = JSON.parse(userData);
    // let mainApplicantUniqueId =
    //   this.props &&
    //   this.props.qde &&
    //   this.props.qde.getQdeSectionDetails &&
    //   this.props.qde.getQdeSectionDetails.data &&
    //   this.props.qde.getQdeSectionDetails.data.mainApplicantUniqueId;
    // console.log("mainApplicantUniqueId***", mainApplicantUniqueId);
    this.props.getLoanSummary({
      // applicant_uniqueid: mainApplicantUniqueId,
      applicant_uniqueid: this.props.match.params.id,
      // lead_code: this.props.qde.getQdeSectionDetails.data.leadCode,
      roleId: userDataCopy.roleId,
    });
  }

  redirectDDE = () => {
    const journey = this.props.match.params.journey;
    this.props.history.push(
      `/${journey}/dde/add/${this.props.match.params.id}`
    );
  };

  redirectAgreement = () => {
    const journey = this.props.match.params.journey;
    this.props.history.push(
      `/${journey}/loanAgreement/${this.props.match.params.id}`
    );
  };

  redirectLoanSummary = () => {
    const dbId =
      !isEmpty(this.props.qde.getLoanData) &&
      this.props.qde.getLoanData.data.id;
    this.props.history.push(`/loan-summary/${dbId}`);
  };

  submitToCredit = () => {
    this.props.submitToCreditModule({
      applicant_uniqueid: this.props.match.params.id,
      ismainapplicant: this.props.match.params.journey === "applicant",
      isguarantor: this.props.match.params.journey === "guarantor",
      employeeId: localStorage.getItem("employeeId"),
      comment: this.state.comment,
    });
    this.handleOk();
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.qde.submited !== this.props.qde.submited) {
      if (this.props.qde.submited) {
        const dbId =
          !isEmpty(this.props.qde.getLoanData) &&
          this.props.qde.getLoanData.data.id;
        this.props.history.push(`/loan-summary/${dbId}`);
      }
    }
    if (prevState.comment !== this.state.comment) {
      this.setState({ disable: false });
    }
  }
  render() {
    // "employeeId":"BCM12",
    console.log("this.props--->", this.props.Summary.loansummary);
    const freezeCase =
      this.props.Summary &&
      this.props.Summary.loansummary &&
      this.props.Summary.loansummary.data &&
      this.props.Summary.loansummary.data.mainapplicant &&
      this.props.Summary.loansummary.data.mainapplicant.loanAgreementFlag;

    const freezeUser =
      this.props.Summary &&
      this.props.Summary.loansummary &&
      this.props.Summary.loansummary.data &&
      this.props.Summary.loansummary.data &&
      this.props.Summary.loansummary.data.modelAccess &&
      this.props.Summary.loansummary.data.modelAccess[0] &&
      this.props.Summary.loansummary.data.modelAccess[0].read;

    return (
      <>
        <div className="mainContainerSuccess">
          <p className="QDe-head sorry">
            <br />
            Congrats{" "}
            {!isEmpty(this.props.qde.getLoanData) &&
            this.props.qde.getLoanData.data.name
              ? this.props.qde.getLoanData.data.name
              : "NA"}
          </p>
          {this.props.match.params.redirection === "qde" &&
            this.props.match.params.offerType !== "final" && (
              <p className="QDe-para">
                You have successfully completed and have been verified in the
                Quick Data Entry Stage
              </p>
            )}
          {this.props.match.params.redirection === "dde" &&
            this.props.match.params.offerType !== "final" && (
              <p className="QDe-para">
                You have successfully completed and have been verified in the
                Detailed Data Entry Stage
              </p>
            )}
          {this.props.match.params.journey === "applicant" &&
            this.props.match.params.offerType !== "final" && (
              <p className="QDe-para">
                Your tentative loan offer has been generated. Final offer
                subject to credit decisioning.
              </p>
            )}
          {this.props.match.params.offerType === "final" && (
            <p className="QDe-para">
              Your final loan offer has been generated.
            </p>
          )}
          <br />

          <div className={"Successcontainer"}>
            <Row gutter={30}>
              <Col lg={12}>
                <p className="successTxt">Customer ID </p>
                <p className="paraSuccess">
                  {!isEmpty(this.props.qde.getLoanData) &&
                  this.props.qde.getLoanData.data.customerId
                    ? this.props.qde.getLoanData.data.customerId
                    : "NA"}
                </p>
              </Col>
              <Col lg={12}>
                <p className="successTxt">Application ID </p>
                <p className="paraSuccess">
                  {!isEmpty(this.props.qde.getLoanData) &&
                  this.props.qde.getLoanData.data.id
                    ? this.props.qde.getLoanData.data.id
                    : "NA"}
                </p>
              </Col>

              {this.props.match.params.journey === "applicant" && (
                <Col lg={12}>
                  <p className="successTxt">Loan Amount </p>
                  <p className="successAmount">
                    {!isEmpty(this.props.qde.getLoanData) &&
                    this.props.qde.getLoanData.data.loanAmount
                      ? " ₹ " + this.props.qde.getLoanData.data.loanAmount
                      : "NA"}
                  </p>
                </Col>
              )}

              {this.props.match.params.journey === "applicant" && (
                <Col lg={12}>
                  <p className="successTxt">Duration of Loan </p>
                  <p className="successAmount">
                    {!isEmpty(this.props.qde.getLoanData) &&
                    this.props.qde.getLoanData.data.loanDuration
                      ? this.props.qde.getLoanData.data.loanDuration + " Months"
                      : "NA"}
                  </p>
                </Col>
              )}

              {this.props.match.params.journey === "applicant" && (
                <Col lg={12}>
                  <p className="successTxt">Rate of Interest </p>
                  <p className="successAmount">
                    {!isEmpty(this.props.qde.getLoanData) &&
                    this.props.qde.getLoanData.data.rateOfInterest
                      ? this.props.qde.getLoanData.data.rateOfInterest + "%"
                      : "NA"}
                  </p>
                </Col>
              )}

              {this.props.match.params.journey === "applicant" && (
                <Col lg={12}>
                  <p className="successTxt">EMI Amount </p>
                  <p className="successAmount">
                    {!isEmpty(this.props.qde.getLoanData) &&
                    this.props.qde.getLoanData.data.emiAmount
                      ? " ₹ " +
                        this.props.qde.getLoanData.data.emiAmount.toFixed(2)
                      : "NA"}
                  </p>
                </Col>
              )}
              {/* <Col lg={24}>
                <img src={successImage} />
              </Col> */}
            </Row>
            <div className="buttonSuccessPage">
              {this.props.match.params.journey === "applicant" &&
                this.props.match.params.offerType !== "final" && (
                  <Button
                    className="save-button"
                    onClick={this.redirectLoanSummary}
                  >
                    Add Co-Applicant &nbsp; / &nbsp; Guarantor
                  </Button>
                )}
              &nbsp;
              {this.props.match.params.redirection === "qde" &&
                this.props.match.params.journey !== "applicant" &&
                this.props.match.params.offerType !== "final" && (
                  <Button
                    className="save-button"
                    onClick={this.redirectLoanSummary}
                  >
                    Continue Later
                  </Button>
                )}
              &nbsp;
              {this.props.match.params.redirection === "qde" &&
                this.props.match.params.journey !== "applicant" &&
                this.props.match.params.offerType === "final" && (
                  <Button
                    className="save-button"
                    onClick={this.redirectLoanSummary}
                  >
                    Continue Later
                  </Button>
                )}
              &nbsp;
              {this.props.match.params.offerType === "final" && (
                <Button
                  className="save-button"
                  onClick={this.redirectAgreement}
                >
                  view Agreement
                </Button>
              )}
              &nbsp;
              {this.props.match.params.redirection === "qde" &&
                this.props.match.params.offerType !== "final" && (
                  <Button
                    className="save-button mr-2"
                    onClick={this.redirectDDE}
                  >
                    Proceed to DDE
                  </Button>
                )}
              &nbsp;
              {this.props.match.params.journey === "applicant" &&
                this.props.match.params.offerType !== "final" &&
                !(freezeCase || freezeUser) && (
                  <Button className="save-button" onClick={this.showModal}>
                    Submit to Credit
                  </Button>
                )}
              &nbsp;
              {this.props.match.params.journey !== "applicant" &&
                this.props.match.params.redirection === "dde" && (
                  <Button
                    className="save-button"
                    onClick={this.redirectLoanSummary}
                  >
                    Ok
                  </Button>
                )}
              &nbsp;
              {this.props.match.params.journey === "applicant" &&
                this.props.match.params.offerType !== "final" && (
                  <Tooltip
                    title="Since you have selected Fastrack/ No Income Proof scheme, you can directly check your loan agreement subject to credit decisioning ."
                    aria-label="add"
                    className="toolTip"
                  >
                    <QuestionCircleOutlined
                      style={{ fontSize: "25px", verticalAlign: "middle" }}
                    />
                  </Tooltip>
                )}
            </div>

            <Modal
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={[
                <Button
                  className="save-button"
                  onClick={this.submitToCredit}
                  disabled={this.state.disable}
                >
                  ok
                </Button>,
              ]}
            >
              <br />
              <p className="successTxt">
                Loan case move to Credit module with BRE decision as Approved.{" "}
                <br /> Please check the Final Loan Offer after Credit
                Decisioning.{" "}
              </p>
              <TextField
                fullWidth={true}
                label="comment"
                multiline
                onChange={(e) => this.setState({ comment: e.target.value })}
              />
              <br />
            </Modal>

            <Modal
              visible={this.state.visibleBox1}
              onOk={this.handleOk}
              onCancel={this.handleCancel1}
              footer={[
                <Button className="cancle-button" onClick={this.handleOk1}>
                  No
                </Button>,
                <Button className="save-button" onClick={this.redirectDDE}>
                  Yes
                </Button>,
              ]}
            >
              <br />
              <p className="successTxt">
                Hope you have read the information on the tooltip for quick
                credit decision. <br />
                Do you really want to move ahed with Detailed Data Entry.
              </p>
              <br />
            </Modal>
          </div>

          <br />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    qde: state.qde,
    Summary: state.Summary,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setHeadingValue: (payload) => {
      dispatch(setHeading(payload));
    },
    getLoanInfo: (payload) => {
      dispatch(getLoanInfo(payload));
    },
    submitToCreditModule: (payload) => {
      dispatch(submitToCreditModule(payload));
    },
    getLoanSummary: (payload) => {
      dispatch(getLoanSummary(payload));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Success);
