import React from 'react';
import { Form, Button, Col, Row } from "antd";
import TextField from "@material-ui/core/TextField";
import { public_url } from "../../Utility/Constant";
import _ from "lodash";

function PDC(props) {

  const [pdcCount, setPDCCount] = React.useState(0);
  const [chequeValue, setChequeValue] = React.useState([]);

  let cheque;
  let chequeCount;

  const [form] = Form.useForm();

  const onFinish = (values) => {
    const arr = [];
    const numbers = [];

    for (const value in values) {
      if (value !== "pdcCount") {
        arr.push(value);
      }
    }

    for (let i = 0; i < pdcCount; i++) {
      setChequeValue([...chequeValue, values[arr[i]]]);
      numbers.push(values[arr[i]]);
    }

    props.saveUpdateRepayment({
      pdc: numbers,
      applicantUniqId: props.applicantUniqueId,
      repaymentMode: "pdc",
    });
  };

  const onFinishFailed = (errorInfo) => {
  };

   const inputProps = {
     readOnly: props.freezeCase || props.freezeUser,
     disabled: props.freezeCase || props.freezeUser,
   };

  const textFields = (count) => {

    var indents = [];

    if (count>0 && count <=50){
      for (var i = 1; i <= count; i++) {
        indents.push(
          <Col lg={8}>
            <div className={"mui-dropdown-wrapper"}>
              <Form.Item
                name={`cheque${i}`}
                rules={[
                  {
                    required: true,
                    message: `cheque ${i} is mandatory`,
                  },
                ]}>
                <TextField
                  // inputProps={inputProps}
                  key={Math.random()}
                  fullWidth
                  inputProps={`Cheque${i}` && inputProps}
                  label={`Cheque ${i}`}
                  type="number"
                  onKeyDown={(e) => e.keyCode === 190 && e.preventDefault()}
                />
              </Form.Item>
            </div>
          </Col>
        );
      }
    }
    return indents;
  };

  const textField = textFields(pdcCount).map((field) => {
    return field;
  });

  React.useEffect(() => {
    cheque = props && props.data.pdc;
    chequeCount = cheque && cheque.length;
    setPDCCount(chequeCount)
    
    if(props && props.data)
    {
      form &&
        form.setFieldsValue({
          pdcCount: chequeCount,
        });
        let arr = [];

      //key mapping
      cheque && cheque.map((item, index) =>{
        arr.push(`cheque${index + 1}`)
      })

      let list = [];
      for (let i = 0; i < chequeCount; i++) {
        let item = {};
        item[arr[i]] = cheque[i];
        //same as item.cheque1 = 1234

        //result {cheque1:"1234"},{cheque2:"554"}
        list.push(item);
      }

      // form.setFieldsValue(...list.map);
      list.map((item, index) =>{
        form.setFieldsValue(item);
      })
    }
  }, [props && props.data.pdc]);

  React.useEffect(() => {
    if (props.reset) {
      form && form.resetFields();
      setPDCCount(0);
      props.setReset(false);
    }
  }, [props.reset]);
  
  return (
    <div className="AddLeadContainer p-3">
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}>
        <Form.Item
          name={"pdcCount"}
          rules={[
            {
              required: true,
              message: "PDC Count is mandatory",
            },
            {
              pattern: new RegExp(/^[0-9]*$/),
              message: "PDC Count is invalid",
            },
            {
              pattern: new RegExp(/^(?:[1-9]|[1-4][0-9]|50)$/),
              message: "PDC Count is invalid",
            },
          ]}>
          <TextField
            inputProps={inputProps}
            id="pdcCount"
            type="number"
            label="PDC Count*"
            onChange={(e) => {
              _.isEmpty(e.target.value) && props.setEnableDisbursement(false);
              setPDCCount(e.target.value);
            }}
            key={Math.random()}
          />
        </Form.Item>

        <Row gutter={[30, 20]}>{textField}</Row>
        <Row justify={"center"}>
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
      </Form>
    </div>
  );
}

export default PDC;
