import React, { Component } from "react";

import { getList } from "./api";

import Test2 from "./static/test2.png";
import Clock from "./static/clock.svg";
import Music from "./static/music.mp3";

import "./style.scss";
class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getData();
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
        <h2>欢迎来到浩哥多页面移动端模版</h2>
        <img src={Test2} alt="" />
        <img src={Clock} alt="" />
        <audio src={Music} controls></audio>
      </div>
    );
  }
}

export default Home;
