import TextField from "@material-ui/core/TextField";
import React, { Component } from "react";
import { Button, Col, Form, Row } from "antd";
import SelectIcon from "../../assets/Images/select.svg";
import "./style.scss";
import {
  saveUpdatePersonalDetails,
  getQualificationList,
  getRelationWithMainApplicantList,
  getRelationWithNomineeList,
  getMaritalStatusList,
  getBankAccountTypeList,
  uploadSelfie,
  deleteUploadedSelfie,
  createCustomer,
  getQdeDetail,
} from "../../Redux/Services/Qde";
import { connect } from "react-redux";
import { map } from "lodash";
import { public_url } from "../../Utility/Constant";
import { te, ti } from "../../Utility/ReduxToaster";
import { BASE_URL } from "../../Utility/Config";
import { CameraFeed } from "./CameraFeed";
import { CameraOutlined } from "@ant-design/icons";
import isEmpty from "lodash/isEmpty";
import { getIfscDetails } from "../../Utility/Services/PersonalDetails";
import NumberFormat from "react-number-format";

class PersonalDetails extends Component {
  state = {
    qualificationList: [],
    file: null,
    showUploadImage: false,
    getAadhar: "",
    showSpouse: false,
    father: "",
    branch: null,
    bankName: null,
    disableBankName: false,
    disableBtnNxt: true,
  };

