import { CheckCircleTwoTone, EditOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import isEmpty from "lodash/isEmpty";
import React from "react";
import { public_url } from "../../Utility/Constant";

export default function ddeSummaryCard({
  summaryDetails,
  isGuarantor,
  isCoApplicant,
  isMainApplicant,
  history,
  match,
}) {
  const handleChange = (data = {}) => {
    const type = summaryDetails.submitCreditFlag ? "view" : "edit";
    const journey = isMainApplicant
      ? "applicant"
      : isCoApplicant
      ? "co-applicant"
      : "guarantor";
    if (data.stepper === -1) {
      history.push(
        `/${journey}${public_url.dde}${public_url.loanOffer}/success/${summaryDetails.applicantUniqueId}`
      );
    } else {
      history.push(
        `/${journey}${public_url.dde}/${type}/${
          isMainApplicant
            ? summaryDetails.applicantUniqueId
            : summaryDetails.coapplicantUniqueId
        }`,
        { ...data }
      );
    }
  };

  const continueCheckFlag = () => {
    let stepper = 0;
    const checkFlag = ["itrFlag", "bankDetailsFalg"];

    var BreakException = {};
    try {
      checkFlag.forEach(function (item, index) {
        if (!summaryDetails[item]) {
          stepper = index;
          throw BreakException;
        }

        if (
          item === "bankDetailsFalg" &&
          summaryDetails[item] &&
          summaryDetails.crifFalg
        ) {
          stepper = -1;
        } else {
          stepper = index;
        }
      });
    } catch (e) {
      if (e !== BreakException) throw e;
    } finally {
      handleChange({ stepper });
    }
  };

  return (
    <Card
      title={<p> CIFID: {summaryDetails && summaryDetails.cif}</p>}
      extra={
        <Button
          type={"text"}
          onClick={(e) => {
            handleChange();
          }}>
          <EditOutlined /> edit{" "}
        </Button>
      }
      className={"loanSummaryCards"}>
      <Row gutter={[30, 10]}>

        <Col lg={24}>
          <Row
            type={"flex"}
            justify="space-between"
            className={`${
              !isEmpty(summaryDetails) && summaryDetails.bankDetailsFalg
                ? "verified"
                : ""
            }`}>
            <h6>Bank Details</h6>
            {!isEmpty(summaryDetails) && summaryDetails.bankDetailsFalg && (
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
              !isEmpty(summaryDetails) && summaryDetails.itrFlag
                ? "verified"
                : ""
            }`}>
            <h6>ITR</h6>
            {!isEmpty(summaryDetails) && summaryDetails.itrFlag && (
              <span>
                <CheckCircleTwoTone twoToneColor="#52c41a" />
              </span>
            )}
          </Row>
        </Col>

        <Col lg={24}>
          <Row type={"flex"} justify="end">
            {!isEmpty(summaryDetails) && summaryDetails.itrFlag && (
              <Button className="save-button" onClick={continueCheckFlag}>
                {" "}
                Continue{" "}
              </Button>
            )}
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
