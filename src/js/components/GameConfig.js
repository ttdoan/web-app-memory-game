import React from "react";
// import { connect } from "react-redux";
import Timer from "./Timer";

export default function GameConfig() {
  console.log("rendering gameconfig");

  return (
    <>
      <label htmlFor="numPairs">Number of Pairs:</label>
      <select id="numPairs">
        <option value="1">1</option>
        <option value="8">8</option>
        <option value="9">9</option>
      </select>
      <label htmlFor="memorizeTime">Memorize Time:</label>
      <select id="memorizeTime">
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
      <Timer />
      {/* <Timer hour={hour} minute={minute} second={second} /> */}
      {/* <button onClick={start}>Start Game!</button> */}
    </>
  );
}

// export default connect()(GameConfig);
