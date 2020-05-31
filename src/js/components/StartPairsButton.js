import React from "react";
import SelectOptionsButton from "./SelectOptionsButton";
import { connect } from "react-redux";
import { setPairs, playGame } from "./../redux/actions/game-actions";
import { resetTimer } from "./../redux/actions/timer-actions";

function StartPairsButton(props) {
  function confirmOption(option) {
    props.setPairs(option);
  }

  function onClick() {
    switch (props.name) {
      case "START":
        // TODO: do some animation, then setTimeout for the below functions
        props.resetTimer();
        props.startGame();
        break;

      case "PAIRS":
        break;

      default:
        throw `Invalid button name ${props.name}`;
    }
  }

  const optionList = [8, 10, 12];

  return (
    <SelectOptionsButton
      optionList={optionList}
      confirmOption={confirmOption}
      onClick={onClick}
      name={props.name}
      classes={props.classes}
      setOwnClasses={props.setClasses}
      optionSelect={props.name === "PAIRS"}
    />
  );
}

const mapDispatchToProps = dispatch => ({
  setPairs: pairs => dispatch(setPairs(pairs)),
  startGame: () => dispatch(playGame()),
  resetTimer: () => dispatch(resetTimer())
});

export default connect(null, mapDispatchToProps)(StartPairsButton);
