import { ArrowRightOutlined } from "@ant-design/icons";
import TextField from "@material-ui/core/TextField";
import { Form, Checkbox } from "antd";
import { cloneDeep } from "lodash";
import React from "react";
import { connect } from "react-redux";
import SelectIcon from "../../assets/Images/select.svg";
import { syncLogin } from "../../Redux/Action/Login";
import { disbursementModule, getLoginModule } from "../../Redux/Services/Login";
import { public_url } from "../../Utility/Constant";
import { te, ts } from "../../Utility/ReduxToaster";
import { postLogin } from "../../Utility/Services/Login";
import Cookies from "js-cookie";
import _ from "lodash";
import "./style.scss";
// import {Link} from "react-router-dom"

require("dotenv").config();

const loginForm = {
  userName: "",
  password: "",
  module: "sales",
  errors: {
    userName: null,
    password: null,
  },
};
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      form: cloneDeep(loginForm),
      loading: false,
      encrPassword: null,
      checked: false,
      email: null,
    };
    this.onChange = this.onChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  }
  onInputChange = (e) => {
    const { name, value } = e.target;
    const { form } = this.state;
    form[name] = value;
    this.setState({ form });
  };

  onInputValidate = (name, error) => {
    let { errors } = this.state.form;
    errors[name] = error;
    this.setState({
      form: { ...this.state.form, errors: errors },
    });
  };

  handleFormChange = (changedFields, allFields) => {
    if (allFields.userName) {
      this.setState({ email: allFields.userName });
    }
    if (allFields.password) {
      let encr = btoa(allFields.password);
      this.setState({ encrPassword: encr });
    }
  };

  handleSubmit = async (e) => {
    if (this.state.checked) {
      Cookies.set("userPass", this.state.encrPassword, { expires: 365 });
      Cookies.set("userName", this.state.email, { expires: 365 });
      Cookies.set("checked", this.state.checked, { expires: 365 });
    } else {
      Cookies.remove("userPass");
      Cookies.remove("userName");
      Cookies.set("checked", this.state.checked, { expires: 365 });
    }

    if (e.module === "disbursement") {
      const { module, ...data } = e;
      this.props.disbursementModule(data);
    }
    if (e.module === "credit") {
      //redirect to credit
      const { module, ...data } = e;
      this.props.getLoginModule(data);

      return;
    } else if (e.module === "sales") {
      const {
        form: { error, ...rest },
      } = this.state;

      let { syncLogin } = this.props;
      if (!e) {
        te("Please enter required information");
        return false;
      }
      if (e) {
        this.setState({ loading: true });
        postLogin(e).then((res) => {
          if (res.error) {
            this.setState({ loading: false });
            return;
          }
          if (res.data.error == true) {
            this.setState({ loading: false });
            te(res.data.message);
          } else if (res.data.error == false) {
            syncLogin(res.data);
            this.props.history.push(public_url.dashboard);
            ts(res.data.message);
          }
          this.setState({ loading: false });
        });
      }
    }
  };

  handleReset() {
    Cookies.set("forgotPass", true, { expires: 365 });
    window.location.replace(
      "https://app.creditwisecapital.in/admin/forgotpassword"
    );
  }

  onChange(e) {
    if (e.target.checked) {
      this.setState({ checked: true });
    } else {
      this.setState({ checked: false });
    }
  }
  componentDidMount() {
    if (Cookies.get("userPass")) {
      this.form &&
        this.form.setFieldsValue({
          password: atob(Cookies.get("userPass")),
        });
    }
    if (Cookies.get("userName")) {
      this.form &&
        this.form.setFieldsValue({
          userName: Cookies.get("userName"),
        });
    }
    console.log("Cookies.get", Cookies.get("checked") === "true");
    const check = Cookies.get("checked");
    console.log("chk", typeof check);
    if (check === "true") {
      this.setState({ checked: true });
    } else {
      this.setState({ checked: false });
    }
    if (localStorage.getItem("employeeId")) {
      this.props.history.push(public_url.dashboard);
    }

    let clrFlag = window.location.href.split("clear=")[1];

    if (clrFlag) {
      localStorage.removeItem("ctoken");
      localStorage.removeItem("dtoken");
    }

    this.form.resetFields(["module"]);
    if (localStorage.getItem("ctoken") || localStorage.getItem("dtoken")) {
      window.history.forward();
    }
  }
  render() {
    let { form } = this.state;
    let { errors } = form;
    return (
      <div className={"LogincontainerWrapper"}>
        <div className="LoginChildParent">
          <div className="col-12 text-center">
            <img alt="logo" src="/images/cwc-logo.png" />
          </div>
          <div className="text-center w-100 pt-3 loginTexfieldTheme">
            <div className="mb-5">
              <h1 className="Welcome">Welcome! </h1>
            </div>
            <Form
              name="basic"
              onFinish={this.handleSubmit}
              onValuesChange={this.handleFormChange}
              initialValues={{
                remember: true,
              }}
              ref={(e) => (this.form = e)}>
              <div className=" text-left ">
                <div className={"mui-dropdown-wrapper"}>
                  <img alt={"select"} src={SelectIcon} className="searchIcon" />
                  <Form.Item
                    name="module"
                    rules={[
                      {
                        required: true,
                        message: "Module is mandatory",
                      },
                    ]}>
                    <TextField
                      SelectProps={{
                        native: true,
                      }}
                      select
                      isReq={true}
                      key="module"
                      name="module"
                      id="standard-basic"
                      label="Module"
                      className="textField">
                      <option hidden></option>
                      <option value="sales">Sales Module</option>
                      <option value="credit">Credit Module</option>
                      <option value="disbursement">Disbursement Module</option>
                    </TextField>
                  </Form.Item>
                </div>

                <div className="form-group hide-input-title">
                  <Form.Item
                    name="userName"
                    rules={[
                      {
                        required: true,
                        message: "Email Address is mandatory",
                      },
                      {
                        pattern: new RegExp(
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        ),
                        message: "Invalid email Address",
                      },
                    ]}>
                    <TextField
                      isReq={true}
                      type="email"
                      onChange={this.onInputChange}
                      name="userName"
                      id="standard-basic"
                      label="@ Email Address"
                      className="textField"
                    />
                  </Form.Item>
                </div>
                <div
                  className="form-group hide-input-title"
                  style={{ marginTop: "-6%" }}>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Password is mandatory",
                      },
                    ]}>
                    <TextField
                      type="password"
                      onChange={this.onInputChange}
                      error={errors.password}
                      validationFunc={this.onInputValidate}
                      name="password"
                      id="standard-basic"
                      label="* Password"
                      className="textField passwordTextfield"
                    />
                  </Form.Item>
                  <Checkbox
                    checked={this.state.checked}
                    onChange={this.onChange}>
                    Remember me
                  </Checkbox>
                </div>

                <div className="ButtonContainer">
                  <button htmlType="submit" className="btnSubmitLogin">
                    <span className="loginTxt">Login</span>
                    <span className="LoginIcon">
                      <ArrowRightOutlined />
                    </span>
                  </button>

                  <div
                    className="col-6 reset-password"
                    style={{ paddingRight: "0px", color: "#334e9e" }}>
                    <a onClick={this.handleReset} className="resetPassword">
                      {" "}
                      Forgot Password?{" "}
                    </a>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
// export default connect((state) => state, { syncLogin })(Login);

const mapDispatchToProps = {
  syncLogin,
  getLoginModule,
  disbursementModule,
};

const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
