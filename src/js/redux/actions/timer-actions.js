import { timerActions } from "./types";

const setMemTime = time => ({ type: timerActions.SET_MEM_TIME, time });
const incrementTimer = () => ({ type: timerActions.INCREMENT_TIMER });
const resetTimer = () => ({ type: timerActions.RESET_TIMER });
const recordTime = () => ({ type: timerActions.RECORD_TIME });
const setIntervalID = id => ({ type: timerActions.SET_INTERVAL_ID, id });

export { setMemTime, incrementTimer, resetTimer, recordTime, setIntervalID };
