import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { Component } from "react";
import PlusIcon from "../../assets/Images/plusIcon.svg";

export class CameraFeed extends Component {
  state = {
    images: { images: [], blob: [] },
  };

  /**
   * Processes available devices and identifies one by the label
   * @memberof CameraFeed
   * @instance
   */
  processDevices(devices) {
    devices.forEach((device) => {
      console.log(device.label);
      this.setDevice(device);
    });
  }

  /**
   * Sets the active device and starts playing the feed
   * @memberof CameraFeed
   * @instance
   */
  async setDevice(device) {
    const { deviceId } = device;
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { deviceId },
    });
    this.videoPlayer.srcObject = stream;
    this.videoPlayer.play();
  }

  /**
   * On mount, grab the users connected devices and process them
   * @memberof CameraFeed
   * @instance
   * @override
   */
  async componentDidMount() {
    const cameras = await navigator.mediaDevices.enumerateDevices();
    this.processDevices(cameras);
  }

  /**
   * Handles taking a still image from the video feed on the camera
   * @memberof CameraFeed
   * @instance
   */
  takePhoto = () => {
    const context = this.canvas.getContext("2d");
    context.drawImage(
      this.videoPlayer,
      0,
      0,
      this.props.dimensions.height,
      this.props.dimensions.width
    );
    this.canvas.toBlob((e) => {
      e.name = "Capture.jpeg";
      this.props.uploadDocument({
        file: e,
        personalInfo: this.props.data,
      });
    });
  };

  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  takeDisbursementPhoto = () => {
    const context = this.canvas.getContext("2d");
    context.drawImage(
      this.videoPlayer,
      0,
      0,
      this.props.dimensions.height,
      this.props.dimensions.width
    );
    this.canvas.toBlob(async (e) => {
      e.name = `${new Date().getTime()}.jpeg`;
      if (this.props.multiple) {
        this.setState({
          images: {
            images: [...this.state.images.images, await this.getBase64(e)],
            blob: [...this.state.images.blob, e],
          },
        });
      } else {
        this.props.upload(e);
      }
    });
  };

  uploadDisbursement = () => {
    this.props.upload(this.state.images.blob);
  };

  render() {
    const { height, width } = this.props.dimensions;
    return (
      <div className="c-camera-feed">
        {!this.props.footer && (
          <div onClick={this.takePhoto} style={{ display: "flex" }}>
            <img
              src={PlusIcon}
              alt={"Upload documents"}
              style={{ marginTop: "-13%", marginLeft: "11%" }}
            />
            <br />
          </div>
        )}
        {this.props.multiple &&
          this.state.images.images.map((item) => <img src={item} />)}
        <div className="c-camera-feed__viewer">
          <video
            ref={(ref) => (this.videoPlayer = ref)}
            width={`${width}`}
            heigh={`${height}`}
          />
        </div>
        <div className="c-camera-feed__stage">
          <canvas
            width={`${width}`}
            heigh={`${height}`}
            style={{ display: "none" }}
            ref={(ref) => (this.canvas = ref)}
          />
        </div>
        {this.props.footer && (
          <>
            <Button
              onClick={(e) => {
                this.takeDisbursementPhoto();
              }}
              className={"cancle-button"}
              icon={<PlusOutlined />}
            >
              {this.props.multiple ? "Capture & Add New photo" : "Capture"}
            </Button>
            {this.props.multiple && (
              <Button
                onClick={(e) => this.uploadDisbursement()}
                className={"save-button"}
                icon={<UploadOutlined />}
              >
                Save
              </Button>
            )}
          </>
        )}
      </div>
    );
  }
}
