import TextField from "@material-ui/core/TextField";
import { Button, Col, Form, Row, Radio } from "antd";
import { map } from "lodash";
import isEmpty from "lodash/isEmpty";
import React from "react";
import { connect } from "react-redux";
import SelectIcon from "../../../assets/Images/select.svg";
import {
  getDesignationDetails,
  getEmploymentIndustry,
  // getEmploymentConstitution,
  saveEmployeeDetails,
} from "../../../Redux/Services/Qde";
import "./style.scss";
import { getEmploymentConstitution } from "../../../Redux/Services/Qde";
import { tw } from "../../../Utility/ReduxToaster";

function DetailsEmployee(props) {
  let form;
  const [InputLabelProps, setInputLabelProps] = React.useState({
    shrink: false,
  });
  const [designation, setDesignation] = React.useState([]);
  const [currentJob, setCurrentJob] = React.useState();
  const [empIndustry, setempIndustry] = React.useState([]);
  const [companyType, setCompanyType] = React.useState([]);
  const [otherIndustry, setOtherIndustry] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [yearTotal, setYearTotal] = React.useState(null);
  const [monthTotal, setMonthTotal] = React.useState(null);
  const [yearCurrent, setYearCurrent] = React.useState(null);
  const [monthCurrent, setMonthCurrent] = React.useState(null);

  const handleValueChange = (changedFields, allFields) => {
    if (allFields.empIndustry === "Others") {
      setOtherIndustry(true);
    } else {
      setOtherIndustry(false);
    }

    if (changedFields.jobYear) {
      setYearCurrent(changedFields.jobYear);
    }
    if (changedFields.empYear) {
      setYearTotal(changedFields.empYear);
    }
    if (changedFields.jobMonth) {
      setMonthCurrent(changedFields.jobMonth);
    }
    if (changedFields.empMonth) {
      setMonthTotal(changedFields.empMonth);
    }
  };

  const onFinish = (values) => {
    if (error) {
      tw("Current job experience exceeds total work experience");
      return;
    }
    const currentJobStatus = currentJob;
    let id = null;
    if (
      props.qde.getQdeSectionDetails &&
      props.qde.getQdeSectionDetails.data &&
      props.qde.getQdeSectionDetails.data.additionalDetails &&
      !isEmpty(
        props.qde.getQdeSectionDetails.data.additionalDetails.employedetails
      )
    ) {
      id =
        props.qde.getQdeSectionDetails.data.additionalDetails.employedetails.id;
    }

    const payload = {
      ...values,
      id,
      applicantUniqueId: props.match.params.id,
      leadCode: props.qde.getQdeSectionDetails.data.leadCode,
      firstJob: currentJobStatus,
    };
    props.saveEmployeeDetails(payload);
  };

  const onFinishFailed = (errorInfo) => {};

  const inputProps = {
    readOnly: props.freezeCase || props.freezeUser,
    disabled: props.freezeCase || props.freezeUser,
  };

  React.useEffect(() => {
    if (
      props.qde.getQdeSectionDetails &&
      props.qde.getQdeSectionDetails.data &&
      props.qde.getQdeSectionDetails.data.additionalDetails &&
      !isEmpty(
        props.qde.getQdeSectionDetails.data.additionalDetails.employedetails
      )
    ) {
      setCurrentJob(
        props.qde.getQdeSectionDetails.data.additionalDetails.employedetails
          .firstJob
      );
      const {
        company,
        designation,
        empConstitution,
        empIndustry,
        empMonth,
        empYear,
        empOfficeEmail,
        firstJob,
        jobMonth,
        jobYear,
        empOther,
      } = props.qde.getQdeSectionDetails.data.additionalDetails.employedetails;
      form.setFieldsValue({
        designation,
        company,
        empConstitution,
        empIndustry,
        empMonth,
        empOfficeEmail,
        firstJob,
        jobMonth,
        jobYear,
        empYear,
        empOther: empOther || "",
      });
      setYearTotal(empYear);
      setMonthTotal(empMonth);
      setYearCurrent(jobYear);
      setMonthCurrent(jobMonth);
      if (empIndustry === "Others") {
        setOtherIndustry(true);
      }

      setInputLabelProps({
        shrink: true,
      });
    }
  }, [
    form,
    props.qde.getQdeSectionDetails,
    props.qde.getQdeSectionDetails &&
      props.qde.getQdeSectionDetails.data &&
      props.qde.getQdeSectionDetails.data.additionalDetails &&
      props.qde.getQdeSectionDetails.data.additionalDetails.employedetails,
  ]);
  React.useEffect(() => {
    (async () => {
      const designation = await getDesignationDetails();
      setDesignation(designation);
    })();
    (async () => {
      const EmpIndustry = await getEmploymentIndustry();
      setempIndustry(EmpIndustry);
    })();
    (async () => {
      const companyType = await getEmploymentConstitution();
      setCompanyType(companyType);
    })();
  }, []);

  const designationDropdownList = [
    <option hidden> {} </option>,
    ...map(designation, (item) => {
      return <option value={item.designation}>{item.designation}</option>;
    }),
  ];

  const industryDropdownList = [
    <option hidden> {} </option>,
    ...map(empIndustry, (item) => {
      return (
        <option value={item.employmentIndustry}>
          {item.employmentIndustry}
        </option>
      );
    }),
  ];

  // Total Year greater than current logic
  React.useEffect(() => {
    if ((parseInt(yearTotal) === parseInt(yearCurrent)) && (parseInt(monthTotal) <= parseInt(monthCurrent))){
      setError(true)
    }else setError(true)
    if (parseInt(yearTotal) < parseInt(yearCurrent)) {
      setError(true);
    } else setError(false);
  }, [yearCurrent, yearTotal, monthCurrent, monthTotal]);

  const companyTypeDropdownList = [
    <option hidden> {} </option>,
    ...map(companyType, (item) => {
      return (
        <option value={item.employmentConstitution}>
          {item.employmentConstitution}
        </option>
      );
    }),
  ];

  // Total Year greater than current logic
  React.useEffect(() => {
    if (
      parseInt(yearTotal) === parseInt(yearCurrent) &&
      parseInt(monthTotal) <= parseInt(monthCurrent)
    ) {
      setError(true);
    } else
     if (parseInt(yearTotal) < parseInt(yearCurrent)) {
      setError(true);
    } else setError(false);
  }, [yearCurrent, yearTotal, monthCurrent, monthTotal, error]);

  return (
    <div className="DetailsCommon">
      <Form
        ref={(e) => (form = e)}
        name="basic"
        initialValues={{ remember: true }}
        onValuesChange={handleValueChange}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={30}>
          <Col lg={8}>
            <div className={"mui-dropdown-wrapper"}>
              <img alt={"select"} src={SelectIcon} className="searchIcon" />

              <div className={"mui-dropdown-wrapper"}>
                <img alt={"select"} src={SelectIcon} className="searchIcon" />
                <Form.Item
                  name={"designation"}
                  rules={[
                    {
                      required: true,
                      message: "Designation is mandatory",
                    },
                  ]}
                >
                  <TextField
                    inputProps={inputProps}
                    key={Math.random()}
                    label="Designation*"
                    select
                    fullWidth
                    SelectProps={{
                      native: true,
                    }}
                  >
                    {designationDropdownList}
                  </TextField>
                </Form.Item>
              </div>
            </div>
          </Col>
          <Col lg={8}>
            {" "}
            <Form.Item
              name={"company"}
              rules={[
                {
                  required: true,
                  message: "Company name is mandatory",
                },
              ]}
            >
              <TextField
                inputProps={inputProps}
                value={form && form.getFieldValue("company")}
                key={Math.random()}
                multiline
                fullWidth
                rowsMax={4}
                label="Company*"
                onInput={(e) => {
                  e.target.value =
                    e.target.value &&
                    e.target.value.toString().match(/^[a-zA-Z ]*$/)
                      ? e.target.value.toString().slice(0, 30)
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

              <div className={"mui-dropdown-wrapper"}>
                <img alt={"select"} src={SelectIcon} className="searchIcon" />
                <Form.Item
                  name={"empConstitution"}
                  rules={[
                    {
                      required: true,
                      message: "Company type is mandatory",
                    },
                  ]}
                >
                  <TextField
                    inputProps={inputProps}
                    InputLabelProps={InputLabelProps}
                    key={Math.random()}
                    label="Company Type*"
                    select
                    fullWidth
                    SelectProps={{
                      native: true,
                    }}
                    InputLabelProps={{
                      shrink: form && form.getFieldValue("empConstitution"),
                    }}
                  >
                    {companyTypeDropdownList}
                  </TextField>
                </Form.Item>
              </div>
            </div>
          </Col>

          <Col lg={8}>
            <div className={"mui-dropdown-wrapper"}>
              <img alt={"select"} src={SelectIcon} className="searchIcon" />

              <div className={"mui-dropdown-wrapper"}>
                <img alt={"select"} src={SelectIcon} className="searchIcon" />
                <Form.Item
                  name={"empIndustry"}
                  rules={[
                    {
                      required: true,
                      message: "Industry is mandatory",
                    },
                  ]}
                >
                  <TextField
                    inputProps={inputProps}
                    InputLabelProps={InputLabelProps}
                    key={Math.random()}
                    label="Industry *"
                    select
                    fullWidth
                    SelectProps={{
                      native: true,
                    }}
                    InputLabelProps={{
                      shrink: form && form.getFieldValue("empIndustry"),
                    }}
                  >
                    {industryDropdownList}
                  </TextField>
                </Form.Item>
              </div>
            </div>
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
              name={"empOfficeEmail"}
            >
              <TextField
                InputLabelProps={InputLabelProps}
                inputProps={inputProps}
                fullWidth={true}
                onInput={(e) => {
                  const matchPattern = e.target.value.match(/[$#%<>&^*',\s]/);
                  e.target.value = !matchPattern
                    ? e.target.value.toString().slice(0, 50)
                    : e.target.value.toString().trim().replace(/ /g, "");
                }}
                label="Email Address*"
                key={Math.random()}
              />
            </Form.Item>
          </Col>
        </Row>

        {otherIndustry && (
          <Row gutter={30}>
            <Col lg={8}>
              <Form.Item
                name={"empOther"}
                rules={[
                  {
                    required: true,
                    message: "Industry Name is mandatory",
                  },
                ]}
              >
                <TextField
                  InputLabelProps={InputLabelProps}
                  inputProps={inputProps}
                  label="Industry Name*"
                  fullWidth
                  InputLabelProps={{
                    shrink: form && form.getFieldValue("empOther"),
                  }}
                ></TextField>
              </Form.Item>
            </Col>
          </Row>
        )}
        <br />
        <p className="sub-title">Working at Current Job since*</p>
        <Row gutter={40}>
          <Col lg={8}>
            <Form.Item
              name={"jobYear"}
              rules={[
                {
                  required: true,
                  message: "Years is mandatory",
                },
              ]}
            >
              <TextField
                inputProps={inputProps}
                fullWidth={true}
                id="standard-basic"
                label="Years*"
                className="textField fileNoinput"
                onKeyDown={(e) =>
                  (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
                }
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 2);
                }}
                type="number"
                InputLabelProps={InputLabelProps}
              />
            </Form.Item>
          </Col>

          <Col lg={8}>
            <div className={"mui-dropdown-wrapper"}>
              <img alt={"select"} src={SelectIcon} className="searchIcon" />
              <Form.Item
                name={"jobMonth"}
                rules={[
                  {
                    required: true,
                    message: "Months is mandatory",
                  },
                ]}
              >
                <TextField
                  key={Math.random()}
                  inputProps={inputProps}
                  label="Months*"
                  select
                  fullWidth
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option hidden></option>
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10</option>
                  <option value={11}>11</option>
                </TextField>
              </Form.Item>
            </div>
          </Col>
        </Row>

        <Row className={"typeRow"} gutter={40}>
          <br />
          <Col lg={24}>
            <Row>
              <span className="sub-title">
                Is the current Job, your first job?
              </span>
              <Form.Item
                name="firstJob"
                rules={[
                  {
                    required: true,
                    message: "Please Select an option",
                  },
                ]}
              >
                {props.freezeCase || props.freezeUser ? (
                  <Radio.Group
                    style={{
                      display: "flex",
                      width: "100%",
                      margin: "-20px 30px",
                    }}
                    defaultValue={currentJob}
                    key={currentJob}
                  >
                    <Radio
                      disabled
                      onClick={() => setCurrentJob(true)}
                      value={true}
                    >
                      Yes
                    </Radio>
                    <Radio
                      disabled
                      onClick={() => setCurrentJob(false)}
                      value={false}
                    >
                      No
                    </Radio>
                  </Radio.Group>
                ) : (
                  <Radio.Group
                    style={{
                      display: "flex",
                      width: "100%",
                      margin: "-20px 30px",
                    }}
                    defaultValue={currentJob}
                    key={currentJob}
                  >
                    <Radio onClick={() => setCurrentJob(true)} value={true}>
                      Yes
                    </Radio>
                    <Radio onClick={() => setCurrentJob(false)} value={false}>
                      No
                    </Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Row>
          </Col>
        </Row>
        <br />
        {currentJob === false ? (
          <>
            <p className="sub-title">Total Work Experience</p>
            <Row gutter={40}>
              <Col lg={8}>
                <Form.Item
                  name={"empYear"}
                  rules={[
                    {
                      required: true,
                      message: "Years is mandatory",
                    },
                  ]}
                >
                  <TextField
                    inputProps={inputProps}
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
                    InputLabelProps={InputLabelProps}
                  />
                </Form.Item>
              </Col>

              <Col lg={8}>
                <div className={"mui-dropdown-wrapper"}>
                  <img alt={"select"} src={SelectIcon} className="searchIcon" />
                  <Form.Item
                    name={"empMonth"}
                    rules={[
                      {
                        required: true,
                        message: "Months is mandatory",
                      },
                    ]}
                  >
                    <TextField
                      inputProps={inputProps}
                      label="Months*"
                      select
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                    >
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
          </>
        ) : null}
        <Row gutter={30}></Row>
        <div className="alignButton">
          {!(props.freezeCase || props.freezeUser) && (
            <Button htmlType="submit" className="save-button">
              Save
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { qde: state.qde };
};

const mapDispatchToProps = {
  saveEmployeeDetails,
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailsEmployee);
