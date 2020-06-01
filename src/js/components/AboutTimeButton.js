import React from "react";
import { connect } from "react-redux";
import { setMemTime } from "./../redux/actions/timer-actions";
import SelectOptionsButton from "./SelectOptionsButton";

function AboutTimeButton(props) {
  function confirmOption(option) {
    props.setMemTime(option);
  }

  function onClick() {
    switch (props.name) {
      case "ABOUT":
        props.setClasses.forEach((setClass, idx) => {
          if (idx == 2) setClass(["disabled", "modal-overlay"]);
          else setClass(["disabled"]);
        });
        revealAbout();
        break;

      case "MEMORIZE":
        break;

      default:
        throw `Invalid button name: ${props.name}`;
    }
  }

  function revealAbout() {
    setTimeout(() => {
      document.getElementById("about").classList.toggle("visible");
    }, 1200);
  }

  const memTimeOptions = [5, 10, 15];

  return (
    <SelectOptionsButton
      optionList={memTimeOptions}
      confirmOption={confirmOption}
      // setClasses={props.setClasses}
      name={props.name}
      classes={props.classes}
      onClick={onClick}
      setOwnClasses={props.setClasses[2]}
      optionSelect={props.name === "MEMORIZE"}
      flipped={props.flipped}
    />
  );
}

const mapDispatchToProps = dispatch => ({
  setMemTime: time => dispatch(setMemTime(time))
});

export default connect(null, mapDispatchToProps)(AboutTimeButton);
