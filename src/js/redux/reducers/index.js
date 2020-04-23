import { combineReducers } from "redux";
import config from "./game-config";
import game from "./game-state";
import timer from "./timer";
import { match } from "./match";

export default combineReducers({
  game,
  timer,
  config,
  match
  // score
});
