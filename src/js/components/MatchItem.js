/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { selectMatch } from "./../redux/actions/match-actions";
import { gameFsm, matchResult } from "./../redux/actions/types";

const classIdx = {
  disabled: 0,
  flipped: 1
};

function MatchItem(props) {
  const [active, setActive] = useState(false);
  const [classes, setClasses] = useState(
    Object.keys(classIdx).map(prop => {
      return prop == "disabled" ? prop : undefined;
    })
  );

  function clicked() {
    setClasses(["disabled"]);
  }

  function transitionEnd() {
    if (active) props.selectMatch(props.icon[1], props.id);
    else setActive(true);
  }

  useEffect(() => {
    if (props.memOver) setClasses(["flipped"]);
  }, [props.memOver]);

  useEffect(() => {
    if (props.matchSuccess) {
      // add animation
      console.log("MATCH SUCCESS");
      setClasses(["disabled", "correct-match"]);
    } else if (props.matchFailure) {
      // add animation
      console.log("MATCH FAILURE");
      setClasses(["flipped", "incorrect-match"]);
    }
  }, [props.matchSuccess, props.matchFailure]);

  console.log(
    `rendering matchitem: NAME = ${props.icon[1]}, ID: = ${props.id}`
  );
  return (
    <li
      className={"match-item-container " + classes.join(" ")}
      onTransitionEnd={transitionEnd}
      onClick={clicked}
      onKeyDown={clicked}
    >
      <div className="back-item"></div>
      <FontAwesomeIcon className={"match-item "} icon={props.icon} />
    </li>
  );
}

MatchItem.propTypes = {
  icon: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = (state, props) => ({
  matchSuccess:
    state.match.result === matchResult.MATCH_SUCCESS &&
    (state.match.firstMatchId === props.id ||
      state.match.secondMatchId === props.id),
  matchFailure:
    state.match.result === matchResult.MATCH_FAILURE &&
    (state.match.firstMatchId === props.id ||
      state.match.secondMatchId === props.id),
  memOver: state.timer.second >= state.timer.memTime
});

const mapDispatchToProps = dispatch => ({
  selectMatch: (name, id) => dispatch(selectMatch(name, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchItem);
