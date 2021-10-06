import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import TextField from "@material-ui/core/TextField";
import { Button, Col, Collapse, Form, Input, Row } from "antd";
import isEmpty from "lodash/isEmpty";
import React, { Component } from "react";
import { connect } from "react-redux";
import SelectIcon from "../../assets/Images/select.svg";
import { saveNonFamReference, saveReference } from "../../Redux/Services/Qde";
import { public_url } from "../../Utility/Constant";
import "./style.scss";

class References extends Component {
  state = {
    visiblePanels: [1, 2],
    disableFamilyRef: false,
    disable: true,
    disableNonFamilyRef: false,
  };
  // const [visiblePanels, setVisiblePanels] = useState(["1"]);

  async componentDidMount() {
    window.scrollTo(0, 0);
    this.handleDisableFamily();
    this.handleDisableNonFamily();
    if (!isEmpty(this.props.qde.getQdeSectionDetails)) {
      if (this.props.qde.getQdeSectionDetails.data.referencedetails.familyref) {
        const { relationship, name, mobNo, addres } =
          this.props.qde.getQdeSectionDetails.data.referencedetails.familyref;
        this.form.setFieldsValue({
          relationship: relationship,
          name: name,
          mobNo: mobNo,
          addres: addres,
        });
      }
      if (
        this.props.qde.getQdeSectionDetails.data.referencedetails.nofamilyref
      ) {
        const { relationship, name, mobNo, addres } =
          this.props.qde.getQdeSectionDetails.data.referencedetails.nofamilyref;

        this.nonFamRefForm &&
          this.nonFamRefForm.setFieldsValue({
            relationship: relationship,
            name: name,
            mobNo: mobNo,
            addres: addres,
          });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.qde.reference !== prevProps.qde.reference) {
      if (!isEmpty(this.props.qde.reference.familyref)) {
        this.setState({ visiblePanels: [2] });
      }
      if (!isEmpty(this.props.qde.reference.nonfamilyref)) {
        this.setState({ visiblePanels: [] });
      }
    }
    if (
      this.state.disableFamilyRef !== prevState.disableFamilyRef ||
      this.state.disableNonFamilyRef !== prevState.disableNonFamilyRef
    ) {
      if (!this.state.disableFamilyRef && !this.state.disableNonFamilyRef) {
        this.setState({ disable: false });
      }
    }
  }

  onFinishFamily = (values) => {
    let id = null;
    const applicantUniqueId = this.props.match.params.id;

    if (
      this.props.qde.getQdeSectionDetails &&
      this.props.qde.getQdeSectionDetails.data &&
      this.props.qde.getQdeSectionDetails.data.referencedetails &&
      !isEmpty(
        this.props.qde.getQdeSectionDetails.data.referencedetails.familyref
      )
    ) {
      id =
        this.props.qde.getQdeSectionDetails.data.referencedetails.familyref.id;
    }

    this.props.saveReference({
      ...values,
      leadCode: this.props.qde.getQdeSectionDetails.data.leadCode,
      applicantUniqueId,
      isguarantor: false,
      ismainapplicant: true,
      id,
    });
  };

  nonFamilyFormSubmit = (values) => {
    let id = null;
    const applicantUniqueId = this.props.match.params.id;
    if (
      this.props.qde.getQdeSectionDetails &&
      this.props.qde.getQdeSectionDetails.data &&
      this.props.qde.getQdeSectionDetails.data.referencedetails &&
      !isEmpty(
        this.props.qde.getQdeSectionDetails.data.referencedetails.nofamilyref
      )
    ) {
      id =
        this.props.qde.getQdeSectionDetails.data.referencedetails.nofamilyref
          .id;
    }

    this.props.saveNonFamReference({
      ...values,
      leadCode: this.props.qde.getQdeSectionDetails.data.leadCode,
      applicantUniqueId,
      isguarantor: false,
      ismainapplicant: true,
      id,
    });
  };

  onChange = (e) => {
    if (e.target.value !== undefined) {
      const value = e.target.value;

      this.setState({ name: value });
    }
  };

  // const { familyref, nonfamilyref } = this.props.qde.reference;
  //   if (
  //     (!isEmpty(familyref) && !isEmpty(nonfamilyref))

  handleDisableFamily = () => {
    if (
      !isEmpty(
        this.props.qde.getQdeSectionDetails.data &&
          this.props.qde.getQdeSectionDetails.data.referencedetails.familyref
      )
    ) {
      this.setState({ disableFamilyRef: true });
      return;
    }
  };

  handleDisableNonFamily = () => {
    if (
      !isEmpty(
        this.props.qde.getQdeSectionDetails.data &&
          this.props.qde.getQdeSectionDetails.data.referencedetails.nofamilyref
      )
    ) {
      this.setState({ disableNonFamilyRef: true });
    }
  };

  redirectToLeadList = () => {
    this.props.history.push(
      `${public_url.leadLists}/${this.props.qde.getQdeSectionDetails.data.productId}`
    );
  };

  changeStep = () => {
    const { familyref, nonfamilyref } = this.props.qde.reference;
    if (
      (!isEmpty(familyref) && !isEmpty(nonfamilyref)) ||
      (!isEmpty(
        this.props.qde.getQdeSectionDetails.data.referencedetails.nofamilyref
      ) &&
        !isEmpty(
          this.props.qde.getQdeSectionDetails.data.referencedetails.familyref
        ))
    ) {
      this.props.changeStep(4);
    }
  };

  render() {
    const id = this.props.leadDetails;
    const { TextArea } = Input;
    const { Panel } = Collapse;

    const inputProps = {
      readOnly: this.props.freezeCase || this.props.freezeUser,
      disabled: this.props.freezeCase || this.props.freezeUser,
    };

    return (
      <div>
        <div className="references-Container">
          <Collapse
            //ghost
            //bordered={false}
            // onChange={(value) => console.log("value", value)}
            onChange={(e) => this.setState({ visiblePanels: e })}
            activeKey={this.state.visiblePanels}
            expandIconPosition="right"
            expandIcon={({ isActive }) =>
              isActive ? <MinusOutlined /> : <PlusOutlined />
            }
            defaultActiveKey={["1", "2"]}
            className="site-collapse-custom-collapse"
          >
            <Panel
              header="Family Reference*"
              key="1"
              className="site-collapse-custom-panel"
            >
              <Form
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={this.onFinishFamily}
                onFinishFailed={this.onFinishFailed}
                ref={(e) => (this.form = e)}
              >
                <Row className={"typeRow"} gutter={40}>
                  <Col lg={8}>
                    <div className={"mui-dropdown-wrapper"}>
                      <img
                        alt={"select"}
                        src={SelectIcon}
                        className="searchIcon"
                      />
                      <Form.Item
                        name="relationship"
                        rules={[
                          {
                            required: true,
                            message: "Relationship selection is mandatory",
                          },
                        ]}
                      >
                        <TextField
                          inputProps={inputProps}
                          select
                          label="Relationship*"
                          fullWidth
                          SelectProps={{
                            native: true,
                          }}
                        >
                          <option hidden></option>
                          <option value="Father">Father</option>
                          <option value="Mother">Mother</option>
                          <option value="Brother">Brother</option>
                          <option value="Sister">Sister</option>
                          <option value="Spouse">Spouse</option>
                          <option value="Cousin">Cousin</option>
                        </TextField>
                      </Form.Item>
                    </div>
                  </Col>

                  <Col lg={8}>
                    <Form.Item
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Name is mandatory",
                        },
                      ]}
                    >
                      <TextField
                        inputProps={inputProps}
                        fullWidth={true}
                        label="Name*"
                        onInput={(e) => {
                          e.target.value = e.target.value
                            .toString()
                            .match(/^[a-zA-Z ]*$/)
                            ? e.target.value.toString().slice(0, 50)
                            : e.target.value
                                .toString()
                                .slice(0, e.target.value.length - 1);
                        }}
                        className="textField"
                      />
                    </Form.Item>
                  </Col>

