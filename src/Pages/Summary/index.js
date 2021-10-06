/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Row, Steps, Tabs } from "antd";
import isEmpty from "lodash/isEmpty";
import map from "lodash/map";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setHeading } from "../../Redux/Action/App";
import { getLeadDetails } from "../../Redux/Services/leads";
import { getLoanSummary, reset } from "../../Redux/Services/LoanSummary";
import "./style.scss";
import SummaryCard from "./qde";
import LeadManagement from "./leadMgmtCard";
import DdeSummaryCard from "./dde";
import { public_url } from "../../Utility/Constant";

const { TabPane } = Tabs;

const Summary = (props) => {
  const {
    setHeading,
    getLoanSummary,
    // Summary,
    // history,
    // id,
    leads,
    getLeadDetails,
  } = props;

  useEffect(() => {
    setHeading("Loan Summary");
  }, [setHeading]);

  const [currentStep, changeStep] = useState(1);

  useEffect(() => {
    if (!isEmpty(leads.leads)) {
      const { error, message, data } = leads.leads;
      let userData = localStorage.getItem("UserData");
      let userDataCopy = JSON.parse(userData);
      // let mainApplicantUniqueId =  props && props.qde && props.qde.getQdeSectionDetails && props.qde.getQdeSectionDetails.data && props.qde.getQdeSectionDetails.data.mainApplicantUniqueId;
      getLoanSummary({
        // applicant_uniqueid: mainApplicantUniqueId,
        applicant_uniqueid: data && data.applicantUniqueId,
        lead_code: data.leadCode,
        roleId: userDataCopy.roleId,
      });
    }
  }, [leads.leads]);

  useEffect(() => {
    getLeadDetails({ id: props.match.params.id });
    return () => {
      props.reset();
    };
  }, [props.match.params.id]);

  const redirect = (journey) => {
    if (leads.leads.data) {
      const { data } = leads.leads;
      props.history.push(`/lead/${journey}/add/${data.id}`);
    }
  };

  const leadRedirection = (stepNo, journey, id) => {
    if (stepNo == 0) {
      props.history.push(`/lead/${journey}/view/${id}`);
    } else {
      changeStep(stepNo);
    }
  };
  const redirectToLoanOffer = (journey, id) => {
    props.history.push(`/${journey}/qde/loanOffer/success/${id}`);
  };

  const redirectToLoanAgreement = (journey, id) => {
    props.history.push(`/${journey}${public_url.loanAgreement}/${id}`);
  };

  const coApplicants = [
    ...map(
      !isEmpty(props.Summary.loansummary)
        ? props.Summary.loansummary.data.coapplicant
        : [],
      (item, index) => {
        return (
          <TabPane
            tab={` Co-Applicant ${index + 1}`}
            key={`coApplicant${index + 1}`}
          >
            <Steps
              labelPlacement={"vertical"}
              size={"small"}
              current={currentStep}
              onChange={(e) =>
                leadRedirection(e, "co-applicant", item.coapplicantUniqueId)
              }
            >
              <Steps.Step
                disabled={
                  item.consentStatus &&
                  item.consentStatus.toLowerCase() !== "consent pending"
                }
                title="Lead Management"
              />
              <Steps.Step
                title="Quick Data Entry"
                disabled={
                  item.consentStatus &&
                  item.consentStatus.toLowerCase() === "consent pending"
                }
              />
              <Steps.Step
                disabled={!item.additionalDetails || !item.panAndGst}
                title="Detailed Data Entry"
              />
              <Steps.Step disabled={!item.loanOffer} title="Loan Offer" />
            </Steps>
            <br />
            <Row>
              {currentStep === 0 && (
                <Col lg={8}>
                  <LeadManagement
                    summaryDetails={item}
                    isCoApplicant={true}
                    history={props.history}
                    match={props.match}
                  />
                </Col>
              )}
              {currentStep === 1 && (
                <Col lg={8}>
                  <SummaryCard
                    summaryDetails={item}
                    isCoApplicant={true}
                    history={props.history}
                    match={props.match}
                  />
                </Col>
              )}
              {currentStep === 2 && (
                <Col lg={8}>
                  <DdeSummaryCard
                    summaryDetails={item}
                    isCoApplicant={true}
                    history={props.history}
                    match={props.match}
                  />
                </Col>
              )}
            </Row>
          </TabPane>
        );
      }
    ),
  ];

  const guarantors = [
    ...map(
      !isEmpty(props.Summary.loansummary)
        ? props.Summary.loansummary.data.gurantor
        : [],
      (item, index) => {
        return (
          <TabPane
            tab={` Guarantor ${index + 1}`}
            key={`Guarantor${index + 1}`}
          >
            <Steps
              labelPlacement={"vertical"}
              size={"small"}
              current={currentStep}
              onChange={(e) =>
                leadRedirection(e, "guarantor", item.coapplicantUniqueId)
              }
            >
              <Steps.Step
                disabled={
                  item.consentStatus &&
                  item.consentStatus.toLowerCase() !== "consent pending"
                }
                title="Lead Management"
              />
              <Steps.Step
                title="Quick Data Entry"
                disabled={
                  item.consentStatus &&
                  item.consentStatus.toLowerCase() === "consent pending"
                }
              />
              <Steps.Step
                disabled={!item.additionalDetails || !item.panAndGst}
                title="Detailed Data Entry"
              />
              <Steps.Step disabled={!item.loanOffer} title="Loan Offer" />
            </Steps>
            <br />
            <Row>
              {currentStep === 0 && (
                <Col lg={8}>
                  <LeadManagement
                    summaryDetails={item}
                    isGuarantor={true}
                    history={props.history}
                    match={props.match}
                  />
                </Col>
              )}
              {currentStep === 1 && (
                <Col lg={8}>
                  <SummaryCard
                    summaryDetails={item}
                    isGuarantor={true}
                    history={props.history}
                    match={props.match}
                  />
                </Col>
              )}
              {currentStep === 2 && (
                <Col lg={8}>
                  <DdeSummaryCard
                    summaryDetails={item}
                    isGuarantor={true}
                    history={props.history}
                    match={props.match}
                  />
                </Col>
              )}
            </Row>
          </TabPane>
        );
      }
    ),
  ];

  const freezeCase =
    props.Summary &&
    props.Summary.loansummary &&
    props.Summary.loansummary.data &&
    props.Summary.loansummary.data.mainapplicant &&
    props.Summary.loansummary.data.mainapplicant.loanAgreementFlag;
  const freezeUser =
    props.Summary &&
    props.Summary.loansummary &&
    props.Summary.loansummary.data &&
    props.Summary.loansummary.data.modelAccess &&
    props.Summary.loansummary.data.modelAccess[0] &&
    props.Summary.loansummary.data.modelAccess[0].read;
  const loagAgree =
    props.Summary.loansummary.data &&
    props.Summary.loansummary.data.mainapplicant &&
    !props.Summary.loansummary.data.mainapplicant.preDisbursalFlag
      ? true
      : false;
  console.log(loagAgree, "loagAgree");
  return (
    <div className={"loanSummaryWrapper"}>
      <Tabs
        type={"card"}
        size="large"
        onChange={(e) => {
          if (e === "mainApplicant") {
            changeStep(1);
          } else {
            let type = props.Summary.loansummary.data.gurantor;
            if (e.toLowerCase().includes("coapp")) {
              type = props.Summary.loansummary.data.coapplicant;
            }
            const index = parseInt(e.substr(e.length - 1)) - 1;
            let steps = 0;
            if (type[index].consentStatus.toLowerCase() !== "consent pending") {
              steps = 1;
            }

            changeStep(steps);
          }
        }}
        tabBarExtraContent={
          <React.Fragment>
            {!isEmpty(props.Summary.loansummary.data) &&
              props.Summary.loansummary.data.mainapplicant &&
              props.Summary.loansummary.data.mainapplicant.saveScheme && (
                <div style={{ margin: "10px 0px" }}>
                  {!(freezeCase || freezeUser) && (
                    <>
                      <Button
                        className="save-button"
                        onClick={(e) => redirect("co-applicant")}
                      >
                        {" "}
                        + Co-Applicant
                      </Button>
                      &nbsp;
                      <Button
                        className="save-button mr-2"
                        onClick={(e) => redirect("guarantor")}
                      >
                        {" "}
                        + Guarantor
                      </Button>
                    </>
                  )}
                </div>
              )}
          </React.Fragment>
        }
      >
        <TabPane tab="Main Applicant" key={"mainApplicant"}>
          <Steps
            labelPlacement={"vertical"}
            size={"small"}
            current={currentStep}
            onChange={(e) => changeStep(e)}
          >
            <Steps.Step title="Lead Management" disabled />
            <Steps.Step title="Quick Data Entry" />
            <Steps.Step
              disabled={
                props.Summary.loansummary.data &&
                props.Summary.loansummary.data.mainapplicant &&
                (!props.Summary.loansummary.data.mainapplicant.panAndGst ||
                  !props.Summary.loansummary.data.mainapplicant
                    .additionalDetails ||
                  !props.Summary.loansummary.data.mainapplicant.reference ||
                  !props.Summary.loansummary.data.mainapplicant.loanDetails ||
                  !props.Summary.loansummary.data.mainapplicant.scheme)
              }
              title="Detailed Data Entry"
            />
            <Steps.Step
              disabled={
                (props.Summary.loansummary.data &&
                  props.Summary.loansummary.data.mainapplicant &&
                  !props.Summary.loansummary.data.mainapplicant.saveScheme &&
                  (!props.Summary.loansummary.data.mainapplicant.itrFlag ||
                    !props.Summary.loansummary.data.mainapplicant
                      .bankDetailsFalg)) ||
                (props.Summary.loansummary.data &&
                  props.Summary.loansummary.data.mainapplicant &&
                  !props.Summary.loansummary.data.mainapplicant.saveScheme) ||
                (props.Summary.loansummary.data &&
                  props.Summary.loansummary.data.ddeMandatory)
              }
              title="Loan Offer"
            />
            {/* <Steps.Step disabled title="Disbursement" /> */}
            <Steps.Step
              disabled={
                props.Summary.loansummary.data &&
                props.Summary.loansummary.data.mainapplicant &&
                props.Summary.loansummary.data.mainapplicant.preDisbursalFlag
                  ? props.Summary.loansummary.data &&
                    props.Summary.loansummary.data.mainapplicant &&
                    !props.Summary.loansummary.data.mainapplicant
                      .preDisbursalFlag
                  : props.Summary.loansummary.data &&
                    props.Summary.loansummary.data.mainapplicant &&
                    props.Summary.loansummary.data.mainapplicant.preSalesFreeze
              }
              title="Agreement"
            />
            {
              <Steps.Step
                disabled={
                  props.Summary.loansummary.data &&
                  props.Summary.loansummary.data.mainapplicant &&
                  !props.Summary.loansummary.data.mainapplicant.preDisbursalFlag
                }
                title="Pre Disbursal Documents"
              />
            }
            {
              <Steps.Step
                disabled={
                  props.Summary.loansummary.data &&
                  props.Summary.loansummary.data.mainapplicant &&
                  !props.Summary.loansummary.data.mainapplicant.preDisbursalFlag
                }
                title="Repayment Mode"
              />
            }
            {
              <Steps.Step
                disabled={
                  props.Summary.loansummary.data &&
                  props.Summary.loansummary.data.mainapplicant &&
                  props.Summary.loansummary.data.mainapplicant.postSalesFreeze
                }
                title="Post Disbursal Documents"
              />
            }
          </Steps>
          <br />
          <Row>
            {currentStep === 0 && (
              <Col lg={8}>
                <LeadManagement
                  summaryDetails={
                    !isEmpty(props.Summary.loansummary)
                      ? props.Summary.loansummary.data.mainapplicant
                      : {}
                  }
                  isMainApplicant={true}
                  history={props.history}
                  match={props.match}
                />
              </Col>
            )}
            {currentStep === 1 && (
              <Col lg={8}>
                <SummaryCard
                  summaryDetails={
                    !isEmpty(props.Summary.loansummary)
                      ? props.Summary.loansummary.data.mainapplicant
                      : {}
                  }
                  isMainApplicant={true}
                  history={props.history}
                  match={props.match}
                />
              </Col>
            )}
            {currentStep === 2 && (
              <Col lg={8}>
                <DdeSummaryCard
                  summaryDetails={
                    !isEmpty(props.Summary.loansummary)
                      ? props.Summary.loansummary.data.mainapplicant
                      : {}
                  }
                  isMainApplicant={true}
                  history={props.history}
                  match={props.match}
                />
              </Col>
            )}
            {currentStep === 3 && (
              <Col lg={8}>
                <Button
                  className="cancle-button"
                  onClick={(e) =>
                    redirectToLoanOffer(
                      "applicant",
                      props.Summary.loansummary.data &&
                        props.Summary.loansummary.data.mainapplicant &&
                        props.Summary.loansummary.data.mainapplicant
                          .applicantUniqueId
                    )
                  }
                >
                  View Loan Offer
                </Button>
              </Col>
            )}
            {currentStep === 4 && (
              <Col lg={8}>
                <Button
                  className="cancle-button"
                  onClick={(e) =>
                    redirectToLoanAgreement(
                      "applicant",
                      props.Summary.loansummary.data &&
                        props.Summary.loansummary.data.mainapplicant &&
                        props.Summary.loansummary.data.mainapplicant
                          .applicantUniqueId
                    )
                  }
                >
                  Agreement
                </Button>
              </Col>
            )}
            {currentStep === 5 && (
              <Col lg={8}>
                <Button
                  className="cancle-button"
                  onClick={(e) => {
                    props.history.push(
                      `${public_url.disbursement}/pre/${
                        props.Summary.loansummary.data &&
                        props.Summary.loansummary.data.mainapplicant &&
                        props.Summary.loansummary.data.mainapplicant
                          .applicantUniqueId
                      }`
                    );
                  }}
                >
                  Pre Disbursal
                </Button>
              </Col>
            )}
            {currentStep === 6 && (
              <Col lg={8}>
                <Button
                  className="cancle-button"
                  onClick={(e) => {
                    props.history.push(
                      `${public_url.repayment}/${
                        props.Summary.loansummary.data &&
                        props.Summary.loansummary.data.mainapplicant &&
                        props.Summary.loansummary.data.mainapplicant
                          .applicantUniqueId
                      }`
                    );
                  }}
                >
                  Repayment
                </Button>
              </Col>
            )}
            {currentStep === 7 && (
              <Col lg={8}>
                <Button
                  className="cancle-button"
                  onClick={(e) => {
                    props.history.push(
                      `${public_url.disbursement}/post/${
                        props.Summary.loansummary.data &&
                        props.Summary.loansummary.data.mainapplicant &&
                        props.Summary.loansummary.data.mainapplicant
                          .applicantUniqueId
                      }`
                    );
                  }}
                >
                  Post Disbursal
                </Button>
              </Col>
            )}
          </Row>
        </TabPane>
        {coApplicants}
        {guarantors}
      </Tabs>
      <br />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    Summary: state.Summary,
    leads: state.leads,
  };
};

const mapDispatchToProps = {
  setHeading,
  getLoanSummary: (payload) => async (dispatch) => {
    dispatch(getLoanSummary(payload));
  },
  getLeadDetails,
  reset,
};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
