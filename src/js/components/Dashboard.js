import React, { useState } from "react";
import GameDisplay from "./GameDisplay";
import GameControls from "./GameControls";

export default function Dashboard() {
  const [pairsRef, setPairsRef] = useState(null);

  function setRef(ref) {
    console.log("setting ref");
    setPairsRef(ref);
  }

  return (
    <>
      <div className="dashboard">
        <GameDisplay />
        <GameControls />
      </div>
    </>
  );
}
