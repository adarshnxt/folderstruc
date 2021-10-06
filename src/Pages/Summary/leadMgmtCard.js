import { Button, Card, Col, Row } from "antd";
import isEmpty from "lodash/isEmpty";
import React from "react";
import { public_url } from "../../Utility/Constant";

export default function LeadManagement(props) {
  const handleRedirection = () => {
    const journey = props.isMainApplicant
      ? "applicant"
      : props.isCoApplicant
      ? "co-applicant"
      : "guarantor";
    const id = props.isMainApplicant
      ? props.summaryDetails.applicantUniqueId
      : props.summaryDetails.coapplicantUniqueId;
    props.history.push(`/lead/${journey}/view/${id}`);
  };

  return (
    <Card
      extra={
        <Button
          type={"text"}
          onClick={(e) => {
            // handleChange();
          }}
        ></Button>
      }
      className={"loanSummaryCards"}
    >
      <Row gutter={[30, 10]}>
        <Col lg={24}>
          <Row type={"flex"} justify="space-between">
            <Button
              className="cancle-button"
              onClick={(e) => {
                handleRedirection();
              }}
            >
              Consent Pending
            </Button>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
