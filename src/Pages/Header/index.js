import React from "react";
// import "style.scss"
import { connect } from "react-redux";
import LogoImg from "../../../src/assets/Images/cwc-logo.png";
import ProfileImg from "../../assets/Images/profile.png";
import "./style.css";

class Header extends React.Component {
  render() {
    return (
      <React.Fragment>
        <nav
          style={{ padding: "0 10px" }}
          className="navbar navbar-expand-sm navbar-light bg-light position-sticky fixed-top"
        >
          <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <img
                  src={LogoImg}
                  alt=""
                  width="100"
                  height="35"
                  className="d-inline-block align-top"
                  style={{ marginRight: "10%" }}
                  onClick={() => window.location.replace("/dashboard")}
                />
              </li>
            </ul>
          </div>
          <div className="mx-auto order-0">
            <div className="navbar-brand mx-auto">
              <span className="titleInHeader">{this.props.app.heading}</span>
            </div>
          </div>
          <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/log-in">
                  <img src={ProfileImg} alt="" width="30" height="30" />
                  <br />
                  <span
                    style={{
                      fontSize: "12px",
                      color: "red",
                    }}
                    onClick={(e) => {
                      localStorage.clear();
                    }}
                  >
                    Logout
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    app: state.app,
  };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
