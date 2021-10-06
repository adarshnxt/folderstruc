import {
  InfoCircleOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  Col,
  Form,
  message,
  Radio,
  Row,
  Upload,
  DatePicker,
} from "antd";
import { isEmpty, map } from "lodash";
import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import SelectIcon from "../../../assets/Images/select.svg";
import Verified from "../../../assets/Images/verified.svg";
import {
  deleteDocuments,
  getKycOther,
  getPincodeDetail,
  savePOIDetails,
  uploadPOIDocs,
  verifyDl,
  verifyVoter,
} from "../../../Redux/Services/Qde";
import { BASE_URL } from "../../../Utility/Config";
import NumberFormat from "react-number-format";
import "./style.scss";

class DetailsUtility extends Component {
  state = {
    documentEdit: false,
    POADoc: null,
    aadharfront: false,
    aadharback: false,
    passportfront: false,
    passportback: false,
    voterfront: false,
    voterback: false,
    dlfront: false,
    document_upload_list_front: null,
    document_upload_list_back: null,
    kycDocdata: [],
    deleteBeforeUp: null,
    city: null,
    state: null,
    aaharId: null,
    verifiedData: false,
    isSelected: false,
    month: 0,
    InputLabelPropsAddr2: { shrink: true },
  };

  getUploadButton = (side) => {
    return (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 10 }}>{side}</div>
      </div>
    );
  };

  beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  }
  handleChangeDate = (e) => {
    this.setState({ isSelected: e !== null });
  };
  submitForm = (e) => {
    let id = null;
    if (
      this.props.qde.getQdeSectionDetails &&
      this.props.qde.getQdeSectionDetails.data &&
      this.props.qde.getQdeSectionDetails.data.additionalDetails &&
      !isEmpty(
        this.props.qde.getQdeSectionDetails.data.additionalDetails
          .kycaddresDetails
      )
    ) {
      id =
        this.props.qde.getQdeSectionDetails.data.additionalDetails
          .kycaddresDetails.id;
    }
    const dataToAPI = {
      leadCode: this.props.qde.getQdeSectionDetails.data.leadCode,
      applicantUniqueId: this.props.match.params.id,
      ...e,
      dateOfBirth: e.dateOfBirth && e.dateOfBirth.format("DD/MM/YYYY"),
      drivingLicenseNumber: e.dlNo,
      epicNumber: e.epicno,
      individual: true,
      ismainapplicant: this.props.match.params.journey === "applicant",
      isguarantor: this.props.match.params.journey === "guarantor",
      id,
    };
    if (this.state.POADoc === "aadhar") {
      dataToAPI.docType = "aadhar";
      dataToAPI.docId = this.form.getFieldValue("aadharId");
    }
    if (this.state.POADoc === "passport") {
      dataToAPI.docType = "passport";
      dataToAPI.docId = this.form.getFieldValue("fileNumber");
    }
    if (this.state.POADoc === "dl") {
      dataToAPI.docType = "drivingLicense";
      dataToAPI.docId = this.form.getFieldValue("dlno");
    }
    if (this.state.POADoc === "voter") {
      dataToAPI.docType = "voter";
      dataToAPI.docId = this.form.getFieldValue("epicno");
    }
    if (this.state.POADoc === "other") {
      dataToAPI.docType = "other";
      dataToAPI.docId = this.form.getFieldValue("otherName");
    }
    this.props.savePOIDetails(dataToAPI);
  };

  formChange = async (changedFields, allFields) => {
    if (allFields.address2) {
      this.setState({ InputLabelPropsAddr2: { shrink: true } });
    } else {
      this.setState({ InputLabelPropsAddr2: { shrink: false } });
    }
    if (changedFields.aadharfront || changedFields.aadharback) {
      if (changedFields.aadharfront) {
        this.setState({
          aadharfront: changedFields.aadharfront && true,
          document_upload_list_front: await this.getBase64(
            changedFields.aadharfront.file
          ),
        });
      } else if (changedFields.aadharback) {
        this.setState({
          aadharback: changedFields.aadharback && true,
          document_upload_list_back: await this.getBase64(
            changedFields.aadharback.file
          ),
        });
      }

      if (allFields.aadharback && allFields.aadharfront) {
        const payload = { data: { addInfo: [] } };
        if (allFields.aadharback.file) {
          payload.back = allFields.aadharback;
          payload.data.addInfo.push({
            docName: allFields.aadharback.file.name,
            docType: "addhar back",
            applicantUniqueId: this.props.match.params.id,
            leadCode: this.props.qde.getQdeSectionDetails.data.leadCode,
            mobileNumber:
              "" + this.props.qde.getQdeSectionDetails.data.customerMobile,
            ismainapplicant: this.props.match.params.journey === "applicant",
            isguarantor: this.props.match.params.journey === "guarantor",
          });
        }
        if (allFields.aadharfront.file) {
          payload.front = allFields.aadharfront;
          payload.data.addInfo.push({
            docName: allFields.aadharfront.file.name,
            docType: "addhar Front",
            applicantUniqueId: this.props.match.params.id,
            leadCode: this.props.qde.getQdeSectionDetails.data.leadCode,
            mobileNumber:
              "" + this.props.qde.getQdeSectionDetails.data.customerMobile,
            ismainapplicant: this.props.match.params.journey === "applicant",
            isguarantor: this.props.match.params.journey === "guarantor",
          });
        }
        payload.data.addInfo = JSON.stringify(payload.data.addInfo);
        this.props.uploadPOIDocs(payload);
      }
    }

    if (changedFields.dlfront) {
      if (changedFields.dlfront) {
        this.setState({
          dlfront: changedFields.dlfront && true,
          document_upload_list_front: await this.getBase64(
            changedFields.dlfront.file
          ),
        });
      }
      if (allFields.dlfront) {
        const payload = { data: { addInfo: [] } };
        if (allFields.dlfront.file) {
          payload.back = allFields.dlfront;
          payload.data.addInfo.push({
            docName: allFields.dlfront.file.name,
            docType: "driving front",
            mobileNumber:
              "" + this.props.qde.getQdeSectionDetails.data.customerMobile,
            applicantUniqueId: this.props.match.params.id,
            leadCode: this.props.qde.getQdeSectionDetails.data.leadCode,
            ismainapplicant: this.props.match.params.journey === "applicant",
            isguarantor: this.props.match.params.journey === "guarantor",
          });
        }

        payload.data.addInfo = JSON.stringify(payload.data.addInfo);
        this.props.uploadPOIDocs(payload);
      }
    }

    if (changedFields.passportfront || changedFields.passportback) {
      if (changedFields.passportfront) {
        this.setState({
          passportfront: changedFields.passportfront && true,
          document_upload_list_front: await this.getBase64(
            changedFields.passportfront.file
          ),
        });
      } else if (changedFields.passportback) {
        this.setState({
          passportback: changedFields.passportback && true,
          document_upload_list_back: await this.getBase64(
            changedFields.passportback.file
          ),
        });
      }

      if (allFields.passportfront && allFields.passportback) {
        const payload = { data: { addInfo: [] } };
        if (allFields.passportfront.file) {
          payload.back = allFields.passportfront;
          payload.data.addInfo.push({
            docName: allFields.passportfront.file.name,
            docType: "passport front",

            mobileNumber:
              "" + this.props.qde.getQdeSectionDetails.data.customerMobile,
            applicantUniqueId: this.props.match.params.id,
            leadCode: this.props.qde.getQdeSectionDetails.data.leadCode,
            ismainapplicant: this.props.match.params.journey === "applicant",
            isguarantor: this.props.match.params.journey === "guarantor",
          });
        }
        if (allFields.passportback.file) {
          payload.front = allFields.passportback;
          payload.data.addInfo.push({
            docName: allFields.passportback.file.name,
            docType: "passport back",

            mobileNumber:
              "" + this.props.qde.getQdeSectionDetails.data.customerMobile,
            applicantUniqueId: this.props.match.params.id,
            leadCode: this.props.qde.getQdeSectionDetails.data.leadCode,
            ismainapplicant: this.props.match.params.journey === "applicant",
            isguarantor: this.props.match.params.journey === "guarantor",
          });
        }
        payload.data.addInfo = JSON.stringify(payload.data.addInfo);
        this.props.uploadPOIDocs(payload);
      }
    }

    if (changedFields.voterfront || changedFields.voterback) {
      this.setState({ verifiedData: true });
      if (changedFields.voterfront) {
        this.setState({
          voterfront: changedFields.voterfront && true,
          document_upload_list_front: await this.getBase64(
            changedFields.voterfront.file
          ),
        });
      } else if (changedFields.voterback) {
        this.setState({
          voterback: changedFields.voterback && true,
          document_upload_list_back: await this.getBase64(
            changedFields.voterback.file
          ),
        });
      }

      if (allFields.voterfront && allFields.voterback) {
        const payload = { data: { addInfo: [] } };
        if (allFields.voterfront.file) {
          payload.back = allFields.voterfront;
          payload.data.addInfo.push({
            docName: allFields.voterfront.file.name,
            docType: "voter front",
            mobileNumber:
              "" + this.props.qde.getQdeSectionDetails.data.customerMobile,
            applicantUniqueId: this.props.match.params.id,
            leadCode: this.props.qde.getQdeSectionDetails.data.leadCode,
            ismainapplicant: this.props.match.params.journey === "applicant",
            isguarantor: this.props.match.params.journey === "guarantor",
          });
        }
        if (allFields.voterback.file) {
          payload.front = allFields.voterback;
          payload.data.addInfo.push({
            docName: allFields.voterback.file.name,
            docType: "voter back",
            mobileNumber:
              "" + this.props.qde.getQdeSectionDetails.data.customerMobile,
            applicantUniqueId: this.props.match.params.id,
            leadCode: this.props.qde.getQdeSectionDetails.data.leadCode,
            ismainapplicant: true,
            isguarantor: false,
          });
        }
        payload.data.addInfo = JSON.stringify(payload.data.addInfo);
        this.props.uploadPOIDocs(payload);
      }
    }
    if (changedFields.otherfront) {
      if (changedFields.otherfront) {
        this.setState({
          otherfront: changedFields.otherfront && true,
          document_upload_list_front: await this.getBase64(
            changedFields.otherfront.file
          ),
        });
      }
      if (allFields.otherfront) {
        const payload = { data: { addInfo: [] } };
        if (allFields.otherfront.file) {
          payload.back = allFields.otherfront;
          payload.data.addInfo.push({
            docName: allFields.otherfront.file.name,
            docType: "other",
            mobileNumber:
              "" + this.props.qde.getQdeSectionDetails.data.customerMobile,
            applicantUniqueId: this.props.match.params.id,
            leadCode: this.props.qde.getQdeSectionDetails.data.leadCode,
            ismainapplicant: this.props.match.params.journey === "applicant",
            isguarantor: this.props.match.params.journey === "guarantor",
          });
        }

        payload.data.addInfo = JSON.stringify(payload.data.addInfo);
        this.props.uploadPOIDocs(payload);
      }
    }
    if (
      changedFields.dlno ||
      changedFields.dateOfBirth ||
      changedFields.epicno
    ) {
      this.setState({ verifiedData: true });
    }
    if (changedFields.pinCode && changedFields.pinCode.length === 6) {
      this.setPincodeDetails(changedFields.pinCode);
    }
    if (changedFields.pinCode) {
      this.form.resetFields(["city", "state"]);
    }
  };
  setPincodeDetails = async (pinCode) => {
    const response = await getPincodeDetail({ pincode: pinCode });
    if (isEmpty(response)) {
      this.form.resetFields(["city", "state"]);
    }
    const { city, state } = response;
    if (city || state) {
      this.form.setFieldsValue({
        city,
        state,
      });
      this.setState({ city: city ? city : null, state: state ? state : null });
    } else {
      this.form.resetFields(["city", "state"]);
      this.setState({ city: null, state: null });
    }
  };

  setData = () => {
    const { kycaddresDetails } =
      this.props.qde.getQdeSectionDetails.data.additionalDetails;
    const type = kycaddresDetails.identityProofType;
    const payload = {
      address1: kycaddresDetails.address1,
      address2: kycaddresDetails.address2,
      residenceType: kycaddresDetails.residenceType,
      pinCode: kycaddresDetails.pinCode,
      city: kycaddresDetails.city,
      state: kycaddresDetails.state,
      kycYear: kycaddresDetails.kycYear,
      kycMonth: kycaddresDetails.kycMonth,
    };
   
    if (payload.address2) {
       this.setState({ InputLabelPropsAddr2: { shrink: true } });
    }
    let statePayload = {
      POADoc: this.state.POADoc,
      document_upload_list_front: this.state.document_upload_list_front,
      document_upload_list_back: this.state.document_upload_list_back,
      documentEdit: true,
    };
    if (type === "aadhar" || type === "adhar") {
      payload.aadharId = kycaddresDetails.identityProofNo;
      statePayload.POADoc = "aadhar";
      (kycaddresDetails.filePath || []).forEach((item) => {
        if (item.docType.toLowerCase().includes("front")) {
          payload.aadharfront = item.filePath.replace(
            "/var/www/html",
            BASE_URL
          );

          statePayload.document_upload_list_front = item.filePath.replace(
            "/var/www/html",
            BASE_URL
          );
          statePayload.aadharfront = true;
        } else if (item.docType.toLowerCase().includes("back")) {
          payload.aadharback = item.filePath.replace("/var/www/html", BASE_URL);

          statePayload.document_upload_list_back = item.filePath.replace(
            "/var/www/html",
            BASE_URL
          );
          statePayload.aadharback = true;
        }
      });
    }

    if (type === "passport") {
      this.setState({ isSelected: true });
      payload.fileNumber = kycaddresDetails.identityProofNo;
      payload.dateOfBirth = moment(kycaddresDetails.dateOfBirth, "DD/MM/YYYY");
      statePayload.POADoc = "passport";

      payload.fileNumber = kycaddresDetails.identityProofNo;
      payload.dateOfBirth =
        kycaddresDetails.dateOfBirth &&
        moment(kycaddresDetails.dateOfBirth, "DD/MM/YYYY");
      statePayload.POADoc = "passport";
      (kycaddresDetails.filePath || []).forEach((item) => {
        if (item.docType.toLowerCase().includes("front")) {
          payload.passportfront = item.filePath.replace(
            "/var/www/html",
            BASE_URL
          );

          statePayload.document_upload_list_front = item.filePath.replace(
            "/var/www/html",
            BASE_URL
          );
          statePayload.passportfront = true;
        } else if (item.docType.toLowerCase().includes("back")) {
          payload.passportback = item.filePath.replace(
            "/var/www/html",
            BASE_URL
          );

          statePayload.document_upload_list_back = item.filePath.replace(
            "/var/www/html",
            BASE_URL
          );
          statePayload.passportback = true;
        }
      });
    }
    if (type === "drivingLicense") {
      this.setState({ isSelected: true });
      payload.dlno = kycaddresDetails.identityProofNo;
      payload.dateOfBirth = moment(kycaddresDetails.dateOfBirth, "DD/MM/YYYY");
      statePayload.POADoc = "dl";

      (kycaddresDetails.filePath || []).forEach((item) => {
        if (item.docType.toLowerCase().includes("front")) {
          payload.dlfront = item.filePath.replace("/var/www/html", BASE_URL);

          statePayload.document_upload_list_front = item.filePath.replace(
            "/var/www/html",
            BASE_URL
          );
          statePayload.dlfront = true;
        }
      });
    }
    if (type === "voter") {
      payload.epicno = kycaddresDetails.epicNumber;
      statePayload.POADoc = "voter";

      (kycaddresDetails.filePath || []).forEach((item) => {
        if (item.docType.toLowerCase().includes("front")) {
          payload.voterfront = item.filePath.replace("/var/www/html", BASE_URL);

          statePayload.document_upload_list_front = item.filePath.replace(
            "/var/www/html",
            BASE_URL
          );
          statePayload.voterfront = true;
        } else if (item.docType.toLowerCase().includes("back")) {
          payload.voterback = item.filePath.replace("/var/www/html", BASE_URL);

          statePayload.document_upload_list_back = item.filePath.replace(
            "/var/www/html",
            BASE_URL
          );
          statePayload.voterback = true;
        }
      });
    }
    if (type === "other") {
      payload.otherName = kycaddresDetails.identityProofNo;
      statePayload.POADoc = "other";

      (kycaddresDetails.filePath || []).forEach((item) => {
        if (item.docType.toLowerCase().includes("other")) {
          payload.otherfront = item.filePath.replace("/var/www/html", BASE_URL);

          statePayload.document_upload_list_front = item.filePath.replace(
            "/var/www/html",
            BASE_URL
          );
          statePayload.otherfront = true;
        }
      });
    }
    this.form.setFieldsValue(payload);
    this.setState({
      ...this.state,
      ...statePayload,
    });
  };
  async componentDidMount() {
    console.log(
      this.props.qde &&
        this.props.qde.getQdeSectionDetails &&
        this.props.qde.getQdeSectionDetails.data &&
        this.props.qde.getQdeSectionDetails.data.additionalDetails &&
        this.props.qde.getQdeSectionDetails.data.additionalDetails
          .kycaddresDetails.address2
    );
   
   
    if (
      !isEmpty(this.props.qde.getQdeSectionDetails) &&
      !isEmpty(this.props.qde.getQdeSectionDetails.data) &&
      this.props.qde.getQdeSectionDetails &&
      this.props.qde.getQdeSectionDetails.data.additionalDetails &&
      this.props.qde.getQdeSectionDetails.data.additionalDetails
        .kycaddresDetails
    ) {
      this.setData();
     
    }

    this.setState({ kycDocdata: await getKycOther() });
  }
  componentDidUpdate(prevProps, prevState) {

    if (
      !isEmpty(this.props.qde.getQdeSectionDetails) &&
      !isEmpty(this.props.qde.getQdeSectionDetails.data) &&
      prevProps.qde.getQdeSectionDetails !==
        this.props.qde.getQdeSectionDetails &&
      this.props.qde.getQdeSectionDetails.data.additionalDetails &&
      this.props.qde.getQdeSectionDetails.data.additionalDetails
        .kycaddresDetails
    ) {
      this.setState({ InputLabelProps: { shrink: true } });
      this.setData();
    }
    if (
      prevProps.qde.uploadPOI !== this.props.qde.uploadPOI &&
      !isEmpty(this.props.qde.uploadPOI)
      ) {
      if (
        isEmpty(
          this.props.qde &&
            this.props.qde.uploadPOI &&
            this.props.qde.uploadPOI.addresdetails &&
            this.props.qde.uploadPOI.addresdetails.line2
        )
      ) {
        this.setState({ InputLabelPropsAddr2: { shrink: false } });
      } else {
        this.setState({ InputLabelPropsAddr2: { shrink: true } });
      }
      if (this.state.POADoc === "aadhar") {
        this.form.setFieldsValue({
          address1: this.props.qde.uploadPOI.addresdetails.line1,
          address2: this.props.qde.uploadPOI.addresdetails.line2,
          pinCode: this.props.qde.uploadPOI.addresdetails.pin,
          aadharId: this.props.qde.uploadPOI.addharNo,
        });
        // this.setState({ InputLabelPropsAddr2: { shrink: true } });
        this.setState({ aadharId: this.props.qde.uploadPOI.addharNo });
      }
      if (this.state.POADoc === "passport") {
        this.form.setFieldsValue({
          address1:
            this.props.qde.uploadPOI.addresdetails &&
            this.props.qde.uploadPOI.addresdetails.line1,
          address2:
            this.props.qde.uploadPOI.addresdetails &&
            this.props.qde.uploadPOI.addresdetails.line2,
          pinCode:
            this.props.qde.uploadPOI.addresdetails &&
            this.props.qde.uploadPOI.addresdetails.pin,
          aadharId: this.props.qde.uploadPOI.addharNo,
          dateOfBirth:
            this.props.qde.uploadPOI.dateofbirth &&
            moment(this.props.qde.uploadPOI.dateofbirth, "DD/MM/YYYY"),
          fileNumber: this.props.qde.uploadPOI.passportNum,
        });
      }
      if (this.state.POADoc === "dl") {
        this.form.setFieldsValue({
          dlno: this.props.qde.uploadPOI.dlno,
          dateOfBirth:
            this.props.qde.uploadPOI.dateOfBirth &&
            moment(this.props.qde.uploadPOI.dateOfBirth, "DD/MM/YYYY"),
        });
        if (this.props.qde.verifyDl) {
          const address = this.props.qde.verifyDl.address[0];
          this.form.setFieldsValue({
            address1: address.completeAddress,
            pinCode: address.pin,
          });
        }
      }
      if (this.state.POADoc === "voter") {
        if (!isEmpty(this.props.qde.uploadPOI)) {
          this.form.setFieldsValue({
            epicno:
              this.props.qde.uploadPOI && this.props.qde.uploadPOI.voterNo,
            address1:
              this.props.qde.uploadPOI &&
              this.props.qde.uploadPOI.addressDetails &&
              this.props.qde.uploadPOI.addressDetails.line1,
            address2:
              this.props.qde.uploadPOI &&
              this.props.qde.uploadPOI.addressDetails &&
              this.props.qde.uploadPOI.addressDetails.line2,
            city:
              this.props.qde.uploadPOI &&
              this.props.qde.uploadPOI.addressDetails &&
              this.props.qde.uploadPOI.addressDetails.city,
            state:
              this.props.qde.uploadPOI &&
              this.props.qde.uploadPOI.addressDetails &&
              this.props.qde.uploadPOI.addressDetails.state,
          });
        }
      }
    }

    if (
      prevProps.qde.uploadPOI !== this.props.qde.uploadPOI &&
      this.props.qde.uploadPOI.addresdetails &&
      this.props.qde.uploadPOI.addresdetails.pin
    ) {
      this.setPincodeDetails(this.props.qde.uploadPOI.addresdetails.pin);
    }
    if (this.state.POADoc === "dl") {
      if (
        prevProps.qde.verifyDl !== this.props.qde.verifyDl &&
        this.props.qde.verifyDl
      ) {
        this.form.setFieldsValue({
          address1:
            this.props.qde.verifyDl &&
            this.props.qde.verifyDl.address &&
            this.props.qde.verifyDl.address[0] &&
            this.props.qde.verifyDl.address[0].completeAddress,
          pinCode:
            this.props.qde.verifyDl &&
            this.props.qde.verifyDl.address &&
            this.props.qde.verifyDl.address[0] &&
            this.props.qde.verifyDl.address[0].pin,
        });
        this.setPincodeDetails(
          this.props.qde.verifyDl &&
            this.props.qde.verifyDl.address &&
            this.props.qde.verifyDl.address[0] &&
            this.props.qde.verifyDl.address[0].pin
        );
      }
    }
    if (this.state.POADoc === "voter") {
      if (prevProps.qde.verifyVoter !== this.props.qde.verifyVoter) {
        this.form.setFieldsValue({
          address1:
            this.props.qde.verifyVoter && this.props.qde.verifyVoter.address,
          city:
            this.props.qde.verifyVoter && this.props.qde.verifyVoter.district,
          state: this.props.qde.verifyVoter && this.props.qde.verifyVoter.state,
        });
      }
    }
  }

  getResidentTypeDropdown = () => {
    let response = [];

    if (
      !isEmpty(this.props.qde.getQdeSectionDetails) &&
      !isEmpty(this.props.qde.getQdeSectionDetails.data) &&
      !isEmpty(this.props.qde.getQdeSectionDetails.data.pangstdetails)
    ) {
      if (
        this.props.qde.getQdeSectionDetails.data.pangstdetails.customerType ===
        "individual"
      ) {
        response =
          this.props.qde.residentType &&
          this.props.qde.residentType.indirestype;
      } else if (
        this.props.qde.getQdeSectionDetails.data.pangstdetails.customerType ===
        "non-individual"
      ) {
        response =
          this.props.qde.residentType &&
          this.props.qde.residentType.nonindrestype;
      }
      return response;
    }
  };

  verifyDl = () => {
    const dateOfBirthValidation = this.form.getFieldValue("dateOfBirth");
    const dlno = this.form.getFieldValue("dlno");
    if (!dateOfBirthValidation && !dlno) {
      this.form.setFields([
        {
          name: ["dateOfBirth"],
          errors: ["Date of birth is mandatory"],
        },
        {
          name: ["dlno"],
          errors: ["Driving license number is mandatory"],
        },
      ]);
      return;
    }

    const dateOfBirth = moment(
      this.form.getFieldValue("dateOfBirth"),
      "DD/MM/YYYY"
    ).format("DD-MM-YYYY");
    const dlNo = this.form.getFieldValue("dlno");
    this.props.verifyDl({
      dateOfBirth,
      dlNo,
      employeeId: JSON.parse(localStorage.getItem("UserData"))
        ? JSON.parse(localStorage.getItem("UserData")).employeeId
        : "",
      employeeName: JSON.parse(localStorage.getItem("UserData"))
        ? JSON.parse(localStorage.getItem("UserData")).employeeName
        : "",
      applicantUniqueId: this.props.match.params.id,
    });
  };

  verifyVoter = () => {
    const epicNo = this.form.getFieldValue("epicno");
    if (!epicNo) {
      this.form.setFields([
        {
          name: ["epicno"],
          errors: ["Epic No is mandatory"],
        },
      ]);
      return;
    }
    this.props.verifyVoter({
      epicNo,
      employeeId: JSON.parse(localStorage.getItem("UserData"))
        ? JSON.parse(localStorage.getItem("UserData")).employeeId
        : "",
      employeeName: JSON.parse(localStorage.getItem("UserData"))
        ? JSON.parse(localStorage.getItem("UserData")).employeeName
        : "",
      applicantUniqueId: this.props.match.params.id,
    });
  };

  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  deleteUpload = (type, key) => {
    const deleteFile =
      type.toLowerCase() === "front"
        ? this.state.document_upload_list_front
        : this.state.document_upload_list_back;
    let docName = null;
    if (this.state.documentEdit) {
      const deleteFileArray = deleteFile.split("/");
      docName = deleteFileArray[deleteFileArray.length - 1];
      const payload = {};
      payload[key] = false;
      this.setState({ ...this.state, ...payload });
    } else {
      docName = this.form.getFieldValue(key).file.name;
      const payload = {};
      payload[key] = false;

      this.setState({ ...this.state, ...payload });
    }
    this.props.deleteDocuments({
      applicantUniqueId: this.props.match.params.id,
      docName,
      deleteflag: false,
    });
    const resetFiledsData = [
      "address1",
      "address2",
      "residenceType",
      "pinCode",
      "city",
      "state",
      "aadharId",
      "fileNumber",
      "dlno",
      "epicno",
      "otherName",
      "dateOfBirth",
      "otherfront",
    ];
    if (type.toLowerCase() === "back") {
      resetFiledsData.push("aadharback");
      resetFiledsData.push("passportback");
      resetFiledsData.push("voterback");
    } else {
      resetFiledsData.push("aadharfront");
      resetFiledsData.push("passportfront");
      resetFiledsData.push("voterfront");
      resetFiledsData.push("dlfront");
    }
    this.form.resetFields(resetFiledsData);
    this.setState({ verifiedData: true });
  };

  disabledDate = (current) => {
    // Can not select days after today and today
    return current > moment().clone().subtract(18, "years");
  };

  resetDate = () => {
    if (
      this.state.POADoc === "aadhar" ||
      this.state.POADoc === "passport" ||
      this.state.POADoc === "dl" ||
      this.state.POADoc === "voter" ||
      this.state.POADoc === "other"
    ) {
      this.props.deleteDocuments({
        applicantUniqueId: this.props.match.params.id,
        deleteflag: true,
      });
    }

    this.form.resetFields([
      "address1",
      "address2",
      "residenceType",
      "pinCode",
      "city",
      "state",
      "aadharId",
      "fileNumber",
      "dlno",
      "epicno",
      "otherName",
      "dateOfBirth",
      "kycMonth",
      "kycYear",
    ]);
    this.setState({
      aadharfront: false,
      aadharback: false,
      passportfront: false,
      passportback: false,
      dlfront: false,
      voterfront: false,
      voterback: false,
      otherfront: false,
      verifiedData: true,
    });
  };

  render() {
    const identityProofNo =
      this.props.qde.getQdeSectionDetails &&
      this.props.qde.getQdeSectionDetails.data &&
      this.props.qde.getQdeSectionDetails.data.additionalDetails &&
      this.props.qde.getQdeSectionDetails.data.additionalDetails
        .kycaddresDetails &&
      this.props.qde.getQdeSectionDetails.data.additionalDetails
        .kycaddresDetails.identityProofNo;

    const identityProofNoCheck = !!(
      this.props.qde.getQdeSectionDetails &&
      this.props.qde.getQdeSectionDetails.data &&
      this.props.qde.getQdeSectionDetails.data.additionalDetails &&
      this.props.qde.getQdeSectionDetails.data.additionalDetails
        .kycaddresDetails &&
      this.props.qde.getQdeSectionDetails.data.additionalDetails
        .kycaddresDetails.identityProofNo
    );

    const bithDate =
      this.props.qde.getQdeSectionDetails &&
      this.props.qde.getQdeSectionDetails.data &&
      this.props.qde.getQdeSectionDetails.data.additionalDetails &&
      this.props.qde.getQdeSectionDetails.data.additionalDetails
        .kycaddresDetails &&
      this.props.qde.getQdeSectionDetails.data.additionalDetails
        .kycaddresDetails.dateOfBirth;

    const identityProofType =
      this.props.qde.getQdeSectionDetails &&
      this.props.qde.getQdeSectionDetails.data &&
      this.props.qde.getQdeSectionDetails.data.additionalDetails &&
      this.props.qde.getQdeSectionDetails.data.additionalDetails
        .kycaddresDetails &&
      this.props.qde.getQdeSectionDetails.data.additionalDetails
        .kycaddresDetails.identityProofType;

    const inputProps = {
      readOnly: this.props.freezeCase || this.props.freezeUser,
      disabled: this.props.freezeCase || this.props.freezeUser,
    };

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
          isNumericString
          format="#### #### ####"
          //  mask=" "
        />
      );
    }

    const { POADoc } = this.state;
    const { customerType } = this.props.qde.pangst.data;
    const buttonRow = map(
      [
        { key: "aadhar", name: "Aadhar Card" },
        { key: "passport", name: "Passport" },
        { key: "dl", name: "Driving license" },
        { key: "voter", name: "Voter's ID" },
        { key: "other", name: "Other" },
      ],
      (item) => {
        return (
          <Col
            lg={3}
            className={`${
              POADoc === null
                ? "enabledButtonRow"
                : POADoc !== item.key
                ? "disabledButtonRow"
                : ""
            }`}
            onClick={(e) => {
              if (POADoc === null || POADoc === item.key) {
                this.resetDate();
                this.setState({
                  POADoc: POADoc === item.key ? null : item.key,
                });
              }
            }}>
            <div className={"buttonIcon"}>
              {POADoc === item.key ? <MinusOutlined /> : <PlusOutlined />}
            </div>
            <h5 className="buttonName">{item.name}</h5>
            <div className="Shape">
              <InfoCircleOutlined />
            </div>
          </Col>
        );
      }
    );
    const residentTypeDropdownList = [
      <option hidden> {} </option>,
      ...map(this.getResidentTypeDropdown(), (item) => {
        return <option value={item.residenceType}>{item.residenceType}</option>;
      }),
    ];

    const otherKycDropdownList = [
      <option hidden> {} </option>,
      ...map(this.state.kycDocdata, (item) => {
        return <option value={item.kycdoclist}>{item.kycdoclist}</option>;
      }),
    ];

    const customFormat = (value) => {
      return value.format("DD/MM/YYYY");
    };

    return (
      <div className="additionalDetails-Container">
        {customerType === "non-individual" && (
          <Row>
            <Col lg={24}>
              <p className="sub-title">Designation</p>
              <Radio.Group>
                <Radio value={1}>Director</Radio>
                <Radio value={2}>Partner</Radio>
                <Radio value={3}>Proprietor</Radio>
                <Radio value={4}>Other</Radio>
              </Radio.Group>
            </Col>
          </Row>
        )}

        {!(this.props.freezeCase || this.props.freezeUser) && (
          <Row className={"buttonRow"} gutter={30}>
            {buttonRow}
          </Row>
        )}
        <Form
          onValuesChange={this.formChange}
          onFinish={this.submitForm}
          ref={(e) => (this.form = e)}>
          <Row className={"documentRow"}>
            <Col lg={24}>
              {POADoc === "aadhar" && (
                <div className={"aadharWrapper"}>
                  <Row className={"pt-3"} gutter={30}>
                    <Col lg={6}>
                      <Form.Item
                        name={"aadharId"}
                        rules={[
                          {
                            required: true,
                            message: "Aadhar id is mandatory",
                          },
                        ]}>
                        
                        <TextField
                          className="aadharIdInput"
                          id="aadharId"
                          label="Aadhar ID*"
                          fullWidth={true}
                          name="numberformat"
                          type="number"
                          inputProps={inputProps}
                          InputProps={{
                            // inputComponent: NumberFormatCustom,
                            shrink:
                              (this.form &&
                                this.form.getFieldValue("aadharId")) ||
                              this.state.aadharId,
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={30}>
                    <Col lg={6}>
                      <Form.Item
                        name={"aadharfront"}
                        rules={[
                          {
                            required: true,
                            message: "Aadhar front image is mandatory",
                          },
                        ]}>
                        {!this.state.aadharfront &&
                          !(this.props.freezeCase || this.props.freezeUser) && (
                            <Upload.Dragger
                              accept=".jpeg, .jpg, .png"
                              showUploadList={false}
                              beforeUpload={() => {
                                return false;
                              }}>
                              {!this.state.aadharfront &&
                                this.getUploadButton("Front")}
                            </Upload.Dragger>
                          )}
                      </Form.Item>
                      {this.state.aadharfront && (
                        <div className={"uploadedImageWrapper"}>
                          {!(
                            this.props.freezeCase || this.props.freezeUser
                          ) && (
                            <span
                              onClick={(e) =>
                                this.deleteUpload("Front", "aadharfront")
                              }>
                              X
                            </span>
                          )}
                          <img
                            style={{ marginTop: "-20%" }}
                            alt={"Uploaded Document"}
                            src={this.state.document_upload_list_front}
                          />
                        </div>
                      )}
                    </Col>
                    <Col lg={6}>
                      <Form.Item
                        name="aadharback"
                        rules={[
                          {
                            required: true,
                            message: "Aadhar back image is mandatory",
                          },
                        ]}>
                        {!this.state.aadharback &&
                          !(this.props.freezeCase || this.props.freezeUser) && (
                            <Upload.Dragger
                              accept=".jpeg, .jpg, .png"
                              showUploadList={false}
                              beforeUpload={() => {
                                return false;
                              }}>
                              {!this.state.aadharback &&
                                this.getUploadButton("Back")}
                            </Upload.Dragger>
                          )}
                      </Form.Item>
                      {this.state.aadharback && (
                        <div className={"uploadedImageWrapper"}>
                          {!(
                            this.props.freezeCase || this.props.freezeUser
                          ) && (
                            <span
                              onClick={(e) => {
                                this.deleteUpload("back", "aadharback");
                              }}>
                              X
                            </span>
                          )}
                          <img
                            style={{ marginTop: "-20%" }}
                            alt={"Uploaded Document"}
                            src={this.state.document_upload_list_back}
                          />
                        </div>
                      )}
                    </Col>
                  </Row>
                </div>
              )}
              {POADoc === "passport" && (
                <div className={"passportWrapper"}>
                  <Row className={"pt-3"} gutter={30}>
                    <Col lg={6}>
                      <Form.Item
                        name={"fileNumber"}
                        rules={[
                          {
                            required: true,
                            message: "File  number is mandatory",
                          },
                          {
                            pattern: new RegExp(/[A-Z]{1}[0-9]{7}/),
                            message: "Invalid File Number",
                          },
                        ]}>
                        <TextField
                          inputProps={inputProps}
                          InputLabelProps={{
                            shrink:
                              this.form &&
                              this.form.getFieldValue("fileNumber"),
                          }}
                          onInput={(e) => {
                            e.target.value = e.target.value.toString()
                              ? // .match(/^[a-zA-Z ]*$/)
                                e.target.value.toString().slice(0, 8)
                              : e.target.value
                                  .toString()
                                  .slice(0, e.target.value.length - 1);
                          }}
                          fullwidth
                          name="leadName"
                          label="File Number*"
                        />
                      </Form.Item>
                    </Col>
                    {/* MuiInputLabel-formControl*/}
                    <Col lg={6}>
                      <label
                        id={"date-picker-label"}
                        for={"dateOfBirth"}
                        className={`MuiFormLabel-root MuiInputLabel-root ${
                          (this.form &&
                            this.form.getFieldValue("dateOfBirth")) ||
                          this.state.isSelected
                            ? "MuiInputLabel-animated MuiInputLabel-shrink"
                            : ""
                        } MuiInputLabel-formControl MuiInputLabel-animated`}
                        data-shrink="false">
                        Date of Birth*
                      </label>
                      <Form.Item
                        name={"dateOfBirth"}
                        rules={[
                          {
                            required: true,
                            message: "Date of birth is mandatory",
                          },
                        ]}>
                        <DatePicker
                          disabledDate={this.disabledDate}
                          format={customFormat}
                          disabled={
                            this.props.freezeCase || this.props.freezeUser
                          }
                          placeholder={""}
                          onChange={this.handleChangeDate}
                          labelId={"date-picker-label"}
                          bordered={false}
                          className={
                            "MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl"
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={30}>
                    <Col lg={6}>
                      <Form.Item
                        name={"passportfront"}
                        rules={[
                          {
                            required: true,
                            message: "Passport front image is mandatory",
                          },
                        ]}>
                        {!this.state.passportfront &&
                          !(this.props.freezeCase || this.props.freezeUser) && (
                            <Upload.Dragger
                              accept=".jpeg, .jpg, .png"
                              showUploadList={false}
                              beforeUpload={() => {
                                return false;
                              }}>
                              {!this.state.passportfront &&
                                this.getUploadButton("Front")}
                            </Upload.Dragger>
                          )}
                      </Form.Item>
                      {this.state.passportfront && (
                        <div className={"uploadedImageWrapper"}>
                          {!(
                            this.props.freezeCase || this.props.freezeUser
                          ) && (
                            <span
                              onClick={(e) =>
                                this.deleteUpload("Front", "passportfront")
                              }>
                              X
                            </span>
                          )}
                          <img
                            style={{ marginTop: "-20%" }}
                            alt={"Uploaded Document"}
                            src={this.state.document_upload_list_front}
                          />
                        </div>
                      )}
                    </Col>
                    <Col lg={6}>
                      <Form.Item
                        name={"passportback"}
                        rules={[
                          {
                            required: true,
                            message: "Passport back image is mandatory",
                          },
                        ]}>
                        {!this.state.passportback &&
                          !(this.props.freezeCase || this.props.freezeUser) && (
                            <Upload.Dragger
                              accept=".jpeg, .jpg, .png"
                              showUploadList={false}
                              beforeUpload={() => {
                                return false;
                              }}>
                              {!this.state.passportback &&
                                this.getUploadButton("Back")}
                            </Upload.Dragger>
                          )}
                      </Form.Item>
                      {this.state.passportback && (
                        <div className={"uploadedImageWrapper"}>
                          {!(
                            this.props.freezeCase || this.props.freezeUser
                          ) && (
                            <span
                              onClick={(e) =>
                                this.deleteUpload("back", "passportback")
                              }>
                              X
                            </span>
                          )}
                          <img
                            style={{ marginTop: "-20%" }}
                            alt={"Uploaded Document"}
                            src={this.state.document_upload_list_back}
                          />
                        </div>
                      )}
                    </Col>
                  </Row>
                </div>
              )}
              {POADoc === "dl" && (
                <div className={"dlWrapper"}>
                  <Row className={"pt-3"} gutter={30}>
                    <Col lg={6}>
                      <Form.Item
                        name={"dlno"}
                        rules={[
                          {
                            required: true,
                            message: "Driving license number is mandatory",
                          },
                          {
                            pattern: new RegExp(/^[^*|\":<>[\]{}`\\()';@&$]+$/),
                            message: "Invalid DL Number",
                          },
                        ]}>
                        <TextField
                          inputProps={inputProps}
                          InputLabelProps={{
                            shrink:
                              this.form && this.form.getFieldValue("dlno"),
                          }}
                          fullwidth
                          id="standard-basic"
                          label="DL No*"
                          className="aadharIdInput"
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={6}>
                      <label
                        id={"date-picker-label"}
                        for={"dateOfBirth"}
                        // className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-animated  MuiInputLabel-formControl"
                        className={`MuiFormLabel-root MuiInputLabel-root ${
                          (this.form &&
                            this.form.getFieldValue("dateOfBirth")) ||
                          this.state.isSelected
                            ? "MuiInputLabel-animated MuiInputLabel-shrink"
                            : ""
                        } MuiInputLabel-formControl MuiInputLabel-animated`}
                        data-shrink="false">
                        Date of Birth*
                      </label>
                      <Form.Item
                        name={"dateOfBirth"}
                        rules={[
                          {
                            required: true,
                            message: "Date of birth is mandatory",
                          },
                        ]}>
                        <DatePicker
                          format={customFormat}
                          disabledDate={this.disabledDate}
                          // disabled={this.state.disablePanVerify}
                          disabled={
                            this.props.freezeCase || this.props.freezeUser
                          }
                          placeholder={""}
                          onChange={this.handleChangeDate}
                          labelId={"date-picker-label"}
                          bordered={false}
                          className={
                            "MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl"
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={30}>
                    <Col lg={6}>
                      <Form.Item
                        name={"dlfront"}
                        rules={[
                          {
                            required: true,
                            message: "Drivling license image is mandatory",
                          },
                        ]}>
                        {!this.state.dlfront &&
                          !(this.props.freezeCase || this.props.freezeUser) && (
                            <Upload.Dragger
                              accept=".jpeg, .jpg, .png"
                              showUploadList={false}
                              beforeUpload={() => {
                                return false;
                              }}>
                              {!this.state.dlfront &&
                                this.getUploadButton("dlfront")}
                            </Upload.Dragger>
                          )}
                      </Form.Item>
                      {this.state.dlfront && (
                        <div className={"uploadedImageWrapper"}>
                          {!(
                            this.props.freezeCase || this.props.freezeUser
                          ) && (
                            <span
                              onClick={(e) =>
                                this.deleteUpload("Front", "dlfront")
                              }>
                              X
                            </span>
                          )}
                          <img
                            style={{ marginTop: "-20%" }}
                            alt={"Uploaded Document"}
                            src={this.state.document_upload_list_front}
                          />
                        </div>
                      )}
                    </Col>
                    <Col lg={10}></Col>
                    <Col lg={4}>
                      
                    </Col>
                    <Col lg={4}>
                      <Button
                        onClick={this.verifyDl}
                        className="save-button"
                        disabled={
                          this.props.freezeCase || this.props.freezeUser
                        }
                       
                      >
                        {" "}
                        Verify{" "}
                      </Button>
                    </Col>
                  </Row>
                </div>
              )}
              {POADoc === "voter" && (
                <div className={"voterWrapper"}>
                  <Row className={"pt-3"} gutter={30}>
                    <Col lg={6}>
                      <Form.Item
                        name={"epicno"}
                        rules={[
                          {
                            required: true,
                            message: "Epic No is mandatory",
                          },
                        ]}>
                        <TextField
                          inputProps={inputProps}
                          InputLabelProps={{
                            shrink:
                              this.form && this.form.getFieldValue("epicno"),
                          }}
                          fullwidth
                          name="leadName"
                          id="standard-basic"
                          label="Epic No*"
                          className="aadharIdInput"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={30}>
                    <Col lg={6}>
                      <Form.Item
                        name="voterfront"
                        rules={[
                          {
                            required: true,
                            message: "Voter front image is mandatory",
                          },
                        ]}>
                        {!this.state.voterfront &&
                          !(this.props.freezeCase || this.props.freezeUser) && (
                            <Upload.Dragger
                              accept=".jpeg, .jpg, .png"
                              showUploadList={false}
                              beforeUpload={() => {
                                return false;
                              }}>
                              {!this.state.voterfront &&
                                this.getUploadButton("Front")}
                            </Upload.Dragger>
                          )}
                      </Form.Item>
                      {this.state.voterfront && (
                        <div className={"uploadedImageWrapper"}>
                          {!(
                            this.props.freezeCase || this.props.freezeUser
                          ) && (
                            <span
                              onClick={(e) =>
                                this.deleteUpload("Front", "voterfront")
                              }>
                              X
                            </span>
                          )}
                          <img
                            style={{ marginTop: "-20%" }}
                            alt={"Uploaded Document"}
                            src={this.state.document_upload_list_front}
                          />
                        </div>
                      )}
                    </Col>
                    <Col lg={6}>
                      <Form.Item
                        name="voterback"
                        rules={[
                          {
                            required: true,
                            message: "Voter back image is mandatory",
                          },
                        ]}>
                        {!this.state.voterback &&
                          !(this.props.freezeCase || this.props.freezeUser) && (
                            <Upload.Dragger
                              accept=".jpeg, .jpg, .png"
                              showUploadList={false}
                              beforeUpload={() => {
                                return false;
                              }}>
                              {!this.state.voterback &&
                                this.getUploadButton("Back")}
                            </Upload.Dragger>
                          )}
                      </Form.Item>
                      {this.state.voterback && (
                        <div className={"uploadedImageWrapper"}>
                          {!(
                            this.props.freezeCase || this.props.freezeUser
                          ) && (
                            <span
                              onClick={(e) =>
                                this.deleteUpload("back", "voterback")
                              }>
                              X
                            </span>
                          )}
                          <img
                            style={{ marginTop: "-20%" }}
                            alt={"Uploaded Document"}
                            src={this.state.document_upload_list_back}
                          />
                        </div>
                      )}
                    </Col>
                    <Col lg={4}></Col>
                    <Col lg={4}>
                      {((this.props.qde.verifyVoter &&
                        this.props.qde.verifyVoter.epicNo) ||
                        (identityProofNo &&
                          identityProofType === "voter" &&
                          this.state.verifiedData === false)) && (
                        <div className="verifyPOI verifyButtonTheme">
                          <img
                            src={Verified}
                            alt={"Verified"}
                            style={{ marginTop: "2%" }}
                          />
                          Verified
                        </div>
                      )}
                    </Col>
                    <Col lg={4}>
                      <Button
                        onClick={this.verifyVoter}
                        className="save-button"
                        disabled={
                          (this.props.qde.verifyVoter &&
                            this.props.qde.verifyVoter.epicNo) ||
                          (identityProofNo &&
                            this.state.verifiedData === false) ||
                          this.props.freezeCase ||
                          this.props.freezeUser
                        }>
                        {" "}
                        Verify{" "}
                      </Button>
                    </Col>
                  </Row>
                </div>
              )}
              {POADoc === "other" && (
                <div className={"otherWrapper"}>
                  <Row className={"pt-3"} gutter={30}>
                    <Col lg={6}>
                      <div className={"mui-dropdown-wrapper"}>
                        <img
                          alt={"select"}
                          src={SelectIcon}
                          className="searchIcon"
                        />
                        <Form.Item
                          name={"otherName"}
                          rules={[
                            {
                              required: true,
                              message: "Other  is mandatory",
                            },
                          ]}>
                          <TextField
                            inputProps={inputProps}
                            InputLabelProps={{
                              shrink:
                                this.form &&
                                this.form.getFieldValue("otherName"),
                            }}
                            label="Other*"
                            select
                            fullWidth
                            SelectProps={{
                              native: true,
                            }}>
                            {otherKycDropdownList}
                          </TextField>
                        </Form.Item>
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={30}>
                    <Col lg={6}>
                      <Form.Item
                        name="otherfront"
                        rules={[
                          {
                            required: true,
                            message: "Other document image is mandatory",
                          },
                        ]}>
                        {!this.state.otherfront &&
                          !(this.props.freezeCase || this.props.freezeUser) && (
                            <Upload.Dragger
                              showUploadList={false}
                              beforeUpload={() => {
                                return false;
                              }}>
                              {!this.state.otherfront &&
                                this.getUploadButton("Front")}
                            </Upload.Dragger>
                          )}
                      </Form.Item>
                      {this.state.otherfront && (
                        <div className={"uploadedImageWrapper"}>
                          {!(
                            this.props.freezeCase || this.props.freezeUser
                          ) && (
                            <span
                              onClick={(e) =>
                                this.deleteUpload("Front", "otherfront")
                              }>
                              X
                            </span>
                          )}
                          <img
                            style={{ marginTop: "-20%" }}
                            alt={"Uploaded Document"}
                            src={this.state.document_upload_list_front}
                          />
                        </div>
                      )}
                    </Col>
                  </Row>
                </div>
              )}
            </Col>
            <Col lg={6}>
              {this.state.POADoc !== null &&
                !this.props.qde.docUploadSuccess &&
                !identityProofNoCheck && (
                  <p style={{ marginTop: "-2%" }}>Document is mandatory*</p>
                )}
            </Col>
            <Col lg={6}>
              {this.state.POADoc !== null &&
                !this.props.qde.docUploadSuccess &&
                !identityProofNoCheck && (
                  <p style={{ marginTop: "-2%", marginLeft: "4%" }}>
                    {this.state.POADoc === "aadhar" ||
                    this.state.POADoc === "passport" ||
                    this.state.POADoc === "voter"
                      ? "Document is mandatory*"
                      : ""}
                  </p>
                )}
            </Col>
          </Row>

          <p className="sub-title">Residential Address 1*</p>
          <Row className={"typeRow"} gutter={40}>
            <Col lg={8}>
              <Form.Item
                name={"address1"}
                rules={[
                  {
                    required: true,
                    message: "Address is mandatory",
                  },
                ]}>
                <TextField
                  inputProps={inputProps}
                  InputLabelProps={{
                    shrink: this.form && this.form.getFieldValue("address1"),
                  }}
                  fullWidth={true}
                  id="standard-basic"
                  label="Address Line 1*"
                  className="textField fileNoinput"
                />
              </Form.Item>
            </Col>
            <Col lg={8}>
              <Form.Item name={"address2"}>
                <TextField
                  inputProps={inputProps}
                  // InputLabelProps={{
                  //   shrink: this.form && this.form.getFieldValue("address2"),
                  // }}
                  InputLabelProps={this.state.InputLabelPropsAddr2 }
                  name="leadName"
                  fullWidth={true}
                  id="standard-basic"
                  label="Address Line 2"
                  className="textField fileNoinput"
                />
              </Form.Item>
            </Col>
            <Col lg={8}></Col>

            <Col lg={8}>
              <Form.Item
                name={"pinCode"}
                rules={[
                  {
                    required: true,
                    message: "Pincode is mandatory",
                  },
                  {
                    pattern: new RegExp(/[0-9]{6}$/),
                    message: "Invalid Pincode",
                  },
                ]}>
                <TextField
                  inputProps={inputProps}
                  InputLabelProps={{
                    shrink: this.form && this.form.getFieldValue("pinCode"),
                  }}
                  name="leadName"
                  fullWidth={true}
                  id="standard-basic"
                  label="Pincode*"
                  className="textField fileNoinput"
                  onKeyDown={(e) =>
                    (e.keyCode === 69 || e.keyCode === 190) &&
                    e.preventDefault()
                  }
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 6);
                  }}
                  type="number"
                />
              </Form.Item>
            </Col>
            <Col lg={8}>
              <Form.Item
                name={"city"}
                rules={[
                  {
                    required: true,
                    message: "City is mandatory",
                  },
                ]}>
                <TextField
                  inputProps={inputProps}
                  InputLabelProps={{
                    shrink: this.form && this.form.getFieldValue("city"),
                  }}
                  name="city"
                  fullWidth={true}
                  id="standard-basic"
                  label="City*"
                  className="textField fileNoinput"
                  onInput={(e) => {
                    e.target.value = e.target.value
                      .toString()
                      .match(/^[a-zA-Z ]*$/)
                      ? e.target.value.toString().slice(0, 50)
                      : e.target.value
                          .toString()
                          .slice(0, e.target.value.length - 1);
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={8}>
              <Form.Item
                name={"state"}
                rules={[
                  {
                    required: true,
                    message: "State is mandatory",
                  },
                ]}>
                <TextField
                  inputProps={inputProps}
                  InputLabelProps={{
                    shrink: this.form && this.form.getFieldValue("state"),
                  }}
                  name="leadName"
                  fullWidth={true}
                  id="standard-basic"
                  label="State*"
                  className="textField fileNoinput"
                  onInput={(e) => {
                    e.target.value = e.target.value
                      .toString()
                      .match(/^[a-zA-Z ]*$/)
                      ? e.target.value.toString().slice(0, 50)
                      : e.target.value
                          .toString()
                          .slice(0, e.target.value.length - 1);
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={8}>
              <div className={"mui-dropdown-wrapper"}>
                <img alt={"select"} src={SelectIcon} className="searchIcon" />
                <Form.Item
                  name={"residenceType"}
                  rules={[
                    {
                      required: true,
                      message: "Residence type is mandatory",
                    },
                  ]}>
                  <TextField
                    inputProps={inputProps}
                    InputLabelProps={{
                      shrink:
                        this.form && this.form.getFieldValue("residenceType"),
                    }}
                    label="Residence type*"
                    select
                    fullWidth
                    SelectProps={{
                      native: true,
                    }}>
                    {residentTypeDropdownList}
                  </TextField>
                </Form.Item>
              </div>
            </Col>
          </Row>
          <br />
          <p className="sub-title">Residing at Current Address since*</p>
          <Row gutter={40}>
            <Col lg={8}>
              <Form.Item
                name={"kycYear"}
                rules={[
                  {
                    required: true,
                    message: "Years is mandatory",
                  },
                ]}>
                <TextField
                  inputProps={inputProps}
                  InputLabelProps={{
                    shrink: this.form && this.form.getFieldValue("year"),
                  }}
                  fullWidth={true}
                  id="standard-basic"
                  label="Years*"
                  className="textField fileNoinput"
                  onKeyDown={(e) =>
                    (e.keyCode === 69 || e.keyCode === 190) &&
                    e.preventDefault()
                  }
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 2);
                  }}
                  type="number"
                  key={Math.random()}
                />
              </Form.Item>
            </Col>

            <Col lg={8}>
              <div className={"mui-dropdown-wrapper"}>
                <img alt={"select"} src={SelectIcon} className="searchIcon" />
                <Form.Item
                  name={"kycMonth"}
                  rules={[
                    {
                      required: true,
                      message: "Months is mandatory",
                    },
                  ]}>
                  <TextField
                    key={Math.random()}
                    inputProps={inputProps}
                    InputLabelProps={{
                      shrink: this.form && this.form.getFieldValue("month"),
                    }}
                    label="Months*"
                    select
                    fullWidth
                    SelectProps={{
                      native: true,
                    }}
                    onChange={(e) => {
                      this.setState({ month: e.target.value });
                    }}>
                    <option hidden></option>
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                  </TextField>
                </Form.Item>
              </div>
            </Col>
          </Row>
          <div className="buttonSave  mt-4 mb-2">
            {!(this.props.freezeCase || this.props.freezeUser) && (
              <Button
                htmlType={"submit"}
                className="save-button"
                disabled={
                  !this.props.qde.docUploadSuccess && !identityProofNoCheck
                }>
                Save
              </Button>
            )}
          </div>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { qde: state.qde };
};

const mapDispatchToProps = {
  uploadPOIDocs,
  verifyDl,
  savePOIDetails,
  verifyVoter,
  deleteDocuments,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsUtility);
