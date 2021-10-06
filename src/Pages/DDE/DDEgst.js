import { Collapse } from "antd";
import React from "react";
import Radio from "@material-ui/core/Radio";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

// import { makeStyles } from "@material-ui/core/styles";

import "./style.scss";

function DDEgst() {
  // const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState("via");
  console.log("selectedValue - ", selectedValue);

  const callback = (key) => {};
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const { Panel } = Collapse;
  return (
    <div>
      <div className="DDEgstContainer">
        {/* <p className="references-title">References</p> */}

        <Collapse
          // collapsible="disabled"
          showArrow="false"
          expandIconPosition="right"
          expandIcon={({ isActive }) =>
            isActive ? <MinusOutlined /> : <PlusOutlined />
          }
          defaultActiveKey={["1"]}
          onChange={callback}
        >
          <Panel header="GST Verification" key="1">
            <div className="DDEgstTxtParent">
              <div className="DDEgsttxt">
                <span className="DDEgstTxt">PAN :</span>
                <span className="DDEgstValue">{"DUBPK7866Q"}</span>
              </div>
              <div className="DDEgsttxt">
                <span className="DDEgstTxt">PAN Name:</span>
                <span className="DDEgstValue">{"Adarsh Kotali"}</span>
              </div>
              <div className="DDEgsttxt">
                <span className="DDEgstTxt">Mobile Number:</span>
                <span className="DDEgstValue">{"9372021118"}</span>
              </div>
            </div>
            <br />
            <br />
            <table style={{ border: "none" }} className="DDEgstTable">
              <tr>
                <th>GSTIN</th>
                <th>Registered Address</th>
                <th>Status</th>
                <th>Verify via credentials</th>
                <th>Verify via OTP</th>
              </tr>
              <tr>
                <td>13231231313</td>
                <td style={{ maxWidth: 200 }}>
                  Griffin Tower Alibagh sdddadam sdadsasd asdasd asdasd adasda
                  da Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Earum, veritatis!
                </td>
                <td>Active</td>
                <td>
                  {" "}
                  <Radio
                    style={{ marginLeft: "15%" }}
                    color="primary"
                    checked={selectedValue === "via"}
                    onChange={handleChange}
                    value="via"
                    name="radio-button-demo"
                    inputProps={{ "aria-label": "via" }}
                  />
                </td>
                <td>
                  {" "}
                  <Radio
                    style={{ marginLeft: "15%" }}
                    color="primary"
                    checked={selectedValue === "vio"}
                    onChange={handleChange}
                    value="vio"
                    name="radio-button-demo"
                    inputProps={{ "aria-label": "vio" }}
                  />
                </td>
              </tr>
            </table>
            <br />
            <br />
            <div className="buttons-position  mt-4 mb-2">
              <button className="cancle-button mr-3">Cancel</button>
              <button className="save-button">Save</button>
            </div>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
}

export default DDEgst;

// -----------------------------------------------
