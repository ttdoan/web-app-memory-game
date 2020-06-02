import { matchActions, matchResult } from "./../actions/types";

const initialState = {
  firstMatchId: -1,
  secondMatchId: -1,
  result: matchResult.MATCH_NO_RESULT
};

const matchState = {
  MATCH_IDLE: "MATCH_IDLE",
  MATCH_COMPARE: "MATCH_COMPARE"
};

let _state = matchState.MATCH_IDLE;
let _matchName = "";

function matchItem(state, action) {
  switch (_state) {
    case matchState.MATCH_IDLE:
      _state = matchState.MATCH_COMPARE;
      _matchName = action.item.name;
      return Object.assign({}, state, {
        firstMatchId: action.item.id,
        secondMatch: "",
        result: matchResult.MATCH_NO_RESULT
      });

    case matchState.MATCH_COMPARE:
      _state = matchState.MATCH_IDLE;
      return Object.assign({}, state, {
        secondMatchId: action.item.id,
        result:
          _matchName === action.item.name
            ? matchResult.MATCH_SUCCESS
            : matchResult.MATCH_FAILURE
      });
  }
}

const match = (state = initialState, action) => {
  switch (action.type) {
    case matchActions.RESET:
      return initialState;

    case matchActions.MATCH:
      return matchItem(state, action);

    default:
      return state;
  }
};

export { match, matchResult };
