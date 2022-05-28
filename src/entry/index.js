import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import Loading from "src/components/Loading";

import "src/assets/css/base.scss";

function createApp(App) {
  ReactDOM.render(
    <Fragment>
      <Loading />
      <App />
    </Fragment>,
    document.getElementById("root")
  );
}

export default createApp;
