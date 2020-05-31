import React from "react";
import Timer from "./Timer";
import Board from "./Board";
import GameControls from "./GameControls";

export default function PlayScreen() {
  return (
    <div>
      <Timer />
      {/* <Board /> */}
      <GameControls />
    </div>
  );
}
