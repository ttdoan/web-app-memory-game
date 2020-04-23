import { MATCH } from "./types";

const selectMatch = (name, id) => ({
  type: MATCH,
  item: {
    name,
    id
  }
});

export { selectMatch };
