import React, { Component } from "react";

import Test1 from "./static/test1.png";
import Test2 from "./static/test2.png";
import ClockSvg from "./static/clock.svg";
import Video from "./static/video.mp4";
import Music from "./static/music.mp3";

import "./style.scss";
class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {}

  render() {
    return (
      <div className="home-wrapper">
        222
        <h2>欢迎来到浩哥多页面移动端模版 hello world！!</h2>
        <audio src={Music} controls></audio>
        <video src={Video} controls></video>
        <img src={ClockSvg} alt="" />
        <img src={Test2} alt="" />
        <img src={Test1} alt="" />
      </div>
    );
  }
}

export default Home;
