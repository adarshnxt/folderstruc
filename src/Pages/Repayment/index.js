/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Form, Button, Row, Radio, Card, Input } from "antd";
import PDC from "./PDC";
import CashOthers from "./CashOthers";
import {
  saveUpdateComment,
  getRepaymentData,
  saveUpdateRepayment,
  getCommentData,
} from "../../Redux/Services/Repayment";
import { connect } from "react-redux";
import "./style.scss"
import { setHeading } from "../../Redux/Action/App";
import { getLoanSummary } from "../../Redux/Services/LoanSummary";

function Repayment(props) {
  
  const [mode,setMode] = React.useState("")
  const [repayMode, setRepayMode] = React.useState("");
  const [data, setData] = React.useState([])
  const [enableDisbursement, setEnableDisbursement] = React.useState(false);
  const [reset, setReset] = React.useState(false);
  
  const [form] = Form.useForm();
  
  const employeeId = localStorage.getItem("employeeId");

  React.useEffect(() => {
    props.setHeading("Repayment");
  }, [props.setHeading]);

  React.useEffect(() => {
    const getData = async () =>{
      const response = await props.getRepaymentData({
        applicantUniqId: props.match.params.id,
      });

      const data = await response.payload && response.payload.data;
      setData(data);
      
      const commentResponse = await props.getCommentData({
        applicantUniqId: props.match.params.id,
        type:"repayment"
      });

      const repaymentMode = await response && response.payload && response.payload.data && response.payload.data.repaymentMode;
      setMode(repaymentMode);
      setRepayMode(repaymentMode);
      
      if (response && response.payload) {
        form &&
        form.setFieldsValue({
          comments:
          commentResponse &&
          commentResponse.payload &&
          commentResponse.payload.data && commentResponse.payload.data.disbursementComments,
          mode: response.payload.data.repaymentMode,
        });
      }
    }
    getData();
    let userData = localStorage.getItem("UserData");
    let userDataCopy = JSON.parse(userData);
    props.getLoanSummary({
      applicant_uniqueid: props.match.params.id,
      roleId: userDataCopy.roleId,
    });
  }, []);

    React.useEffect(() => {
      if (
        (props.repayment && props.repayment.repaymentSuccess) ||
        (props.repayment.repay && props.repayment.repay.data &&
          props.repayment.repay.data.pdc)
      ) {
        setEnableDisbursement(true);
      }
  }, [props.repayment]);

  const onFinish = (values) => {
    setTimeout(() => {
      let userData = localStorage.getItem("UserData");
      let userDataCopy = JSON.parse(userData);
      props.getLoanSummary({
        applicant_uniqueid: props.match.params.id,
        roleId: userDataCopy.roleId,
      });
    }, [1000]);
    props.saveUpdateComment({
      applicantUniqId: props.match.params.id,
      disbursementComments: values.comments,
      employeeId: employeeId,
      repaymentMode: mode,
      type: "repayment",
    });
  };

  const onFinishFailed = (errorInfo) => {
  };
  
  const handleFormChange = (changedFields, allFields) => {
    setMode(allFields.mode);
    if(changedFields.mode)
    {
      form && form.resetFields(["comments"]);
      setReset(true)
      setEnableDisbursement(false)
    }
  }


  const freezeCase =  
    props.Summary &&
    props.Summary.loansummary &&
    props.Summary.loansummary.data &&
    props.Summary.loansummary.data.mainapplicant &&
    props.Summary.loansummary.data.mainapplicant.preSalesFreeze;

    const freezeUser = 
      props.Summary &&
      props.Summary.loansummary &&
      props.Summary.loansummary.data &&
      props.Summary.loansummary.data.modelAccess &&
      props.Summary.loansummary.data.modelAccess[0] &&
      props.Summary.loansummary.data.modelAccess[0].read;


  const inputProps = {
    readOnly:
      freezeCase || freezeUser,
    disabled:
      freezeCase || freezeUser,
  };

  
  return (
    <Card>
      <div className="AddLeadContainer p-3">
        <Form
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onValuesChange={handleFormChange}
          onFinishFailed={onFinishFailed}
          form={form}
          name="control-hooks">
          <span className="QDe-para-normal">Repayment Mode</span>
          <br />

          <Row>
            <Form.Item
              name="mode"
              rules={[
                {
                  required: true,
                  message: "Repayment Mode is mandatory",
                },
              ]}>
              <Radio.Group
                disabled={freezeCase || freezeUser}
                style={{ display: "flex", width: "100%" }}
                className="QDe-scheme-radio">
                <Radio value={"pdc"}>PDC</Radio>
                <Radio value={"cash"}>Cash</Radio>
                <Radio value={"other"}>Others</Radio>
              </Radio.Group>
            </Form.Item>
          </Row>

          {mode === "pdc" && (
            <PDC
              saveUpdateRepayment={props.saveUpdateRepayment}
              applicantUniqueId={props.match.params.id}
              data={data}
              history={props.history}
              setEnableDisbursement={setEnableDisbursement}
              reset={reset}
              setReset={setReset}
              freezeCase={freezeCase}
              freezeUser={freezeUser}
            />
          )}
          {mode === "cash" && (
            <CashOthers
              saveUpdateRepayment={props.saveUpdateRepayment}
              applicantUniqueId={props.match.params.id}
              cash={true}
              mode={mode}
              data={data}
              repayMode={repayMode}
              history={props.history}
              setEnableDisbursement={setEnableDisbursement}
              reset={reset}
              setReset={setReset}
              freezeCase={freezeCase}
              freezeUser={freezeUser}
            />
          )}
          {mode === "other" && (
            <CashOthers
              saveUpdateRepayment={props.saveUpdateRepayment}
              applicantUniqueId={props.match.params.id}
              data={data}
              mode={mode}
              repayMode={repayMode}
              history={props.history}
              setEnableDisbursement={setEnableDisbursement}
              reset={reset}
              setReset={setReset}
              freezeCase={freezeCase}
              freezeUser={freezeUser}
            />
          )}
          <span className="QDe-para-normal">Submit to Disbursement</span>
          <br />
          <Form.Item
            name="comments"
            label="Comments"
            rules={[
              {
                required: true,
                message: "comment is mandatory",
              },
            ]}>
            <Input.TextArea
              disabled={inputProps.readOnly}
              fullWidth
              multiline
              rowsMax={4}
              InputLabelProps={{
                shrink: true,
              }}
              key={Math.random()}
            />
          </Form.Item>

          <Row justify={"center"}>
            {!(freezeCase || freezeUser) && (
              <Button
                className="save-button mr-3"
                htmlType={"submit"}
                disabled={!enableDisbursement}>
                {" "}
                Submit to Disbursement{" "}
              </Button>
            )}
          </Row>
        </Form>
      </div>
    </Card>
  );
}


const mapStateToProps = (state) => {
  return {
    repayment: state.repayment,
    Summary: state.Summary,
  };
};

const mapDispatchToProps = {
  saveUpdateComment,
  getRepaymentData,
  saveUpdateRepayment,
  setHeading,
  getCommentData,
  getLoanSummary,
};

export default connect(mapStateToProps, mapDispatchToProps)(Repayment);