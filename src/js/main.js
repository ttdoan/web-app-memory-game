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
import Congrats from "./components/Congrats";
// Dependencies
import "./../css/style.css";

function Game() {
  return (
    <>
      <GameConfig />
      <Congrats />
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
