import TextField from "@material-ui/core/TextField";
import { Button, Col, Form, Row } from "antd";
/* eslint-disable react-hooks/rules-of-hooks */
import isEmpty from "lodash/isEmpty";
import React from "react";
import { connect } from "react-redux";
import {
  getPincodeDetail,
  saveAddressDetails,
} from "../../../Redux/Services/Qde";
import "./style.scss";

function DetailsOffice(props) {
  let form;
  const [InputLabelProps, setInputLabelProps] = React.useState({
    shrink: false,
  });
  const [city, setCity] = React.useState();
  const [state, setState] = React.useState();

  const handleValueChange = (changedFields, allFields) => {
    if (changedFields.pinCode && changedFields.pinCode.length === 6) {
      setPincodeDetails(changedFields.pinCode, form);
    }
    if (changedFields.pinCode) {
      form.resetFields(["city", "state"]);
    }
    if (allFields.address2 || allFields.address1 || allFields.pinCode) {
      setInputLabelProps({ shrink: true });
    } else {
      setInputLabelProps({ shrink: false });
    }
  };

  const setPincodeDetails = async (pinCode, formInstance) => {
    const response = await getPincodeDetail({ pincode: pinCode });
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

  const onFinish = (values) => {
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
      applicantUniqueId: props.match.params.id,
      leadCode: props.qde.getQdeSectionDetails.data.leadCode,
      type: "Office",
      id,
    };
    props.saveAddressDetails(payload, "office");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
          .officeAddresDetails
      )
    ) {
      console.log("ifff")
      const { city, state, pinCode, address1, address2 } =
        props.qde.getQdeSectionDetails.data.additionalDetails
          .officeAddresDetails;
      form.setFieldsValue({ address1, address2, pinCode, city, state });
      city &&
        state &&
        setInputLabelProps({
          shrink: true,
        });
    }
    else{
      console.log("else");
      setInputLabelProps({
        shrink: false,
      });
    }


  }, [form, props.qde.getQdeSectionDetails]);

  console.log("InputLabelProps", InputLabelProps);
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
                inputProps={inputProps}
                multiline
                fullWidth
                rowsMax={4}
                label="Address Line 1*"
                InputLabelProps={InputLabelProps}
              />
            </Form.Item>
          </Col>
          <Col lg={8}>
            {" "}
            <Form.Item
              rules={[
                {
                  required: false,
                  message: "Address  is mandatory",
                },
              ]}
              name={"address2"}>
              <TextField
                inputProps={inputProps}
                multiline
                fullWidth
                rowsMax={4}
                label="Address Line 2"
                InputLabelProps={InputLabelProps}
              />
            </Form.Item>
          </Col>
          <Col lg={8}></Col>
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
                label="Pincode*"
                fullWidth
                InputLabelProps={InputLabelProps}
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
                fullWidth
                label="City*"
                InputLabelProps={InputLabelProps}
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
              name={"state"}>
              <TextField
                inputProps={inputProps}
                fullWidth
                id="standard-read-only-input"
                label="State*"
                InputLabelProps={InputLabelProps}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailsOffice);
