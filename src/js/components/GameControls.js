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
  resetTimer,
  setIntervalID
} from "./../redux/actions/timer-actions";

import {
  faPause,
  faPlay,
  faRedoAlt,
  faChevronLeft
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function GameControls(props) {
  function startTimer() {
    props.setIntervalID(
      setInterval(() => {
        props.incrementTimer();
      }, 1000)
    );
  }

  function stopTimer() {
    clearInterval(props.intervalID);
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

  function back() {
    stopTimer();
    let screen = document.getElementById("react-container");
    screen.classList.toggle("flipped");
    setTimeout(() => {
      props.setFlipped(false);
    }, 200);
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
          className="control-button play-pause-button"
          // style={{
          //   backgroundColor:
          //     props.fsm == gameFsm.IDLE || props.fsm == gameFsm.FINISHED
          //       ? "#00E000"
          //       : props.fsm == gameFsm.PLAY || props.fsm == gameFsm.RESUME
          //       ? "#DA0000"
          //       : "#2999E1"
          // }}
        >
          {props.fsm == gameFsm.IDLE ||
          props.fsm == gameFsm.PAUSE ||
          props.fsm == gameFsm.FINISHED ? (
            <FontAwesomeIcon icon={faPlay} />
          ) : (
            <FontAwesomeIcon icon={faPause} />
          )}
        </button>
        <button
          onClick={reset}
          className="control-button restart-button"
          // style={{ backgroundColor: "#FF9100" }}
        >
          <FontAwesomeIcon icon={faRedoAlt} />
        </button>
        <button onClick={back} className="control-button main-screen-button">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>
    </>
  );
}

const mapStateToProps = state => ({
  fsm: state.game.fsm,
  intervalID: state.timer.intervalID
});

const mapDispatchToProps = dispatch => ({
  startGame: () => dispatch(playGame()),
  pauseGame: () => dispatch(pauseGame()),
  resumeGame: () => dispatch(resumeGame()),
  resetGame: () => dispatch(resetGame()),
  setMemTime: time => dispatch(setMemTime(time)),
  incrementTimer: () => dispatch(incrementTimer()),
  resetTimer: () => dispatch(resetTimer()),
  setIntervalID: id => dispatch(setIntervalID(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(GameControls);
