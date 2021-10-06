import React, { Component } from "react";
import "./style.scss";
class CollectR extends Component {
  render() {
    return (
      <>
        <div className="CollectR">
          {this.props.match.params.status === "success" ? (    
            <h2 style={{ textAlign: "center" }}> Success</h2>
          ) : (
            ""
          )}

          {this.props.match.params.status === "failure" ? (
            <h2 style={{ textAlign: "center" }}> Failure</h2>
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
}

export default CollectR;
