import { INCREMENT_TIMER, RESET_TIMER, SET_MEM_TIME } from "./../actions/types";

const initialState = {
  memTime: 0,
  second: 0
};

const timer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MEM_TIME:
      return Object.assign({}, { ...state }, { memTime: action.time });

    case INCREMENT_TIMER:
      return Object.assign({}, { ...state }, { second: state.second + 1 });

    case RESET_TIMER:
      return initialState;

    default:
      return state;
  }
};

export default timer;
