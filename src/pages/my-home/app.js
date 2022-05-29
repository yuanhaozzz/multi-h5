import React, { Component } from "react";

import { getList } from "./api";

import Test1 from "./static/test1.png";
import Test2 from "./static/test2.png";
import ClockSvg from "./static/clock.svg";
import Video from "./static/video.mp4";
import Music from "./static/music.mp3";
import BombSvga from "./static/bomb.svga";
import Svga from "src/utils/svga";

import "./style.scss";
class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getData();
    Svga.load(BombSvga).then((res) => {
      Svga.play({
        selector: ".bomb-animation",
        url: BombSvga,
        loops: 1,
        onFinished: function () {
          // document.body.removeChild(animation);
          // animationLoad();
        },
      });
    });
  }

  async getData() {
    try {
      const data = await getList();
      console.log(data);
    } catch (error) {
      console.log(error, "error");
    }
  }

  render() {
    return (
      <div className="home-wrapper">
        222
        <div className="bomb-animation"></div>
        <h2>欢迎来到浩哥多页面移动端模版</h2>
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
