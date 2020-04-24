import {
  gameFsm,
  DECREMENT_MATCH_COUNT,
  SET_MATCH_PAIRS
} from "./../actions/types";

let initialState = {
  fsm: gameFsm.IDLE,
  matchCountLeft: -1
};

const gameStatus = (state = initialState, action) => {
  switch (action.type) {
    case gameFsm.MEMORIZE:
    case gameFsm.PLAY:
    case gameFsm.PAUSE:
      return {
        fsm: action.type,
        matchCountLeft: state.matchCountLeft
      };

    case DECREMENT_MATCH_COUNT:
      if (state.matchCountLeft == 1)
        return { fsm: gameFsm.FINISHED, matchCountLeft: 0 };
      else return { fsm: state.fsm, matchCountLeft: state.matchCountLeft - 1 };

    case SET_MATCH_PAIRS:
      return { fsm: state.fsm, matchCountLeft: action.pairs * 2 };

    default:
      return state;
  }
};

export default gameStatus;
