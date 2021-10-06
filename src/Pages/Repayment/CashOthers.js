import React from "react";
import { Form, Button, Row, Input } from "antd";
import { public_url } from "../../Utility/Constant";
import _ from "lodash";

function CashOthers(props) {

  const flag= props.cash ? "cash" : "other"

  const [form] = Form.useForm();

  const onFinish = (values) => {
    props.saveUpdateRepayment({
      comments: values.cashComments || values.otherComments,
      repaymentMode: flag,
      applicantUniqId: props.applicantUniqueId,
    });
  };
  
  const onFinishFailed = (errorInfo) => {
  };

  React.useEffect(() => {
    if(props.data.comments && props.repayMode==="cash")
    {
      form.setFieldsValue({
        cashComments: props.data.comments,
      });
      if (props.data.comments && !props.reset){
       props.setEnableDisbursement(true);
      //  props.setReset(false);
      }
        
    }
    else if(props.data.comments && props.repayMode==="other")
    {
      form.setFieldsValue({
        otherComments: props.data.comments
      });
      if (props.data.comments && !props.reset) {
        props.setEnableDisbursement(true);
        // props.setReset(false)
      }
    }
  }, [form, props.data.comments, props.repayMode]);

  React.useEffect(() => {
    if(props.reset){
      form && form.resetFields();
    }
  }, [props.reset]);

  const inputProps = {
    readOnly: props.freezeCase || props.freezeUser,
    disabled: props.freezeCase || props.freezeUser,
  };
  
  return (
    <div>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}>
        {props.mode === "cash" ? (
          <Form.Item
            label="Comments"
            name={"cashComments"}
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
              key={Math.random()}
              onChange={(e) => {
                _.isEmpty(e.target.value) && props.setEnableDisbursement(false);
              }}
            />
          </Form.Item>
        ) : (
          <Form.Item
            label="Comments"
            name={"otherComments"}
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
              key={Math.random()}
              onChange={(e) => {
                _.isEmpty(e.target.value) && props.setEnableDisbursement(false);
              }}
            />
          </Form.Item>
        )}
        <br />
        <Row gutter={[30, 20]} justify={"center"}>
          <Button
            className="cancle-button mr-3"
            onClick={(e) => {
              props.history.push(
                `${public_url.loanSummary}/${props.data && props.data.leadId}`
              );
            }}>
            {" "}
            Loan Summary{" "}
          </Button>
          {!(props.freezeCase || props.freezeUser) && (
          <Button className="save-button mr-3" htmlType={"submit"}>
            {" "}
            Save{" "}
          </Button>
          )}
        </Row>
        <br />
      </Form>
    </div>
  );
}

export default CashOthers;

