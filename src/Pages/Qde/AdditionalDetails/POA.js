import {
  InfoCircleOutlined,
  LoadingOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import TextField from "@material-ui/core/TextField";
import { Button, Col, Form, message, Row, Upload, Radio } from "antd";
import { isEmpty, map } from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import SelectIcon from "../../../assets/Images/select.svg";
import {
  deleteUtilityDocuments,
  getCityForPOA,
  getElectricityCompanyName,
  getPincodeDetail,
  getUtilityBillDetails,
  getUtilityOther,
  saveUtilityBillDetail,
  uploadPOADocs,
  verifyDl,
} from "../../../Redux/Services/Qde";
import { BASE_URL } from "../../../Utility/Config";
import pdfIcon from "../../../assets/Images/pdfIcon.png";
import { FormatColorReset } from "@material-ui/icons";

class DetailsUtility extends Component {
  state = {
    POADoc: null,
    eBillFront: false,
    document_upload_list_front: null,
    utilityDocData: [],
    cityData: [],
    electricityCompany: [],
    documentEdit: false,
    gBill: false,
    landBill: false,
    otherfront: false,
    pincode: null,
    city: null,
    state: null,
    customerId: null,
    utilityBillType: "",
    verified1: null,
    InputLabelPropsAddr2: {shrink: true}
  };


  getUploadButton = (side) => {
    return (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 10 }}>{side}</div>
      </div>
    );
  };

  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
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

  submitForm = (e) => {
    const payload = {
      ...e,
      consumerNumber: e.customerId,
      serviceProvider: e.serviceprovider,
      lpgId: e.lpgId,
      std: e.stdNo,
      landLineNumber: e.teleNo,
      landLineCity: e.landLineCity,
      otherResidanceType: e.otherName,
      leadCode: this.props.qde.getQdeSectionDetails.data.leadCode,
      applicantUniqueId: this.props.match.params.id,
      ismainapplicant: this.props.match.params.journey === "applicant",
      isguarantor: this.props.match.params.journey === "guarantor",
      addressType: this.state.utilityBillType,
    };
    if (this.state.POADoc === "ebill") {
      payload.billNumber = this.form.getFieldValue("customerId");
      payload.billType = "electricity";
    }
    if (this.state.POADoc === "gbill") {
      payload.billNumber = this.form.getFieldValue("lpgId");
      payload.billType = "gas";
    }
    if (this.state.POADoc === "lbill") {
      const std = this.form.getFieldValue("stdNo");
      const tele = this.form.getFieldValue("teleNo");
      payload.billNumber = std + "-" + tele;
      payload.billType = "landline";
    }
    if (this.state.POADoc === "other") {
      payload.billType = "other";
    }
    this.props.saveUtilityBillDetail(payload);
  };

  uploadPOA = async (changedFields, allFields) => {
    if (allFields.address2) {
      this.setState({ InputLabelPropsAddr2: { shrink: true } });
    } else {
      this.setState({ InputLabelPropsAddr2: { shrink: false } });
    }
    if (
      changedFields.customerId ||
      changedFields.lpgId ||
      changedFields.landLineCity ||
      changedFields.teleNo ||
      changedFields.stdNo
    ) {
      this.setState({
        verified1: await false,
      });
    }
    if (changedFields.eBillFront) {
      if (changedFields.eBillFront) {
        this.setState({
          eBillFront: changedFields.eBillFront && true,
          document_upload_list_front: await this.getBase64(
            changedFields.eBillFront.file
          ),
        });
      }

      this.props.uploadPOADocs({
        front: changedFields.eBillFront,
        data: {
          addInfo: JSON.stringify([
            {
              docName: allFields.eBillFront.file.name,
              billType: "electricity",
              mobileNumber:
                "" + this.props.qde.getQdeSectionDetails.data.customerMobile,
              applicantUniqueId: this.props.match.params.id,
              leadCode: this.props.qde.getQdeSectionDetails.data.leadCode,
              ismainapplicant: this.props.match.params.journey === "applicant",
              isguarantor: this.props.match.params.journey === "guarantor",
            },
          ]),
        },
      });
    }
    if (changedFields.gBill) {
      if (changedFields.gBill) {
        this.setState({
          gBill: changedFields.gBill && true,
          document_upload_list_front: await this.getBase64(
            changedFields.gBill.file
          ),
        });
      }
      this.props.uploadPOADocs({
        front: changedFields.gBill,
        data: {
          addInfo: JSON.stringify([
            {
              docName: allFields.gBill.file.name,
              billType: "gas",
              applicantUniqueId: this.props.match.params.id,
              leadCode: this.props.qde.getQdeSectionDetails.data.leadCode,
              mobileNumber:
                "" + this.props.qde.getQdeSectionDetails.data.customerMobile,
              ismainapplicant: this.props.match.params.journey === "applicant",
              isguarantor: this.props.match.params.journey === "guarantor",
            },
          ]),
        },
      });
    }

    if (changedFields.landBill) {
      if (changedFields.landBill) {
        this.setState({
          landBill: changedFields.landBill && true,
          document_upload_list_front: await this.getBase64(
            changedFields.landBill.file
          ),
        });
      }
      this.props.uploadPOADocs({
        front: changedFields.landBill,
        data: {
          addInfo: JSON.stringify([
            {
              docName: allFields.landBill.file.name,
              billType: "landLine",
              mobileNumber:
                "" + this.props.qde.getQdeSectionDetails.data.customerMobile,
              applicantUniqueId: this.props.match.params.id,
              leadCode: this.props.qde.getQdeSectionDetails.data.leadCode,
              ismainapplicant: this.props.match.params.journey === "applicant",
              isguarantor: this.props.match.params.journey === "guarantor",
            },
          ]),
        },
      });
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
      this.props.uploadPOADocs({
        front: allFields.otherfront,
        data: {
          addInfo: JSON.stringify([
            {
              docName: allFields.otherfront.file.name,
              docType: "other",
              mobileNumber:
                "" + this.props.qde.getQdeSectionDetails.data.customerMobile,
              applicantUniqueId: this.props.match.params.id,
              leadCode: this.props.qde.getQdeSectionDetails.data.leadCode,
              ismainapplicant: this.props.match.params.journey === "applicant",
              isguarantor: this.props.match.params.journey === "guarantor",
            },
          ]),
        },
      });
    }

    if (changedFields.pincode && changedFields.pincode.length === 6) {
      this.setPincodeDetails(changedFields.pincode);
    }

    const payload = {
      mobileNumber:
        "" + this.props.qde.getQdeSectionDetails.data.customerMobile,
      applicantUniqueId: this.props.match.params.id,
      leadCode: this.props.qde.getQdeSectionDetails.data.leadCode,
    };
    switch (this.state.POADoc) {
      case "ebill":
        payload["billType"] = "ebill";
        break;

      default:
        break;
    }

    if (changedFields.pincode) {
      this.form.resetFields(["city", "state"]);
    }
  };

  getUtilityBillsDetails = () => {
    const consumerNumber = this.form.getFieldValue("customerId");
    const serviceprovider = this.form.getFieldValue("serviceprovider");
    if (!consumerNumber && !serviceprovider) {
      this.form.setFields([
        {
          name: ["customerId"],
          errors: ["Customer id is mandatory"],
        },
        {
          name: ["serviceprovider"],
          errors: ["Service Provider is mandatory"],
        },
      ]);
      return;
    }

    if (
      consumerNumber &&
      consumerNumber.length > 0 &&
      serviceprovider &&
      serviceprovider.length > 0
    ) {
      this.props.getUtilityBillDetails({
        consumerId: consumerNumber,
        serviceprovider: serviceprovider,
        type: "elBill",
      });
    }
  };

  getUtilitygasBillsDetails = () => {
    const lgpId = this.form.getFieldValue("lpgId");
    if (!lgpId) {
      this.form.setFields([
        {
          name: ["lpgId"],
          errors: ["LPG id is mandatory"],
        },
      ]);
      return;
    }
    if (lgpId && lgpId.length > 0) {
      this.props.getUtilityBillDetails({
        lpgId: lgpId,
        type: "gBill",
      });
    }
  };

  getUtilityTelephoneBillsDetails = () => {
    const teleNo = this.form.getFieldValue("teleNo");
    const landLineCity = this.form.getFieldValue("landLineCity");
    const stdNo = this.form.getFieldValue("stdNo");
    if (!teleNo && !landLineCity && !stdNo) {
      this.form.setFields([
        {
          name: ["teleNo"],
          errors: ["Telephone number is mandatory"],
        },
        {
          name: ["landLineCity"],
          errors: ["City is mandatory"],
        },
        {
          name: ["stdNo"],
          errors: ["STD is mandatory"],
        },
      ]);
      return;
    }
    if (
      teleNo &&
      teleNo.length > 0 &&
      landLineCity &&
      landLineCity.length > 0 &&
      stdNo &&
      stdNo.length > 0
    ) {
      this.props.getUtilityBillDetails({
        telphoneNo: stdNo + "-" + teleNo,
        city: landLineCity,
        type: "lBill",
      });
    }
  };

  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
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

  setUtilityData = () => {

    const { utilityDetails } =
      this.props.qde.getQdeSectionDetails.data.additionalDetails;
    const payload = {
      address1: utilityDetails.address1,
      address2: utilityDetails.address2,
      residenceType: utilityDetails.residenceType,
      pincode: utilityDetails.pincode,
      city: utilityDetails.city,
      state: utilityDetails.state,
    };

    let statePayload = {
      POADoc: this.state.POADoc,
      document_upload_list_front: this.state.document_upload_list_front,
      documentEdit: true,
    };
    const type = utilityDetails.billType;

    if (type === "electricity") {
      payload.customerId = utilityDetails.consumerNumber;
      payload.serviceprovider = utilityDetails.serviceProvider;
      statePayload.POADoc = "ebill";
      payload.eBillFront =
        utilityDetails.fileList &&
        utilityDetails.fileList[0] &&
        utilityDetails.fileList[0].replace("/var/www/html", BASE_URL);
      statePayload.document_upload_list_front =
        utilityDetails.fileList &&
        utilityDetails.fileList[0] &&
        utilityDetails.fileList[0].replace("/var/www/html", BASE_URL);
      if (utilityDetails.fileList && utilityDetails.fileList[0]) {
        statePayload.eBillFront = true;
      }
    }
    if (type === "gas") {
      payload.lpgId = utilityDetails.lpgId;
      statePayload.POADoc = "gbill";
      payload.gBill =
        utilityDetails.fileList &&
        utilityDetails.fileList[0] &&
        utilityDetails.fileList[0].replace("/var/www/html", BASE_URL);
      statePayload.document_upload_list_front =
        utilityDetails.fileList &&
        utilityDetails.fileList[0] &&
        utilityDetails.fileList[0].replace("/var/www/html", BASE_URL);
      if (utilityDetails.fileList && utilityDetails.fileList[0]) {
        statePayload.gBill = true;
      }
    }
    if (type === "landline") {
      payload.stdNo = utilityDetails.std;
      payload.teleNo = utilityDetails.landLineNumber;
      payload.landLineCity = utilityDetails.landLineCity;
      statePayload.POADoc = "lbill";
      payload.landBill =
        utilityDetails.fileList &&
        utilityDetails.fileList[0] &&
        utilityDetails.fileList[0].replace("/var/www/html", BASE_URL);
      statePayload.document_upload_list_front =
        utilityDetails.fileList &&
        utilityDetails.fileList[0] &&
        utilityDetails.fileList[0].replace("/var/www/html", BASE_URL);
      // statePayload.eBillFront = true;
      if (utilityDetails.fileList && utilityDetails.fileList[0]) {
        statePayload.landBill = true;
      }
    }
    if (type === "other") {
      payload.otherName = utilityDetails.otherResidanceType;
      statePayload.POADoc = "other";
      payload.otherfront =
        utilityDetails.fileList &&
        utilityDetails.fileList[0] &&
        utilityDetails.fileList[0].replace("/var/www/html", BASE_URL);
      statePayload.document_upload_list_front =
        utilityDetails.fileList &&
        utilityDetails.fileList[0] &&
        utilityDetails.fileList[0].replace("/var/www/html", BASE_URL);
      // statePayload.eBillFront = true;
      if (utilityDetails.fileList && utilityDetails.fileList[0]) {
        statePayload.otherfront = true;
      }
    }
    this.form.setFieldsValue(payload);
    this.setState({
      ...this.state,
      ...statePayload,
    });
  };
  async componentDidMount() {
    const consumerNumber1 =
      (this.props.qde.getQdeSectionDetails &&
        this.props.qde.getQdeSectionDetails.data &&
        this.props.qde.getQdeSectionDetails.data.additionalDetails &&
        this.props.qde.getQdeSectionDetails.data.additionalDetails
          .utilityDetails &&
        this.props.qde.getQdeSectionDetails.data.additionalDetails
          .utilityDetails.consumerNumber) ||
      (this.props.qde.getUtilityDocDetails &&
        this.props.qde.getUtilityDocDetails.data &&
        this.props.qde.getUtilityDocDetails.data.consumer_number) ||
      (this.props.qde.getUtilityDocDetails &&
        this.props.qde.getUtilityDocDetails.data &&
        this.props.qde.getUtilityDocDetails.data.ConsumerNo) ||
      (this.props.qde.getQdeSectionDetails &&
        this.props.qde.getQdeSectionDetails.data &&
        this.props.qde.getQdeSectionDetails.data.additionalDetails &&
        this.props.qde.getQdeSectionDetails.data.additionalDetails
          .utilityDetails &&
        this.props.qde.getQdeSectionDetails.data.additionalDetails
          .utilityDetails.billNumer) ||
      (this.props.qde.getUtilityDocDetails &&
        this.props.qde.getUtilityDocDetails.data &&
        this.props.qde.getUtilityDocDetails.data.telephone_no)
        ? true
        : false;

    this.setState({
      verified1: await consumerNumber1,
    });
    if (
      !isEmpty(this.props.qde.getQdeSectionDetails) &&
      !isEmpty(this.props.qde.getQdeSectionDetails.data) &&
      this.props.qde.getQdeSectionDetails &&
      this.props.qde.getQdeSectionDetails.data.additionalDetails &&
      this.props.qde.getQdeSectionDetails.data.additionalDetails.utilityDetails
    ) {
       this.setUtilityData();
      this.setState({
        utilityBillType: await this.props.qde.getQdeSectionDetails.data
          .additionalDetails.utilityDetails.addressType,
             });
      this.form &&
        this.form.setFieldsValue({
          utilityBillType:
            this.props.qde.getQdeSectionDetails.data.additionalDetails
              .utilityDetails.addressType,
        });
      if (
        isEmpty(
          this.props.qde.getQdeSectionDetails &&
            this.props.qde.getQdeSectionDetails.data.additionalDetails &&
            this.props.qde.getQdeSectionDetails.data.additionalDetails
              .utilityDetails &&
            this.props.qde.getQdeSectionDetails.data.additionalDetails
              .utilityDetails.address2
        )
      ) {
        this.setState({ InputLabelPropsAddr2: await { shrink: false } });
      } else {
        this.setState({ InputLabelPropsAddr2: await { shrink: true } });
      }
    }
    this.setState({ utilityDocData: await getUtilityOther() });
    this.setState({ cityData: await getCityForPOA() });
    this.setState({ electricityCompany: await getElectricityCompanyName() });
  }
  async componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.qde.getUtilityDocDetails !==
        this.props.qde.getUtilityDocDetails &&
      this.props.qde.getUtilityDocDetails.data &&
      this.props.qde.getUtilityDocDetails.data.telephone_no
    ) {
      this.setState({ verified1: true });
    }
    if (prevProps.qde.deleteSuccess !== this.props.qde.deleteSuccess) {
      this.setState({ verified1: false });
    }

    if (
      !isEmpty(this.props.qde.getQdeSectionDetails) &&
      !isEmpty(this.props.qde.getQdeSectionDetails.data) &&
      prevProps.qde.getQdeSectionDetails !==
        this.props.qde.getQdeSectionDetails &&
      this.props.qde.getQdeSectionDetails.data.additionalDetails &&
      this.props.qde.getQdeSectionDetails.data.additionalDetails.utilityDetails
    ) {
      this.setUtilityData();
      this.setState({
        utilityBillType:
          this.props.qde.getQdeSectionDetails.data.additionalDetails
            .utilityDetails.addressType,
      });
    }

    if (
      prevProps.qde.getUtilityDocDetails !==
        this.props.qde.getUtilityDocDetails &&
      !isEmpty(this.props.qde.getUtilityDocDetails)
    ) {
      if (this.state.POADoc === "ebill") {
        const { address } = this.props.qde.getUtilityDocDetails.data;
        this.form.setFieldsValue({
          address1: address,
          address2: address,
        });
        if (address) {    
          this.setState({ InputLabelPropsAddr2: await { shrink: true } });
        } else {
          this.setState({ InputLabelPropsAddr2: await { shrink: false } });
          
        }
      }

      if (this.state.POADoc === "gbill") {
        const { address } = this.props.qde.getUtilityDocDetails.data;
        const { ConsumerAddress, ConsumerNo } =
          this.props.qde.getUtilityDocDetails.data;
        this.form.setFieldsValue({
          address1: ConsumerAddress,
          address2: ConsumerAddress,
          lpgId: ConsumerNo,
        });
         if (ConsumerAddress) {
           this.setState({ InputLabelPropsAddr2: await { shrink: true } });
         } else {
           this.setState({ InputLabelPropsAddr2: await { shrink: false } });
         }
      }
      if (this.state.POADoc === "lbill") {
        const landLineAddress =
          this.props.qde.getUtilityDocDetails.data.address;
        this.form.setFieldsValue({
          address1: landLineAddress,
        });
         if (landLineAddress) {
           this.setState({ InputLabelPropsAddr2: await { shrink: true } });
         } else {
           this.setState({ InputLabelPropsAddr2: await { shrink: false } });
         }
      }
    }
    if (prevProps.qde.pincodeDetails !== this.props.qde.pincodeDetails) {
      if (!isEmpty(this.props.qde.pincodeDetails)) {
        const { city, state } = this.props.qde.pincodeDetails;
        this.form.setFieldsValue({ city, state });
        this.setState({ city: city });
        this.setState({ state: state });
      }
      if (isEmpty(this.props.qde.pincodeDetails)) {
        this.form.resetFields(["state", "city"]);
      }
    }
  }
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
    this.props.deleteUtilityDocuments({
      applicantUniqueId: this.props.match.params.id,
      docName,
      deleteflag: false
    });
  };
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
  resetDate = () => {
    if (
      this.state.POADoc == "ebill" ||
      this.state.POADoc == "gbill" ||
      this.state.POADoc == "lbill" ||
      this.state.POADoc == "other"
    ) {
      this.props.deleteUtilityDocuments({
        applicantUniqueId: this.props.match.params.id,
        deleteflag: true,
      });
      this.setState({ utilityBillType: "" });
    }

    this.form.resetFields([
      "address1",
      "address2",
      "residenceType",
      "pincode",
      "city",
      "state",
      "dateOfBirth",
      "serviceprovider",
      "customerId",
      "lpgId",
      "stdNo",
      "teleNo",
      "landLineCity",
      "otherName",
    ]);
    this.setState({
      eBillFront: false,
      gBill: false,
      landBill: false,
      otherfront: false,
    });
  };
  render() {
    const billType = !!(
      this.props.qde.getQdeSectionDetails &&
      this.props.qde.getQdeSectionDetails.data &&
      this.props.qde.getQdeSectionDetails.data.additionalDetails &&
      this.props.qde.getQdeSectionDetails.data.additionalDetails
        .utilityDetails &&
      this.props.qde.getQdeSectionDetails.data.additionalDetails.utilityDetails
        .billType
    );

    const inputProps = {
      readOnly: this.props.freezeCase || this.props.freezeUser,
      disabled: this.props.freezeCase || this.props.freezeUser,
    };

    const { loading, POADoc } = this.state;
    const residentTypeDropdownList = [
      <option hidden> {} </option>,
      ...map(this.getResidentTypeDropdown(), (item) => {
        return <option value={item.residenceType}>{item.residenceType}</option>;
      }),
    ];

    const buttonRow = map(
      [
        { key: "ebill", name: "Electricity Bill" },
        { key: "gbill", name: "Gas Bill" },
        { key: "lbill", name: "Landline Bill" },
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
            }}
          >
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

    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 10 }}>Front</div>
      </div>
    );

    const otherUtilityDropdownList = [
      <option hidden> {} </option>,
      ...map(this.state.utilityDocData, (item) => {
        return <option value={item.billType}>{item.billType}</option>;
      }),
    ];
    const getCityData = [
      <option hidden> {} </option>,
      ...map(this.state.cityData, (item) => {
        return <option value={item.cityname}>{item.cityname}</option>;
      }),
    ];
    const getElectricityCompany = [
      <option hidden> {} </option>,
      ...map(this.state.electricityCompany, (item) => {
        return <option value={item.code}>{item.serviceProvider}</option>;
      }),
    ];
    return (
      <div className="additionalDetails-Container add-POA">
        {!(this.props.freezeCase || this.props.freezeUser) && (
          <Row className={"buttonRow"} gutter={30}>
            {buttonRow}
          </Row>
        )}
        <Form
          onValuesChange={this.uploadPOA}
          onFinish={this.submitForm}
          ref={(e) => (this.form = e)}>
          <Row>
            <Col lg={24}>
              {POADoc === "ebill" && (
                <div className={"aadharWrapper"}>
                  <Row className={"pt-3"} gutter={30}>
                    <Col lg={6}>
                      <div className={"mui-dropdown-wrapper"}>
                        <img
                          alt={"select"}
                          src={SelectIcon}
                          className="searchIcon"
                        />
                        <Form.Item
                          name={"serviceprovider"}
                          rules={[
                            {
                              required: true,
                              message: "Service Provider is mandatory",
                            },
                          ]}>
                          <TextField
                            id="serviceprovider"
                            inputProps={inputProps}
                            label="Service Provider*"
                            select
                            fullWidth
                            InputLabelProps={{
                              shrink:
                                this.form &&
                                this.form.getFieldValue("serviceprovider"),
                            }}
                            SelectProps={{
                              native: true,
                            }}>
                            {getElectricityCompany}
                          </TextField>
                        </Form.Item>
                      </div>
                    </Col>
                    <Col lg={6}>
                      <Form.Item
                        name={"customerId"}
                        rules={[
                          {
                            required: true,
                            message: "Customer id is mandatory",
                          },
                        ]}>
                        <TextField
                          InputLabelProps={{
                            shrink:
                              this.form &&
                              this.form.getFieldValue("customerId"),
                          }}
                          inputProps={inputProps}
                          fullwidth
                          name="leadName"
                          id="customerId"
                          label="Consumer Number*"
                          className="aadharIdInput"
                          type="number"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={30}>
                    <Col lg={6}>
                      <Form.Item
                        name="eBillFront"
                        rules={[
                          {
                            required: true,
                            message: "Electricity bill image is mandatory",
                          },
                        ]}>
                        {!this.state.eBillFront &&
                          !(this.props.freezeCase || this.props.freezeUser) && (
                            <Upload.Dragger
                              showUploadList={false}
                              beforeUpload={() => {
                                return false;
                              }}>
                              {!this.state.eBillFront &&
                                this.getUploadButton("Front")}
                            </Upload.Dragger>
                          )}
                      </Form.Item>
                      {this.state.eBillFront && (
                        <div className={"uploadedImageWrapper"}>
                          {!(
                            this.props.freezeCase || this.props.freezeUser
                          ) && (
                            <span
                              onClick={(e) =>
                                this.deleteUpload("Front", "eBillFront")
                              }>
                              X
                            </span>
                          )}
                          <img
                            alt={"Uploaded Document"}
                            src={this.state.document_upload_list_front}
                          />
                        </div>
                      )}
                    </Col>
                    <Col lg={12}></Col>
                    <Col lg={4} style={{ paddingTop: "5%" }}>
                      <Button
                        onClick={this.getUtilityBillsDetails}
                        className="save-button"
                        disabled={
                          this.state.verified1 ||
                          this.props.freezeCase ||
                          this.props.freezeUser
                        }>
                        {" "}
                        Get Details{" "}
                      </Button>
                    </Col>
                  </Row>
                </div>
              )}
              {POADoc === "gbill" && (
                <div className={"passportWrapper"}>
                  <Row className={"pt-3"} gutter={30}>
                    <Col lg={6}>
                      <Form.Item
                        name="lpgId"
                        rules={[
                          {
                            required: true,
                            message: "LPG id is mandatory",
                          },
                        ]}>
                        <TextField
                          inputProps={inputProps}
                          fullwidth
                          id="standard-basic"
                          label="LPG Id*"
                          className="aadharIdInput"
                          InputLabelProps={{
                            shrink: this.form
                              ? this.form.getFieldValue("lpgId")
                              : false,
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={30}>
                    <Col lg={6}>
                      <Form.Item
                        name="gBill"
                        rules={[
                          {
                            required: true,
                            message: "Gas bill image is mandatory",
                          },
                        ]}>
                        {!this.state.gBill &&
                          !(this.props.freezeCase || this.props.freezeUser) && (
                            <Upload.Dragger
                              showUploadList={false}
                              beforeUpload={() => {
                                return false;
                              }}>
                              {!this.state.gBill &&
                                this.getUploadButton("Front")}
                            </Upload.Dragger>
                          )}
                      </Form.Item>
                      {this.state.gBill && (
                        <div className={"uploadedImageWrapper"}>
                          {!(
                            this.props.freezeCase || this.props.freezeUser
                          ) && (
                            <span
                              onClick={(e) =>
                                this.deleteUpload("Front", "gBill")
                              }>
                              X
                            </span>
                          )}
                          <img
                            alt={"Uploaded Document"}
                            src={this.state.document_upload_list_front}
                          />
                        </div>
                      )}
                    </Col>
                    <Col lg={12}></Col>
                    <Col lg={4} style={{ paddingTop: "5%" }}>
                      <Button
                        onClick={this.getUtilitygasBillsDetails}
                        className="save-button"
                        disabled={
                          this.state.verified1 ||
                          this.props.freezeCase ||
                          this.props.freezeUser
                        }>
                        {" "}
                        Get Details{" "}
                      </Button>
                    </Col>
                  </Row>
                </div>
              )}
              {POADoc === "lbill" && (
                <div className={"dlWrapper"}>
                  <Row className={"pt-3"} gutter={30}>
                    <Col lg={6}>
                      <Form.Item
                        name="stdNo"
                        rules={[
                          {
                            required: true,
                            message: "STD is mandatory",
                          },
                        ]}>
                        <TextField
                          inputProps={inputProps}
                          fullwidth
                          name="leadName"
                          id="standard-basic"
                          label="STD*"
                          className="aadharIdInput"
                          type="number"
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={6}>
                      <Form.Item
                        name="teleNo"
                        rules={[
                          {
                            required: true,
                            message: "Telephone number is mandatory",
                          },
                        ]}>
                        <TextField
                          inputProps={inputProps}
                          fullwidth
                          name="leadName"
                          id="standard-basic"
                          label="Number*"
                          className="aadharIdInput"
                          type="number"
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={6}>
                      <div className={"mui-dropdown-wrapper"}>
                        <img
                          alt={"select"}
                          src={SelectIcon}
                          className="searchIcon"
                        />
                        <Form.Item
                          name={"landLineCity"}
                          rules={[
                            {
                              required: true,
                              message: "City name is mandatory",
                            },
                          ]}>
                          <TextField
                            inputProps={inputProps}
                            type="number"
                            label="City*"
                            select
                            fullWidth
                            InputLabelProps={{
                              shrink:
                                this.form &&
                                this.form.getFieldValue("landLineCity"),
                            }}
                            SelectProps={{
                              native: true,
                            }}>
                            {getCityData}
                          </TextField>
                        </Form.Item>
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={30}>
                    <Col lg={6}>
                      <Form.Item
                        name="landBill"
                        rules={[
                          {
                            required: true,
                            message: "Landline bill image is mandatory",
                          },
                        ]}>
                        {!this.state.landBill &&
                          !(this.props.freezeCase || this.props.freezeUser) && (
                            <Upload.Dragger
                              showUploadList={false}
                              beforeUpload={() => {
                                return false;
                              }}>
                              {" "}
                              {!this.state.landBill &&
                                this.getUploadButton("Front")}
                            </Upload.Dragger>
                          )}
                      </Form.Item>
                      {this.state.landBill && (
                        <div className={"uploadedImageWrapper"}>
                          {!(
                            this.props.freezeCase || this.props.freezeUser
                          ) && (
                            <span
                              onClick={(e) =>
                                this.deleteUpload("Front", "landBill")
                              }>
                              X
                            </span>
                          )}
                          <img
                            alt={"Uploaded Document"}
                            src={this.state.document_upload_list_front}
                          />
                        </div>
                      )}
                    </Col>
                    <Col lg={12}></Col>
                    <Col lg={4} style={{ paddingTop: "5%" }}>
                      <Button
                        onClick={this.getUtilityTelephoneBillsDetails}
                        className="save-button"
                        disabled={
                          this.state.verified1 ||
                          (this.props.freezeCase ||
                          this.props.freezeUser)
                        }>
                        {" "}
                        Get Details{" "}
                      </Button>
                    </Col>
                  </Row>
                  <br />
                </div>
              )}
              {POADoc === "other" && (
                <div className={"dlWrapper"}>
                  <Row className={"pt-3"} gutter={30}>
                    <Col lg={8}>
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
                              message: "Other is mandatory",
                            },
                          ]}>
                          <TextField
                            inputProps={inputProps}
                            InputLabelProps={{
                              shrink:
                                this.form &&
                                this.form.getFieldValue("otherName"),
                            }}
                            select
                            label="Other*"
                            fullWidth
                            SelectProps={{
                              native: true,
                            }}>
                            {otherUtilityDropdownList}
                          </TextField>
                        </Form.Item>
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={30}>
                    <Col lg={6}>
                      <Form.Item
                        name={"otherfront"}
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
                            alt={"Uploaded Document"}
                            src={this.state.document_upload_list_front}
                          />

                          {/* {this.state.document_upload_list_front
                            .split(".")
                            .pop() == "pdf" && (
                            <img
                              src={pdfIcon}
                              style={{ width: "100px", height: "100px" }}
                            />
                          )} */}
                        </div>
                      )}
                    </Col>
                  </Row>
                </div>
              )}
            </Col>
            {this.state.POADoc !== null &&
              !this.props.qde.utilityDocUploadSuccess &&
              !billType && (
                <p style={{ marginTop: "-2%" }}>Document is mandatory*</p>
              )}
          </Row>

          <br />
          <p className="sub-title">Residential Address 2</p>
          <Row className={"typeRow"} gutter={40}>
            <Col lg={24}>
              <p className="sub-title">Utility bill for</p>
              <Form.Item
                name="utilityBillType"
                rules={[
                  {
                    required: true,
                    message: "Please Select an option",
                  },
                ]}>
                {this.props.freezeCase || this.props.freezeUser ? (
                  <Radio.Group
                    style={{ display: "flex", width: "100%" }}
                    defaultValue={this.state.utilityBillType}
                    key={this.state.utilityBillType}>
                    <Radio
                      disabled
                      onClick={() =>
                        this.setState({ utilityBillType: "currentAddress" })
                      }
                      value={"currentAddress"}>
                      Current Address
                    </Radio>
                    <Radio
                      disabled
                      onClick={() =>
                        this.setState({ utilityBillType: "permanentAddress" })
                      }
                      value={"permanentAddress"}>
                      Permanent Address
                    </Radio>
                  </Radio.Group>
                ) : (
                  <Radio.Group
                    style={{ display: "flex", width: "100%" }}
                    defaultValue={this.state.utilityBillType}
                    key={this.state.utilityBillType}>
                    <Radio
                      onClick={() =>
                        this.setState({ utilityBillType: "currentAddress" })
                      }
                      value={"currentAddress"}>
                      Current Address
                    </Radio>
                    <Radio
                      onClick={() =>
                        this.setState({ utilityBillType: "permanentAddress" })
                      }
                      value={"permanentAddress"}>
                      Permanent Address
                    </Radio>
                  </Radio.Group>
                )}
              </Form.Item>

              <br />
            </Col>
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
                    shrink: this.form
                      ? this.form.getFieldValue("address1")
                      : false,
                  }}
                  fullWidth={true}
                  id="standard-basic"
                  label="Address Line 1*"
                  className="textField fileNoinput"
                />
              </Form.Item>
            </Col>
            <Col lg={8}>
              <Form.Item name="address2">
                <TextField
                  inputProps={inputProps}
                  InputLabelProps={this.state.InputLabelPropsAddr2}
                  fullWidth={true}
                  id="address2"
                  label="Address Line 2"
                  className="textField fileNoinput"
                />
              </Form.Item>
            </Col>
            <Col lg={8}>
              <Form.Item>
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
                      key={Math.random()}
                      inputProps={inputProps}
                      // InputLabelProps={InputLabelProps}
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
              </Form.Item>
            </Col>

            <Col lg={8}>
              <Form.Item
                name={"pincode"}
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
                    shrink: this.form && this.form.getFieldValue("pincode"),
                  }}
                  onChange={(e, value) =>
                    this.setState({ pincode: e.target.value })
                  }
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
                name="city"
                rules={[
                  {
                    required: true,
                    message: "City is mandatory",
                  },
                ]}>
                <TextField
                  InputProps={{
                    readOnly: true,
                  }}
                  inputProps={inputProps}
                  fullWidth={true}
                  id="standard-basic"
                  label="City*"
                  className="textField fileNoinput"
                  InputLabelProps={{
                    shrink: this.form && this.form.getFieldValue("city"),
                  }}
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
                name="state"
                rules={[
                  {
                    required: true,
                    message: "State is mandatory",
                  },
                ]}>
                <TextField
                  InputProps={{
                    readOnly: true,
                  }}
                  inputProps={inputProps}
                  fullWidth={true}
                  id="state"
                  label="State*"
                  className="textField fileNoinput"
                  InputLabelProps={{
                    shrink: this.form && this.form.getFieldValue("state"),
                  }}
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
          </Row>
          <div className="buttonSave  mt-4 mb-2">
            {!(this.props.freezeCase || this.props.freezeUser) && (
              <Button
                className="save-button"
                htmlType={"submit"}
                disabled={!this.props.qde.utilityDocUploadSuccess && !billType}>
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
  uploadPOADocs,
  verifyDl,
  getUtilityBillDetails,
  saveUtilityBillDetail,
  deleteUtilityDocuments,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsUtility);
