import React, { Component } from "react";

import { getList } from "./api";

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
      </div>
    );
  }
}

export default Home;
