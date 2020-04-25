import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  playGame,
  pauseGame,
  resumeGame,
  resetGame
} from "./../redux/actions/game-actions";
import {
  setMemTime,
  incrementTimer,
  resetTimer
} from "./../redux/actions/timer-actions";
import { gameFsm } from "./../redux/actions/types";

function Timer(props) {
  const [interval, setInternalInterval] = useState();

  function startTimer() {
    setInternalInterval(
      setInterval(() => {
        props.incrementTimer();
      }, 1000)
    );
  }

  function stopTimer() {
    clearInterval(interval);
  }

  function start() {
    let time = document.getElementById("memorizeTime");

    props.resetTimer();
    props.setMemTime(time.value);
    // Setup the board
    props.startGame();
    startTimer();
  }

  function pause() {
    stopTimer();
    props.pauseGame();
  }

  function resume() {
    startTimer();
    props.resumeGame();
  }

  function click() {
    switch (props.fsm) {
      case gameFsm.IDLE:
      case gameFsm.FINISHED:
        start();
        break;

      case gameFsm.PLAY:
      case gameFsm.RESUME:
        pause();
        break;

      case gameFsm.PAUSE:
        resume();
        break;
    }
  }

  useEffect(() => {
    if (props.fsm == gameFsm.FINISHED) {
      stopTimer();
    }
  }, [props.fsm]);

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
      <button onClick={click}>
        {props.fsm == gameFsm.IDLE || props.fsm == gameFsm.FINISHED
          ? "PLAY"
          : props.fsm == gameFsm.PLAY || props.fsm == gameFsm.RESUME
          ? "PAUSE"
          : "RESUME"}
      </button>
    </>
  );
}

const mapStateToProps = state => ({
  timer: state.timer,
  fsm: state.game.fsm
});

const mapDispatchToProps = dispatch => ({
  startGame: () => dispatch(playGame()),
  pauseGame: () => dispatch(pauseGame()),
  resumeGame: () => dispatch(resumeGame()),
  resetGame: () => dispatch(resetGame()),
  setMemTime: time => dispatch(setMemTime(time)),
  incrementTimer: () => dispatch(incrementTimer()),
  resetTimer: () => dispatch(resetTimer())
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
