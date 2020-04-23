import { SET_MEM_TIME, INCREMENT_TIMER, RESET_TIMER } from "./types";

const setMemTime = time => ({ type: SET_MEM_TIME, time });
const incrementTimer = () => ({ type: INCREMENT_TIMER });
const resetTimer = () => ({ type: RESET_TIMER });

export { setMemTime, incrementTimer, resetTimer };
