import { PictureOutlined } from "@ant-design/icons";
import { Radio, Upload } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import {
  sendItrLinkDetails,
  uploadItrDocuments,
  deleteITRCreds,
} from "../../Redux/Services/Dde";
import { Button, Form } from "antd";
import isEmpty from "lodash/isEmpty";
import { public_url } from "../../Utility/Constant";
import { useHistory } from "react-router-dom";
import { resetDDE } from "../../Redux/Action/Dde";

function DDEitr(props) {
  console.log("props,props", props);
  let history = useHistory();
  // eslint-disable-next-line no-unused-vars
  let form;
  const [show, setShow] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [value, setValue] = useState("link");
  const [disabled, setDisabled] = useState(true);
  const [fileName, setfileName] = useState(null);
  const [pathFile, setPathFile] = useState([]);
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [filePath, setFilePath] = useState([]);

  const onChange = (e) => {
    if (e.target.value !== undefined) {
      const value = e.target.value;
      setValue(value);
      if (e.target.value === "link") {
        setShowLink(true);
      } else setShowLink(false);
      if (e.target.value === "upload") {
        setShow(true);
      } else setShow(false);
    }
  };

  const onSelectLink = () => {
    props.sendItrLinkDetails({
      leadCode: props.dde.ddeDetails.pangstdetails.leadCode,
      applicantUniqueId: props.match.params.id,
      mode: "link",
      isguarantor: props.match.params.journey === "guarantor",
      ismainapplicant: props.match.params.journey === "applicant",
    });
  };

  const onFinish = (values) => {
    const data = {
      leadCode: props.dde.ddeDetails.pangstdetails.leadCode,
      applicantUniqueId: props.match.params.id,
      mode: "upload",
      isguarantor: props.match.params.journey === "guarantor",
      ismainapplicant: props.match.params.journey === "applicant",
    };

    props.uploadItrDocuments({
      file: values.file.file
        ? values.file.file
        : props.dde.ddeDetails.data.itr.pdfPath,
      dataITR: JSON.stringify({
        ...data,
      }),
    });
  };

  const onRemove = async () => {
    const applicantUniqueId = props.match.params.id;
    const path =
      (props.dde.uploadItrDocs && props.dde.uploadItrDocs.data) ||
      props.dde.ddeDetails.itr.pdfPath;
    if (props.dde.uploadItrDocsSuccess) {
      await props.deleteITRCreds(path, applicantUniqueId);
      setDisabled(true);
      return true;
    } else if (props.dde.ddeDetails.itr && props.dde.ddeDetails.itr.pdfPath) {
      await props.deleteITRCreds(path, applicantUniqueId);
      setDisabled(true);
      return true;
    } else return;
  };

  let fileList1 =
    props.dde.getDDESuccess &&
    !isEmpty(props.dde.ddeDetails.itr) &&
    props.dde.ddeDetails.itr.mode === "upload"
      ? filePath.map((file) => {
          const nameArray = file.split("/");
          const docName = nameArray[nameArray.length - 1];
          nameArray.pop();
          return {
            file: file,
            name: <span>{docName} </span>,
          };
        })
      : [];

  //<---Redirect to loan Offer----->

  const redirectToloanOffer = () => {
    props.resetDDE();
    const { journey, id } = props.match.params;
    props.history.push(
      `/${journey}${public_url.dde}${public_url.loanOffer}/success/${id}`
    );
  };

  React.useEffect(() => {
    if (props.dde.itrLinkSuccess) {
      setDisabled(false);
    } else if (!props.dde.itrLinkSuccess) {
      setDisabled(true);
    }
  }, [props.dde.itrLinkSuccess]);

  React.useEffect(() => {
    if (props.dde.uploadItrDocsSuccess) {
      setDisabled(false);
    } else if (!props.dde.uploadItrDocsSuccess) {
      setDisabled(true);
    }
  }, [props.dde.uploadItrDocsSuccess]);

  React.useEffect(() => {
    if (props.dde.ddeDetails.itr.mode) {
      const { mode } = props.dde.ddeDetails.itr;
      form.setFieldsValue({
        mode,
      });
      if (mode === "link") {
        setShowLink(true);
      } else setShowLink(false);
      if (mode === "upload") {
        setShow(true);
      } else setShow(false);
    }
  }, [form, props.dde.ddeDetails.itr]);

  React.useEffect(() => {
    if (props.dde.ddeDetails.itr && props.dde.ddeDetails.itr.pdfPath) {
      setFile(props.dde.ddeDetails.itr.pdfPath);
      const nameArray = props.dde.ddeDetails.itr.pdfPath.split("/");
      const docName = nameArray[nameArray.length - 1];
      const filePath = nameArray.join("/") + "/";
      nameArray.pop();
      setfileName(docName);
      setPathFile([...pathFile, filePath]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.dde.ddeDetails.itr]);

  React.useEffect(() => {
    if (props.dde.ddeDetails.itr.pdfPath) {
      setFilePath([props.dde.ddeDetails.itr.pdfPath]);
      return;
    }
  }, [props.dde.ddeDetails.itr.pdfPath]);

  React.useEffect(() => {
    props.dde.ddeDetails.pangstdetails.filePath && setDisabled(false);
  }, [props.dde.ddeDetails]);

  const redirectToLoanSummary = () => {
    //  history.push(`/${public_url.loanSummary}${props.dde.ddeDetails.id}`);
    history.push({
      pathname: `${public_url.loanSummary}/${props.dde.ddeDetails.id}`,
    });
  };
  const redirectToLeadList = () => {
    //  history.push(`/${public_url.loanSummary}${props.dde.ddeDetails.id}`);
    history.push({
      pathname: `${public_url.leadLists}/${props.dde.ddeDetails.productId}`,
    });
  };

  return (
    <div>
      <div className="AddLeadContainer p-3">
        <Form
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          autoComplete="off"
          ref={(e) => (form = e)}>
          <p className="Source-Type DDEitrLabel">Verification Mode</p>
          <Form.Item name="mode">
            {props.freezeCase || props.freezeUser ? (
              <Radio.Group
                onChange={onChange}
                style={{ display: "flex", width: "100%" }}
                className="QDe-scheme-radio">
                <Radio disabled value={"link"}>
                  Via link to customer
                </Radio>
                <Radio disabled value={"upload"}>
                  Upload ITR Document (PDF only)
                </Radio>
              </Radio.Group>
            ) : (
              <Radio.Group
                onChange={onChange}
                style={{ display: "flex", width: "100%" }}
                className="QDe-scheme-radio">
                <Radio value={"link"}>Via link to customer</Radio>
                <Radio value={"upload"}>Upload ITR Document (PDF only)</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <br></br>
          {show ? (
            <div className="DDEitrUpload">
              <Form.Item name="file">
                {/* {props.match.params.type !== "view" && ( */}
                <Upload
                  maxCount={1}
                  onRemove={onRemove}
                  accept=".pdf"
                  disabled={props.freezeCase || props.freezeUser}
                  beforeUpload={(file) => {
                    setFileList([...fileList, file]);
                    // return Upload.LIST_IGNORE;
                    return false;
                  }}
                  defaultFileList={
                    fileList1.length && fileList1[0] ? [fileList1[0]] : []
                  }
                  multiple={false}>
                  <React.Fragment>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div className="uploadImage">
                        <PictureOutlined />
                      </div>
                      <span className="Upload-Photo">Upload ITR Document </span>
                    </div>
                  </React.Fragment>
                </Upload>
              </Form.Item>
              <div className="buttons-position  mt-4 mb-0"></div>
            </div>
          ) : showLink ? (
            <Button disabled={(props.freezeCase || props.freezeUser)} className="cancle-button mr-3" onClick={onSelectLink}>
              Send Link to Email
            </Button>
          ) : (
            <div></div>
          )}
          <div className="buttons-position  mt-4 mb-0">
            <Button className="cancle-button mr-3" onClick={redirectToLeadList}>
              Cancel
            </Button>
            <Button
              className="save-button mr-3"
              onClick={redirectToLoanSummary}>
              Loan Summary
            </Button>
            {!(props.freezeCase || props.freezeUser) && (
            <Button className="cancle-button mr-3" htmlType={"submit"}>
              Save
            </Button>
            )}
            {!(props.freezeCase || props.freezeUser) && (
            <Button
              className="save-button"
              // disabled={disabled}
              onClick={redirectToloanOffer}>
              Submit
            </Button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
}

// export default DDEitr;

const mapDispatchToProps = {
  sendItrLinkDetails,
  uploadItrDocuments,
  deleteITRCreds,
  resetDDE: () => async (dispatch) => {
    dispatch(resetDDE());
  },
};

const mapStateToProps = (state) => {
  return {
    itrLinkDetails: state.itrLinkDetails,
    dde: state.dde,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DDEitr);
