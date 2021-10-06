import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import { InfoCircleOutlined } from "@ant-design/icons";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import { Upload, Button, Col, Row, Form } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import SelectIcon from "../../assets/Images/select.svg";
import { PictureOutlined } from "@ant-design/icons";
import "./style.scss";

export default function DDEfsa() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
    checkedF: false,
    checkedG: false,
  });
  const [InputLabelProps, setInputLabelProps] = React.useState({});

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [form] = Form.useForm();

  const onFinish = (values) => {};

  // const handleChange = () => {
  //   form.setFieldsValue({ sights: [] });
  // };

  return (
    <div className="">
      <div className="FSAContainer2">
        <Form
          form={form}
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={40}>
            <Col lg={8}>
              <TextField
                fullWidth={true}
                id="standard-password-input"
                label="Company Name"
                autoComplete="current-password"
              />
            </Col>
          </Row>

          <p className="dsaUploadLabel">Upload Financial Statement</p>
          <Row gutter={40}>
            <Col lg={8}>
              <div className={"mui-dropdown-wrapper"}>
                <img alt={"select"} src={SelectIcon} className="searchIcon" />
                <Form.Item>
                  <TextField
                    InputLabelProps={InputLabelProps}
                    label="Financial Year"
                    select
                    fullWidth
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option hidden></option>
                    <option>FY-2020</option>
                    <option>FY-2021</option>
                  </TextField>
                </Form.Item>
              </div>
            </Col>
            <Col lg={8}>
              <FormGroup row style={{ paddingTop: "15px" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedA}
                      onChange={handleChange}
                      name="checkedA"
                      color="primary"
                    />
                  }
                  label={
                    <span className="ddeCheckTxt">
                      Is it a scanned statement?
                      <Tooltip
                        title="Is it a scanned statement?"
                        aria-label="add"
                        style={{ textAlign: "center", margin: 10 }}
                      >
                        <InfoCircleOutlined />
                      </Tooltip>
                    </span>
                  }
                />
              </FormGroup>
            </Col>

            <Col lg={8}>
              <Upload>
                <React.Fragment>
                  <div style={{ display: "flex" }}>
                    <div className="uploadImage">
                      <PictureOutlined />
                    </div>
                    <span className="Upload-Photo">Upload Bank Statement</span>
                  </div>
                </React.Fragment>
              </Upload>
            </Col>
          </Row>

          <Form.List name="sights">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <div key={field.key} align="baseline" fullWidth={true}>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                    <Row gutter={40}>
                      <Col lg={8} style={{ paddingLeft: "0px" }}>
                        <div className={"mui-dropdown-wrapper"}>
                          <img
                            alt={"select"}
                            src={SelectIcon}
                            className="searchIcon"
                          />
                          <Form.Item>
                            <TextField
                              InputLabelProps={InputLabelProps}
                              label="Financial Year"
                              select
                              fullWidth
                              SelectProps={{
                                native: true,
                              }}
                            >
                              <option hidden></option>
                              <option>FY-2020</option>
                              <option>FY-2021</option>
                            </TextField>
                          </Form.Item>
                        </div>
                      </Col>

                      <Col lg={8} style={{ paddingLeft: "20px" }}>
                        <Form.Item>
                          <FormGroup row style={{ paddingTop: "15px" }}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={state.checkedC}
                                  onChange={handleChange}
                                  name="checkedC"
                                  color="primary"
                                />
                              }
                              label={
                                <span className="ddeCheckTxt">
                                  Is it a scanned statement?
                                  <Tooltip
                                    title="Is it a scanned statement?"
                                    aria-label="add"
                                    style={{ textAlign: "center", margin: 10 }}
                                  >
                                    <InfoCircleOutlined />
                                  </Tooltip>
                                </span>
                              }
                            />
                          </FormGroup>
                        </Form.Item>
                      </Col>

                      <Col lg={8} style={{ paddingLeft: "40px" }}>
                        <Form.Item>
                          <Upload>
                            <React.Fragment>
                              <div style={{ display: "flex" }}>
                                <div className="uploadImage">
                                  <PictureOutlined />
                                </div>
                                <span className="Upload-Photo">
                                  Upload Bank Statement
                                </span>
                              </div>
                            </React.Fragment>
                          </Upload>
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                ))}

                <Form.Item>
                  <Button
                    className="DDEbankBtn"
                    type="primary"
                    shape="round"
                    onClick={() => add()}
                    icon={<i class="fa fa-plus-circle" aria-hidden="true"></i>}
                    size={"large"}
                  >
                    <span className="DDEbankBtnTxt">Add Financial Year</span>
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <div className="buttons-position  mt-4 mb-0">
            <button className="cancle-button mr-3">Cancel & Save </button>
            <button className="save-button">Next</button>
          </div>
        </Form>
      </div>
    </div>
  );
}
