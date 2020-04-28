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
    >
      <div className="back-item"></div>
      <FontAwesomeIcon className={"match-item "} icon={props.icon} />
    </li>
  );
}

// class MatchItem extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       matched: false,
//       classes: ["flipped"]
//     };

//     this.clicked = this.clicked.bind(this);
//   }

//   clicked() {
//     this.props.selectMatch(this.props.icon[1], this.props.id);
//     // setClasses(["disabled"]);
//     this.setState(state => {
//       state.classes = ["disabled"];
//       return state;
//     });
//   }

//   componentDidMount() {
//     console.log("matchitem mounted, matched: " + this.state.matched);
//   }

//   shouldComponentUpdate() {
//     // console.log("matchitem shouldcomponentupdate");
//     return true;
//   }

//   componentDidUpdate() {
//     // console.log("matchitem component did update");
//     // console.log("MEMOVER: ", this.props.memOver);
//     if (!this.state.matched && this.props.memOver)
//       if (this.props.matchSuccess && this.props.selected) {
//         // setClasses(["disabled", "correct-match"]);
//         // setMatched(true);
//         this.setState(state => {
//           state.classes = ["disabled", "correct-match"];
//           state.matched = true;
//           return state;
//         });
//         this.props.decrementCount();
//       } else if (this.props.matchFailure) {
//         if (this.props.selected) {
//           setTimeout(() => {
//             // setClasses(["disabled", "flipped", "incorrect-match"]);
//             this.setState(state => {
//               state.classes = ["disabled", "flipped", "incorrect-match"];
//               return state;
//             });
//             // setTimeout(() => setClasses(["flipped"]), 1950);
//             setTimeout(
//               () =>
//                 this.setState(state => {
//                   state.classes = ["flipped"];
//                   return state;
//                 }),
//               1950
//             );
//           }, 600);
//         } else {
//           // setClasses(["disabled", "flipped"]);
//           this.setState(state => {
//             state.classes = ["disabled", "flipped"];
//             return state;
//           });
//           // setTimeout(() => setClasses(["flipped"]), 1350);
//           setTimeout(
//             () =>
//               this.setState(state => {
//                 state.classes = ["flipped"];
//                 return state;
//               }),
//             1350
//           );
//         }
//       }

//     // if (this.props.memOver)
//     //   this.setState(state => {
//     //     state.classes = ["flipped"];
//     //     return state;
//     //   });
//   }

//   componentWillUnmount() {
//     console.log("matchitem is unmounting");
//   }

//   render() {
//     console.log("rendering matchitem");
//     return (
//       <li
//         className={"match-item-container " + this.state.classes.join(" ")}
//         onClick={this.clicked}
//         onKeyDown={this.clicked}
//       >
//         <div className="back-item"></div>
//         <FontAwesomeIcon className={"match-item "} icon={this.props.icon} />
//       </li>
//     );
//   }
// }

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
