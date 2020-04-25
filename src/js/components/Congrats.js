import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { gameFsm } from "./../redux/actions/types";
import { resetGame } from "./../redux/actions/game-actions";

function Congrats(props) {
  const [bestTime, setBestTime] = useState(0);

  useEffect(() => {
    if (props.gameFinished && (!bestTime || bestTime > props.recordedTime))
      setBestTime(props.time);
  }, [props.gameFinished]);

  return (
    <>
      {props.gameFinished ? (
        <div>
          <p>Congratulations</p>
          <p>Score</p>
          <p>
            Best Score:{" "}
            {Math.floor(bestTime / 3600) +
              "hrs " +
              Math.floor(bestTime / 60) +
              "mins " +
              (bestTime % 60) +
              "secs"}
          </p>
        </div>
      ) : null}
    </>
  );
}

const mapStateToProps = state => ({
  gameFinished: state.game.fsm == gameFsm.FINISHED,
  time: state.timer.second
});

const mapDispatchToProps = dispatch => ({
  resetGame: () => dispatch(resetGame())
});

export default connect(mapStateToProps, mapDispatchToProps)(Congrats);
