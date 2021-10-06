/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, Row, Form, Button } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import UploadAntd from "../common/Upload";
import "./disbursement.scss";
import {
  getDisbursalDetails,
  uploadDocument,
  saveVehicleDetails,
  deleteDocument,
} from "../../Redux/Services/Disbursal";
import { isEmpty } from "lodash";
import { DeleteOutlined, PictureOutlined } from "@ant-design/icons";
import { getFilePath } from "../../Utility/httpInterceptor";
import pdfIcon from "../../assets/Images/pdfIcon.png";
import TextField from "@material-ui/core/TextField";
import { public_url } from "../../Utility/Constant";
import { setHeading } from "../../Redux/Action/App";
import {
  saveUpdateComment,
  getCommentData,
} from "../../Redux/Services/Repayment";
import { tw } from "../../Utility/ReduxToaster";
import { getQdeDetail } from "../../Redux/Services/Qde";
import { getLoanSummary } from "../../Redux/Services/LoanSummary";
import { Tooltip } from "antd";

function Disbursement(props) {
  const [otherName, setOtherName] = React.useState("");
  let form;
  let form1;
  React.useEffect(() => {
    props.setHeading(`${title}Disbursal Documents`);
  }, [props.setHeading]);

  React.useEffect(() => {
    props.getDisbursalDetails({ applicantUniqueId: props.match.params.id });

    (async () => {
      await setOtherName(
        props.disbursal &&
          props.disbursal.disbursalDetails &&
          props.disbursal.disbursalDetails.otherName
      );
    })();

    if (props.match.params.disbursement === "post") {
      props.getCommentData({
        applicantUniqId: props.match.params.id,
        type: "post",
      });
    }
    let userData = localStorage.getItem("UserData");
    let userDataCopy = JSON.parse(userData);
    // let mainApplicantUniqueId = this.props && this.props.qde && this.props.qde.getQdeSectionDetails && this.props.qde.getQdeSectionDetails.data && this.props.qde.getQdeSectionDetails.data.mainApplicantUniqueId;
    props.getLoanSummary({
      applicant_uniqueid: props.match.params.id,
      // lead_code: "NTWDLR08062021182159",
      roleId: userDataCopy.roleId,
    });
  }, []);

  React.useEffect(() => {
    (() => {
      setOtherName(
        props.disbursal &&
          props.disbursal.disbursalDetails &&
          props.disbursal.disbursalDetails.otherName
      );
    })();

    if (
      props.match.params.disbursement === "post" &&
      props.disbursal &&
      props.disbursal.disbursalDetails
    ) {
      const {
        vehicleEngineNumber,
        vehicleChassisNumber,
        vehicleRegistrationNumber,
      } = props.disbursal.disbursalDetails;
      form.setFieldsValue({
        vehicleEngineNumber,
        vehicleChassisNumber,
        vehicleRegistrationNumber,
      });
    }
  }, [props.disbursal && props.disbursal.disbursalDetails]);

  React.useEffect(() => {
    if (
      props.match.params.disbursement === "post" &&
      props.repayment &&
      props.repayment.disbsComment &&
      props.repayment.disbsComment.data &&
      props.repayment.disbsComment.data.disbursementComments
    ) {
      const { disbursementComments } = props.repayment.disbsComment.data;
      form1.setFieldsValue({
        disbursementComments,
      });
    }
  }, [props.repayment]);

  React.useEffect(() => {
    if (otherName === undefined) {
      setOtherName("");
    }
  }, [otherName]);
  const title =
    props.match.params.disbursement.charAt(0).toUpperCase() +
    props.match.params.disbursement.slice(1);

  const { disbursalDetails } = props.disbursal;

  const saveButton = () => {
    if (props.match.params.disbursement === "pre") {
      props.history.push(`${public_url.repayment}/${props.match.params.id}`);
    }
  };

  const handleSubmit = (e) => {
    props.saveVehicleDetails({
      applicantUniqueId: props.match.params.id,
      disbursementType: props.match.params.disbursement,
      ...e,
    });
  };

  const submitToDisbs = (e) => {
    const data = props.disbursal && props.disbursal.disbursalDetails;

    if (
      data &&
      props.disbursal.disbursalDetails.downPayment &&
      props.disbursal.disbursalDetails.downPayment.fileName &&
      props.disbursal.disbursalDetails.performaInvoice &&
      props.disbursal.disbursalDetails.performaInvoice.fileName &&
      props.disbursal.disbursalDetails.insuranceCopy &&
      props.disbursal.disbursalDetails.insuranceCopy.fileName
    ) {
      if (
        props.disbursal.disbursalDetails.vehicleRegistrationNumber &&
        props.disbursal.disbursalDetails.vehicleEngineNumber &&
        props.disbursal.disbursalDetails.vehicleChassisNumber
      ) {
        props.saveUpdateComment({
          applicantUniqId: props.match.params.id,
          ...e,
          employeeId: localStorage.getItem("employeeId"),
          type: "post",
        });
      } else {
        tw("Please enter vehicle details");
      }
    } else {
      tw("Please upload required documents");
    }
  };

  const formater = (data, multiple, docType) => {
    const uploadPayload = {
      data: {
        data: [
          {
            docType: docType,
          },
        ],
        disbursementType: props.match.params.disbursement,
        applicantUniqueId: props.match.params.id,
        otherName: otherName,
      },
    };
    if (isEmpty(data)) {
      return (
        <UploadAntd
          multiple={multiple}
          uploadPayload={uploadPayload}
          uploadDocument={props.uploadDocument}
          salesFreeze={salesFreeze}
        />
      );
    }
    const payloadData = Array.isArray(data) ? data : [data];

    return payloadData.map((item) => {
      const deletePayload = {
        applicantUniqueId: props.match.params.id,
        disbursementType: props.match.params.disbursement,
        docType: docType,
        docName: item.fileName,
      };

      if (item.fileName.slice(-5).split(".")[1] === "pdf") {
        return (
          <span>
            {" "}
            <img src={pdfIcon} width="50px" height="50px" />{" "}
            <a href={getFilePath(item.filePath)} target="_blank">
              {item.fileName}
            </a>{" "}
            <span
              onClick={() => {
                props.deleteDocument(deletePayload);
              }}>
              {!salesFreeze && (
                <DeleteOutlined
                  style={{
                    color: "red",
                    paddingBottom: "10px",
                    marginLeft: "10px",
                  }}
                />

              )}
            </span>
          </span>
        );
      } else {
        return (
          <div className={"uploadedImageWrapper"}>
          {!salesFreeze && (
            <span
              onClick={() => {
                props.deleteDocument(deletePayload);
              }}>
              X
            </span>
          )}
            <img alt={item.fileName} src={getFilePath(item.filePath)} />
          </div>
        );
      }
    });
  };

  const freezeUser =
    props.Summary &&
    props.Summary.loansummary.data &&
    props.Summary.loansummary.data.modelAccess[0] &&
    props.Summary.loansummary.data.modelAccess[0].read;

  const preSalesFreeze =
    (props.Summary &&
      props.Summary.loansummary &&
      props.Summary.loansummary.data &&
      props.Summary &&
      props.Summary.loansummary &&
      props.Summary.loansummary.data.mainapplicant &&
      props.Summary.loansummary.data.mainapplicant.preSalesFreeze) ||
    freezeUser;
  const postSalesFreeze =
    (props.Summary &&
      props.Summary.loansummary &&
      props.Summary.loansummary.data &&
      props.Summary &&
      props.Summary.loansummary &&
      props.Summary.loansummary.data.mainapplicant &&
      props.Summary.loansummary.data.mainapplicant.postSalesFreeze) ||
    freezeUser;


  const salesFreeze = props.match.params.disbursement === "pre"
      ? preSalesFreeze
      : postSalesFreeze;

      const inputProps = {
        readOnly: salesFreeze,
        disabled: salesFreeze
      };

  return (
    <Card title={`${title}Disbursal Documents`} className="disbs">
      <Row>
        {props.match.params.disbursement === "pre" && (
          <>
            <Col lg={12}>
              <Header
                title={"Upload Security PDC 1"}
                header={"Security PDCs"}
              />
              <br />
              {formater(disbursalDetails.pdc1, false, "pdc1")}
            </Col>

            <Col lg={12}>
              <Header title={"Upload Security PDC 2"} header={""} />
              <br />
              {formater(disbursalDetails.pdc2, false, "pdc2")}
            </Col>

            <Col lg={12}>
              <Header title={"Upload Security PDC 3"} header={""} />
              <br />
              {formater(disbursalDetails.pdc3, false, "pdc3")}
            </Col>

            <Col lg={12}>
              <Header title={"Upload Security PDC 4"} header={""} />
              <br />
              {formater(disbursalDetails.pdc4, false, "pdc4")}
            </Col>
          </>
        )}

        <Col lg={24}>
          <br />
          <Header
            title={"Upload Down Payment Receipt"}
            header={"Down Payment Receipt"}
          />
          <br />
          {formater(disbursalDetails.downPayment, false, "downPayment")}
        </Col>
        <Col lg={24}>
          <br />
          <Header
            title={"Upload Proforma Invoice"}
            header={"Proforma Invoice"}
          />
          <br />
          {formater(disbursalDetails.performaInvoice, false, "performaInvoice")}
        </Col>
        <Col lg={24}>
          <br />
          <Header title={"Upload Insurance Copy"} header={"Insurance Copy"} />
          <br />
          {formater(disbursalDetails.insuranceCopy, false, "insuranceCopy")}
        </Col>

        {props.match.params.disbursement === "pre" && (
          <>
            <Col lg={24}>
              <br />
              <Header title={"Upload KLI Form"} header={"KLI Form"} />
              <br />
              {formater(disbursalDetails.kliForm, true, "kliForm")}
            </Col>
            <Col lg={8}>
              <br />
              <div className="QDe-para-normal">Other Document</div>
              <br />
              <TextField
                value={otherName}
                InputProps={{
                  readOnly:
                    salesFreeze ||
                    (props.disbursal &&
                      props.disbursal.disbursalDetails &&
                      props.disbursal.disbursalDetails.otherName)
                      ? true
                      : false,
                }}
                onChange={(e) => {
                  setOtherName(e.target.value);
                }}
                style={{ width: "80%" }}
                label="Document Name"
                onInput={(e) => {
                  e.target.value = e.target.value
                    .toString()
                    .match(/^[a-zA-Z ]*$/)
                    ? e.target.value.toString().slice(0, 50)
                    : e.target.value
                        .toString()
                        .slice(0, e.target.value.length - 1);
                }}
                className="textField"
              />
              <Tooltip
                placement="bottom"
                title={
                  "Document name cannot be modified until the document is deleted."
                }>
                <Button style={{ borderRadius: "50px" }}>?</Button>
              </Tooltip>
            </Col>
            <Col lg={4}></Col>
            <Col lg={12}>
              <br />
              <Header title={"Upload Document"} header={""} />
              <br />
              {formater(disbursalDetails.other, true, "other")}
            </Col>
          </>
        )}

        {props.match.params.disbursement === "post" && (
          <>
            <Col lg={12}>
              <br />
              <Header title={"Upload RC Book"} header={"Vehicle Details"} />
              <br />
              {formater(disbursalDetails.rcBook, false, "rcBook")}
            </Col>

            <Col lg={12}>
              <br />
              <Header title={"Upload RTO Tax Receipt"} header={""} />
              <br />
              {formater(disbursalDetails.rtoTaxReceipt, false, "rtoTaxReceipt")}
            </Col>
          </>
        )}
      </Row>
      <br />
      {props.match.params.disbursement === "post" && (
        <Form
          name="basic"
          onFinish={handleSubmit}
          initialValues={{
            remember: true,
          }}
          ref={(e) => (form = e)}>
          <Row gutter={[30, 30]}>
            <Col lg={8}>
              <br />
              <div className="QDe-para-normal">Vehicle Registration Number</div>
              <Form.Item
                name="vehicleRegistrationNumber"
                rules={[
                  {
                    required: true,
                    message: "Vehicle Registration Number is mandatory",
                  },
                  {
                    min: 10,
                    message: "Length must have atleast 10 characters",
                  },
                ]}>
                <TextField
                  inputProps={inputProps}
                  fullWidth={true}
                  label="Vehicle Registration Number"
                  className="textField"
                  key={Math.random()}
                />
              </Form.Item>
            </Col>

            <Col lg={8}>
              <br />
              <div className="QDe-para-normal">Vehicle Chassis Number</div>
              <Form.Item
                name="vehicleChassisNumber"
                rules={[
                  {
                    required: true,
                    message: "Vehicle Chassis Number is mandatory",
                  },
                ]}>
                <TextField
                  inputProps={inputProps}
                  fullWidth={true}
                  label="Vehicle Chassis Number"
                  className="textField"
                  key={Math.random()}
                />
              </Form.Item>
            </Col>

            <Col lg={8}>
              <br />
              <div className="QDe-para-normal">Vehicle Engine Number</div>
              <Form.Item
                name="vehicleEngineNumber"
                rules={[
                  {
                    required: true,
                    message: "Vehicle Engine Number is mandatory",
                  },
                ]}>
                <TextField
                  inputProps={inputProps}
                  fullWidth={true}
                  label="Vehicle Engine Number"
                  className="textField"
                  key={Math.random()}
                />
              </Form.Item>
            </Col>
          </Row>
          <Button
            className="cancle-button mt-10 mr-10"
            onClick={(e) => {
              props.history.push(
                `${public_url.loanSummary}/${
                  props.disbursal &&
                  props.disbursal.disbursalDetails &&
                  props.disbursal.disbursalDetails.leadId
                }`
              );
            }}>
            Loan Summary
          </Button>{" "}
          &nbsp;
          {!salesFreeze && (
            <Button htmlType={"submit"} className="save-button">
              Save
            </Button>
          )}
        </Form>
      )}
      <br />

      {props.match.params.disbursement === "post" && (
        <Form
          name="basic"
          onFinish={submitToDisbs}
          initialValues={{
            remember: true,
          }}
          ref={(e) => (form1 = e)}>
          {" "}
          <br />
          <div className="QDe-para-normal">Submit to Disbursment</div>
          <Row justify="center">
            <Col lg={24}>
              <Form.Item
                name={"disbursementComments"}
                rules={[
                  {
                    required: true,
                    message: "Comment is mandatory",
                  },
                ]}>
                <TextField
                inputProps={inputProps}
                  label="Comment*"
                  fullWidth
                  multiline
                  rowsMax={4}
                  key={Math.random()}
                />
              </Form.Item>
            </Col>
            <Button disabled={salesFreeze} className="save-button" htmlType="submit">
              Submit
            </Button>
          </Row>{" "}
        </Form>
      )}

      {props.match.params.disbursement === "pre" && (
        <Row justify={"center"}>
          <Button
            className="cancle-button mt-10 mr-10"
            onClick={(e) => {
              props.history.push(
                `${public_url.loanSummary}/${
                  props.disbursal &&
                  props.disbursal.disbursalDetails &&
                  props.disbursal.disbursalDetails.leadId
                }`
              );
            }}>
            Loan Summary
          </Button>{" "}
          &nbsp;
          <Button className="save-button" onClick={saveButton}>
            {props.match.params.disbursement === "pre" ? "Next" : "Save"}
          </Button>
        </Row>
      )}
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    disbursal: state.disbursal,
    repayment: state.repayment,
    Summary: state.Summary,
    qde: state.qde,
  };
};

const mapDispatchToProps = {
  getDisbursalDetails,
  uploadDocument,
  saveVehicleDetails,
  deleteDocument,
  setHeading,
  saveUpdateComment,
  getCommentData,
  getLoanSummary,
};

export default connect(mapStateToProps, mapDispatchToProps)(Disbursement);

function Header(props) {
  return (
    <>
      <div className="QDe-para-normal">{props.header}</div>
      <div className="uploadWrapper">
        <div className="uploadImage">
          <PictureOutlined />
        </div>
        <span className="Upload-Photo titleCenterAlign">{props.title}</span>
      </div>
    </>
  );
}
