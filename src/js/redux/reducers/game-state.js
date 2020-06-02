import {
  gameFsm,
  DECREMENT_MATCH_COUNT,
  SET_MATCH_PAIRS
} from "./../actions/types";

let initialState = {
  pairs: 8,
  fsm: gameFsm.IDLE
};
initialState["matchCountLeft"] = initialState.pairs * 2;

const gameStatus = (state = initialState, action) => {
  switch (action.type) {
    case gameFsm.IDLE:
    case gameFsm.PLAY:
    case gameFsm.PAUSE:
    case gameFsm.RESET_BOARD:
      return Object.assign({}, state, { fsm: action.type });

    case DECREMENT_MATCH_COUNT:
      if (state.matchCountLeft == 1)
        return Object.assign({}, state, {
          fsm: gameFsm.FINISHED,
          matchCountLeft: 0
        });
      else
        return Object.assign({}, state, {
          fsm: state.fsm,
          matchCountLeft: state.matchCountLeft - 1
        });

    case SET_MATCH_PAIRS:
      return Object.assign({}, state, {
        pairs: action.pairs,
        matchCountLeft: action.pairs * 2
      });

    default:
      return state;
  }
};

export default gameStatus;
