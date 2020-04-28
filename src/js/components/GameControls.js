import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { gameFsm } from "./../redux/actions/types";
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

function GameControls(props) {
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

  function reset() {
    stopTimer();
    props.resetGame();
  }

  useEffect(() => {
    if (props.fsm == gameFsm.FINISHED) stopTimer();
  }, [props.fsm]);

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

  console.log("rendering gamecontrols");
  console.log("FSM: " + props.fsm);
  return (
    <>
      <div className="game-controls">
        <button
          onClick={click}
          className={
            "control-button" + (props.fsm == gameFsm.FINISHED ? " half" : "")
          }
          style={{
            backgroundColor:
              props.fsm == gameFsm.IDLE || props.fsm == gameFsm.FINISHED
                ? "#00E000"
                : props.fsm == gameFsm.PLAY || props.fsm == gameFsm.RESUME
                ? "#DA0000"
                : "#2999E1"
          }}
        >
          {props.fsm == gameFsm.IDLE
            ? "PLAY"
            : props.fsm == gameFsm.FINISHED
            ? "PLAY AGAIN"
            : props.fsm == gameFsm.PLAY || props.fsm == gameFsm.RESUME
            ? "PAUSE"
            : "RESUME"}
        </button>
        {props.fsm == gameFsm.FINISHED ? (
          <button
            onClick={reset}
            className="control-button half"
            style={{ backgroundColor: "#FF9100" }}
          >
            PLAY ANOTHER GAME
          </button>
        ) : null}
      </div>
    </>
  );
}

const mapStateToProps = state => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(GameControls);
