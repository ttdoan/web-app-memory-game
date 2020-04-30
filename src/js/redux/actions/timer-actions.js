import {
  SET_MEM_TIME,
  INCREMENT_TIMER,
  RESET_TIMER,
  RECORD_TIME
} from "./types";

const setMemTime = time => ({ type: SET_MEM_TIME, time });
const incrementTimer = () => ({ type: INCREMENT_TIMER });
const resetTimer = () => ({ type: RESET_TIMER });
const recordTime = () => ({ type: RECORD_TIME });

export { setMemTime, incrementTimer, resetTimer, recordTime };
