import { gameFsm, DECREMENT_MATCH_COUNT, SET_MATCH_PAIRS } from "./types";

const resetGame = () => ({ type: gameFsm.IDLE });

const playGame = () => ({ type: gameFsm.PLAY });

const pauseGame = () => ({
  type: gameFsm.PAUSE
});

const resumeGame = () => ({
  type: gameFsm.PLAY
});

const finishGame = () => ({
  type: gameFsm.FINISHED
});

const decrementCount = () => ({
  type: DECREMENT_MATCH_COUNT
});

const setPairs = pairs => ({
  type: SET_MATCH_PAIRS,
  pairs
});

const resetBoard = () => ({
  type: gameFsm.RESET_BOARD
});

export {
  playGame,
  resetGame,
  pauseGame,
  resumeGame,
  finishGame,
  decrementCount,
  setPairs,
  resetBoard
};
