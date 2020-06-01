import { timerActions } from "./../actions/types";

const initialState = {
  // ID for setInterval.
  intervalID: 0,
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
    case timerActions.SET_MEM_TIME:
      return Object.assign({}, state, { memTime: action.time });

    case timerActions.INCREMENT_TIMER:
      return Object.assign({}, state, { second: state.second + 1 });

    case timerActions.RESET_TIMER:
      return initialState;

    case timerActions.RECORD_TIME:
      console.log("UPDATING RECORDED TIME");
      return Object.assign({}, state, { recordedTime: state.second });

    case timerActions.SET_INTERVAL_ID:
      return Object.assign({}, state, { intervalID: action.id });

    default:
      return state;
  }
};

export default timer;
