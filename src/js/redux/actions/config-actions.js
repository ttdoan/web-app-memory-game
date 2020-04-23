import { INIT_CONFIG, SET_CONFIG } from "./types";

let initialConfig = {
  pairs: 8,
  memorizeTime: 5
};

const initConfig = () => ({
  type: INIT_CONFIG,
  cfg: initConfig
});

const setConfig = (pairs, memorizeTime) => ({
  type: SET_CONFIG,
  cfg: {
    pairs,
    memorizeTime
  }
});

export { initialConfig, initConfig, setConfig };
