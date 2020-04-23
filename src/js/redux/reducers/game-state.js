import { gameFsm } from "./../actions/types";

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

let initialState = {
  fsm: gameFsm.IDLE,
  board: [],
  matchedPairs: 0
};

const gameStatus = (state = initialState, action) => {
  switch (action.type) {
    case gameFsm.MEMORIZE:
      return {
        fsm: gameFsm.MEMORIZE,
        board: randomizeIcons(available, action.pairs),
        matchedPairs: 0
      };

    case gameFsm.PLAY:
    case gameFsm.PAUSE:
      return {
        fsm: action.type,
        board: state.board,
        matchedPairs: state.matchedPairs
      };

    default:
      return state;
  }
};

export default gameStatus;
