import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { gameFsm } from "./../redux/actions/types";

function GameConfig() {
  return (
    <div className={"game-config"}>
      <label htmlFor="numPairs" className="col-2">
        Number of Pairs:
      </label>
      <select id="numPairs">
        <option value="1">1</option>
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
      <p className="score col-3">Best Score: {"12hrs 55mins 55secs"}</p>
      <button className="col-3">Help</button>
    </div>
  );
}

const mapStateToProps = state => ({
  gameIdle: state.game.fsm == gameFsm.IDLE
});

export default connect(mapStateToProps)(GameConfig);
