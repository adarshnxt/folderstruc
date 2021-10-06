import React from "react";
import successImg from "../../assets/Images/group.svg";
import "./style.css";
function SentLink(props) {
  return (
    <div className="sentLink">
      {props.match.params.sentStatus === "success" && (
        <div>
          <br />
          <p className="verifiedHeading">Consent Verified</p>
          <p className="verifiedData">
            Thank you! You have successfully given your consent to the
            CreditWise Capital T&C <br /> and also agree to store your KYC data
            in our system for loan processing purpose.
          </p>
          <img src={successImg} className="successImage" />
          <br />
        </div>
      )}
      {props.match.params.sentStatus === "failure" && (
        <div>
          <br />
          <p className="verifiedData">
            <span style={{ color: "red" }}> Consent Not Verified</span> <br />{" "}
            Sorry, but consent verification was not successful. <br /> Please
            try again.
          </p>
          <br />
        </div>
      )}

      {props.match.params.sentStatus === "timeOver" && (
        <div>
          <br />
          <p className="verifiedData">Post 10 mins wait time over</p>
          <br />
        </div>
      )}

      {props.match.params.sentStatus === "fiSuccess" && (
        <div>
          <br />
          <p className="verifiedData">Fi Request Accepted Successfully</p>
          <br />
        </div>
      )}

      {props.match.params.sentStatus === "fiReject" && (
        <div>
          <br />
          <p className="verifiedData">
            FI Request <span style={{ color: "red" }}>Rejected</span>
          </p>
          <br />
        </div>
      )}

      {props.match.params.sentStatus === "fiSubmit" && (
        <div>
          <br />
          <p className="verifiedData">FI Already Accepted</p>
          <br />
        </div>
      )}
    </div>
  );
}
export default SentLink;
