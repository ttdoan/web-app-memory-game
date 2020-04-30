import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { gameFsm } from "../redux/actions/types";
import GameConfig from "./GameConfig";
import Timer from "./Timer";
import Congrats from "./Congrats";

function GameDisplay(props) {
  const [score, setScore] = useState(Number.MAX_VALUE);
  const [bestScore, setBestScore] = useState(Number.MAX_VALUE);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (props.fsm == gameFsm.FINISHED) {
      if (score != props.score) setScore(props.score);

      if (bestScore > props.score) {
        setIsNew(true);
        setBestScore(props.score);
      } else if (isNew) setIsNew(false);
    }
  }, [props.score]);

  function formatScore(num) {
    if (num != Number.MAX_VALUE)
      return (
        Math.floor(num / 3600) +
        "hrs " +
        Math.floor(num / 60) +
        "mins " +
        (num % 60) +
        "secs"
      );
    return "--";
  }

  function getScore() {
    return formatScore(score);
  }

  function getBestScore() {
    return formatScore(bestScore);
  }

  console.log("rendering gamedisplay");
  return (
    // "game-display" forms a triangular prism, rotating to correct display based on game state.
    <div
      className={
        "game-display" +
        (props.fsm == gameFsm.IDLE
          ? ""
          : props.fsm == gameFsm.FINISHED
          ? " flip-congrats"
          : " flip-timer")
      }
    >
      <GameConfig getBestScore={getBestScore} />
      <Timer gameFinished={props.fsm == gameFsm.FINISHED} />
      <Congrats
        getScore={getScore}
        getBestScore={getBestScore}
        newBestScore={isNew}
      />
    </div>
  );
}

const mapStateToProps = state => ({
  fsm: state.game.fsm,
  score: state.timer.recordedTime
});

export default connect(mapStateToProps)(GameDisplay);
