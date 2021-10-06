import React from "react";
import { Form } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import TextField from "@material-ui/core/TextField";
import {connect } from "react-redux";
import "./style.scss";
import { verifyItrCreds } from './../../Redux/Services/Dde';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 12 },
};
function VerifyCredentials(props) {
  const onFinish = (values) => {
    console.log(values)
    props.verifyItrCreds({
      applicantUniqueId: props.match.params.id,
      ...values,
     
    });
  };

  const onFinishFailed = (errorInfo) => { };
  console.log(props.match.params.id)
  return (
    <div className="verifyViaCreds">
      <br />
      <br />
      <br />
      <br />
      <p className="Welcome">Verify via Credentials </p>
      <br />
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Form.Item
          name="username"
          rules={[{ required: false, message: "Please input your email!" }]}>
          <TextField
            id="outlined-name"
            label="@ Username"
            style={{ width: 320 }}
            // type="email"
            variant="standard"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: false, message: "Please input your password!" }]}>
          <TextField
            id="standard-basic"
            label="* Password"
            type="password"
            style={{ width: 320 }}
          />
        </Form.Item>
        <br />

        <Form.Item {...tailLayout}>
          <button className="btnSubmitLogin" htmlType='submit'>
            <span className="loginTxt">Verify</span>
            <span className="LoginIcon">
              <ArrowRightOutlined />
            </span>
          </button>
        </Form.Item>
      </Form>
    </div>
  );
}


const mapDispatchToProps = { verifyItrCreds};

const mapStateToProps = (state) => {
  return {
    verifyItrCredentials: state.verifyItrCredentials,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyCredentials);
