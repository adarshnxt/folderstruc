/* eslint-disable react-hooks/exhaustive-deps */
import TextField from "@material-ui/core/TextField";
import { Button, Col, Form, Radio, Row } from "antd";
import find from "lodash/find";
import isEmpty from "lodash/isEmpty";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import SelectIcon from "../../assets/Images/select.svg";
import { setHeading } from "../../Redux/Action/App";
import {
  addCoapplicantGuarantorService,
  addLead,
  createConcent,
  createConcentCoapplicantGuarantor,
  deleteCoapplicantGuarantorService,
  deleteLeads,
  fetchDealerDetails,
  fetchDsaDetails,
  getBranch,
  getCoapplicantGuarantorByCoapplicantIdService,
  getLeadDetails,
} from "../../Redux/Services/leads";
import { getLoanSummary } from "../../Redux/Services/LoanSummary";
import { productNameMapping, public_url } from "../../Utility/Constant";
import { te, ts } from "../../Utility/ReduxToaster";
import "./style.css";
import ViewLead from "./viewLead";

const Lead = (props) => {
  const {
    fetchDealerDetails,
    fetchDsaDetails,
    deleteLeads,
    deleteCoapplicantGuarantorService,
    createConcent,
    createConcentCoapplicantGuarantor,
    leads,
    match: {
      params: { id, type, journey },
    },
    getLeadDetails,
    getCoapplicantGuarantorByCoapplicantIdService,
    setHeadingValue,
    history,
  } = props;
  let form;

  // States
  const [sourceType, changeStourceType] = useState("Dealer");
  const [InputLabelProps, setInputLabelProps] = useState({});
  const [branchList, setBranchList] = useState([]);
  const [mode, setMode] = useState("");

  const freezeUser =
    props.Summary &&
    props.Summary.loansummary.data &&
    props.Summary &&
    props.Summary.loansummary.data.modelAccess[0] &&
    props.Summary.loansummary.data.modelAccess[0].read;

  // applicant edit lead Effects

  const inputProps = {
    readOnly: freezeUser,
    disabled: freezeUser,
  };

  useEffect(() => {
    if (true) {
      let userData = localStorage.getItem("UserData");

      let userDataCopy = JSON.parse(userData);
      //        let mainApplicantUniqueId = props && props.qde && props.qde.getQdeSectionDetails && props.qde.getQdeSectionDetails.data && props.qde.getQdeSectionDetails.data.mainApplicantUniqueId;
      // console.log("mainApplicantUniqueId--->", mainApplicantUniqueId)
      props.getLoanSummary({
        //  applicant_uniqueid: mainApplicantUniqueId,
        // applicant_uniqueid: props.match.params.id,
        roleId: userDataCopy && userDataCopy.roleId,
      });
    }
  }, []);

  useEffect(() => {
    let sourceType =
      leads && leads.leads && leads.leads.data && leads.leads.data.sourceType;
    if (!isEmpty(sourceType)) {
      changeStourceType(sourceType);
    }
  }, [leads && leads.leads && leads.leads.data && leads.leads.data.sourceType]);

  useEffect(() => {
    if (
      !leads.fetchLeadDetailsSuccess &&
      leads.leads.data === ""
      // !leads.getCoapplicantGuarantorDetails
    ) {
      props.history.push("/dashboard");
      window.location.reload();
    }

    if (!isEmpty(leads.leads) && journey === "applicant") {
      if (leads && leads.leads && leads.leads.data) {
        const { error, message, data } =
          leads && leads.leads && leads.leads.data;

        error
          ? te(message)
          : type !== "view" && !isEmpty(message) && ts(message);
        if (type === "edit" && data !== "" && leads.fetchLeadDetailsSuccess) {
          if (leads.leads.data) {
            const {
              customerEmail,
              customerMobile,
              customerPincode,
              firstName,
              middleName,
              lastName,
              sourceType,
              branchName,
              sourceName,
            } = leads.leads.data;
            form &&
              form.setFieldsValue({
                customerEmail,
                customerMobile,
                customerPincode,
                firstName,
                middleName,
                lastName,
                branchName,
                sourceName,
                sourceType,
              });
            if (branchName && type === "edit" && journey === "applicant") {
              fetchDealerDetails({
                branchName,
              });
              let userData = localStorage.getItem("UserData");
              let userDataCopy = JSON.parse(userData);
              userDataCopy.branchName = branchName;
              localStorage.setItem("UserData", JSON.stringify(userDataCopy));
              fetchDsaDetails();
            }
            changeStourceType(sourceType);
            setInputLabelProps({
              shrink: true,
            });
          }
        }

        if (type !== "add") {
          !isEmpty(leads.leads.data) &&
            setHeadingValue(
              getHeaderTitle(parseInt(leads.leads.data.productId))
            );
        }
      }
    }
  }, [leads.leads]);

  //co-applicant/guarantor Add effect
  useEffect(() => {
    if (!isEmpty(leads.leads) && journey !== "applicant") {
      const { data } = leads.leads;
      !isEmpty(data) &&
        setHeadingValue(getHeaderTitle(parseInt(data.productId)));
    }
  }, [leads, leads]);

  useEffect(() => {
    const productId = props.match.params.id;
    const payload = {
      productId,
      employeeId: JSON.parse(localStorage.getItem("UserData"))
        ? JSON.parse(localStorage.getItem("UserData")).employeeId
        : "",
      branchName: JSON.parse(localStorage.getItem("UserData"))
        ? JSON.parse(localStorage.getItem("UserData")).branchName
        : "",
    };
    (async () => {
      const response = await props.getBranch(payload);
    })();
  }, []);

  // edit Coapplicant guarantor Details Effects
  useEffect(() => {
    console.log(leads);
    if (!isEmpty(leads.coapplicantGuarantor)) {
      const { error, message, data } = leads.coapplicantGuarantor;

      if (journey === "co-applicant" || journey === "guarantor") {
        error ? te(message) : type !== "view" && ts(message);
      }

      if (
        type === "edit" &&
        data !== "" &&
        leads.getCoapplicantGuarantorDetails
      ) {
        const {
          customerEmail,
          customerMobile,
          customerPincode,
          firstName,
          middleName,
          lastName,
          leadName,
          sourceName,
          sourceType,
        } = leads.coapplicantGuarantor.data;
        form &&
          form.setFieldsValue({
            customerEmail,
            customerMobile,
            customerPincode,
            firstName,
            middleName,
            lastName,
            leadName,
            sourceName,
            sourceType,
          });
        changeStourceType(sourceType);
        setInputLabelProps({
          shrink: true,
        });
      }

      if (type !== "add") {
        !isEmpty(data) &&
          setHeadingValue(getHeaderTitle(parseInt(data.productId)));
      }
    }
  }, [leads.coapplicantGuarantor]);

  // routing Effects
  useEffect(() => {
    if (journey === "applicant" && type !== "add") {
      getLeadDetails({ id });
    } else if (journey === "co-applicant" || journey === "guarantor") {
      if (type !== "add") {
        getCoapplicantGuarantorByCoapplicantIdService({
          coapplicantUniqueId: id,
        });
      } else {
        getLeadDetails({ id });
      }
    }

    if (type === "add" && journey === "applicant") {
      const title = getHeaderTitle(parseInt(id));
      setHeadingValue(title);
    }
  }, [type]);

  //Add lead success/ failure.
  useEffect(() => {
    const { message, data } = leads.leads;
    if (journey === "applicant") {
      if (
        leads.addSuccess !== null &&
        (type === "edit" || type === "add") &&
        !isEmpty(leads.leads)
      ) {
        if (!leads.addSuccess) {
          te(message);
        } else {
          ts(message);
          history.push(`/lead/${journey}/view/${data.id}`);
        }
      }
    }
  }, [leads.addSuccess]);

  //Reset form on source type change effect
  useEffect(() => {
    type === "add" && form && form.resetFields();
  }, [sourceType]);

  //delete success/failure effect
  useEffect(() => {
    const { message, data, error } = leads.leads;
    if (data && leads.deleteSuccess) {
      if (error === false) {
        history.push(`/leadLists/${data.productId}`);
      } else {
        te(message);
      }
    }

    if (leads.deleteSuccess && !isEmpty(leads.coapplicantGuarantor)) {
      history.push(`/dashboard`);
      window.location.reload();
    }
  }, [leads.deleteSuccess]);

  useEffect(() => {
    const { data } = leads.leads;
    if (journey === "applicant") {
      if (leads.createConsentSuccess && mode === "otp") {
        history.push(`/applicant/otpverification/${data.leadCode}/${data.id}`);
      }
      if (leads.createConsentSuccess && mode === "link") {
        history.push(`${public_url.consentLink}/${journey}/${data.id}`);
      }
    }
  }, [leads.createConsentSuccess]);

  useEffect(() => {
    if (journey === "co-applicant") {
      if (leads.createConsentCGSuccess && mode === "otp") {
        const { data } = leads.coapplicantGuarantor;
        history.push(
          `/co-applicant/otpverification/${data.leadCode}/${data.coapplicantUniqueId}`
        );
      }
      if (leads.createConsentCGSuccess && mode === "link") {
        const { data } = leads.coapplicantGuarantor;
        history.push(
          `${public_url.consentLink}/${journey}/${data.coapplicantUniqueId}`
        );
      }
    }
  }, [leads.createConsentCGSuccess]);

  useEffect(() => {
    if (journey === "guarantor") {
      if (leads.createConsentCGSuccess && mode === "otp") {
        const { data } = leads.coapplicantGuarantor;
        history.push(
          `/guarantor/otpverification/${data.leadCode}/${data.coapplicantUniqueId}`
        );
      }
      if (leads.createConsentCGSuccess && mode === "link") {
        const { data } = leads.coapplicantGuarantor;
        history.push(
          `${public_url.consentLink}/${journey}/${data.coapplicantUniqueId}`
        );
      }
    }
  }, [leads.createConsentCGSuccess]);

  // Add coapplicant and guarantor success/ failure.
  useEffect(() => {
    const { message, data } = leads.coapplicantGuarantor;
    if (
      leads.addSuccessCoapplicant !== null &&
      (type === "edit" || type === "add") &&
      !isEmpty(leads.coapplicantGuarantor)
    ) {
      if (leads.addSuccessCoapplicant) {
        ts(message);
        history.push(`/lead/${journey}/view/${data.coapplicantUniqueId}`);
      }
    }
  }, [leads.addSuccessCoapplicant]);

  useEffect(() => {
    if (props.leads.branchList && !isEmpty(props.leads.branchList.data)) {
      setBranchList(props.leads.branchList.data);
    }
  }, [props.leads.branchList]);

  const submitAddLead = (e) => {
    if (journey === "applicant") {
      const { id, type } = props.match.params;
      const payload = {
        ...e,
        leadName: !isEmpty(e.middleName)
          ? `${e.firstName} ${e.middleName} ${e.lastName}`
          : `${e.firstName} ${e.lastName}`,
        sourceType,
        productId: id,
        employeeId: JSON.parse(localStorage.getItem("UserData")).employeeId,
        branchName: JSON.parse(localStorage.getItem("UserData")).branchName,
      };
      if (type === "edit") {
        const { data } = leads.leads;
        payload.id = data.id;
        payload.productId = data.productId;
        payload.applicantUniqueId = data.applicantUniqueId;
      }
      props.addLead(payload);
    } else {
      const { sourceName, sourceType, productId, leadCode, applicantUniqueId } =
        leads.leads.data;
      const payload = {
        sourceName,
        leadName: !isEmpty(e.middleName)
          ? `${e.firstName} ${e.middleName} ${e.lastName}`
          : `${e.firstName} ${e.lastName}`,
        sourceType,
        productId,
        leadCode,
        ...e,
        iscoapplicant: journey === "co-applicant",
        isguarantor: journey === "guarantor",
        mainapplicantUniqueId: applicantUniqueId,
        // employeeId: JSON.parse(localStorage.getItem("UserData")).employeeId,
        branchName: JSON.parse(localStorage.getItem("UserData")).branchName,
      };
      if (type === "edit") {
        const { id, coapplicantUniqueId } = leads.coapplicantGuarantor.data;
        payload.id = id;
        payload.coapplicantUniqueId = coapplicantUniqueId;
      }
      props.addCoapplicantGuarantorService(payload);
    }
  };

  const getHeaderTitle = (id = 1) => {
    const headerTitles = {
      applicant: "Lead",
      "co-applicant": "Co-Applicant",
      guarantor: "Guarantor",
    };
    const product = find(productNameMapping, { productId: id ? id : 1 });
    return `${type.charAt(0).toUpperCase() + type.slice(1)} ${
      headerTitles[journey]
    } - ${product.productName}`;
  };

  const redirectToleadList = (e) => {
    let id;
    // if (type === "add") {
    //   id = props.match.params.id;
    // } else if (type === "edit") {
    id = leads.leads.data.productId;
    // }
    history.push(`/leadLists/${id}`);
  };

  const handleFormChange = (changedFields, allFields) => {
    if (
      changedFields.branchName &&
      type !== "view" &&
      journey === "applicant"
    ) {
      fetchDealerDetails({
        branchName: changedFields.branchName,
      });
      let userData = localStorage.getItem("UserData");
      let userDataCopy = JSON.parse(userData);
      userDataCopy.branchName = changedFields.branchName;
      localStorage.setItem("UserData", JSON.stringify(userDataCopy));
      fetchDsaDetails();
    }
  };

  const listData = sourceType === "Dealer" ? leads.dealerLeads : leads.dsaLeads;
  const dealerDropdownvalues = [
    <option hidden>{}</option>,
    ...listData.map((item, index) => (
      <option
        value={sourceType === "Dealer" ? item.dealer_name : item.companyname}
        className={"optionTheme"}
      >
        {sourceType === "Dealer"
          ? item.dealer_name
          : item.companyname + "-" + item.dsacode}
      </option>
    )),
  ];
  console.log(sourceType, "sourceType");
  const branchDropdownvalues = [
    <option hidden>{}</option>,
    ...branchList.map((item, index) => (
      <option value={item.branchName}>{item.branchName}</option>
    )),
  ];

  if (type === "view") {
    return (
      <ViewLead
        createConcent={createConcent}
        createConcentCoapplicantGuarantor={createConcentCoapplicantGuarantor}
        deleteLeads={deleteLeads}
        deleteCoapplicantGuarantorService={deleteCoapplicantGuarantorService}
        history={history}
        leadDeatils={!isEmpty(leads.leads) ? leads.leads.data : {}}
        coapplicantGuarantorDetails={
          !isEmpty(leads.coapplicantGuarantor)
            ? leads.coapplicantGuarantor.data
            : {}
        }
        journey={props.match.params.journey}
        type={props.match.params.type}
        leadId={props.match.params.id}
        setMode={setMode}
        mode={mode}
      />
    );
  } else {
    return (
      <React.Fragment>
        <div className="AddLeadContainer p-3">
          <p className="Source-Type">Source Type</p>
          {journey === "applicant" && type === "add" && (
            <Radio.Group
              onChange={(e) => changeStourceType(e.target.value)}
              defaultValue={sourceType}
              value={sourceType}
            >
              <Radio value={"Dealer"}>Dealer</Radio>
              <Radio value={"DSA"}>DSA</Radio>
              <Radio value={"Direct"}>Direct</Radio>
              {/* <Radio value={4}>Reference</Radio> */}
            </Radio.Group>
          )}
          {journey === "applicant" &&
            type === "edit" &&
            !isEmpty(leads.leads) &&
            leads.leads.data.sourceType}
          {(journey === "co-applicant" || journey === "guarantor") &&
            type === "add" && (
              <Col lg={24}>
                <h6>
                  {(journey === "co-applicant" || journey === "guarantor") &&
                    type === "add" &&
                    !isEmpty(leads.leads) &&
                    leads.leads.data.sourceType}
                </h6>
              </Col>
            )}

          {(journey === "co-applicant" || journey === "guarantor") &&
            type === "edit" && (
              <Col lg={12}>
                <h6>
                  {(journey === "co-applicant" || journey === "guarantor") &&
                    type === "edit" &&
                    !isEmpty(leads.coapplicantGuarantor) &&
                    leads.coapplicantGuarantor.data.sourceType}
                </h6>
              </Col>
            )}
          {(journey === "co-applicant" || journey === "guarantor") &&
            (type === "add" || type === "edit") && (
              <Col lg={12}>
                <h6>
                  {(journey === "co-applicant" || journey === "guarantor") &&
                    (type === "add" || type === "edit") &&
                    !isEmpty(leads.coapplicantGuarantor) &&
                    leads.coapplicantGuarantor.data.branchName}
                </h6>
              </Col>
            )}
        </div>
        <div className={"referenceContainer p-3"}>
          <Form
            onFinish={submitAddLead}
            ref={(e) => (form = e)}
            onValuesChange={handleFormChange}
          >
            <Row gutter={30}>
              {journey === "applicant" &&
                (type === "add" || type === "edit") &&
                (sourceType === "DSA" || sourceType === "Dealer") && (
                  <Col lg={8}>
                    <div className={"mui-dropdown-wrapper"}>
                      <img
                        alt={"select"}
                        src={SelectIcon}
                        className="searchIcon"
                      />
                      <Form.Item
                        name={"branchName"}
                        rules={[
                          {
                            required: true,
                            message: "Branch name is mandatory",
                          },
                        ]}
                      >
                        <TextField
                          inputProps={inputProps}
                          InputLabelProps={InputLabelProps}
                          label="Branch*"
                          select
                          fullWidth
                          SelectProps={{
                            native: true,
                          }}
                        >
                          {branchDropdownvalues}
                        </TextField>
                      </Form.Item>
                    </div>
                  </Col>
                )}
              {journey === "applicant" && sourceType === "Dealer" && (
                <Col lg={8}>
                  <div className={"mui-dropdown-wrapper"}>
                    <img
                      alt={"select"}
                      src={SelectIcon}
                      className="searchIcon"
                    />
                    <Form.Item
                      name={"sourceName"}
                      rules={[
                        {
                          required: true,
                          message: "Dealer name is mandatory",
                        },
                      ]}
                    >
                      <TextField
                        inputProps={inputProps}
                        InputLabelProps={InputLabelProps}
                        label="Dealer*"
                        select
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                      >
                        {dealerDropdownvalues}
                      </TextField>
                    </Form.Item>
                  </div>
                </Col>
              )}

              {journey === "applicant" && sourceType === "DSA" && (
                <Col lg={8}>
                  <div className={"mui-dropdown-wrapper"}>
                    <img
                      alt={"select"}
                      src={SelectIcon}
                      className="searchIcon"
                    />
                    <Form.Item
                      name={"sourceName"}
                      rules={[
                        {
                          required: true,
                          message: "DSA name is mandatory",
                        },
                      ]}
                    >
                      <TextField
                        inputProps={inputProps}
                        InputLabelProps={InputLabelProps}
                        label="DSA*"
                        select
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                      >
                        {dealerDropdownvalues}
                      </TextField>
                    </Form.Item>
                  </div>
                </Col>
              )}
              {(journey === "co-applicant" || journey === "guarantor") &&
                type === "add" &&
                sourceType !== "Direct" && (
                  <Col lg={8}>
                    <h6 className="Source-Type">Source Name </h6>
                    <p>
                      {(journey === "co-applicant" ||
                        journey === "guarantor") &&
                        type === "add" &&
                        !isEmpty(leads.leads) &&
                        leads.leads.data.sourceName}
                    </p>
                  </Col>
                )}
              {(journey === "co-applicant" || journey === "guarantor") &&
                type === "edit" &&
                sourceType !== "Direct" && (
                  <Col lg={8}>
                    <h6 className="Source-Type">Source Name </h6>
                    <p>
                      {(journey === "co-applicant" ||
                        journey === "guarantor") &&
                        type === "edit" &&
                        !isEmpty(leads.coapplicantGuarantor) &&
                        leads.coapplicantGuarantor.data.sourceName}
                    </p>
                  </Col>
                )}
              <br />

              {(journey === "co-applicant" || journey === "guarantor") &&
                (type === "edit" || type === "add") &&
                sourceType !== "Direct" && (
                  <Col lg={8}>
                    <h6 className="Source-Type ">Branch Name </h6>
                    <p>
                      {(journey === "co-applicant" ||
                        journey === "guarantor") &&
                        type === "add" &&
                        !isEmpty(leads.leads) &&
                        leads.leads.data.branchName.toUpperCase()}
                    </p>
                  </Col>
                )}
              {sourceType !== "Direct" && <Col lg={8}></Col>}
              <Col lg={8}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "First Name is mandatory",
                    },
                  ]}
                  name={"firstName"}
                >
                  <TextField
                    inputProps={inputProps}
                    InputLabelProps={InputLabelProps}
                    onInput={(e) => {
                      e.target.value = e.target.value
                        .toString()
                        .match(/^[a-zA-Z ]*$/)
                        ? e.target.value.toString().slice(0, 30)
                        : e.target.value
                            .toString()
                            .slice(0, e.target.value.length - 1);
                    }}
                    label="First Name*"
                  />
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item
                  rules={[
                    {
                      required: false,
                      message: "Middle Name is mandatory",
                    },
                  ]}
                  name={"middleName"}
                >
                  <TextField
                    inputProps={inputProps}
                    InputLabelProps={InputLabelProps}
                    onInput={(e) => {
                      e.target.value = e.target.value
                        .toString()
                        .match(/^[a-zA-Z ]*$/)
                        ? e.target.value.toString().slice(0, 30)
                        : e.target.value
                            .toString()
                            .slice(0, e.target.value.length - 1);
                    }}
                    label="Middle Name"
                  />
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Last Name is mandatory",
                    },
                  ]}
                  name={"lastName"}
                >
                  <TextField
                    inputProps={inputProps}
                    InputLabelProps={InputLabelProps}
                    onInput={(e) => {
                      e.target.value = e.target.value
                        .toString()
                        .match(/^[a-zA-Z ]*$/)
                        ? e.target.value.toString().slice(0, 30)
                        : e.target.value
                            .toString()
                            .slice(0, e.target.value.length - 1);
                    }}
                    label="Last Name*"
                  />
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item
                  name={"customerMobile"}
                  rules={[
                    {
                      required: true,
                      message: "Mobile number is mandatory",
                    },
                    {
                      pattern: new RegExp(/^[6-9]{1}[0-9]{9}$/),
                      message: "Invalid Mobile Number",
                    },
                  ]}
                >
                  <TextField
                    inputProps={inputProps}
                    InputLabelProps={InputLabelProps}
                    onInput={(e) => {
                      e.target.value = e.target.value
                        ? Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 10)
                        : "";
                    }}
                    type="number"
                    label="Mobile Number*"
                  />
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Email address is mandatory",
                    },
                    {
                      type: "email",
                      message: "Invalid Email Address",
                    },
                  ]}
                  name={"customerEmail"}
                >
                  <TextField
                    inputProps={inputProps}
                    InputLabelProps={InputLabelProps}
                    onInput={(e) => {
                      const matchPattern =
                        e.target.value.match(/[$#%<>&^*',\s]/);
                      e.target.value = !matchPattern
                        ? e.target.value.toString().slice(0, 50)
                        : e.target.value.toString().trim().replace(/ /g, "");
                    }}
                    label="Email Address*"
                  />
                </Form.Item>
              </Col>
              <Col lg={8}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Pincode is mandatory",
                    },
                    {
                      pattern: new RegExp(/^[0-9]{6}$/),
                      message: "Invalid Pincode Number",
                    },
                  ]}
                  name={"customerPincode"}
                >
                  <TextField
                    inputProps={inputProps}
                    InputLabelProps={InputLabelProps}
                    onKeyDown={(e) =>
                      (e.keyCode === 69 || e.keyCode === 190) &&
                      e.preventDefault()
                    }
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 6);
                    }}
                    label="Pincode*"
                    type="number"
                  />
                </Form.Item>
              </Col>
            </Row>
            <div className="Source-Type-btn-Theme  mt-4 mb-2">
              <Button
                className="cancle-button mr-3"
                onClick={redirectToleadList}
              >
                Cancel
              </Button>
              {!freezeUser && (
                <Button htmlType={"submit"} className="save-button">
                  Save
                </Button>
              )}
            </div>
          </Form>
        </div>
      </React.Fragment>

      // --------------------------------------------------->>
    );
  }
};

const mapStateToProps = (state) => {
  return { leads: state.leads, Summary: state.Summary };
};

const mapDispatchToProps = {
  fetchDealerDetails,
  fetchDsaDetails,
  addLead,
  addCoapplicantGuarantorService,
  getLeadDetails,
  deleteLeads,
  deleteCoapplicantGuarantorService,
  getCoapplicantGuarantorByCoapplicantIdService,
  getBranch,
  getLoanSummary,

  createConcent: (payload) => async (dispatch) => {
    dispatch(createConcent(payload));
  },
  createConcentCoapplicantGuarantor: (payload) => async (dispatch) => {
    dispatch(createConcentCoapplicantGuarantor(payload));
  },
  setHeadingValue: (payload) => async (dispatch) => {
    dispatch(setHeading(payload));
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(Lead);