  //-------------------------------componentLifeCycle Start---------------------------
  async componentDidMount() {
    // this.getData();
    this.setState({
      qualificationList: await getQualificationList(),
      relationWithMainApplicantList: await getRelationWithMainApplicantList(),
      relationWithNomineeList: await getRelationWithNomineeList(),
      maritalStatusList: await getMaritalStatusList(),
      bankAccountList: await getBankAccountTypeList(),
    });

    if (
      this.props.qde &&
      this.props.qde.getQdeSectionDetails &&
      this.props.qde.getQdeSectionDetails.data &&
      this.props.qde.getQdeSectionDetails.data.personalDetails
    ) {
      this.setState({
        branch: this.props.qde.getQdeSectionDetails.data.personalDetails.branch,
      });
      this.form &&
        this.form.setFieldsValue({
          fatherName:
            this.props.qde.getQdeSectionDetails.data.personalDetails.fatherName,
          motherName:
            this.props.qde.getQdeSectionDetails.data.personalDetails.motherName,
          maritalStatus:
            this.props.qde.getQdeSectionDetails.data.personalDetails
              .maritalStatus,
          spouseName:
            this.props.qde.getQdeSectionDetails.data.personalDetails.spouseName,
          relationWithMainApplicant:
            this.props.qde.getQdeSectionDetails.data.personalDetails
              .relationWithMainApplicant,
          qualification:
            this.props.qde.getQdeSectionDetails.data.personalDetails
              .qualification,
          aadhaarNumber:
            this.props.qde.getQdeSectionDetails.data.personalDetails
              .aadhaarNumber,
          annualGrossIncome:
            this.props.qde.getQdeSectionDetails.data.personalDetails
              .annualGrossIncome,
          netMonthlyIncome:
            this.props.qde.getQdeSectionDetails.data.personalDetails
              .netMonthlyIncome,
          netMonthlyObligations:
            this.props.qde.getQdeSectionDetails.data.personalDetails
              .netMonthlyObligations,
          accountType:
            this.props.qde.getQdeSectionDetails.data.personalDetails
              .accountType,
          accountNumber:
            this.props.qde.getQdeSectionDetails.data.personalDetails
              .accountNumber,
          ifscNumber:
            this.props.qde.getQdeSectionDetails.data.personalDetails.ifscNumber,
          bankName:
            this.props.qde.getQdeSectionDetails.data.personalDetails.bankName,
        });

      if (
        this.props.qde &&
        this.props.qde.getQdeSectionDetails &&
        this.props.qde.getQdeSectionDetails.data.personalDetails &&
        this.props.qde.getQdeSectionDetails.data.personalDetails.bankName
      ) {
        this.setState({ disableBtnNxt: false });
      }

      if (
        this.props.qde &&
        this.props.qde.getQdeSectionDetails &&
        this.props.qde.getQdeSectionDetails.data.personalDetails &&
        this.props.qde.getQdeSectionDetails.data.personalDetails
          .maritalStatus &&
        this.props.qde.getQdeSectionDetails.data.personalDetails.maritalStatus.toLowerCase() ===
          "married"
      ) {
        this.setState({ showSpouse: true });
      } else {
        this.setState({ showSpouse: false });
      }
      this.setState({
        father:
          this.props.qde.getQdeSectionDetails.data.personalDetails.fatherName,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.qde.customerCreateSuccess !==
      this.props.qde.customerCreateSuccess
    ) {
      if (this.props.qde.customerCreateSuccess) {
        const { customerCreation, bureauPull, BRE } =
          this.props.qde.customerData;
        if (!customerCreation || !bureauPull) {
          ti("Something went wrong. Please try again");
          return;
        }
        if (BRE === "" || BRE === "System Rejected") {
          te("Loan case moved to Credit Module with BRE decision as Rejected");
          const { loanId } = this.props.qde.getQdeSectionDetails.data;
          this.props.history.push(`/loan-summary/${loanId}`);
          return;
        }
        // Approved / Rejected / Pending Approval
        if (BRE === "System Approved" || BRE === "Manual Underwriting") {
          const { journey, id } = this.props.match.params;
          if (this.props.qde.getQdeSectionDetails.data.scheme) {
            const { scheme } = this.props.qde.getQdeSectionDetails.data.scheme;
            if (scheme === "Income Proof") {
              this.props.history.push(`/${journey}${public_url.dde}/add/${id}`);
              return;
            }
          }
          this.props.history.push(
            `/${journey}${public_url.qde}${public_url.loanOffer}/success/${id}`
          );
        }
      }
    }

    if (
      this.props.qde.getQdeSectionDetails.data &&
      this.props.qde.getQdeSectionDetails.data.personalDetails &&
      this.props.qde.getQdeSectionDetails.data.personalDetails.filePath
    ) {
      let originalDoc =
        this.props.qde.getQdeSectionDetails.data &&
        this.props.qde.getQdeSectionDetails.data.personalDetails &&
        this.props.qde.getQdeSectionDetails.data.personalDetails.filePath;
      let NewFilePath =
        originalDoc && originalDoc.replace("/var/www/html", BASE_URL);
      if (!this.state.file) {
        this.setState({
          showUploadImage: true,
          file: originalDoc ? NewFilePath : null,
        });
      }
    }
    if (
      this.props.qde.getQdeSectionDetails.data !==
      prevProps.qde.getQdeSectionDetails.data
    )
      this.enableNxtBtn();
  }
  //-------------------------------componentLifeCycle End---------------------------

  //-------------------------------FormItemFunctions Start-------------------------
  redirectToLeadList = () => {
    this.props.history.push(
      `${public_url.leadLists}/${this.props.qde.getQdeSectionDetails.data.productId}`
    );
  };

  submitForm = (e) => {
    const id =
      this.props.qde.getQdeSectionDetails.data &&
      this.props.qde.getQdeSectionDetails.data.personalDetails
        ? this.props.qde.getQdeSectionDetails.data.personalDetails.id
        : null;
    this.props.saveUpdatePersonalDetails({
      ...e,
      filePath:
        this.props.qde &&
        this.props.qde.uploadSelfie &&
        this.props.qde.uploadSelfie.filePath,
      applicantUniqueId: this.props.match.params.id,
      annualGrossIncome: parseFloat(e.annualGrossIncome),
      netMonthlyIncome: parseFloat(e.netMonthlyIncome),
      netMonthlyObligations: parseFloat(e.netMonthlyObligations),
      branch: this.state.branch,
      id,
    });
  };

  handleSubmit = () => {
    if (this.props.match.params.journey === "applicant") {
      this.props.changeStep(3);
    } else {
      this.props.createCustomer({
        applicant_uniqueid: this.props.match.params.id,
        isguarantor: this.props.match.params.journey === "guarantor",
        ismainapplicant: this.props.match.params.journey === "applicant",
      });
    }
  };
  //----------------------------FormItemFunctions End-------------------------

  //----------------------------onClickFunctions Start-------------------------
  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  handleFunctn = async (changedFields, allFields) => {
    if (changedFields.file) {
      this.setState({
        showUploadImage: true,
        file: await this.getBase64(changedFields.file.file),
      });
    }
    if (changedFields.maritalStatus === "Married") {
      this.setState({ showSpouse: true });
    } else if (changedFields.maritalStatus === "Unmarried") {
      this.setState({ showSpouse: false });
    }

    if (changedFields.bankName) {
      this.setState({ bankName: changedFields.bankName });
    }

    if (changedFields.ifscNumber && changedFields.ifscNumber.length === 11) {
      (async () => {
        if (changedFields.ifscNumber.length === 11) {
          const response = await getIfscDetails({
            ifsc: changedFields.ifscNumber,
          });
          if (!response) {
            this.form && this.form.setFieldsValue({ bankName: "" });
            this.setState({ disableBankName: false });
            this.setState({ disableBtnNxt: true });
          }
          if (response && response.bank) {
            this.form && this.form.setFieldsValue({ bankName: response.bank });
            this.setState({ bankName: response.bank });
            this.setState({ disableBankName: false });
          }
          if (response && response.ifsc) {
            this.setState({ branch: response.branch });
          }
        }
      })();
    }
  };

  deleteUploadedFunctn = (e) => {
    this.setState({
      file: null,
      showUploadImage: false,
    });
    this.props.deleteUploadedSelfie(
      {
        applicantUniqueId: this.props.match.params.id,
      },
      true
    );
    this.props.getQdeDetail({
      applicant_uniqueid: this.props.match.params.id,
      ismainapplicant: this.props.match.params.journey === "applicant",
      isguarantor: this.props.match.params.journey === "guarantor",
    });
  };

  restrictBlankSpace = (e) => {
    const regx = /^\S*$/;
    if (e.key.match(regx)) {
      return true;
    } else {
      e.preventDefault();
    }
  };

  //------------------------------onClickFunctions End--------------------

  render() {
    function NumberFormatCustom(props) {
      const { inputRef, onChange, ...other } = props;

      return (
        <NumberFormat
          {...other}
          getInputRef={inputRef}
          onValueChange={(values) => {
            onChange({
              target: {
                name: props.name,
                value: values.value,
              },
            });
          }}
          thousandSeparator
          thousandsGroupStyle="lakh"
          isNumericString
          prefix="&#8377;"
        />
      );
    }

    function TextMaskCustom(props) {
      const { inputRef, onChange, ...other } = props;

      return (
        <NumberFormat
          {...other}
          getInputRef={inputRef}
          onValueChange={(values) => {
            onChange({
              target: {
                name: props.name,
                value: values.value,
              },
            });
          }}
          isNumericString
          format="#### #### ####"
        />
      );
    }

    const inputProps = {
      readOnly:
        this.state.disablePanVerify ||
        this.props.freezeCase ||
        this.props.freezeUser,
      disabled:
        this.state.disablePanVerify ||
        this.props.freezeCase ||
        this.props.freezeUser,
    };

    //------------------------------DropDowns Start-------------------------------
    const getQualificationListDDL = [
      <option hidden> {} </option>,
      ...map(this.state.qualificationList, (item) => {
        return <option value={item.qualification}>{item.qualification}</option>;
      }),
    ];

    const getRelationWithMainApplicantListDDL = [
      <option hidden> {} </option>,
      ...map(this.state.relationWithMainApplicantList, (item) => {
        return (
          <option value={item.relationWithMinApplicant}>
            {item.relationWithMinApplicant}
          </option>
        );
      }),
    ];

    const getRelationWithNomineeListDDL = [
      <option hidden> {} </option>,
      ...map(this.state.relationWithNomineeList, (item) => {
        return (
          <option value={item.relationWithNominee}>
            {item.relationWithNominee}
          </option>
        );
      }),
    ];

    const getMaritalStatusListDDL = [
      <option hidden> {} </option>,
      ...map(this.state.maritalStatusList, (item) => {
        return <option value={item.maritalStatus}>{item.maritalStatus}</option>;
      }),
    ];

    const getBankAccountTypeListDDL = [
      <option hidden> {} </option>,
      ...map(this.state.bankAccountList, (item) => {
        return (
          <option value={item.bankAccountType}>{item.bankAccountType}</option>
        );
      }),
    ];
    //----------------------------------DropDowns End--------------------------------------

    const uploadProps = {
      customRequest: this.props.uploadSelfie,
      personalInfo: JSON.stringify({
        applicantUniqueId: this.props.match.params.id,
      }),
    };

    const getAadhaar =
      this.props.qde.getQdeSectionDetails &&
      this.props.qde.getQdeSectionDetails.data &&
      this.props.qde.getQdeSectionDetails.data.additionalDetails &&
      this.props.qde.getQdeSectionDetails.data.additionalDetails
        .kycaddresDetails &&
      this.props.qde.getQdeSectionDetails.data.additionalDetails
        .kycaddresDetails.aadharId;

    if (getAadhaar !== undefined) {
      this.form && this.form.setFieldsValue({ aadhaarNumber: getAadhaar });
    }

    return (
      <div>
        <div className="references-Container">
          <Form
            name="basic"
            onValuesChange={this.handleFunctn}
            onFinish={this.submitForm}
            onFinishFailed={this.finishFailed}
            ref={(e) => (this.form = e)}
            initialValues={{ remember: true }}>
            <Row>
              {this.state.file && this.state.showUploadImage && (
                <div className={"uploadedImageWrapperPersonal"}>
                  {!(this.props.freezeCase || this.props.freezeUser) && (
                    <span
                      onClick={this.deleteUploadedFunctn}
                      className="personalCrossIcon">
                      X
                    </span>
                  )}
                  <img alt={"Uploaded Document"} src={this.state.file} />
                </div>
              )}
              <Col lg={8}>
                {!this.state.file &&
                  (this.state.showWebCam ? (
                    <React.Fragment>
                      {!(this.props.freezeCase || this.props.freezeUser) && (
                        <CameraFeed
                          disabled
                          dimensions={{ height: 200, width: 300 }}
                          data={uploadProps.personalInfo}
                          uploadDocument={this.props.uploadSelfie}
                        />
                      )}
                    </React.Fragment>
                  ) : (
                    <div onClick={() => this.setState({ showWebCam: true })}>
                      {!(this.props.freezeCase || this.props.freezeUser) && (
                        <div className="displayFlex">
                          <span className="Upload-Photo">Upload Selfie</span>
                          <div className="wrapperSelfie">
                            <div className="takeaPhoto">
                              <CameraOutlined />
                            </div>
                          </div>
                          <span className="Upload-Photo">Take a Photo</span>
                        </div>
                      )}
                    </div>
                  ))}
              </Col>
            </Row>
            <br />
            <Row className={"typeRow qde-loandetails-picker"} gutter={(40, 40)}>
              <Col lg={8}>
                <div className={"mui-dropdown-wrapper"}>
                  <img alt={"select"} src={SelectIcon} className="searchIcon" />
                  <Form.Item
                    name="maritalStatus"
                    rules={[
                      {
                        required: true,
                        message: "Marital Status is mandatory",
                      },
                    ]}>
                    <TextField
                      InputLabelProps={{
                        shrink:
                          this.form && this.form.getFieldValue("maritalStatus"),
                      }}
                      inputProps={inputProps}
                      select
                      label="Marital Status*"
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}>
                      {getMaritalStatusListDDL}
                    </TextField>
                  </Form.Item>
                </div>
              </Col>
              <Col lg={8}>
                <Form.Item
                  name="fatherName"
                  rules={[
                    {
                      required: true,
                      message: "Father's Name is mandatory",
                    },
                  ]}>
                  <TextField
                    key={this.state.father}
                    id="fatherName"
                    InputLabelProps={{
                      shrink:
                        this.form && this.form.getFieldValue("fatherName"),
                    }}
                    inputProps={inputProps}
                    fullWidth={true}
                    label="Father's Name*"
                    onInput={(e) => {
                      e.target.value = e.target.value
                        .toString()
                        .match(/^[a-zA-Z ]*$/)
                        ? e.target.value.toString().slice(0, 30)
                        : e.target.value
                            .toString()
                            .slice(0, e.target.value.length - 1);
                    }}
                    className="textField"
                    // onKeyDown={(e) => e.keyCode === 32 && e.preventDefault()}
                  />
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item
                  name="motherName"
                  rules={[
                    {
                      required: true,
                      message: "Mother's Name is mandatory",
                    },
                  ]}>
                  <TextField
                    InputLabelProps={{
                      shrink:
                        this.form && this.form.getFieldValue("motherName"),
                    }}
                    inputProps={inputProps}
                    fullWidth={true}
                    label="Mother's Name*"
                    onInput={(e) => {
                      e.target.value = e.target.value
                        .toString()
                        .match(/^[a-zA-Z ]*$/)
                        ? e.target.value.toString().slice(0, 30)
                        : e.target.value
                            .toString()
                            .slice(0, e.target.value.length - 1);
                    }}
                    // onKeyDown={(e) => e.keyCode === 32 && e.preventDefault()}
                    className="textField"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row className={"typeRow qde-loandetails-picker"} gutter={(40, 40)}>
              {this.state.showSpouse && (
                <Col lg={8}>
                  <Form.Item
                    name="spouseName"
                    rules={[
                      {
                        required: true,
                        message: "Spouse Name is mandatory",
                      },
                    ]}>
                    <TextField
                      InputLabelProps={{
                        shrink:
                          this.form && this.form.getFieldValue("spouseName"),
                      }}
                      inputProps={inputProps}
                      fullWidth={true}
                      label="Spouse Name*"
                      onInput={(e) => {
                        e.target.value = e.target.value
                          .toString()
                          .match(/^[a-zA-Z ]*$/)
                          ? e.target.value.toString().slice(0, 30)
                          : e.target.value
                              .toString()
                              .slice(0, e.target.value.length - 1);
                      }}
                      className="textField"
                      // onKeyDown={(e) => e.keyCode === 32 && e.preventDefault()}
                    />
                  </Form.Item>
                </Col>
              )}
              <Col lg={8}>
                <div className={"mui-dropdown-wrapper"}>
                  <img alt={"select"} src={SelectIcon} className="searchIcon" />
                  <Form.Item
                    name="qualification"
                    rules={[
                      {
                        required: true,
                        message: "Qualification selection is mandatory",
                      },
                    ]}>
                    <TextField
                      InputLabelProps={{
                        shrink: this.form
                          ? this.form.getFieldValue("qualification")
                          : false,
                      }}
                      inputProps={inputProps}
                      select
                      label="Qualification*"
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}>
                      {getQualificationListDDL}
                    </TextField>
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row className={"typeRow qde-loandetails-picker"} gutter={(40, 40)}>
              {getAadhaar ? (
                <Col lg={8}>
                  <Form.Item
                    name="aadhaarNumber"
                    rules={[
                      {
                        pattern: new RegExp(/^[0-9]{12}$/),
                        message: "Invalid Aadhaar Number",
                      },
                    ]}>
                    <TextField
                      InputProps={{
                        inputComponent: TextMaskCustom,
                        shrink:
                          this.form && this.form.getFieldValue("aadhaarNumber"),
                      }}
                      key={getAadhaar}
                      inputProps={inputProps}
                      label="Aadhaar Number*"
                      disabled
                      className="textField"
                    />
                  </Form.Item>
                </Col>
              ) : (
                <Col lg={8}>
                  <Form.Item
                    name="aadhaarNumber"
                    rules={[
                      {
                        required: true,
                        message: "Aadhar Number is mandatory",
                      },
                    ]}>
                    <TextField
                      className="aadharIdInput"
                      id="aadharId"
                      label="Aadhaar Number*"
                      fullWidth={true}
                      name="numberformat"
                      inputProps={inputProps}
                      InputProps={{
                        inputComponent: TextMaskCustom,
                        shrink:
                          this.form && this.form.getFieldValue("aadhaarNumber"),
                      }}
                    />
                    {/* <TextField
                      InputLabelProps={{
                        shrink:
                          this.form && this.form.getFieldValue("aadhaarNumber"),
                      }}
                      fullWidth
                      inputProps={inputProps}
                      label="Aadhaar Number*"
                      onInput={(e) => {
                        e.target.value = e.target.value
                          ? Math.max(0, parseInt(e.target.value))
                              .toString()
                              .slice(0, 12)
                          : "";
                      }}
                      type="number"
                      className="textField"
                    /> */}
                  </Form.Item>
                </Col>
              )}
              {this.props.journey !== "applicant" && (
                <Col lg={8}>
                  <div className={"mui-dropdown-wrapper"}>
                    <img
                      alt={"select"}
                      src={SelectIcon}
                      className="searchIcon"
                    />
                    <Form.Item
                      name="relationWithMainApplicant"
                      rules={[
                        {
                          required: true,
                          message:
                            "Relation with Main Applicant selection is mandatory",
                        },
                      ]}>
                      <TextField
                        InputLabelProps={{
                          shrink: this.form
                            ? this.form.getFieldValue(
                                "relationWithMainApplicant"
                              )
                            : false,
                        }}
                        inputProps={inputProps}
                        select
                        label="Relation with Main Applicant*"
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}>
                        {getRelationWithMainApplicantListDDL}
                      </TextField>
                    </Form.Item>
                  </div>
                </Col>
              )}
            </Row>

            <Row className={"typeRow qde-loandetails-picker"} gutter={(40, 40)}>
              <Col lg={8}>
                <Form.Item
                  name="annualGrossIncome"
                  rules={[
                    {
                      required: true,
                      message: "Annual Gross Income is mandatory",
                    },
                  ]}>
                  <TextField
                    label="Annual Gross Income*"
                    inputProps={inputProps}
                    fullWidth={true}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item
                  name="netMonthlyIncome"
                  rules={[
                    {
                      required: true,
                      message: "Net monthly Income is mandatory",
                    },
                  ]}>
                  <TextField
                    label="Net Monthly Income*"
                    inputProps={inputProps}
                    fullWidth={true}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item
                  name="netMonthlyObligations"
                  rules={[
                    {
                      required: true,
                      message: "Net Monthly Obligation is mandatory",
                    },
                  ]}>
                  <TextField
                    label="Net Monthly Obligation*"
                    inputProps={inputProps}
                    fullWidth={true}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <br />
            <br />
            <p className="sub-title">Bank Details</p>
            <Row className={"typeRow"} gutter={(40, 40)}>
              <Col lg={8}>
                <div className={"mui-dropdown-wrapper"}>
                  <img alt={"select"} src={SelectIcon} className="searchIcon" />
                  <Form.Item
                    name="accountType"
                    rules={[
                      {
                        required: true,
                        message: "Account Type selection is mandatory",
                      },
                    ]}>
                    <TextField
                      InputLabelProps={{
                        shrink: this.form
                          ? this.form.getFieldValue("accountType")
                          : false,
                      }}
                      inputProps={inputProps}
                      select
                      label="Account Type*"
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}>
                      {getBankAccountTypeListDDL}
                    </TextField>
                  </Form.Item>
                </div>
              </Col>
              <Col lg={8}>
                <Form.Item
                  name="accountNumber"
                  rules={[
                    {
                      required: true,
                      message: "Account Number is mandatory",
                    },
                    // {
                    //   pattern: new RegExp(/[0-9]{8,}/),
                    //   message: "Invalid Account Number",
                    // },
                  ]}>
                  <TextField
                    InputLabelProps={{
                      shrink:
                        this.form && this.form.getFieldValue("accountNumber"),
                    }}
                    inputProps={inputProps}
                    fullWidth={true}
                    onInput={(e) => {
                      e.target.value = e.target.value
                        ? Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 18)
                        : "";
                    }}
                    type="number"
                    label="Account Number*"
                    className="textField"
                  />
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item
                  name="ifscNumber"
                  rules={[
                    {
                      required: true,
                      message: "IFSC Code is mandatory",
                    },
                    {
                      pattern: new RegExp(/^[A-Z]{4}0[a-zA-Z0-9]{6}$/),
                      message: "Invalid IFSC Number",
                    },
                  ]}>
                  <TextField
                    inputProps={inputProps}
                    InputLabelProps={{
                      shrink:
                        this.form && this.form.getFieldValue("ifscNumber"),
                    }}
                    fullWidth={true}
                    label="IFSC Code*"
                    className="textField"
                    onInput={(e) => {
                      e.target.value = e.target.value
                        .slice(0, 11)
                        .toUpperCase();
                    }}
                    onKeyDown={(e) => e.keyCode === 32 && e.preventDefault()}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row className={"typeRow qde-loandetails-picker"} gutter={(40, 40)}>
              <Col lg={8}>
                <Form.Item
                  name="bankName"
                  rules={[
                    {
                      required: true,
                      message: "Bank Name is mandatory",
                    },
                  ]}>
                  <TextField
                    InputLabelProps={{
                      shrink: this.form && this.form.getFieldValue("bankName"),
                    }}
                    inputProps={inputProps}
                    fullWidth={true}
                    label="Bank Name*"
                    // key={this.state.bankName}
                    defaultValue={this.state.bankName}
                    onInput={(e) => {
                      e.target.value = e.target.value
                        .toString()
                        .match(/^[a-zA-Z ]*$/)
                        ? e.target.value.toString().slice(0, 50)
                        : e.target.value
                            .toString()
                            .slice(0, e.target.value.length - 1);
                    }}
                    // onKeyDown={(e) => e.keyCode === 32 && e.preventDefault()}
                    className="textField"
                  />
                </Form.Item>
              </Col>
            </Row>
            <div className="buttons-position  mt-4 mb-2">
              {!(this.props.freezeCase || this.props.freezeUser) && (
                <Button className="save-button" htmlType={"submit"}>
                  Save
                </Button>
              )}
            </div>
          </Form>
          <br />
          <div className="alignButton">
            <Button
              className="save-button mr-2"
              onClick={() => {
                this.props.history.push(
                  `${public_url.loanSummary}/${
                    this.props.qde.getQdeSectionDetails &&
                    this.props.qde.getQdeSectionDetails.data &&
                    this.props.qde.getQdeSectionDetails.data.id
                  }`
                );
              }}>
              Loan Summary
            </Button>{" "}
            &nbsp;
            <Button
              className="cancle-button mr-3"
              onClick={() => {
                this.redirectToLeadList();
              }}>
              Cancel
            </Button>
            <Button
              className="save-button"
              disabled={
                this.props.match.params.journey === "applicant"
                  ? this.state.disableBtnNxt ||
                    isEmpty(
                      this.props.qde.getQdeSectionDetails &&
                        this.props.qde.getQdeSectionDetails.data &&
                        this.props.qde.getQdeSectionDetails.data
                          .personalDetails &&
                        this.props.qde.getQdeSectionDetails.data.personalDetails
                          .fatherName
                    )
                  : false
              }
              onClick={() => {
                this.handleSubmit();
              }}>
              Next
            </Button>
          </div>
        </div>
      </div>
    );
  }

  enableNxtBtn() {
    if (
      !isEmpty(
        this.props.qde &&
          this.props.qde.personalDetails &&
          this.props.qde.personalDetails.data &&
          this.props.qde.personalDetails.data.bankName
      )
    ) {
      const nxtBtnEnable = isEmpty(
        this.props.qde &&
          this.props.qde.personalDetails &&
          this.props.qde.personalDetails.data &&
          this.props.qde.personalDetails.data.bankName
      );
      this.setState({ disableBtnNxt: nxtBtnEnable });
    }
  }
}

const mapStateToProps = (state) => {
  return {
    qde: state.qde,
  };
};

const mapDispatchToProps = {
  saveUpdatePersonalDetails,
  getQualificationList,
  getRelationWithMainApplicantList,
  getRelationWithNomineeList,
  getMaritalStatusList,
  getBankAccountTypeList,
  uploadSelfie,
  deleteUploadedSelfie,
  createCustomer,
  getQdeDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetails);
