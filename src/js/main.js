// React
import React from "react";
import { render } from "react-dom";
// Redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./redux/reducers";
// React components
import MainScreen from "./components/MainScreen";
import PlayScreen from "./components/PlayScreen";
// Dependencies
import "./../css/style.css";
import "./../css/display.css";
import "./../scss/dashboard.scss";
import "./../css/timer.css";
import "./../scss/board.scss";
import "./../css/gamecontrols.css";

function Game() {
  return (
    <>
      <MainScreen />
      <PlayScreen />

      {/* <div className="card-container">
        <div className="card front">
          <p>yes</p>
        </div>
        <div className="card back">
          <p>hey</p>
        </div>
      </div> */}
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
