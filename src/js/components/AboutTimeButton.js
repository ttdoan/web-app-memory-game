import React from "react";
import { connect } from "react-redux";
import { setMemTime } from "./../redux/actions/timer-actions";
import SelectOptionsButton from "./SelectOptionsButton";

function AboutTimeButton(props) {
  function confirmOption(option) {
    props.setMemTime(option);
  }

  const memTimeOptions = [5, 10, 15];

  return (
    <SelectOptionsButton
      optionList={memTimeOptions}
      confirmOption={confirmOption}
      setClasses={props.setClasses}
      name={props.name}
      classes={props.classes}
    />
  );
}

const mapDispatchToState = dispatch => ({
  setMemTime: time => dispatch(setMemTime(time))
});

export default connect(null, mapDispatchToState)(AboutTimeButton);
