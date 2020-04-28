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

function Game() {
  return (
    <>
      <Dashboard />
      <Board />
    </>
  );
}

const store = createStore(rootReducer);

render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById("react-container")
);
