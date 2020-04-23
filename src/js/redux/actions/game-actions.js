import { gameFsm } from "./types";

const resetGame = () => ({ type: gameFsm.IDLE });

const playGame = () => ({ type: gameFsm.PLAY });

const pauseGame = () => ({
  type: gameFsm.PAUSE
});

const resumeGame = () => ({
  type: gameFsm.RESUME
});

export { playGame, resetGame, pauseGame, resumeGame };
