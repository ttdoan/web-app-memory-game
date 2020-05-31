import {
  INCREMENT_TIMER,
  RESET_TIMER,
  SET_MEM_TIME,
  RECORD_TIME
} from "./../actions/types";

const initialState = {
  // Amout of time in seconds to memorize pairs.
  memTime: 5,
  // For timer.
  second: 0,
  // Time for completed game. Any components that are
  // dependent on "second" can use this to prevent from
  // re-rendering unnecessarily.
  recordedTime: 0
};

const timer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MEM_TIME:
      return Object.assign({}, { ...state }, { memTime: action.time });

    case INCREMENT_TIMER:
      return Object.assign({}, { ...state }, { second: state.second + 1 });

    case RESET_TIMER:
      return initialState;

    case RECORD_TIME:
      console.log("UPDATING RECORDED TIME");
      return Object.assign({}, { ...state }, { recordedTime: state.second });

    default:
      return state;
  }
};

export default timer;
