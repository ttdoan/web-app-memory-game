import React from "react";
import SelectOptionsButton from "./SelectOptionsButton";
import { connect } from "react-redux";
import { setPairs, resetBoard } from "./../redux/actions/game-actions";

function StartPairsButton(props) {
  function confirmOption(option) {
    props.setPairs(option);
  }

  function onClick() {
    let screen;

    switch (props.name) {
      case "START":
        screen = document.getElementById("react-container");
        screen.classList.toggle("flipped");
        props.setFlipped(true);
        setTimeout(() => {
          props.resetBoard();
        }, 750);
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
      flipped={props.flipped}
    />
  );
}

const mapDispatchToProps = dispatch => ({
  setPairs: pairs => dispatch(setPairs(pairs)),
  resetBoard: () => dispatch(resetBoard())
});

export default connect(null, mapDispatchToProps)(StartPairsButton);
