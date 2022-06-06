import React, { Component } from "react";

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
    return <div className="home-wrapper">news!!</div>;
  }
}

export default Home;
