// React
import React from "react";
import { render } from "react-dom";
// Redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./redux/reducers";
// React components
import Board from "./components/Board";
import Dashboard from "./components/Dashboard";
// Dependencies
import "./../css/style.css";
import "./../scss/dashboard.scss";
import "./../scss/board.scss";

function Game() {
  return (
    <>
      <Dashboard />
      {/* <Board /> */}
    </>
  );
}

const store = createStore(rootReducer);

let style = document.getElementById("mem-ring-ss");
style = document.createElement("style");
style.id = "mem-ring-ss";
document.body.appendChild(style);

render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById("react-container")
);
