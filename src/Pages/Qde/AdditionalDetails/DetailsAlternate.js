import TextField from "@material-ui/core/TextField";
import { Button, Col, Form, Row } from "antd";
import { isEmpty } from "lodash";
import React from "react";
import { connect } from "react-redux";
import {
  addAlternateContactDetails,
  getAlternateContactDetails,
} from "../../../Redux/Services/Qde";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function DetailsAlternate(props) {
  let form;
  const [InputLabelProps, setInputLabelProps] = React.useState({});
  const [InputLabelPropsMobile, setInputLabelPropsMobile] = React.useState({shrink: false})

  const onFinish = (values) => {
    let id = null;
    if (
      props.qde.getQdeSectionDetails &&
      props.qde.getQdeSectionDetails.data &&
      props.qde.getQdeSectionDetails.data.additionalDetails &&
      !isEmpty(
        props.qde.getQdeSectionDetails.data.additionalDetails.alternateContact
      )
    ) {
      id =
        props.qde.getQdeSectionDetails.data.additionalDetails.alternateContact
          .id;
    }

    const payload = {
      ...values,
      applicantUniqueId: props.match.params.id,
      leadCode: props.qde.getQdeSectionDetails.data.leadCode,
      id,
    };
    props.addAlternateContactDetails(payload);
  };

  const inputProps = {
    readOnly: props.freezeCase || props.freezeUser,
    disabled: props.freezeCase || props.freezeUser,
    ...InputLabelProps,
  };

  React.useEffect(() => {
    if (
      props.qde.getQdeSectionDetails &&
      props.qde.getQdeSectionDetails.data &&
      props.qde.getQdeSectionDetails.data.additionalDetails &&
      !isEmpty(
        props.qde.getQdeSectionDetails.data.additionalDetails.alternateContact
      )
    ) {
      const { mobileNo } =
        props.qde.getQdeSectionDetails.data.additionalDetails.alternateContact;
      form.setFieldsValue({ alternateContact: mobileNo });
      setInputLabelProps({
        shrink: true,
      });
      setInputLabelPropsMobile({shrink: true})
    }
    else{
       setInputLabelPropsMobile({ shrink: false });
    }
  }, [form, props.qde.getQdeSectionDetails]);

  const handleFormChange = (changedFields, allFields) => {
    if(allFields.alternateContact){
       setInputLabelPropsMobile({ shrink: true });
    }
    else{
      setInputLabelPropsMobile({ shrink: false });
    }
  }

  return (
    <div className="DetailsCommon">
      <Form
        ref={(e) => (form = e)}
        name="alternateContact"
        initialValues={{ remember: true }}
        onValuesChange={handleFormChange}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Row gutter={30}>
          <Col lg={8}>
            <Form.Item
              rules={[
                {
                  pattern: new RegExp(/^[6-9]{1}[0-9]{9}$/),
                  message: "Invalid Mobile Number",
                },
                {
                  required: true,
                  message: "Mobile Number is mandatory",
                },
              ]}
              name="alternateContact">
              <TextField
                inputProps={inputProps}
                onInput={(e) => {
                  e.target.value = e.target.value
                    ? Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 10)
                    : "";
                }}
                InputLabelProps={InputLabelPropsMobile}
                type="number"
                fullWidth
                id="number"
                label="Mobile Number*"
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
  addAlternateContactDetails,
  getAlternateContactDetails,
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailsAlternate);
