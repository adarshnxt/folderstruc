import React, { Component } from "react";
import PlusIcon from "../../assets/Images/plusIcon.svg";

export class CameraFeed extends Component {
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

  render() {
    const { height, width } = this.props.dimensions;
    return (
      <div className="c-camera-feed">
        <div onClick={this.takePhoto}>
          <img src={PlusIcon} alt={"Upload documents"} />
          <span className="Upload-Photo">Capture Photo</span>
        </div>
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
      </div>
    );
  }
}
