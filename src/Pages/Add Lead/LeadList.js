/* eslint-disable react-hooks/exhaustive-deps */
import { CloseCircleOutlined } from "@ant-design/icons";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Button, Card, Col, Input, Radio, Row, Table } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import logo from "../../assets/Images/logo.png";
import { setHeading } from "../../Redux/Action/App";
import { setLeadListType } from "../../Redux/Action/Leads";
import { getAllLeadsBySearch, getLeadList } from "../../Redux/Services/leads";
import { public_url } from "../../Utility/Constant";
import { getLoanSummary } from "../../Redux/Services/LoanSummary";

import "./style.css";

function LeadList(props) {
  const leadType = props.leadType;
  const [leadList, setLeadList] = React.useState([]);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [searchLead, setSearchLead] = React.useState("");
  const [totalCount, setTotalCount] = React.useState(0);
  const [count, setCount] = React.useState(10);
  const [spinning, setSpinning] = React.useState(false);

 const freezeUser = 
    props.Summary &&
    props.Summary.loansummary.data &&
    props.Summary.loansummary.data.modelAccess &&
    props.Summary.loansummary.data.modelAccess[0] &&
    props.Summary.loansummary.data.modelAccess[0].read;
  
  console.log("leadType", leadType.toLowerCase() === "prospect");

  const columns = [
    {
      title: "Application ID",
      dataIndex: "id",
      key: "name",
      width: 120,
      align: "center",
    },
    {
      title: "Lead Name",
      dataIndex: "leadName",
      key: "age",
      width: 180,
      align: "center",
    },
    {
      title: "Mobile No",
      dataIndex: "customerMobile",
      key: "mobileNumber",
      align: "center",
    },
    {
      title: "Email Address",
      dataIndex: "customerEmail",
      key: "address",
      align: "center",
    },

    {
      title: "Module Status",
      dataIndex: "consentStatus",
      key: "status",
      width: 160,
      align: "center",
    },
    {
      title: "Final Status",
      // dataIndex: "caseStatus",
      key: "caseStatus",
      width: 160,
      align: "center",
      visible: false,
      render: (text) =>
        leadType.toLowerCase() === "prospect" ? (
          <span>{text.caseStatus ? text.caseStatus : text.consentStatus}</span>
        ) : (
          <span>{text.consentStatus}</span>
        ),
    },
    {
      title: "Date/Time",
      dataIndex: "updatedDate",
      key: "date-time",
      render: (updatedDate) => moment(updatedDate).format("DD-MM-YYYY, h:mm a"), // new Date(updatedDate).toLocaleDateString(),
      width: 170,
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      fixed: "right",
      render: (item, record) => {
        return (
          <Button
            style={{ border: "none" }}
            type="link"
            onClick={() =>
              handleRedirection(
                item.id,
                item.consentStatus,
                item.applicantUniqueId
              )
            }
            type="link">
            {leadType === "Lead" ? "Edit" : "Update Profile"}{" "}
          </Button>
        );
      },
    },
  ];

  const redirectToAddLead = () => {
    let productId = props.match.params.type;
    props.history.push(`/lead/applicant/add/${productId}`);
  };

  const handleRedirection = (id, consentStatus, applicantUniqueId) => {
    if (consentStatus === "Consent Pending") {
      props.history.push(`/lead/applicant/edit/${id}`);
    } else if (consentStatus !== "Consent Approved") {
      props.history.push(`${public_url.loanSummary}/${id}`);
    } else {
      props.history.push(
        `/applicant${public_url.qde}/add/${applicantUniqueId}`
      );
    }
  };

  const getAllLeadsAPI = async () => {
    setSpinning(true);
    const response = await props.getAllLeadsBySearch({
      searchString: searchLead,
      employeeId: JSON.parse(localStorage.getItem("UserData"))
        ? JSON.parse(localStorage.getItem("UserData")).employeeId
        : "",
      branchName: JSON.parse(localStorage.getItem("UserData"))
        ? JSON.parse(localStorage.getItem("UserData")).branchName
        : "",
      pageNumber: pageNumber,
      leadType: leadType,
      count: 10,
      productId: props.match.params.type,
    });
    setLeadList(response && response.data && response.data.leadlist);
    setTotalCount(response && response.data && response.data.totalCount);
    setSpinning(false);
  };

  useEffect(() => {
    props.setHeading("Lead Management");
    if (true) {
      let userData = localStorage.getItem("UserData");

      let userDataCopy = JSON.parse(userData);

      console.log("userDataCopy", userDataCopy);

   
    }
  }, []);

  useEffect(() => {
    setSpinning(true);
    const delayDebounceFn = setTimeout(() => {
      
      // Send Axios request here
      getAllLeadsAPI();
    }, 900);

    return () => clearTimeout(delayDebounceFn);
  }, [searchLead, pageNumber]);

  useEffect(() => {
    getAllLeadsAPI();
  }, [leadType]);

  const onSearchChange = (e) => {
    setSearchLead(e.target.value);
    setPageNumber(1);
  };

  return (
    <div className="LeadList">
      <Card>
        <Row
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Col span={6} offset={8}>
            <Radio.Group
              onChange={(e) => {
                setSearchLead("");
                props.setLeadListType(e.target.value);
                setPageNumber(1);
              }}
              value={leadType}
              optionType="button"
              className="boxShadow"
            >
              <Radio.Button
                className={
                  leadType.toLowerCase() === "lead"
                    ? "cancled-button leadToggle"
                    : "cancled-button"
                }
                value="Lead"
                style={{ lineHeight: "41px", height: "45px" }}
              >
                Lead
              </Radio.Button>
              <Radio.Button
                className={
                  leadType.toLowerCase() !== "lead"
                    ? "cancled-button leadToggle"
                    : "cancled-button"
                }
                value="Prospect"
                style={{ lineHeight: "41px", height: "45px" }}
              >
                Prospect
              </Radio.Button>
            </Radio.Group>
          </Col>
          <Col span={5} style={{ textAlign: "right" }}>
            <div className="searchInput">
              <Input
                style={{
                  borderTopLeftRadius: "23px",
                  borderBottomLeftRadius: "23px",
                }}
                placeholder={
                  leadType === "Lead" ? "Search Lead" : "Search Prospect"
                }
                value={searchLead || ""}
                onChange={(event) => {
                  onSearchChange(event);
                }}
                // style={{ width: 200, paddingRight: 35 }}
                size="large"
              />
              {searchLead.length ? (
                <CloseCircleOutlined
                  onClick={() => {
                    setSearchLead("");
                  }}
                  className="closeIcon"
                />
              ) : null}
            </div>
          </Col>
          <Col span={5} style={{ textAlign: "right" }}>
            {!freezeUser && (
              <div className="addIconWrapper">
                <Fab
                  // disabled={freezeUser}
                  variant="extended"
                  aria-label="Delete"
                  onClick={redirectToAddLead}
                  className="fab-add-parent"
                >
                  <AddIcon
                    className={"addIconFab"}
                    variant="contained"
                    size="small"
                    color="primary"
                  />
                  Add-Lead
                </Fab>
              </div>
            )}
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              loading={{
                spinning: spinning,
                indicator: <img alt="logo" src={logo} className="loader" />,
              }}
              scroll={{ y: 300 }}
              size="small"
              className="table-striped-rows"
              bordered
              tableLayout
              pagination={{
                onChange: (page) => {
                  setPageNumber(page);
                },
                current: pageNumber,
                // defaultCurrent: 1,
                total: totalCount,
                pageSize: count,
                showSizeChanger: false,
                position: ["bottomLeft"],
              }}
              dataSource={leadList}
              columns={columns}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
}

const mapDispatchToProps = {
  getLeadList,
  getAllLeadsBySearch,
  setHeading,
  setLeadListType,
  getLoanSummary,
};

const mapStateToProps = (state) => {
  return {
    qde: state.qde,
    leadType: state.leads.leadListType,
    Summary: state.Summary,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeadList);
