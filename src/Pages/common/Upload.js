import {
  PictureOutlined,
  PropertySafetyFilled,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Upload } from "antd";
import React from "react";
import { useEffect } from "react";
import { te } from "../../Utility/ReduxToaster";
import { CameraFeed } from "./CameraFeed";
import "./style.scss";

function UploadAntd(props) {
  const [flag, setFlag] = React.useState(false);
  const [reRender, setReRender] = React.useState(false);
  const [showUploadImage, setShowUploadImage] = React.useState(false);

  const uploadProps = {
    name: props.name,
    accept: ".pdf",
    maxCount: 1,
    multiple: false,
    showUploadList: false,
    customRequest: (fileData) => {
      const { data, file } = fileData;
      props.uploadDocument({ data: data, file: [file] });
    },
    ...props.uploadPayload,
  };

  if (props.uploadPayload.data.data[0].docType === "other") {
    uploadProps.beforeUpload = () => {
      if (props.uploadPayload.data.otherName !== "") {
        return true;
      } else {
        te("Please Enter Document Name");
        return false;
      }
    };
  }

  const PhotoUpload = (file) => {
    let data = [file];

    if (data[0].length <= 10) {
      if (Array.isArray(file)) {
        data = file;
        const multiUploadPayload = file.map((item) => {
          return { docType: props.uploadPayload.data.data[0].docType };
        });
        props.uploadPayload.data.data = multiUploadPayload;
      }
      props.uploadDocument({ file: data, ...props.uploadPayload });
    } else {
      setFlag(false);
      te("Accept only 10 Documents");
    }
  };

  const disabled =
    props.uploadPayload.data.data[0].docType === "other" &&
    (props.uploadPayload.data.otherName === "" ||
      props.uploadPayload.data.otherName === undefined);

  return (
    <React.Fragment>
      {showUploadImage && (
        <div
          className={"uploadedImageWrapper"}
          style={{ height: 200, width: 300 }}>
          {!props.salesFreeze && <span className="cross-sign-position">X</span>}
          <img alt={"Uploaded Document"} />
        </div>
      )}
      {flag && (
        <CameraFeed
          multiple={props.multiple}
          disabled
          dimensions={{ height: 200, width: 200 }}
          footer={true}
          upload={PhotoUpload}
        />
      )}

      <div className="uploadWrapper uploadButton">
        {!flag && (
          <Upload
            className="uploadContainer"
            {...uploadProps}
            // disabled={props.salesFreeze}
            >
            <div className="uploadWrapper">
              <div>
                <Button
                  disabled={flag || props.salesFreeze}
                  className="cancle-button mr-2"
                  icon={<UploadOutlined />}>
                  Upload File
                </Button>
              </div>
            </div>
          </Upload>
        )}
        {!flag && (
          <Button
            onClick={() => setFlag(!flag)}
            icon={<UploadOutlined />}
            className="save-button"
            disabled={disabled || props.salesFreeze}>
            {"Take a Photo"}
          </Button>
        )}
      </div>
    </React.Fragment>
  );
}

export default UploadAntd;
