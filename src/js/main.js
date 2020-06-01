// React
import React, { useState } from "react";
import { render } from "react-dom";
// Redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./redux/reducers";
// React components
import MainScreen from "./components/MainScreen";
import GameScreen from "./components/GameScreen";
// Dependencies
import "./../css/style.css";
import "./../css/display.css";
import "./../scss/dashboard.scss";
import "./../css/timer.css";
import "./../scss/board.scss";
import "./../css/gamecontrols.css";

function Game() {
  const [flipped, setFlipped] = useState(false);

  return (
    <>
      <MainScreen flipped={flipped} setFlipped={setFlipped} />
      <GameScreen flipped={flipped} setFlipped={setFlipped} />
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
