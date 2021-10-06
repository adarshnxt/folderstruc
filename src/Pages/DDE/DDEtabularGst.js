import { Collapse,} from "antd";
import React from "react";

import {
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import "./style.scss";

function DDEgst() {
  // const [selectedValue, setSelectedValue] = React.useState("a");

  const callback = (key) => {
    console.log(key);
  };
  // const handleChange = (event) => {
  //   setSelectedValue(event.target.value);
  // };

  const { Panel } = Collapse;
  return (
    <div>
      <div className="DDEgstContainer">
        {/* <p className="references-title">References</p> */}

        <Collapse
          expandIconPosition="right"
          expandIcon={({ isActive }) =>
            isActive ? <MinusOutlined /> : <PlusOutlined />
          }
          defaultActiveKey={["1"]}
          onChange={callback}>
          <Panel header="Family Reference" key="1">
            <table style={{ border: "none" }}>
              <tr>
                <th>PAN Number</th>
                <th>PAN Name</th>
                <th>Mobile Number</th>
              </tr>
              <tr>
                <td>AGRRED1234</td>
                <td>Griffin Tower Alibagh</td>
                <td>79779786</td>
                
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
