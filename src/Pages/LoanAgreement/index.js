import React, { Component } from "react";
import "./style.scss";
import { Form, Button, Upload, Row, Col, Card } from "antd";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import {
  DownloadOutlined,
  UploadOutlined,
  QuestionCircleOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import Tooltip from "@material-ui/core/Tooltip";
import {
  requestEservice,
  getEservice,
  uploadLoanAgreement,
  deleteUploadedLoanAgreement,
  downloadLoanAgreementData,
} from "../../Redux/Services/LoanAgreement";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { BASE_URL } from "../../Utility/Config";
import PdfIcon from "../../assets/Images/pdfIcon.png";
import { saveAs } from "file-saver";
import { public_url } from "../../Utility/Constant";
import { getLoanSummary } from "../../Redux/Services/LoanSummary";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProceedBtnDisabled: false,
      isDownloadDisabled: false,
      eSign: "",
      esign_estamp: "",
      esign: "",
      estamp: "",
      show: false,
      selectedRadio: "",
      selectedDropDown: "",
      applicantName: "",
      entityType: "Individual-Salaried",
      viewAgreement: "abc",
      file: "",
      path: null,
      eDefault: null,
      valueSelected: "aadhar",
      radioSelected: null,
      filePath: null,
      dropdownEsign: null,
      dropdownEsignEstamp: null,
      uploadAgree: null,
      loan: true,
      picName: "",
    };
  }

  componentDidMount() {
    this.props.getEservice({
      applicantUniqueId: this.props.match.params.id,
      ismainapplicant:
        this.props.match.params.journey === "applicant" ? true : false,
    });
    let userData = localStorage.getItem("UserData");
    let userDataCopy = JSON.parse(userData);
    this.props.getLoanSummary({
      applicant_uniqueid: this.props.match.params.id,

      roleId: userDataCopy.roleId,
    });
    if (
      this.props.Summary &&
      this.props.Summary.getEservice &&
      this.props.Summary.getEservice.loanAgreementFilePath
    ) {
      this.setState({
        file: this.props.Summary.getEservice.loanAgreementFilePath.replace(
          "/var/www/html",
          BASE_URL
        ),
      });
    }
  }

  loanFunction = () => {
    if (
      this.props.Summary &&
      this.props.Summary.getEservice &&
      this.props.Summary.getEservice.loanAgreementFilePath &&
      this.state.loan
    ) {
      this.setState({
        file: this.props.Summary.getEservice.loanAgreementFilePath.replace(
          "/var/www/html",
          BASE_URL
        ),
      });
      this.setState({ loan: false });
      const pdfFilePathSplit =
        this.props.Summary.getEservice.loanAgreementFilePath
          .replace("/var/www/html", BASE_URL)
          .split("/");

      var pdfName = pdfFilePathSplit && pdfFilePathSplit.pop();
      this.setState({ picName: pdfName });
    }
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ selectedRadio: event.target.name });
    this.setState({ selectedDropDown: event.target.value });
  };

  handleSubmit = () => {
    let { id } =
      this.props.loanAgreement && this.props.loanAgreement.getEservice;
    this.props.history.push(`${public_url.loanSummary}/${id}`);
  };

  handleProceed = (event) => {
    this.props.requestEservice({
      applicantUniqueId: this.props.match.params.id,
      isguarantor: false,
      ismainapplicant:
        this.props.match.params.journey === "applicant" ? true : false,
      type: this.state.selectedRadio,
      signingMode: this.state.selectedDropDown,
    });

    this.setState({ isProceedBtnDisabled: true });
    event.preventDefault();
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.loanAgreement.downloadLoanAgreement !==
      prevProps.loanAgreement.downloadLoanAgreement
    ) {
      let filePath =
        this.props.loanAgreement &&
        this.props.loanAgreement.downloadLoanAgreement.filePath;

      filePath = filePath && filePath.replace("/var/www/html", BASE_URL);
      saveAs(filePath);
      this.setState({ filePath });
      this.setState({ eDefault: this.props.loanAgreement.getEservice.type });
    }
    if (
      this.props.loanAgreement.getEservice !==
      prevProps.loanAgreement.getEservice
    ) {
      this.setState({
        selectedDropDown: this.props.loanAgreement.getEservice.signingMode,
      });
      this.setState({
        selectedRadio: this.props.loanAgreement.getEservice.type,
      });
      this.setState({ eDefault: this.props.loanAgreement.getEservice.type });
      if (this.props.loanAgreement.getEservice.type === "esign") {
        this.setState({
          dropdownEsign: this.props.loanAgreement.getEservice.signingMode,
        });
      } else if (this.props.loanAgreement.getEservice.type === "esign_estamp") {
        this.setState({
          dropdownEsignEstamp: this.props.loanAgreement.getEservice.signingMode,
        });
      }
    }
    if (
      this.props.Summary &&
      this.props.Summary.getEservice &&
      this.props.Summary.getEservice.loanAgreementFilePath
    ) {
      this.loanFunction();
    }
    if (
      this.props.loanAgreement &&
      this.props.loanAgreement.deleteLoanAgreeflag !==
        prevProps.loanAgreement.deleteLoanAgreeflag
    ) {
      this.setState({ isDownloadDisabled: false });
      this.props.getEservice({
        applicantUniqueId: this.props.match.params.id,
        ismainapplicant:
          this.props.match.params.journey === "applicant" ? true : false,
      });
    }
  }
  download = () => {
    this.setState({ isDownloadDisabled: true });
  };

  handleDownload = async () => {
    await this.props.downloadLoanAgreementData({
      applicantUniqueId: this.props.match.params.id,
    });
  };

  uploadAgreement = (changedFields, allFields) => {
    if (changedFields.file) {
      this.setState({
        file: changedFields.file,
      });

      this.props.uploadLoanAgreement({
        file: changedFields.file.file,
        loanInfo: JSON.stringify({
          applicantUniqueId: this.props.match.params.id,
        }),
      });
    }
  };

  deleteUpload = (e) => {
    this.props.deleteUploadedLoanAgreement(
      {
        applicantUniqueId: this.props.match.params.id,
        filePath:
          (this.props.loanAgreement.uploadLoanAgreement &&
            this.props.loanAgreement.uploadLoanAgreement
              .loanAgreementFilePath) ||
          (this.props.Summary &&
            this.props.Summary.getEservice &&
            this.props.Summary.getEservice.loanAgreementFilePath),
      },
      true
    );
    this.setState({
      file: "",
    });
  };

  render() {
    let pdfFilePath =
      this.props.loanAgreement.uploadLoanAgreement &&
      this.props.loanAgreement.uploadLoanAgreement.loanAgreementFilePath.replace(
        "/var/www/html",
        BASE_URL
      );
    const pdfFilePathSplit = pdfFilePath && pdfFilePath.split("/");
    const pdfName = pdfFilePathSplit && pdfFilePathSplit.pop();
    const viewPdf =
      this.props.loanAgreement.getEservice &&
      this.props.loanAgreement.getEservice.filePath &&
      this.props.loanAgreement.getEservice.filePath.replace(
        "/var/www/html",
        BASE_URL
      );
    const downlodLoanAgreement =
      this.props.loanAgreement.getEservice &&
      this.props.loanAgreement.getEservice.filePath &&
      this.props.loanAgreement.getEservice.filePath.replace(
        "/var/www/html",
        BASE_URL
      );

    const enabled =
      (((this.state.selectedRadio === "esign" &&
        (this.state.selectedDropDown === "aadhaar" ||
          this.state.selectedDropDown === "DSC")) ||
        (this.state.selectedRadio === "esign_estamp" &&
          (this.state.selectedDropDown === "aadhaar" ||
            this.state.selectedDropDown === "DSC")) ||
        this.state.selectedRadio === "estamp") &&
        !this.props.loanAgreement.requestEservice) ||
      this.state.eDefault === "estamp" ||
      this.state.eDefault === "esign" ||
      this.state.eDefault === "esign_estamp";

    const signer_info = this.props.loanAgreement.requestEservice.signer_info;
    const signer_info_buttons = (signer_info || []).map((item, index) => (
      <Col lg={4}>
        <Button
          className="save-button mr-2"
          onClick={() => {
            window.open(item.invitation_link);
          }}>
          {item.applicantType === "MainApplicant"
            ? "Main Applicant"
            : item.applicantType === "CoApplicant"
            ? " Co Applicant"
            : item.applicantType === "Gurantor"
            ? "Guarantor "
            : ""}
        </Button>
      </Col>
    ));

    const disable =
      this.props.loanAgreement &&
      this.props.loanAgreement.downloadLoanAgreement &&
      this.props.loanAgreement.downloadLoanAgreement.status === "success";

    const enable = this.state.selectedRadio === "estamp";

    // set Enable/Disable Logic
    const freezeCase =
      this.props &&
      this.props.Summary &&
      this.props.Summary.loansummary &&
      this.props.Summary.loansummary.data &&
      this.props.Summary.loansummary.data.mainapplicant &&
      this.props.Summary.loansummary.data.mainapplicant.preSalesFreeze;

    const freezeUser =
      this.props.Summary &&
      this.props.Summary.loansummary &&
      this.props.Summary.loansummary.data &&
      this.props.Summary.loansummary.data.modelAccess &&
      this.props.Summary.loansummary.data.modelAccess[0] &&
      this.props.Summary.loansummary.data.modelAccess[0].read;

    console.log(
      "-->",
      this.props.Summary &&
        this.props.Summary.getEservice &&
        this.props.Summary.getEservice.filePath
    );

    return (
      <div className={"loanAgreementContainer"}>
        <Card bordered={false}>
          <div className="headers">
            {this.props.loanAgreement.getEservice &&
            this.props.loanAgreement.getEservice.leadName
              ? this.props.loanAgreement.getEservice &&
                this.props.loanAgreement.getEservice.leadName
              : "NA"}{" "}
            - {this.state.entityType}
          </div>
          <br />
          <div className="header-label">Agreement Letter</div>

          {/* agreement letter to show when the file is downloaded */}
          {this.props.loanAgreement.getEservice &&
          this.props.loanAgreement.getEservice.filePath ? (
            // <div className="agreement">
            //   {this.state.agreement}
            // </div>
            <iframe
              title="view-pdf"
              src={viewPdf}
              width="1000"
              height="750"
              type="application/pdf"
            />
          ) : null}

          <div className="header-subLabel">
            Loan Agreement E-signing & E-stamping
          </div>

          <Form
            onValuesChange={this.uploadAgreement}
            ref={(e) => (this.form = e)}>
            <RadioGroup
              // disabled={true}
              style={{ width: "100%" }}
              defaultValue={this.state.eDefault}
              key={this.state.eDefault}>
              <Row>
                <Col span={9} className="displayFlex">
                  <FormControlLabel
                    value="esign"
                    name="esign"
                    label={<span className="txtGrey">e-sign only</span>}
                    control={
                      <Radio
                        color="primary"
                        value="esign"
                        disabled={
                          this.state.eDefault === "estamp" ||
                          this.state.eDefault === "esign_estamp" ||
                          freezeCase ||
                          freezeUser
                        }
                      />
                    }
                    onClick={this.onChange}
                  />
                  <TextField
                    defaultValue={this.state.dropdownEsign}
                    name="esign"
                    className="dropDown-margin"
                    label="Signing Mode"
                    fullwidth={"true"}
                    select
                    onChange={this.onChange}
                    disabled={
                      (isEmpty(this.state.eDefault) &&
                        this.state.selectedRadio !== "esign") ||
                      freezeCase ||
                      freezeUser
                    }
                    SelectProps={{
                      native: true,
                    }}>
                    <option hidden></option>
                    <option value="aadhaar">Aadhar</option>
                    <option value="DSC">DSC</option>
                    <option value="electronic">Electronic</option>
                  </TextField>
                </Col>

                {/* <Col span={6}>
                  <FormControlLabel
                    value="estamp"
                    name="estamp"
                    label={<span className="txtGrey">e-stamp only</span>}
                    control={
                      <Radio
                        color="primary"
                        value="estamp"
                        disabled={
                          this.state.eDefault === "esign" ||
                          this.state.eDefault === "esign_estamp" ||
                          freezeCase ||
                          freezeUser
                        }
                      />
                    }
                    onClick={this.onChange}
                  />
                </Col> */}

                {/* <Col span={9} className="displayFlex">
                  <FormControlLabel
                    value="esign_estamp"
                    name="esign_estamp"
                    label={
                      <span className="txtGrey">e-sign & e-stamp both</span>
                    }
                    control={
                      <Radio
                        color="primary"
                        disabled={
                          // this.state.selectedRadio !== "esign"
                          this.state.eDefault === "esign" ||
                          this.state.eDefault === "estamp" ||
                          freezeCase ||
                          freezeUser
                        }
                      />
                    }
                    onClick={this.onChange}
                  />

                  <TextField
                    defaultValue={this.state.dropdownEsignEstamp}
                    name="esign_estamp"
                    className="dropDown-margin"
                    label="Signing Mode"
                    fullwidth={"true"}
                    select
                    onChange={this.onChange}
                    disabled={
                      (isEmpty(this.state.dropdownEsignEstamp) &&
                        this.state.selectedRadio !== "esign_estamp") ||
                      freezeCase ||
                      freezeUser
                    }
                    SelectProps={{
                      native: true,
                    }}>
                    <option hidden></option>
                    <option value="aadhaar">Aadhar</option>
                    <option value="DSC">DSC</option>
                    <option value="electronic">Electronic</option>
                  </TextField>
                </Col> */}
              </Row>
            </RadioGroup>
            <Row>
              <Col
                span={9}
                className="displayFlex"
                style={{ textAlign: "center" }}>
                {this.props.loanAgreement.getEservice.filePath &&
                this.props.loanAgreement.getEservice.type === "esign" ? (
                  <>
                    {!(freezeCase || freezeUser) && (
                      <Button
                        className="cancle-button"
                        href={downlodLoanAgreement}
                        icon={<DownloadOutlined />}
                        onClick={(e) => this.download(e)}
                        target="_blank">
                        Loan Agreement
                      </Button>
                    )}

                    {this.state.viewAgreement !== "" ? (
                      <Button
                        onClick={() => {
                          this.setState({ show: !this.state.show });
                        }}
                        className="viewAgreement">
                        {this.state.show ? (
                          <EyeInvisibleOutlined />
                        ) : (
                          <EyeOutlined />
                        )}
                      </Button>
                    ) : null}

                    <Tooltip
                      title="Download agreement for manual Stamping/Signing."
                      aria-label="add"
                      className="toolTip">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </>
                ) : null}
              </Col>

              <Col
                span={6}
                className="displayFlex"
                style={{ textAlign: "center" }}>
                {this.props.loanAgreement.getEservice.filePath &&
                this.props.loanAgreement.getEservice.type === "estamp" ? (
                  <>
                    {!(freezeCase || freezeUser) && (
                      <Button
                        className="cancle-button"
                        icon={<DownloadOutlined />}
                        onClick={(e) => this.download(e)}
                        //disabled={this.state.selectedRadio !== "estamp"}
                      >
                        Loan Agreement
                      </Button>
                    )}

                    {this.state.viewAgreement !== "" ? (
                      <Button
                        onClick={() => {
                          this.setState({ show: !this.state.show });
                        }}
                        className="viewAgreement">
                        {this.state.show ? (
                          <EyeInvisibleOutlined />
                        ) : (
                          <EyeOutlined />
                        )}
                      </Button>
                    ) : null}
                    <Tooltip
                      title="Download agreement for manual Stamping/Signing."
                      aria-label="add"
                      className="toolTip">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </>
                ) : null}
              </Col>

              <Col span={9} className="displayFlex">
                {this.props.loanAgreement.getEservice.filePath &&
                this.props.loanAgreement.getEservice.type === "esign_estamp" ? (
                  <>
                    {!(freezeCase || freezeUser) && (
                      <Button
                        className="cancle-button"
                        icon={<DownloadOutlined />}
                        onClick={(e) => this.download(e)}>
                        Loan Agreement
                      </Button>
                    )}

                    {this.state.viewAgreement !== "" ? (
                      <Button
                        onClick={() => {
                          this.setState({ show: !this.state.show });
                        }}
                        className="viewAgreement">
                        {this.state.show ? (
                          <EyeInvisibleOutlined />
                        ) : (
                          <EyeOutlined />
                        )}
                      </Button>
                    ) : null}

                    <Tooltip
                      title="Download agreement for manual Stamping/Signing."
                      aria-label="add"
                      className="toolTip">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </>
                ) : null}
              </Col>
            </Row>
            {/* ProceedBtn Row */}
            <Row className="proceedBtn">
              <Col span={14}>
                {!(freezeCase || freezeUser) && (
                  <Button
                    className="SubmitBtn"
                    onClick={(e) => this.handleProceed(e)}
                    disabled={
                      // !enabled ||
                      // this.state.picName ||
                      // !isEmpty(viewPdf) ||
                      !isEmpty(
                        this.props.Summary &&
                          this.props.Summary.getEservice &&
                          this.props.Summary.getEservice.filePath
                      )
                    }
                    htmlType={"submit"}
                    enabled={this.state.valueSelected}>
                    Proceed
                  </Button>
                )}
              </Col>
            </Row>
            {this.props.loanAgreement.requestEservice.signer_info && (
              <Row>{signer_info_buttons}</Row>
            )}
            <Row className="loanAgreement">
              <div>Loan Agreement</div>
            </Row>
            <Row>
              <Col span={14} className="displayFlex">
                <Button
                  className="agreementCancleBtn"
                  // href="/somefile.txt"
                  href={this.state.filePath}
                  icon={<DownloadOutlined />}
                  // onClick={(e) => this.download(e)}
                  onClick={this.handleDownload}
                  disabled={
                    this.state.isDownloadDisabled ||
                    freezeCase ||
                    freezeUser ||
                    !isEmpty(
                      this.props.loanAgreement.uploadLoanAgreement &&
                        this.props.loanAgreement.uploadLoanAgreement
                          .loanAgreementFilePath
                    ) ||
                    !isEmpty(
                      this.props.Summary &&
                        this.props.Summary.getEservice &&
                        this.props.Summary.getEservice.loanAgreementFilePath
                    )
                    // ||
                    //   !isEmpty(
                    //     this.props.loanAgreement &&
                    //       this.props.loanAgreement.getEservice &&
                    //       this.props.loanAgreement.getEservice.filePath
                    //   )
                  }>
                  <span className="txtDownloadAgreement">
                    Download Loan Agreement
                  </span>
                </Button>

                {this.state.viewAgreement !== "" ? (
                  <Button
                    onClick={() => {
                      this.setState({ show: !this.state.show });
                    }}
                    className="viewAgreement">
                    {this.state.show ? (
                      <EyeInvisibleOutlined className="darkgreyAntd" />
                    ) : (
                      <EyeOutlined className="darkgreyAntd" />
                    )}
                  </Button>
                ) : null}

                <Tooltip
                  title="Download agreement for manual Stamping/Signing."
                  aria-label="add"
                  className="toolTip greyAntd ml-1">
                  <QuestionCircleOutlined />
                </Tooltip>
              </Col>
              <Col span={10} className="displayFlex">
                <Form.Item name="file">
                  {!this.state.file && (
                    <Upload
                      showUploadList={false}
                      beforeUpload={() => {
                        return false;
                      }}
                      id="file"
                      accept=".pdf"
                      maxCount={1}
                      multiple={false}>
                      <Button
                        className="agreementCancleBtn"
                        icon={<UploadOutlined />}
                        disabled={!(disable || enable)}>
                        Upload Signed Loan Agreement
                        {!this.state.file || freezeCase || freezeUser}
                      </Button>
                    </Upload>
                  )}
                </Form.Item>
                {this.state.file && (
                  <div className={"setCrossIcon  "}>
                    {!(freezeCase || freezeUser) && (
                      <span onClick={this.deleteUpload}>X</span>
                    )}
                    <img
                      alt="pdfIcon"
                      src={PdfIcon}
                      style={{ width: "100px", height: "100px" }}
                    />
                    <p
                      style={{
                        width: "100%",
                        wordBreak: "break-all",
                        color: "blue",
                      }}>
                      <a
                        onClick={(e) => {
                          saveAs(
                            (this.props.loanAgreement.uploadLoanAgreement &&
                              this.props.loanAgreement.uploadLoanAgreement.loanAgreementFilePath.replace(
                                "/var/www/html",
                                BASE_URL
                              )) ||
                              (this.props.Summary &&
                                this.props.Summary.getEservice &&
                                this.props.Summary.getEservice.loanAgreementFilePath.replace(
                                  "/var/www/html",
                                  BASE_URL
                                ))
                          );
                        }}>
                        {" "}
                        {pdfName || this.state.picName}
                      </a>
                    </p>
                  </div>
                )}

                {!this.state.file && (
                  <Tooltip
                    title="Upload agreement, duly signed by all the stakeholders."
                    aria-label="add"
                    className="toolTip greyAntd">
                    <QuestionCircleOutlined />
                  </Tooltip>
                )}
              </Col>
            </Row>
            <Row>
              <Col offset={9}>
                <div className="Source-Type-btn-Theme  mt-4 mb-2">
                  <Button onClick={this.handleSubmit} className="cancle-button">
                    Loan Summary
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    );
  }
}

//calling reducer
const mapStateToProps = (state) => {
  return {
    qde: state.qde,
    loanAgreement: state.loanAgreement,
    Summary: state.Summary,
  };
};

//calling api
const mapDispatchToProps = (dispatch) => {
  return {
    requestEservice: (payload) => {
      dispatch(requestEservice(payload));
    },
    getEservice: (payload) => {
      dispatch(getEservice(payload));
    },
    uploadLoanAgreement: (payload) => {
      dispatch(uploadLoanAgreement(payload));
    },
    deleteUploadedLoanAgreement: (payload) => {
      dispatch(deleteUploadedLoanAgreement(payload));
    },
    downloadLoanAgreementData: (payload) => {
      dispatch(downloadLoanAgreementData(payload));
    },
    getLoanSummary: (payload) => {
      dispatch(getLoanSummary(payload));
    },
    // getLoanSummary
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
