import { Col, Radio, Row } from "antd";
import isEmpty from "lodash/isEmpty";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { public_url } from "../../Utility/Constant";
import { te } from "../../Utility/ReduxToaster";

export default function ViewLead({
  leadDeatils,
  history,
  deleteLeads,
  createConcent,
  createConcentCoapplicantGuarantor,
  deleteCoapplicantGuarantorService,
  coapplicantGuarantorDetails,
  journey,
  leadId,
  setMode,
  mode,
}) {
  const [showDeleteModal, setDeleteFlag] = useState(false);
  // const [mode, setMode] = useState("otp");
  const editRedirect = (e) => {
    let id;
    if (journey === "applicant") {
      id = leadDeatils.id;
    } else {
      id = coapplicantGuarantorDetails.coapplicantUniqueId;
    }
    history.push(`/lead/${journey}/edit/${id}`);
  };

  const applicantRedirection = () => {
    if (journey === "applicant" && mode === "otp") {
      createConcent({ leadCode: leadDeatils.leadCode, consentType: "otp" });
    } else if (journey === "applicant" && mode === "link") {
      let id = leadId;
      createConcent({ leadCode: leadDeatils.leadCode, consentType: "" });
    } else {
      te("Please select mode of verification");
    }
  };

  const otherRedirection = () => {
    if (
      (journey === "co-applicant" || journey === "guarantor") &&
      mode === "otp"
    ) {
      createConcentCoapplicantGuarantor({
        consentType: "otp",
        leadCode: coapplicantGuarantorDetails.leadCode,
        coapplicantUniqueId: coapplicantGuarantorDetails.coapplicantUniqueId,
      });
    } else if (
      (journey === "co-applicant" || journey === "guarantor") &&
      mode === "link"
    ) {
      createConcentCoapplicantGuarantor({
        consentType: "",
        leadCode: coapplicantGuarantorDetails.leadCode,
        coapplicantUniqueId: coapplicantGuarantorDetails.coapplicantUniqueId,
      });
    } else {
      te("Please select mode of verification");
    }
  };

  return (
    <>
      <div className="AddLeadContainer p-3">
        <div className="Source-Type">
          {" "}
          Source Type
          <button
            className="cancle-button"
            style={{ float: "right" }}
            onClick={editRedirect}
          >
            Edit
          </button>
          <button
            className="cancle-button mr-3"
            style={{ float: "right" }}
            onClick={(e) => setDeleteFlag(!showDeleteModal)}
          >
            Delete
          </button>
        </div>
        {journey === "applicant" ? (
          <span className="Source-info">{leadDeatils.sourceType}</span>
        ) : (
          ""
        )}
        {journey === "co-applicant" || journey === "guarantor" ? (
          <span className="Source-info">
            {!isEmpty(coapplicantGuarantorDetails) &&
              coapplicantGuarantorDetails.sourceType}
          </span>
        ) : (
          ""
        )}
        <br /> <br />
        <Row gutter={[30, 15]}>
          {(leadDeatils.sourceType === "Dealer" ||
            leadDeatils.sourceType === "DSA") &&
            journey === "applicant" && (
              <Col lg={8}>
                <div className="Source-info">Dealer Name</div>
                <div>
                  {journey === "applicant" ? leadDeatils.sourceName : ""}
                </div>
              </Col>
            )}
          {(journey === "co-applicant" || journey === "guarantor") &&
            (leadDeatils.sourceType === "Dealer" ||
              leadDeatils.sourceType === "DSA") && (
              <Col lg={8}>
                <div className="Source-info">
                  Dealer Name
                  <div>
                    {journey === "co-applicant" || journey === "guarantor"
                      ? coapplicantGuarantorDetails.sourceName
                      : ""}
                  </div>
                </div>
              </Col>
            )}

          <Col lg={8}>
            <div className="Source-info">Customer Name</div>
            <div>
              {journey === "applicant"
                ? `${leadDeatils.firstName} ${leadDeatils.lastName}`
                : ""}
            </div>
            <div>
              {journey === "co-applicant" || journey === "guarantor"
                ? `${coapplicantGuarantorDetails.firstName} ${coapplicantGuarantorDetails.lastName}`
                : ""}
            </div>
          </Col>
          <Col lg={8}>
            <div className="Source-info">Mobile Number</div>
            <div>
              {journey === "applicant" ? leadDeatils.customerMobile : ""}
            </div>
            <div>
              {journey === "co-applicant" || journey === "guarantor"
                ? coapplicantGuarantorDetails.customerMobile
                : ""}
            </div>
          </Col>
          <Col lg={8}>
            <div className="Source-info">Email</div>
            <div>
              {journey === "applicant" ? leadDeatils.customerEmail : ""}
            </div>
            <div>
              {journey === "co-applicant" || journey === "guarantor"
                ? coapplicantGuarantorDetails.customerEmail
                : ""}
            </div>
          </Col>

          <Col lg={8}>
            <div className="Source-info">Pincode</div>
            <div>
              {journey === "applicant" ? leadDeatils.customerPincode : ""}
            </div>
            <div>
              {journey === "co-applicant" || journey === "guarantor"
                ? coapplicantGuarantorDetails.customerPincode
                : ""}
            </div>
          </Col>
        </Row>
        <br />
        <span className="Source-Type"> Select mode of verification</span>
        <div className="Source-Type-OTP-style">
          <Radio.Group
            style={{ display: "flex", width: "100%" }}
            defaultValue={""}
          >
            <Radio onClick={() => setMode("otp")} value={"otp"}>
              OTP
            </Radio>
            <Radio onClick={() => setMode("link")} value={"link"}>
              Send link to Customer
            </Radio>
          </Radio.Group>
        </div>
        <div className="Source-Type-btn-Theme  mt-4 mb-2">
          <button
            className="cancle-button mr-3"
            onClick={(e) => {
              history.push(`/leadLists/${leadDeatils.productId}`);
            }}
          >
            Cancel
          </button>

          {journey === "applicant" && (
            <button className="save-button" onClick={applicantRedirection}>
              Proceed
            </button>
          )}
          {(journey === "co-applicant" || journey === "guarantor") && (
            <button className="save-button" onClick={otherRedirection}>
              Proceed
            </button>
          )}
        </div>
      </div>

      <Modal show={showDeleteModal} centered>
        <Modal.Header>
          <Modal.Title>Delete Lead</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to delete the lead?</Modal.Body>
        <Modal.Footer>
          <button
            className="cancle-button"
            onClick={(e) => setDeleteFlag(!showDeleteModal)}
          >
            Cancel
          </button>
          {(journey === "co-applicant" || journey === "guarantor") && (
            <button
              onClick={(e) =>
                deleteCoapplicantGuarantorService({
                  coapplicantUniqueId:
                    coapplicantGuarantorDetails.coapplicantUniqueId,
                  lead_code: coapplicantGuarantorDetails.leadCode,
                })
              }
              className="delete-button"
            >
              Delete
            </button>
          )}

          {journey === "applicant" && (
            <button
              onClick={(e) => deleteLeads({ id: leadDeatils.id })}
              className="delete-button"
            >
              Delete
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
