import { CheckCircleTwoTone, EditOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import isEmpty from "lodash/isEmpty";
import React from "react";
import { public_url } from "../../Utility/Constant";

export default function SummaryCard({
  summaryDetails,
  isGuarantor,
  isCoApplicant,
  isMainApplicant,
  history,
  match,
}) {
  const [continueDisabled,setContinueDisabled] = React.useState(false)
  const [continueDisabledCoappGuar, setContinueDisabledCoappGuar] = React.useState(false);
  const handleChange = (data = {}) => {
    const type = summaryDetails && summaryDetails.submitCreditFlag ? "view" : "edit";
    const journey = isMainApplicant
      ? "applicant"
      : isCoApplicant
      ? "co-applicant"
      : "guarantor";

    const id = isMainApplicant
      ? summaryDetails.applicantUniqueId
      : summaryDetails.coapplicantUniqueId;
    if (data.stepper === -1) {
      history.push(
        `/${journey}${public_url.qde}${public_url.loanOffer}/success/${id}`
      );
    } else {
      history.push(
        `/${journey}${public_url.qde}/${type}/${
          isMainApplicant
            ? summaryDetails.applicantUniqueId
            : summaryDetails.coapplicantUniqueId
        }`,
        { ...data }
      );
    }
  };
  
  const continueCheckFlag = (type) => {
    const journey = isMainApplicant
      ? "applicant"
      : isCoApplicant
      ? "co-applicant"
      : "guarantor";

    let stepper = 0;
    let checkFlag;
    if (journey === "applicant") {
      checkFlag = [
        "panAndGst",
        "additionalDetails",
        "personalDetailsFlag",
        "reference",
        "loanDetails",
        "scheme",
      ];
    }
    if (journey === "co-applicant" || journey === "guarantor") {
      checkFlag = ["panAndGst", "personalDetailsFlag", "additionalDetails"];
    }

    var BreakException = {};
    try {
      checkFlag.forEach(function (item, index) {
        if (!summaryDetails[item]) {
          stepper = index;
          throw BreakException;
        }

        if (
          item === "scheme" &&
          summaryDetails[item] &&
          summaryDetails.saveScheme
        ) {
          stepper = -1;
        } else {
          stepper = index;
        }
      });
    } catch (e) {
      if (e !== BreakException) throw e;
    } finally {
      handleChange({ stepper: type === "edit" ? 0 : stepper, active: stepper });
    }
  };

 

  React.useEffect(() => {
    if (
      summaryDetails &&
      summaryDetails.panAndGst &&
      summaryDetails.additionalDetails &&
      summaryDetails.personalDetailsFlag &&
      summaryDetails.reference &&
      summaryDetails.loanDetails &&
      summaryDetails.scheme 
    ) {
      setContinueDisabled(true);
    }

    if(summaryDetails &&
      summaryDetails.panAndGst &&
      summaryDetails.additionalDetails &&
      summaryDetails.personalDetailsFlag) {
      setContinueDisabledCoappGuar(true)
      }
  }, [summaryDetails]);

  return (
    <Card
      title={<p> CIFID: {summaryDetails && summaryDetails.cif}</p>}
      extra={
        <Button
          type={"text"}
          onClick={(e) => {
            continueCheckFlag("edit");
          }}>
          <EditOutlined />{" "}
          {summaryDetails && summaryDetails.submitCreditFlag ? "view" : "edit"}
        </Button>
      }
      className={"loanSummaryCards"}>
      <Row gutter={[30, 10]}>
        <Col lg={24}>
          <Row
            type={"flex"}
            justify="space-between"
            className={`${
              !isEmpty(summaryDetails) && summaryDetails.panAndGst
                ? "verified"
                : ""
            }`}>
            <h6>PAN & GST Verification</h6>
            {!isEmpty(summaryDetails) && summaryDetails.panAndGst && (
              <span>
                <CheckCircleTwoTone twoToneColor="#52c41a" />
              </span>
            )}
          </Row>
        </Col>

        <Col lg={24}>
          <Row
            type={"flex"}
            justify="space-between"
            className={`${
              !isEmpty(summaryDetails) && summaryDetails.additionalDetails
                ? "verified"
                : ""
            }`}>
            <h6>Additional Details</h6>
            {!isEmpty(summaryDetails) && summaryDetails.additionalDetails && (
              <span>
                <CheckCircleTwoTone twoToneColor="#52c41a" />
              </span>
            )}
          </Row>
        </Col>

        <Col lg={24}>
          <Row
            type={"flex"}
            justify="space-between"
            className={`${
              !isEmpty(summaryDetails) && summaryDetails.personalDetailsFlag
                ? "verified"
                : ""
            }`}>
            <h6>Personal Details</h6>
            {!isEmpty(summaryDetails) && summaryDetails.personalDetailsFlag && (
              <span>
                <CheckCircleTwoTone twoToneColor="#52c41a" />
              </span>
            )}
          </Row>
        </Col>

        {isMainApplicant && (
          <Col lg={24}>
            <Row
              type={"flex"}
              justify="space-between"
              className={`${
                !isEmpty(summaryDetails) && summaryDetails.reference
                  ? "verified"
                  : ""
              }`}>
              <h6>References</h6>
              {!isEmpty(summaryDetails) && summaryDetails.reference && (
                <span>
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                </span>
              )}
            </Row>
          </Col>
        )}

        {/* <Col lg={24}>
          <Row
            type={"flex"}
            justify="space-between"
            className={`${
              !isEmpty(summaryDetails) && summaryDetails.businessDetails
                ? "verified"
                : ""
            }`}
          >
            <h6>Buisness Details</h6>
            {!isEmpty(summaryDetails) && summaryDetails.businessDetails && (
              <span>
                <CheckCircleTwoTone twoToneColor="#52c41a" /> verified
              </span>
            )}
          </Row>
        </Col> */}

        {isMainApplicant && (
          <Col lg={24}>
            <Row
              type={"flex"}
              justify="space-between"
              className={`${
                !isEmpty(summaryDetails) && summaryDetails.loanDetails
                  ? "verified"
                  : ""
              }`}>
              <h6>Loan Details</h6>
              {!isEmpty(summaryDetails) && summaryDetails.loanDetails && (
                <span>
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                </span>
              )}
            </Row>
          </Col>
        )}

        {isMainApplicant && (
          <Col lg={24}>
            <Row
              type={"flex"}
              justify="space-between"
              className={`${
                !isEmpty(summaryDetails) && summaryDetails.scheme
                  ? "verified"
                  : ""
              }`}>
              <h6> Schemes </h6>
              {!isEmpty(summaryDetails) && summaryDetails.scheme && (
                <span>
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                </span>
              )}
            </Row>
          </Col>
        )}

        {isMainApplicant ? (
          <Col lg={24}>
            <Row type={"flex"} justify="end">
              {!isEmpty(summaryDetails) && !continueDisabled && (
                <Button
                  className="save-button"
                  onClick={(e) => {
                    continueCheckFlag("continue");
                  }}>
                  {" "}
                  Continue{" "}
                </Button>
              )}
            </Row>
          </Col>
        ) : (
          <Col lg={24}>
            <Row type={"flex"} justify="end">
              {!isEmpty(summaryDetails) && !continueDisabledCoappGuar && (
                <Button
                  className="save-button"
                  onClick={(e) => {
                    continueCheckFlag("continue");
                  }}>
                  {" "}
                  Continue{" "}
                </Button>
              )}
            </Row>
          </Col>
        )}
      </Row>
    </Card>
  );
}
