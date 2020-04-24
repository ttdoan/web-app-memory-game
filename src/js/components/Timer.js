import React, { useState } from "react";
import { connect } from "react-redux";
import {
  playGame,
  pauseGame,
  resumeGame
} from "./../redux/actions/game-actions";
import { setMemTime, incrementTimer } from "./../redux/actions/timer-actions";
import { gameFsm } from "./../redux/actions/types";

function Timer(props) {
  const [interval, setInternalInterval] = useState();
  const [mode, setMode] = useState(gameFsm.PLAY);

  function start() {
    let time = document.getElementById("memorizeTime");

    setMode(gameFsm.PAUSE);
    props.setMemTime(time.value);
    // Setup the board
    props.startGame();
    setInternalInterval(
      setInterval(() => {
        props.incrementTimer();
      }, 1000)
    );
  }

  function pause() {
    clearInterval(interval);
    setMode(gameFsm.RESUME);
    props.pauseGame();
  }

  function resume() {
    setInternalInterval(
      setInterval(() => {
        props.incrementTimer();
      }, 1000)
    );
    setMode(gameFsm.PAUSE);
    props.resumeGame();
  }

  // if (props.timer.second == props.timer.memTime) props.disableMemTime();

  // console.log("rendering timer");
  return (
    <>
      <p>
        {Math.floor(props.timer.second / 3600) +
          "hrs " +
          Math.floor(props.timer.second / 60) +
          "mins " +
          (props.timer.second % 60) +
          "secs"}
      </p>
      <button
        onClick={
          mode == gameFsm.PLAY ? start : mode == gameFsm.PAUSE ? pause : resume
        }
      >
        {mode == gameFsm.PLAY
          ? "PLAY"
          : mode == gameFsm.PAUSE
          ? "PAUSE"
          : "RESUME"}
      </button>
    </>
  );
}

const mapStateToProps = state => ({
  timer: state.timer
});

const mapDispatchToProps = dispatch => ({
  startGame: () => dispatch(playGame()),
  pauseGame: () => dispatch(pauseGame()),
  resumeGame: () => dispatch(resumeGame()),
  setMemTime: time => dispatch(setMemTime(time)),
  incrementTimer: () => dispatch(incrementTimer())
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
