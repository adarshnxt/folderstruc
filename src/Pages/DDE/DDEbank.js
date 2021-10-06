import {
  DeleteOutlined,
  PictureOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import TextField from "@material-ui/core/TextField";
import { Button, Col, Form, Row, Table, Upload } from "antd";
import isEmpty from "lodash/isEmpty";
import React, { useEffect, useState } from "react";
import { public_url } from "../../Utility/Constant";
import { connect } from "react-redux";

function DDEbank(props, history) {
  let form;
  const [fileList, setFileList] = useState([]);
  const [showSubmit, setShowSubmit] = useState(false);
  const [id1, setId1] = useState(null);
  const [id2, setId2] = useState(null);
  const [id3, setId3] = useState(null);
  const [disable, setDisable] = useState(false);
  const [disableBankDetailsButton, toggleButtonState] = useState(false);

  const refreshAndFetchBankDetails = (e) => {
    props.refreshAndFetchBankDetails({
      emailId: "a@a.aa",
      applicantUniqueId: "asd",
      leadCode: "asd",
    });
    const emailId = form.getFieldValue("emailId");
    if (!emailId) {
      form.setFields([
        {
          name: ["emailId"],
          errors: ["Email Address is required"],
        },
      ]);
      return;
    }
    toggleButtonState(true);
    const leadCode = props.dde.ddeDetails.leadCode;
    props.refreshAndFetchBankDetails({
      emailId,
      applicantUniqueId: props.match.params.id,
      leadCode,
    });
  };

  const getBankDetails = async (e) => {
    const emailId = form.getFieldValue("emailId");
    if (!emailId) {
      form.setFields([
        {
          name: ["emailId"],
          errors: ["Email Address is required"],
        },
      ]);
      return;
    }

    toggleButtonState(true);
    const leadCode = props.dde.ddeDetails.leadCode;
    props.fetchBankDetails({
      emailId,
      applicantUniqueId: props.match.params.id,
      leadCode,
    });
  };

  function convertDate(d) {
    var parts = d.split(" ");
    var months = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    return parts[5] + "-" + months[parts[1]] + "-" + parts[2];
  }
  let newConvertedDate = convertDate(props.dde.ddeDetails.currentDate);

  const objectDate = new Date(newConvertedDate);
  let year = objectDate.getFullYear();

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let now = new Date();
  // getMonth method returns the month of the date (0-January :: 11-December)
  let previousMonth1 = months[now.getMonth() - 1];

  let previousMonth2 = months[now.getMonth() - 2];

  let previousMonth3 = months[now.getMonth() - 3];

  const onFinish = (values) => {
    try {
      const { emailId, ...fileList } = values;
      const data = {
        docType: "Salary Slip",
        applicantUniqueId: props.match.params.id,
        ismainapplicant: props.match.params.journey === "applicant",
      };

      let fileListArray = [];
      let fileListDataArray = [];

      if (
        fileList.slip1 &&
        fileList.slip1.fileList &&
        fileList.slip1.fileList.length > 0
      ) {
        fileListArray.push(fileList.slip1);

        fileListDataArray.push({
          docName: fileList.slip1.file.name,
          monthName: previousMonth3,
          id: id1,
          ...data,
        });
      }

      if (
        fileList.slip2 &&
        fileList.slip2.fileList &&
        fileList.slip2.fileList.length > 0
      ) {
        fileListArray.push(fileList.slip2);
        fileListDataArray.push({
          docName: fileList.slip2.file.name,
          monthName: previousMonth2,
          id: id2,
          ...data,
        });
      }
      if (
        fileList.slip3 &&
        fileList.slip3.fileList &&
        fileList.slip3.fileList.length > 0
      ) {
        fileListArray.push(fileList.slip3);
        fileListDataArray.push({
          docName: fileList.slip3.file.name,
          monthName: previousMonth1,
          id: id3,
          ...data,
        });
      }

      let payload = {
        fileListArray,
        data: fileListDataArray,
      };
      props.saveBankDetail(payload);

      return;
    } catch (error) {
      console.log("error....", error.message);
    }
  };

  useEffect(() => {
    if (
      props.dde.ddeDetails.bankDetails &&
      props.dde.ddeDetails.bankDetails.salarySlip
    ) {
      form.setFieldsValue({
        slip1:
          props.dde.ddeDetails.bankDetails.salarySlip[0] &&
          props.dde.ddeDetails.bankDetails.salarySlip[0].filePath,
        slip2:
          props.dde.ddeDetails.bankDetails.salarySlip[1] &&
          props.dde.ddeDetails.bankDetails.salarySlip[1].filePath,
        slip3:
          props.dde.ddeDetails.bankDetails.salarySlip[2] &&
          props.dde.ddeDetails.bankDetails.salarySlip[2].filePath,
      });
    }
  }, [form, props.dde.ddeDetails.bankDetails]);

  const columns = [
    {
      title: "Bank Name",
      dataIndex: "bankName",
      key: "bankName",
      align: "center",
    },
    {
      title: "Count of Statements",
      dataIndex: "stmtCount",
      key: "stmtCount",
      align: "center",
    },
    {
      title: "Password",
      key: "password",
      align: "center",
      render: (text, record) => {
        return <TextField />;
      },
    },
    {
      title: "Fetch Statements",
      key: "fetchStatements",
      align: "center",
      render: (text, record) => {
        return <Button className={"cancle-button"}>Fetch</Button>;
      },
    },
    {
      title: "Bank Statements",
      key: "stmtCount",
      align: "center",
      render: (text, record) => {
        return (
          <React.Fragment>
            {record.attachments.map((item) => (
              <Row type={"flex"} justify={"space-between"}>
                <span>{item.name}</span>
                <span>
                  <DeleteOutlined style={{ color: "red" }} />
                </span>
              </Row>
            ))}
          </React.Fragment>
        );
      },
    },
  ];

  //-----default fileList-->

  useEffect(() => {
    let fileList = [];
    props.dde.ddeDetails.bankDetails &&
      props.dde.ddeDetails.bankDetails.salarySlip &&
      props.dde.ddeDetails.bankDetails.salarySlip.map((month) => {
        const path = month.filePath;
        const nameArray = path.split("/");
        const docName = nameArray[nameArray.length - 1];
        if (month.docType === previousMonth3) {
          fileList[0] = {
            file: month,
            name: <span>{docName} </span>,
          };
        } else if (month.docType === previousMonth2) {
          fileList[1] = {
            file: month,
            name: <span>{docName} </span>,
          };
        } else if (month.docType === previousMonth1) {
          fileList[2] = {
            file: month,
            name: <span>{docName} </span>,
          };
        }
      });
    setFileList(fileList);
  }, [
    previousMonth1,
    previousMonth2,
    previousMonth3,
    props.dde.ddeDetails.bankDetails,
  ]);

  // <--- on delete uploaded file------>
  const onRemove = (value) => {
    setShowSubmit(false);
    setDisable(false);

    if (fileList[parseInt(value)]) {
      const nameArray = fileList[value].file.filePath.split("/");
      const docName = nameArray[nameArray.length - 1];
      nameArray.pop();
      const filePath = nameArray.join("/") + "/";

      props.deleteSalarySlips({
        docName,
        filePath,
        applicantUniqueId: props.match.params.id,
        ismainapplicant: props.match.params.journey === "applicant",
        docType: "Salary Slip",
      });
    } else if (props.dde.uploadFileSuccess) {
      const nameArray = props.dde.uploadFileDetails[value].filePath.split("/");
      const docName = nameArray[nameArray.length - 1];
      nameArray.pop();
      const filePath = nameArray.join("/") + "/";
      props.deleteSalarySlips({
        docName,
        filePath,
        applicantUniqueId: props.match.params.id,
        ismainapplicant: props.match.params.journey === "applicant",
        docType: "Salary Slip",
      });
    } else return;
  };

  //----Btn Enable Disble Logic----->

  const disableBtnSubmit =
    props.dde.uploadFileSuccess || (fileList[0] && fileList[1] && fileList[2]);

  React.useEffect(() => {
    if (props.dde.uploadFileSuccess) {
      setShowSubmit(true);
      setDisable(true);
    }
  }, [props.dde.uploadFileSuccess]);


  React.useEffect(() => {
    if (
      !isEmpty(fileList[0]) &&
      !isEmpty(fileList[1]) &&
      !isEmpty(fileList[2])
    ) {
      setShowSubmit(true);
      setDisable(true);
    }
  }, [fileList]);

  const redirectToLoanSummary = () => {
    props.history.push({
      pathname: `${public_url.loanSummary}/${props.dde.ddeDetails.id}`,
    });
  };
  const redirectToLeadList = () => {
    props.history.push({
      pathname: `${public_url.leadLists}/${props.dde.ddeDetails.productId}`,
    });
  };

  const redirectToloanOffer = () => {
    // const { journey, id } = props.match.params;
    // props.history.push(
    //   `/${journey}${public_url.dde}${public_url.loanOffer}/success/${id}`
    // );
    props.changeStep(1)
  };

  useEffect(() => {
    let id11;
    if (
      !isEmpty(
        props.dde &&
          props.dde.ddeDetails &&
          props.dde.ddeDetails.bankDetails &&
          props.dde.ddeDetails.bankDetails.salarySlip
      )
    ) {
      id11 = props.dde.ddeDetails.bankDetails.salarySlip.filter(
        (bank) => bank.docType === previousMonth3
      );
    }
    let id22;
    if (
      !isEmpty(
        props.dde &&
          props.dde.ddeDetails &&
          props.dde.ddeDetails.bankDetails &&
          props.dde.ddeDetails.bankDetails.salarySlip
      )
    ) {
      id22 = props.dde.ddeDetails.bankDetails.salarySlip.filter(
        (bank) => bank.docType === previousMonth2
      );
    }
    let id33;
    if (
      !isEmpty(
        props.dde &&
          props.dde.ddeDetails &&
          props.dde.ddeDetails.bankDetails &&
          props.dde.ddeDetails.bankDetails.salarySlip
      )
    ) {
      id33 = props.dde.ddeDetails.bankDetails.salarySlip.filter(
        (bank) => bank.docType === previousMonth1
      );
    }
    // if (id11.length > 0) {
    let id1 = id11 && id11.length > 0 ? id11[0].id : null;
    setId1(id1);
    // }
    //  if (id22.length > 0) {
    let id2 = id22 && id22.length > 0 ? id22[0].id : null;
    setId2(id2);
    //  }
    //  if (id33.length > 0) {
    let id3 = id33 && id33.length > 0 ? id33[0].id : null;
    setId3(id3);
    //  }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    previousMonth1,
    previousMonth2,
    previousMonth3,
    props.dde.ddeDetails.bankDetails.salarySlip,
  ]);

  const inputProps = {
    readOnly:
      props.freezeCase ||
      props.freezeUser,
    disabled:
      props.freezeCase ||
      props.freezeUser,
  };


  return (
    <div className="bankContainermain">
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
        ref={(e) => (form = e)}>
        <Row gutter={40}>
          <Col lg={8}>
            <Form.Item
              name={"emailId"}
              rules={[
                {
                  type: "email",
                  message: "Invalid Email Address",
                },
              ]}>
              <TextField
                inputProps={inputProps}
                label="Email Address"
                fullWidth
                onInput={(e) => {
                  const matchPattern = e.target.value.match(/[$#%<>&^*',\s]/);
                  e.target.value = !matchPattern
                    ? e.target.value.toString().slice(0, 50)
                    : e.target.value.toString().trim().replace(/ /g, "");
                }}
              />
            </Form.Item>
          </Col>
          {/* <Col lg={2}>
            <div style={{ paddingTop: "30%" }}>
              <SyncOutlined onClick={refreshAndFetchBankDetails} />
            </div>
          </Col> */}
          <Col lg={14}>
            <Row type={"flex"} justify={"end"}>
              {!(props.freezeCase || props.freezeUser) && (
                <Button
                  className="save-button"
                  onClick={getBankDetails}
                  disabled={disableBankDetailsButton}>
                  {" "}
                  Get bank Details
                </Button>
              )}
            </Row>
          </Col>
        </Row>
        {!isEmpty(props.dde.bankDetails.collectR) && (
          <Row className={"pt-5 pb-5"}>
            <Col lg={24}>
              <Table
                size={"small"}
                pagination={false}
                bordered={true}
                columns={columns}
                dataSource={props.dde.bankDetails.collectR.bankDetails}
              />
            </Col>
          </Row>
        )}
        <Row gutter={40}>
          <Col lg={24}>
            <h6 className="ddeCheckLabel mb-2 mt-2">Upload Salary Slip</h6>
          </Col>

          <Col lg={8}>
            <Form.Item name="slip1">
              <Upload
                key={fileList[0]}
                id="slip1"
                accept=".pdf"
                maxCount={1}
                onRemove={() => onRemove("0")}
                disabled={props.freezeCase || props.freezeUser}
                showUploadList={{
                  showRemoveIcon: true,
                  removeIcon: (
                    <DeleteOutlined
                      className={"pt-1"}
                      style={{ color: "red" }}
                    />
                  ),
                }}
                defaultFileList={
                  fileList.length && fileList[0] ? [fileList[0]] : []
                }
                beforeUpload={() => {
                  !isEmpty(fileList[0]) &&
                    !isEmpty(fileList[1]) &&
                    !isEmpty(fileList[2]) &&
                    setDisable(false);
                  setShowSubmit(false);
                  return false;
                }}
                multiple={false}>
                <React.Fragment>
                  <div style={{ display: "flex" }}>
                    <div className="uploadImage">
                      <PictureOutlined />
                    </div>
                    <span className="Upload-Photo">
                      Upload {previousMonth3} {year} Salary Slip
                    </span>
                  </div>
                </React.Fragment>
              </Upload>
            </Form.Item>
          </Col>

          <Col lg={8}>
            <Form.Item name="slip2">
              <Upload
                key={fileList[1]}
                id="slip2"
                accept=".pdf"
                maxCount={1}
                onRemove={() => onRemove("1")}
                disabled={props.freezeCase || props.freezeUser}
                showUploadList={{
                  showRemoveIcon: true,
                  removeIcon: (
                    <DeleteOutlined
                      className={"pt-1"}
                      style={{ color: "red" }}
                    />
                  ),
                }}
                defaultFileList={
                  fileList.length && fileList[1] ? [fileList[1]] : []
                }
                beforeUpload={(file) => {
                  !isEmpty(fileList[0]) &&
                    !isEmpty(fileList[1]) &&
                    !isEmpty(fileList[2]) &&
                    setDisable(false);
                  setShowSubmit(false);
                  return false;
                }}
                multiple={false}>
                <React.Fragment>
                  <div style={{ display: "flex" }}>
                    <div className="uploadImage">
                      <PictureOutlined />
                    </div>
                    <span className="Upload-Photo">
                      Upload {previousMonth2} {year} Salary Slip
                    </span>
                  </div>
                </React.Fragment>
              </Upload>
            </Form.Item>
          </Col>

          <Col lg={8}>
            <Form.Item name="slip3">
              <Upload
                key={fileList[2]}
                id="slip3"
                accept=".pdf"
                maxCount={1}
                onRemove={() => onRemove("2")}
                disabled={props.freezeCase || props.freezeUser}
                showUploadList={{
                  showRemoveIcon: true,
                  removeIcon: (
                    <DeleteOutlined
                      className={"pt-1"}
                      style={{ color: "red" }}
                    />
                  ),
                }}
                defaultFileList={
                  fileList.length && fileList[2] ? [fileList[2]] : []
                }
                beforeUpload={(file) => {
                  !isEmpty(fileList[0]) &&
                    !isEmpty(fileList[1]) &&
                    !isEmpty(fileList[2]) &&
                    setDisable(false);
                  setShowSubmit(false);
                  return false;
                }}
                multiple={false}>
                <React.Fragment>
                  <div style={{ display: "flex" }}>
                    <div className="uploadImage">
                      <PictureOutlined />
                    </div>
                    <span className="Upload-Photo">
                      Upload {previousMonth1} {year} Salary Slip
                    </span>
                  </div>
                </React.Fragment>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <div className="buttons-position  mt-4 mb-0">
          <Button className="cancle-button mr-3" onClick={redirectToLeadList}>
            Cancel
          </Button>
          <Button className="save-button mr-3" onClick={redirectToLoanSummary}>
            Loan Summary
          </Button>
          {!(props.freezeCase || props.freezeUser) && (
            <Button
              className="save-button  mr-3"
              disabled={disable}
              htmlType={"submit"}>
              Save
            </Button>
          )}

          <Button
            className="save-button"
            // disabled={disabled}
            onClick={redirectToloanOffer}>
            Next
          </Button>
        </div>
      </Form>
    </div>
  );
}

const mapDispatchToProps = {
  // resetDDE: () => async (dispatch) => {
  //   dispatch(resetDDE());
  // },
};

const mapStateToProps = (state) => {
  return {
    dde: state.dde,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DDEbank);
