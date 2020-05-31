import {
  gameFsm,
  DECREMENT_MATCH_COUNT,
  SET_MATCH_PAIRS
} from "./../actions/types";

let initialState = {
  pairs: 8,
  fsm: gameFsm.IDLE,
  matchCountLeft: 16
};

const gameStatus = (state = initialState, action) => {
  switch (action.type) {
    case gameFsm.IDLE:
    case gameFsm.MEMORIZE:
    case gameFsm.PLAY:
    case gameFsm.PAUSE:
    case gameFsm.RESUME:
      return {
        fsm: action.type,
        matchCountLeft: state.matchCountLeft
      };

    case DECREMENT_MATCH_COUNT:
      if (state.matchCountLeft == 1)
        return { fsm: gameFsm.FINISHED, matchCountLeft: 0 };
      else return { fsm: state.fsm, matchCountLeft: state.matchCountLeft - 1 };

    case SET_MATCH_PAIRS:
      return {
        pairs: action.pairs,
        fsm: state.fsm,
        matchCountLeft: action.pairs * 2
      };

    default:
      return state;
  }
};

export default gameStatus;
