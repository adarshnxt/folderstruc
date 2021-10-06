import TextField from "@material-ui/core/TextField";
import { Button, Col, Form, Row, Checkbox } from "antd";
import isEmpty from "lodash/isEmpty";
import React from "react";
import SelectIcon from "../../../assets/Images/select.svg";
import { connect } from "react-redux";
import {
  getPincodeDetail,
  saveAddressDetails,
} from "../../../Redux/Services/Qde";
import "./style.scss";

function DetailsPermanent(props) {
  let form;
  const [InputLabelProps, setInputLabelProps] = React.useState({
    shrink: false,
  });
  const [city, setCity] = React.useState();
  const [state, setState] = React.useState();
  const [pincode, setPincode] = React.useState();
  const [isOptional, setIsOptional] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [permaYear, setPermaYear] = React.useState(0);
  const [permaMonth, setPermaMonth] = React.useState(0);

  const handleValueChange = (changedFields, allFields) => {
    if (changedFields.pinCode && changedFields.pinCode.length === 6) {
      setPincodeDetails(changedFields.pinCode, form);
    }
      if (changedFields.pinCode) {
        form.resetFields(["city", "state"]);
      }
    if (allFields.address1 || allFields.address2) {
      setInputLabelProps({
        shrink: true,
      });
    } else {
      setInputLabelProps({
        shrink: false,
      });
    }
  };
  const fetchKycAdress = (e) => {
    setChecked(e.target.checked);
  };


  React.useEffect(() => {
    if (
      props.qde.getQdeSectionDetails &&
      props.qde.getQdeSectionDetails.data &&
      props.qde.getQdeSectionDetails.data.additionalDetails &&
      props.qde.getQdeSectionDetails.data.additionalDetails.kycaddresDetails
    ) {
      const address1 =
        props.qde.getQdeSectionDetails.data.additionalDetails.kycaddresDetails
          .address1;

      const address2 =
        props.qde.getQdeSectionDetails.data.additionalDetails.kycaddresDetails
          .address2;

      const pinCode =
        props.qde.getQdeSectionDetails.data.additionalDetails.kycaddresDetails
          .pinCode;
      const city =
        props.qde.getQdeSectionDetails.data.additionalDetails.kycaddresDetails
          .city;
      const state =
        props.qde.getQdeSectionDetails.data.additionalDetails.kycaddresDetails
          .state;
      const permaMonth =
        props.qde.getQdeSectionDetails.data.additionalDetails.kycaddresDetails
          .kycMonth;
      const permaYear =
        props.qde.getQdeSectionDetails.data.additionalDetails.kycaddresDetails
          .kycYear;
      setPermaYear(permaYear)
      setPermaMonth(permaMonth)
      if (checked) {
        setInputLabelProps({ shrink: true });
        form.setFieldsValue({
          address1,
          address2,
          pinCode,
          city,
          state,
          permaMonth: permaMonth,
          permaYear: permaYear,
        });
      
      } else {
        form.resetFields([
          "address1",
          "address2",
          "pinCode",
          "city",
          "state",
          "permaMonth",
          "permaYear",
        ]);
        setInputLabelProps({ shrink: false });
      }
    }
  }, [checked, form, props.qde.getQdeSectionDetails]);

  const setPincodeDetails = async (pinCode, formInstance) => {
    const response = await getPincodeDetail({ pincode: pinCode });
    if (isEmpty(response)) {
      form.resetFields(["city", "state"]);
    }
    const { city, state } = response;
    if (city || state) {
      formInstance.setFieldsValue({
        city,
        state,
      });
      setInputLabelProps({ shrink: true });
    } else {
      formInstance.resetFields(["city", "state"]);
      setInputLabelProps({ shrink: false });
    }
    setCity(city ? city : null);
    setState(state ? state : null);
  };
  React.useEffect(() => {
    if (
      props.qde.getQdeSectionDetails.data &&
      props.qde.getQdeSectionDetails.data.additionalDetails &&
      props.qde.getQdeSectionDetails.data.additionalDetails.kycaddresDetails &&
      (props.qde.getQdeSectionDetails.data.additionalDetails.kycaddresDetails
        .residenceType !== "PG" ||
        props.qde.getQdeSectionDetails.data.additionalDetails.kycaddresDetails
          .residenceType !== "Corporate Provided")
    ) {
      setIsOptional(true);
    } else {
      setIsOptional(false);
    }
  }, [props.qde.getQdeSectionDetails.data]);

  const onFinish = (values) => {
    let id = null;
    if (
      props.qde.getQdeSectionDetails &&
      props.qde.getQdeSectionDetails.data &&
      props.qde.getQdeSectionDetails.data.additionalDetails &&
      !isEmpty(
        props.qde.getQdeSectionDetails.data.additionalDetails
          .permanentaddresDetails
      )
    ) {
      id =
        props.qde.getQdeSectionDetails.data.additionalDetails
          .permanentaddresDetails.id;
    }
    const payload = {
      ...values,
      applicantUniqueId: props.match.params.id,
      leadCode: props.qde.getQdeSectionDetails.data.leadCode,
      type: "Permanent",
      id,
      sameKycFlag: checked,
      
    };
    const other = {
      permaMonth,
      permaYear,
    };
    const data = !checked ? {...payload, } : {...payload,...other}
    props.saveAddressDetails(data, "permanent");
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
        props.qde.getQdeSectionDetails.data.additionalDetails
          .permanentaddresDetails
      )
    ) {
      const {
        city,
        state,
        address1,
        address2,
        pinCode,
        permaMonth,
        permaYear,
        sameKycFlag,
      } =
        props.qde.getQdeSectionDetails.data.additionalDetails
          .permanentaddresDetails;
      form.setFieldsValue({
        address1,
        address2,
        pinCode,
        city,
        state,
        permaMonth,
        permaYear,
      });
      setChecked(sameKycFlag);
      setPincode({ pinCode });
      city &&
        state &&
        setInputLabelProps({
          shrink: true,
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.qde.getQdeSectionDetails]);

  console.log("aaaaa", form && form.getFieldValue("permaYear"))
  return (
    <div className="DetailsCommon">
      <Form
        ref={(e) => (form = e)}
        name="basic"
        initialValues={{ remember: true }}
        onValuesChange={handleValueChange}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Row gutter={30}>
          {props.qde.getQdeSectionDetails.data &&
            props.qde.getQdeSectionDetails.data.additionalDetails &&
            props.qde.getQdeSectionDetails.data.additionalDetails
              .kycaddresDetails &&
            (props.qde.getQdeSectionDetails.data.additionalDetails
              .kycaddresDetails.residenceType === "Owned" ||
              props.qde.getQdeSectionDetails.data.additionalDetails
                .kycaddresDetails.residenceType === "Rented" ||
              props.qde.getQdeSectionDetails.data.additionalDetails
                .kycaddresDetails.residenceType ===
                "Staying with Relatives") && (
              <Col lg={24} className="mb-3">
                <Checkbox
                  disabled={props.freezeCase || props.freezeUser}
                  checked={checked}
                  onChange={fetchKycAdress}></Checkbox>
                <span className="sub-title">&nbsp;Same as KYC Address?</span>
              </Col>
            )}
          <Col lg={8}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Address is mandatory",
                },
              ]}
              name={"address1"}>
              <TextField
                InputLabelProps={InputLabelProps}
                // key={Math.random()}
                inputProps={inputProps}
                multiline
                fullWidth
                rowsMax={5}
                label={isOptional ? "Address Line 1" : "Address Line 1*"}
              />
            </Form.Item>
          </Col>
          <Col lg={8}>
            {" "}
            <Form.Item
              rules={[
                {
                  required: false,
                  type: "string",
                  message: "Address is mandatory",
                },
              ]}
              name={"address2"}>
              <TextField
                InputLabelProps={InputLabelProps}
                inputProps={inputProps}
                // key={Math.random()}
                multiline
                fullWidth
                rowsMax={4}
                label="Address Line 2"
              />
            </Form.Item>
          </Col>
          <Col span={6}></Col>
        </Row>

        <Row gutter={30}>
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
              name={"pinCode"}>
              <TextField
                InputLabelProps={InputLabelProps}
                inputProps={inputProps}
                onKeyDown={(e) =>
                  (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
                }
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 6);
                }}
                type="number"
                label={isOptional ? "Pincode" : "Pincode*"}
                fullWidth
              />
            </Form.Item>
          </Col>

          <Col lg={8}>
            {" "}
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "City is mandatory",
                },
              ]}
              name={"city"}>
              <TextField
                inputProps={inputProps}
                InputLabelProps={InputLabelProps}
                fullWidth
                id="standard-read-only-input"
                label={isOptional ? "City" : "City*"}
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
            {" "}
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "State is mandatory",
                },
              ]}
              name="state">
              <TextField
                inputProps={inputProps}
                InputLabelProps={InputLabelProps}
                fullWidth
                label={isOptional ? "State" : "State*"}
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

        <br />
        {!checked && (
          <>
        <p className="sub-title">Residing at Current Address since*</p>
        <Row gutter={40}>
          <Col lg={8}>
            <Form.Item
              name={"permaYear"}
              rules={[
                {
                  required: true,
                  message: "Years is mandatory",
                },
              ]}>
              <TextField
                inputProps={inputProps}
                InputLabelProps={InputLabelProps}
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
              />
            </Form.Item>
          </Col>

          <Col lg={8}>
            <div className={"mui-dropdown-wrapper"}>
              <img alt={"select"} src={SelectIcon} className="searchIcon" />
              <Form.Item
                name={"permaMonth"}
                rules={[
                  {
                    required: true,
                    message: "Months is mandatory",
                  },
                ]}>
                <TextField
                  inputProps={inputProps}
                  InputLabelProps={InputLabelProps}
                  label="Months*"
                  select
                  fullWidth
                  SelectProps={{
                    native: true,
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
            </>
        )}
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
  saveAddressDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPermanent);
