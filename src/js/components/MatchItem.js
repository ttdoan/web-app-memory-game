/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { selectMatch } from "./../redux/actions/match-actions";
import { decrementCount } from "./../redux/actions/game-actions";
import { gameFsm, matchResult } from "./../redux/actions/types";

function MatchItem(props) {
  const [matched, setMatched] = useState(false);
  const [classes, setClasses] = useState(["disabled"]);

  function clicked() {
    props.selectMatch(props.icon[1], props.id);
    setClasses(["disabled"]);
  }

  useEffect(() => {
    if (props.memOver) setClasses(["flipped"]);
  }, [props.memOver]);

  useEffect(() => {
    if (!matched && props.memOver)
      if (props.matchSuccess && props.selected) {
        setClasses(["disabled", "correct-match"]);
        setMatched(true);
        props.decrementCount();
      } else if (props.matchFailure) {
        if (props.selected) {
          setTimeout(() => {
            setClasses(["disabled", "flipped", "incorrect-match"]);
            setTimeout(() => setClasses(["flipped"]), 1950);
          }, 600);
        } else {
          setClasses(["disabled", "flipped"]);
          setTimeout(() => setClasses(["flipped"]), 1350);
        }
      }
  }, [matched, props.selected, props.matchSuccess, props.matchFailure]);

  // console.log(
  //   `rendering matchitem: NAME = ${props.icon[1]}, ID: = ${props.id}`
  // );
  console.log(`rendering matchitem`);
  return (
    <li
      className={"match-item-container " + classes.join(" ")}
      onClick={clicked}
      onKeyDown={clicked}
      style={props.itemStyle}
    >
      <div className="back-item">
        <FontAwesomeIcon icon={["far", "question-circle"]} />
      </div>
      <FontAwesomeIcon className="match-item" icon={props.icon} />
    </li>
  );
}

MatchItem.propTypes = {
  icon: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = (state, props) => ({
  matchSuccess: state.match.result === matchResult.MATCH_SUCCESS,
  matchFailure: state.match.result === matchResult.MATCH_FAILURE,
  selected:
    state.match.firstMatchId === props.id ||
    state.match.secondMatchId === props.id,
  memOver: state.timer.second >= state.timer.memTime,
  gamePaused: state.game.fsm == gameFsm.PAUSE
});

const mapDispatchToProps = dispatch => ({
  selectMatch: (name, id) => dispatch(selectMatch(name, id)),
  decrementCount: () => dispatch(decrementCount())
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchItem);
