import React from "react";
import Timer from "./Timer";
import Board from "./Board";
import GameControls from "./GameControls";

export default function PlayScreen(props) {
  return (
    <div className="screen play-screen">
      <Timer />
      <Board />
      <GameControls setFlipped={props.setFlipped} />
    </div>
  );
}
