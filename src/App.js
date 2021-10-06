import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Spin } from "antd";
import { createBrowserHistory } from "history";
import React from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import { BrowserRouter, Switch } from "react-router-dom";
import "./App.css";
import Header from "./Pages/Header/index";
import { syncLogin } from "./Redux/Action/Login";
import Routes from "./Routes/Route";
import { public_url } from "./Utility/Constant";
import { postGetUserDetail } from "./Utility/Services/Login";
import logo from "./assets/Images/logo.png";
import { Modal, Button } from "antd";
require("dotenv").config();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { logginStatus: true, setIsModalVisible: false };
    this.events = [
      "load",
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keypress",
    ];

    this.warn = this.warn.bind(this);
    this.logout = this.logout.bind(this);
    this.resetTimeout = this.resetTimeout.bind(this);

    for (var i in this.events) {
      window.addEventListener(this.events[i], this.resetTimeout);
    }

    this.setTimeout();
  }

  clearTimeout() {
    if (this.warnTimeout) clearTimeout(this.warnTimeout);

    if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
  }

  setTimeout() {
    this.warnTimeout = setTimeout(this.warn, 900000);

    this.logoutTimeout = setTimeout(this.logout, 900000);
  }

  resetTimeout() {
    this.clearTimeout();
    this.setTimeout();
  }

  warn() {
    const token = localStorage.getItem("accessToken");
    if (token) {
      localStorage.clear();
      this.setState({ setIsModalVisible: true });
      // window.location.reload();
    }

    // alert("You will be logged out automatically in 1 minute.");
  }

  logout() {
    // Send a logout request to the API
    console.log("Sending a logout request to the API...");
    this.setState({ logginStatus: false });
    // this.destroy(); // Cleanup
  }

  destroy() {
    this.clearTimeout();

    for (var i in this.events) {
      window.removeEventListener(this.events[i], this.resetTimeout);
    }
  }
  GetUserDetail() {
    if (localStorage.getItem("employeeId")) {
      postGetUserDetail(
        localStorage.getItem("employeeId"),
        "Sales module"
      ).then((res) => {
        if (res.error) return;
        this.props.syncLogin({ data: res.data.data.user });
      });
    } else {
      if (window.location.pathname !== public_url.login) {
      }
      // window.location.pathname = public_url.login;
    }
  }

  render() {
    // const token = localStorage.getItem("accessToken");
    // if (token) {
    //   setTimeout(() => {
    //     localStorage.clear();
    //     window.location.reload();
    //   }, 36000000);
    // }

    const theme = createMuiTheme({
      typography: {
        fontFamily: "Nunito, sans-serif",
      },
    });
    console.log(window.location.pathname.toLowerCase());
    let tranparentBackground = false;
    const TransparentBackgroundPages = [public_url.login.toLowerCase()];
    if (
      window.location.pathname.toLowerCase() ===
        public_url.landing_page.toLowerCase() ||
      window.location.pathname.toLowerCase() ===
        public_url.login.toLowerCase() ||
      window.location.pathname.toLowerCase() ===
        public_url.dashboard.toLowerCase() ||
      window.location.pathname.toLowerCase() === public_url.qde.toLowerCase() ||
      window.location.pathname
        .toLowerCase()
        .includes(public_url.leadLists.toLowerCase())
    ) {
      tranparentBackground = true;
    }

    return (
      <React.Fragment>
        <Spin
          wrapperClassName="loaderWrapper"
          spinning={this.props.app.loading}
          indicator={<img alt="logo" src={logo} className="loader" />}
        >
          <MediaQuery minDeviceWidth={1224}>
            <ThemeProvider theme={theme}>
              <div className={"bodyWrapper"}>
                <BrowserRouter history={createBrowserHistory()}>
                  {[
                    "/",
                    public_url.login.toLowerCase(),
                    "/sentlink/success",
                    "/sentlink/failure",
                    "/sentlink/timeover",
                    "/sentlink/fisuccess",
                    "/sentlink/fireject",
                    "/sentlink/fisubmit",
                  ].includes(window.location.pathname.toLowerCase()) ? null : (
                    <Header />
                  )}
                  <Modal
                    // title="Basic Modal"
                    visible={this.state.setIsModalVisible}
                    onOk={() => {
                      window.location.reload();
                    }}
                    zIndex={1000}
                    closable={false}
                    cancelButtonProps={{
                      style: {
                        display: "none",
                      },
                    }}
                  >
                    <p>Session Expired! Please re-login.</p>
                  </Modal>
                  <div
                    className={`${
                      tranparentBackground
                        ? "transparentbodyContainer"
                        : "bodyContainer"
                    } ${
                      window.location.pathname.toLowerCase() ===
                      public_url.login.toLowerCase()
                        ? "transparentbodyContainerForLogin"
                        : ""
                    }`}
                  >
                    <Switch>
                      <Routes />
                    </Switch>
                  </div>
                </BrowserRouter>
              </div>
            </ThemeProvider>
          </MediaQuery>
        </Spin>

        <MediaQuery maxDeviceWidth={1224}>
          {/* only sentLink pages (success/failure) show */}
          {[
            "/sentlink/success",
            "/sentlink/failure",
            "/sentlink/timeover",
            "/sentlink/fisuccess",
            "/sentlink/fireject",
            "/sentlink/fisubmit",
          ].includes(window.location.pathname.toLowerCase()) ? (
            <ThemeProvider theme={theme}>
              <div className={"bodyWrapper"}>
                <BrowserRouter history={createBrowserHistory()}>
                  <Switch>
                    <Routes />
                  </Switch>
                </BrowserRouter>
              </div>
            </ThemeProvider>
          ) : (
            <p style={{ textAlign: "center" }}>
              {" "}
              For Better experience download the Mobile App
            </p>
          )}
        </MediaQuery>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { app: state.app };
};
export default connect(mapStateToProps, { syncLogin })(App);
