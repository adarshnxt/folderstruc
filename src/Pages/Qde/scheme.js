/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { Form, Radio, Button } from "antd";
import { connect } from "react-redux";
import { te, ti } from "../../Utility/ReduxToaster";
import { public_url } from "../../Utility/Constant";
import { isEmpty } from "lodash/isEmpty";
import { saveScheme } from "./../../Redux/Services/Qde";
import { createCustomer } from "./../../Redux/Services/Qde";

const scheme = (props) => {
  //setState
  const [disabled, setDisabled] = useState(true);
  let form;

  // onFinish
  const onFinish = (e) => {
    props.saveScheme({
      ...e,
      applicant_uniqueid: props.match.params.id,
      lead_code: props.qde.getQdeSectionDetails.data.leadCode,
      isguarantor: props.match.params.journey === "guarantor",
      ismainapplicant: props.match.params.journey === "applicant",
      // leadCode: props.qde.getQdeSectionDetails.data.leadCode,
    });
  };

  const customerCreation = (e) => {
    props.createCustomer({
      applicant_uniqueid: props.match.params.id,
      isguarantor: props.match.params.journey === "guarantor",
      ismainapplicant: props.match.params.journey === "applicant",
    });
  };
  const customerCreateSuccess = props.qde.customerCreateSuccess;

  useEffect(() => {
    if (props.qde && props.qde.customerCreateSuccess) {
      const { customerCreation, bureauPull, BRE } = props.qde.customerData;
      if (!customerCreation || !bureauPull) {
        ti("Something went wrong. Please Try Again");
        return;
      }
      if (BRE === "" || BRE === "System Rejected") {
        te("Loan case moved to Credit Module with BRE decision as Rejected");
        const { loanId } = props.qde.getQdeSectionDetails.data;
        props.history.push(`/loan-summary/${loanId}`);
        return;
      }
      // Approved / Rejected / Pending Approval
      if (BRE === "System Approved" || BRE === "Manual Underwriting") {
        const { journey, id } = props.match.params;
        if (
          props.qde &&
          props.qde.getQdeSectionDetails &&
          props.qde.getQdeSectionDetails.data.scheme
        ) {
          const { scheme } = props.qde.getQdeSectionDetails.data.scheme;

          if (scheme === "Income Proof") {
            props.history.push(`/${journey}${public_url.dde}/add/${id}`);
            return;
          }
        }
        props.history.push(
          `/${journey}${public_url.qde}${public_url.loanOffer}/success/${id}`
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerCreateSuccess]);

  // input props disabled
  const inputProps = {
    readOnly: props.freezeCase || props.freezeUser,
    disabled: props.freezeCase || props.freezeUser,
  };

  useEffect(() => {
    if (
      props.qde.getQdeSectionDetails &&
      props.qde.getQdeSectionDetails.data &&
      props.qde.getQdeSectionDetails.data.scheme
    ) {
      const { scheme } = props.qde.getQdeSectionDetails.data.scheme;
      form.setFieldsValue({
        scheme,
      });
    }
    if (props.qde.isSchemeSucess) {
      setDisabled(false);
    }
    if (
      props.qde.getQdeSectionDetails &&
      props.qde.getQdeSectionDetails.data &&
      props.qde.getQdeSectionDetails.data.scheme
    ) {
      setDisabled(false);
    }
  }, [props.qde.getQdeSectionDetails, props.qde.isSchemeSucess]);

  return (
    <div className="schemeContainer">
      <p className="Source-Type schemeTxt"> Scheme*</p>
      <Form className="p-2" onFinish={onFinish} ref={(e) => (form = e)}>
        <Form.Item
          name="scheme"
          rules={[
            {
              required: true,
              message: "Please Select an option",
            },
          ]}>
          <Radio.Group readOnly disabled={props.freezeCase || props.freezeUser}>
            <Radio className="radioScheme" value={"Fasttrack"}>
              Fasttrack
            </Radio>
            <Radio className="radioScheme" value={"No Income Proof"}>
              No Income Proof
            </Radio>
            <Radio className="radioScheme" value={"Income Proof"}>
              Income Proof
            </Radio>
          </Radio.Group>
        </Form.Item>
        <div className="Source-Type-btn-Theme  mt-4 mb-2">
          <Button
            className="save-button mr-3"
            onClick={() => {
              props.history.push(
                `${public_url.loanSummary}/${
                  props.qde.getQdeSectionDetails &&
                  props.qde.getQdeSectionDetails.data &&
                  props.qde.getQdeSectionDetails.data.id
                }`
              );
            }}>
            Loan Summary
          </Button>{" "}
          {!(props.freezeCase || props.freezeUser) && (
          <Button className="cancle-button mr-3" htmlType={"submit"}>
            Save
          </Button>
          )}
          {!(props.freezeCase || props.freezeUser) && (
            <Button
              className="save-button"
              onClick={customerCreation}
              disabled={disabled}>
              Submit
            </Button>)}
        </div>
      </Form>
    </div>
  );
};

const mapDispatchToProps = { saveScheme, createCustomer };

const mapStateToProps = (state) => {
  return {
    leads: state.leads,
    qde: state.qde,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(scheme);
