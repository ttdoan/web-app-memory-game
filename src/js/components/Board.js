import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MatchItem from "./MatchItem";
import { gameFsm } from "./../redux/actions/types";
import { setPairs } from "./../redux/actions/game-actions";
// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);
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

function Board(props) {
  const [board, makeBoard] = useState([]);

  useEffect(() => {
    if (props.makeBoard) {
      let pairs = document.getElementById("numPairs");
      makeBoard(randomizeIcons(available, pairs.value));
      props.setPairs(pairs.value);
    }
  }, [props.makeBoard]);
  console.log("rendering BOARD");
  return (
    <>
      <ul className="board">
        {board.map((item, idx) => {
          return <MatchItem key={item + idx} id={idx} icon={item} />;
        })}
      </ul>
    </>
  );
}

const mapStateToProps = state => ({
  makeBoard: state.game.fsm == gameFsm.PLAY
});

const mapDispatchToProps = dispatch => ({
  setPairs: pairs => dispatch(setPairs(pairs))
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