                  <Col lg={8}>
                    <Form.Item
                      name="mobNo"
                      rules={[
                        {
                          required: true,
                          message: "Mobile number is mandatory",
                        },
                        {
                          pattern: new RegExp(/^[6-9]{1}[0-9]{9}$/),
                          message: "Invalid Mobile Number",
                        },
                      ]}
                    >
                      <TextField
                        inputProps={inputProps}
                        fullWidth={true}
                        onInput={(e) => {
                          e.target.value = e.target.value
                            ? Math.max(0, parseInt(e.target.value))
                                .toString()
                                .slice(0, 10)
                            : "";
                        }}
                        type="number"
                        label="Mobile Number*"
                        className="textField"
                      />
                    </Form.Item>
                  </Col>

                  <Col lg={24}>
                    <br />
                    <label htmlFor="1" className="labelRef">
                      Address*
                    </label>
                    <Form.Item
                      name="addres"
                      rules={[
                        {
                          required: true,
                          message: "Address is mandatory",
                        },
                      ]}
                    >
                      <TextArea
                        id="1"
                        readOnly={inputProps.readOnly}
                        onInput={(e) => {
                          e.target.value = e.target.value.toString()
                            ? // .match(/^[a-zA-Z ]*$/)
                              e.target.value.toString().slice(0, 255)
                            : e.target.value
                                .toString()
                                .slice(0, e.target.value.length - 1);
                        }}
                        value={this.state.address}
                        placeholder="Address"
                        autoSize={{ minRows: 2, maxRows: 6 }}
                        style={{ fontSize: "1rem" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <div className="buttons-position  mt-4 mb-2">
                  {!(this.props.freezeCase || this.props.freezeUser) && (
                    <Button className="save-button" htmlType={"submit"}>
                      Save
                    </Button>
                  )}
                </div>
              </Form>
            </Panel>

            <Panel
              header="Non-Family Reference *"
              key="2"
              className="site-collapse-custom-panel"
            >
              <Form
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={this.nonFamilyFormSubmit}
                onFinishFailed={this.onFinishFailed}
                ref={(e) => (this.nonFamRefForm = e)}
              >
                <Row className={"typeRow"} gutter={40}>
                  <Col lg={8}>
                    <div className={"mui-dropdown-wrapper"}>
                      <img
                        alt={"select"}
                        src={SelectIcon}
                        className="searchIcon"
                      />
                      <Form.Item
                        name="relationship"
                        rules={[
                          {
                            required: true,
                            message: "Relationship selection is mandatory",
                          },
                        ]}
                      >
                        <TextField
                          inputProps={inputProps}
                          select
                          label="Relationship*"
                          fullWidth
                          SelectProps={{
                            native: true,
                          }}
                        >
                          <option hidden></option>
                          <option value="Colleague">Colleague</option>
                          <option value="Friend">Friend</option>
                          <option value="Neighbour">Neighbour</option>
                        </TextField>
                      </Form.Item>
                    </div>
                  </Col>

                  <Col lg={8}>
                    <Form.Item
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Name is mandatory",
                        },
                      ]}
                    >
                      <TextField
                        inputProps={inputProps}
                        fullWidth={true}
                        label="Name*"
                        onInput={(e) => {
                          e.target.value = e.target.value
                            .toString()
                            .match(/^[a-zA-Z ]*$/)
                            ? e.target.value.toString().slice(0, 50)
                            : e.target.value
                                .toString()
                                .slice(0, e.target.value.length - 1);
                        }}
                        className="textField"
                      />
                    </Form.Item>
                  </Col>

                  <Col lg={8}>
                    <Form.Item
                      name="mobNo"
                      rules={[
                        {
                          required: true,
                          message: "Mobile number is mandatory",
                        },
                        {
                          pattern: new RegExp(/^[6-9]{1}[0-9]{9}$/),
                          message: "Invalid Mobile Number",
                        },
                      ]}
                    >
                      <TextField
                        inputProps={inputProps}
                        fullWidth={true}
                        onInput={(e) => {
                          e.target.value = e.target.value
                            ? Math.max(0, parseInt(e.target.value))
                                .toString()
                                .slice(0, 10)
                            : "";
                        }}
                        type="number"
                        label="Mobile Number*"
                        className="textField"
                      />
                    </Form.Item>
                  </Col>

                  <Col lg={24}>
                    <br />
                    <label htmlFor="1" className="labelRef">
                      Address*
                    </label>
                    <Form.Item
                      name="addres"
                      rules={[
                        {
                          required: true,
                          message: "Address is mandatory",
                        },
                      ]}
                    >
                      <TextArea
                        id="2"
                        readOnly={inputProps.readOnly}
                        onInput={(e) => {
                          e.target.value = e.target.value.toString()
                            ? // .match(/^[a-zA-Z ]*$/)
                              e.target.value.toString().slice(0, 255)
                            : e.target.value
                                .toString()
                                .slice(0, e.target.value.length - 1);
                        }}
                        placeholder="Address"
                        autoSize={{ minRows: 2, maxRows: 6 }}
                        style={{ fontSize: "1rem" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <div className="buttons-position  mt-4 mb-2">
                  {!(this.props.freezeCase || this.props.freezeUser) && (
                    <Button className="save-button" htmlType={"submit"}>
                      Save
                    </Button>
                  )}
                </div>
              </Form>
            </Panel>
          </Collapse>
          <br />
          <div className="alignButton">
            <Button
              className="save-button"
              onClick={() => {
                this.props.history.push(
                  `${public_url.loanSummary}/${
                    this.props.qde.getQdeSectionDetails &&
                    this.props.qde.getQdeSectionDetails.data &&
                    this.props.qde.getQdeSectionDetails.data.id
                  }`
                );
              }}
            >
              Loan Summary
            </Button>{" "}
            &nbsp;
            <Button
              className="cancle-button mr-3"
              onClick={this.redirectToLeadList}
            >
              Cancel
            </Button>
            <Button
              className="save-button"
              disabled={
                !(
                  (this.props.qde.familyRefSuccess &&
                    this.props.qde.nonFamilyRefSuccess) ||
                  (this.state.disableFamilyRef &&
                    this.state.disableNonFamilyRef)
                )
              }
              onClick={this.changeStep}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveReference: (payload) => {
      dispatch(saveReference(payload)); //same name as action.js
    },
    saveNonFamReference: (payload) => {
      dispatch(saveNonFamReference(payload));
    },
  };
}

const mapStateToProps = (state) => {
  return {
    qde: state.qde,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(References);
