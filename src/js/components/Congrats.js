import React from "react";

export default function Congrats(props) {
  console.log("rendering congrats");
  return (
    <>
      <div className="congrats">
        <p>Congratulations</p>
        <p>Score: {props.getScore()}</p>
        <p>
          Best Score:{" " + props.getBestScore()}
          {props.newBestScore ? (
            <span style={{ color: "red" }}> [NEW!]</span>
          ) : null}
        </p>
      </div>
    </>
  );
}
