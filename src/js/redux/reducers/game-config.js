import { SET_CONFIG } from "./../actions/types";
import { initialConfig } from "./../actions/config-actions";

const gameConfig = (state = initialConfig, action) => {
  switch (action.type) {
    case SET_CONFIG:
      return {
        pairs: action.pairs,
        memorizeTime: action.memorizeTime
      };

    default:
      return state;
  }
};

export default gameConfig;
