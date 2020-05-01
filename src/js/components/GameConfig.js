import React from "react";

export default function GameConfig(props) {
  console.log("rendering gameconfig");
  return (
    <div className={"game-config side-one"}>
      <label htmlFor="numPairs" className="col-2">
        Number of Pairs:
      </label>
      <select id="numPairs">
        {/* <option value="1">1</option> */}
        <option value="8">8</option>
        <option value="9">9</option>
      </select>
      <label htmlFor="memorizeTime" className="col-2">
        Memorize Time:
      </label>
      <select id="memorizeTime">
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
      <p className="score col-3">Best Score: {" " + props.getBestScore()}</p>
      <button className="col-3">Help</button>
    </div>
  );
}
