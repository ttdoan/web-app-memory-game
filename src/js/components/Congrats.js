import React from "react";
import { connect } from "react-redux";
import { gameFsm } from "./../redux/actions/types";
import { resetGame } from "./../redux/actions/game-actions";

function Congrats(props) {
  console.log("rendering congrats, fsm: " + props.gameFinished);
  return (
    <>
      {props.gameFinished == gameFsm.FINISHED ? (
        <div>
          <p>Congratulations</p>
          <p>Score</p>
          <p>Best Score</p>
          <button>Play Again</button>
          <button>Play Another Game</button>
        </div>
      ) : null}
    </>
  );
}

const mapStateToProps = state => ({
  gameFinished: state.game.fsm
});

const mapDispatchToProps = dispatch => ({
  resetGame: () => dispatch(resetGame())
});

export default connect(mapStateToProps, mapDispatchToProps)(Congrats);
