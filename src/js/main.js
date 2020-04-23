// React
import React from "react";
import { render } from "react-dom";
// Redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./redux/reducers";
// React components
import GameConfig from "./components/GameConfig";
import Board from "./components/Board";
// Dependencies
import "./../css/style.css";

function Website() {
  return (
    <>
      <GameConfig />
      <Board />
    </>
  );
}

const store = createStore(rootReducer);

render(
  <Provider store={store}>
    <Website />
  </Provider>,
  document.getElementById("react-container")
);
