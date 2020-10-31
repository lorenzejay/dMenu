import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import "./bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./Redux/store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);