import { isEmpty } from "lodash";
import find from "lodash/find";
import React from "react";
import { connect } from "react-redux";
import BikeImg from "../../assets/Images/bike1.png";
import RightArrow from "../../assets/Images/rightarrow.png";
import { setHeading } from "../../Redux/Action/App";
import {
  getDashboardCounts,
  getUserByIdGlobally,
} from "../../Redux/Services/Dashboard";
import { productNameMapping } from "../../Utility/Constant";
import { setLeadListType } from "../../Redux/Action/Leads";
import "./style.scss";
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeName: "HELLO PARASD",
    };
  }

  redirect = (type) => {
    this.props.history.push(`/leadLists/${type}`);
  };

  componentDidMount() {
    console.log(this.props.history, "this.props.history");

    this.props.setLeadListType("Lead");
    this.props.getDashboardCounts({
      employeeId: JSON.parse(localStorage.getItem("UserData"))
        ? JSON.parse(localStorage.getItem("UserData")).employeeId
        : "",
      branchName: JSON.parse(localStorage.getItem("UserData"))
        ? JSON.parse(localStorage.getItem("UserData")).branchName
        : "",
    });
    this.props.setHeading("My Dashboard");
  }

  render() {
    // if (!isEmpty(this.props.login.data)) {
    //   this.setState({
    //     employeeName: this.props.login.data.employeeName,
    //   });
    // }
    const { dashboard } = this.props;

    let countNTW, countETW, countUTW, countOTW;

    if (dashboard.count.length) {
      countNTW = find(dashboard.count, { productName: "NTW" });
      countETW = find(dashboard.count, { productName: "ETW" });
      countUTW = find(dashboard.count, { productName: "UTW" });
      countOTW = find(dashboard.count, { productName: "OTW" });
    } else {
      countNTW = find(productNameMapping, {
        productName: "New Two Wheeler",
      });
      countETW = find(productNameMapping, {
        productName: "Electric Two Wheeler",
      });
      countUTW = find(productNameMapping, { productName: "Used Two Wheeler" });
      countOTW = find(productNameMapping, { productName: "Other Two Wheeler" });
    }

    return (
      <div className="containerDashParent">
        <div className="MainContainerthemeLabelConteiner"></div>
        <div className="Hello-username">
          Hello,&nbsp;{" "}
          {JSON.parse(localStorage.getItem("UserData"))
            ? JSON.parse(localStorage.getItem("UserData")).employeeName + "!"
            : ""}
        </div>
        <div className="mainDashboardContainer">
          <div className="DashboardContainer">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-3" style={{ padding: "0px" }}>
                  <div className="crd1">
                    <div className="circle">
                      <div className="circle__inner">
                        <div className="circle__wrapper">
                          <div
                            className="circle__content"
                            onClick={(e) =>
                              this.redirect(countNTW ? countNTW.productId : 1)
                            }
                          >
                            <span className="titleOfCards">New Two </span>
                            <br />
                            <span className="titleOfCards">Wheeler</span>
                            <br />
                            <span className="countcircleCards">
                              {countNTW ? countNTW.leadCount : 0}
                            </span>{" "}
                            <br />
                            <img
                              src={RightArrow}
                              className="arrowOfCirclecards"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3" style={{ padding: "0px" }}>
                  <div className="circle" style={{ marginTop: "65%" }}>
                    <div className="circle__inner">
                      <div className="circle__wrapper">
                        <div
                          className="circle__content"
                          onClick={(e) =>
                            this.redirect(countETW ? countETW.productId : 2)
                          }
                        >
                          <span className="titleOfCards">Electric Two </span>
                          <br />
                          <span className="titleOfCards">Wheeler</span>
                          <br />
                          <span className="countcircleCards">
                            {countETW ? countETW.leadCount : 0}
                          </span>{" "}
                          <br />
                          <img
                            src={RightArrow}
                            className="arrowOfCirclecards"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3" style={{ padding: "0px" }}>
                  <div className="circle" style={{ marginTop: "15%" }}>
                    <div className="circle__inner">
                      <div className="circle__wrapper">
                        <div
                          className="circle__content"
                          onClick={(e) =>
                            this.redirect(countUTW ? countUTW.productId : 3)
                          }
                        >
                          <span className="titleOfCards">Used Two </span>
                          <br />
                          <span className="titleOfCards">Wheeler</span>
                          <br />
                          <span className="countcircleCards">
                            {countUTW ? countUTW.leadCount : 0}
                          </span>{" "}
                          <br />
                          <img
                            src={RightArrow}
                            className="arrowOfCirclecards"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3" style={{ padding: "0px" }}>
                  <div className="circle" style={{ marginTop: "70%" }}>
                    <div className="circle__inner">
                      <div className="circle__wrapper">
                        <div
                          className="circle__content"
                          onClick={(e) =>
                            this.redirect(countOTW ? countOTW.productId : 4)
                          }
                        >
                          <span className="titleOfCards">Other Two </span>
                          <br />
                          <span className="titleOfCards">Wheeler</span>
                          <br />
                          <span className="countcircleCards">
                            {countOTW ? countOTW.leadCount : 0}
                          </span>{" "}
                          <br />
                          <img
                            src={RightArrow}
                            className="arrowOfCirclecards"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img src={BikeImg} className="bikeImage" />
      </div>
    );
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     getDashboardCounts: () => {
//       dispatch(getDashboardCounts()); //same name as action.js
//     },
//     getUserByIdGlobally: () => {
//       dispatch(getUserByIdGlobally());
//     },
//     setHeadingValue: (payload) => {
//       dispatch(setHeading(payload));
//     },
//   };
// }
const mapDispatchToProps = {
  getDashboardCounts,
  getUserByIdGlobally,
  setHeading,
  setLeadListType,
};
const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
    login: state.login,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
