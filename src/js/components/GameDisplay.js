import React, { useState } from "react";
import { connect } from "react-redux";
import { gameFsm } from "../redux/actions/types";
import GameConfig from "./GameConfig";
import Timer from "./Timer";
import Congrats from "./Congrats";

function GameDisplay(props) {
  const [bestScore, setBestScore] = useState(0);
  console.log("rendering gameconfig");
  let displayComp = null;

  switch (props.fsm) {
    case gameFsm.PLAY:
    case gameFsm.PAUSE:
    case gameFsm.RESUME:
      displayComp = <Timer />;
      break;

    case gameFsm.IDLE:
      displayComp = <GameConfig />;
      break;

    case gameFsm.FINISHED:
      displayComp = <Congrats />;
  }

  return (
    <div
      className={
        "game-display" + (props.fsm == gameFsm.IDLE ? "" : " flip-vertical")
      }
    >
      <GameConfig />
      <div className="display-back">
        <Timer />
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  fsm: state.game.fsm
});

export default connect(mapStateToProps)(GameDisplay);
