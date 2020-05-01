import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import MatchItem from "./MatchItem";
import { gameFsm } from "./../redux/actions/types";
import { setPairs } from "./../redux/actions/game-actions";
import { resetMatch } from "./../redux/actions/match-actions";
// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";

library.add(fas, faQuestionCircle);

let available = {
  fas: [
    "baby-carriage",
    "cat",
    "toilet-paper",
    "apple-alt",
    "chess-rook",
    "puzzle-piece",
    "star-and-crescent",
    "atom"
  ]
};

function randomizeIcons(icons, num) {
  let arr = [];
  let errMsg = [];

  if (!num) {
    console.log(num);
    throw "ERROR: Number of pairs requested is not valid!";
  }

  for (let prop in icons) {
    let set = new Set();
    let prevSize = 0;

    for (let i = 0; i < icons[prop].length; i++) {
      set.add(icons[prop][i]);
      if (set.size == prevSize)
        errMsg.push(
          `ERROR: Prefix "${prop}" and icon "${icons[prop][i]}" has already been seen...`
        );
      else arr.push([prop, icons[prop][i]]);
      prevSize = set.size;
    }
  }

  if (errMsg.length) throw errMsg.join("\n");

  if (arr.length < num)
    throw `ERROR: There aren't enough icons. Number of pairs requested = ${num}, icons available = ${arr.length}, icons needed = ${num}`;

  while (arr.length != num)
    arr.splice(Math.floor(Math.random() * arr.length), 1);
  arr.push(...arr);

  shuffle(arr);

  return arr;
}

// Shuffle the array using the Fisher-Yates algorithm for efficient in-place shuffling.
// The Fisher-Yates algorithm use in-place shuffling by having all shuffled items in the
// back and having all unshuffled items in the front. Over time, items in the back will
// be swapped with items in the front and they will be considered shuffled. You continue
// doing this, moving from the back to the front until all items are shuffled.
function shuffle(arr) {
  let remaining = arr.length,
    temp,
    randIdx;

  while (remaining) {
    // Pick a remaining item
    randIdx = Math.floor(Math.random() * remaining--);

    // Swap it with the current item
    temp = arr[remaining];
    arr[remaining] = arr[randIdx];
    arr[randIdx] = temp;
  }
}

// NOTE: For some reason, when the board is re-randomized, some of the MatchItem's
// are not unmounted, keeping their previous state. Need to clear the board to
// unmount them properly to reset state.
const _boardFsm = {
  DO_NOTHING: "DO_NOTHING",
  CLEAR_BOARD: "CLEAR_BOARD",
  CREATE_BOARD: "CREATE_BOARD"
};

function Board(props) {
  const [board, makeBoard] = useState([]);
  const [boardState, setBoardState] = useState(_boardFsm.DO_NOTHING);

  useEffect(() => {
    if (boardState == _boardFsm.CLEAR_BOARD) {
      makeBoard([]);
      setBoardState(_boardFsm.CREATE_BOARD);
      console.log("clearing board");
    } else if (boardState == _boardFsm.CREATE_BOARD) {
      console.log("creating board");
      let pairs = document.getElementById("numPairs");
      makeBoard(randomizeIcons(available, pairs.value));
      props.setPairs(pairs.value);
      props.resetMatch();
      setBoardState(_boardFsm.DO_NOTHING);
    }
  }, [makeBoard, boardState, props]);

  useEffect(() => {
    if (props.play) setBoardState(_boardFsm.CLEAR_BOARD);
  }, [props.play]);

  console.log("rendering BOARD");
  return (
    <>
      <ul className="board">
        {board.map((item, idx) => {
          return <MatchItem key={idx} id={idx} icon={item} />;
        })}
      </ul>
    </>
  );
}

const mapStateToProps = state => ({
  play: state.game.fsm == gameFsm.PLAY,
  pairs: state.game.matchCountLeft / 2
});

const mapDispatchToProps = dispatch => ({
  setPairs: pairs => dispatch(setPairs(pairs)),
  resetMatch: () => dispatch(resetMatch())
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
