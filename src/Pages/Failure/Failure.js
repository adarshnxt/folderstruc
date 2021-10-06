import React from "react";
import { Radio, Input } from "antd";
import "./style.scss";

class Failure extends React.Component {
  state = {
    value: 1,
  };

  onChange = (e) => {
    // console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { value } = this.state;

    return (
      <>
        <div>
          <br />
          <p className="QDe-head sorry">Sorry Darshan</p>
          <br />
          <p className="QDe-para">
            Unfortunately, you have not been verified in the Quick Data Entry
            Stage
          </p>
          <br />
          <p className="QDe-para2">
            Please contact on +6565453476 for any queries
          </p>
          <br />
          <br />
          <div className="QDe-save">
            <button className="save-button QDe-inner-save mr-3">
              Go To Dashboard
            </button>
          </div>
          <br />
        </div>
      </>
    );
  }
}

export default Failure;
