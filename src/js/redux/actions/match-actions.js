import { matchActions } from "./types";

const selectMatch = (name, id) => ({
  type: matchActions.MATCH,
  item: {
    name,
    id
  }
});

const resetMatch = () => ({
  type: matchActions.RESET
});

export { selectMatch, resetMatch };
