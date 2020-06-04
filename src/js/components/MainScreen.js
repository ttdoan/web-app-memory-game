import React, { useState } from "react";
import StartPairsButton from "./StartPairsButton";
import OptionButton from "./OptionButton";
import AboutTimeButton from "./AboutTimeButton";

export default function Dashboard(props) {
  const [firstBtnClasses, setFirstBtnClasses] = useState([]);
  const [secondBtnClasses, setSecBtnClasses] = useState([]);
  const [thirdBtnClasses, setThrdBtnClasses] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  function closeAbout() {
    // Add class for modal retraction animation
    setThrdBtnClasses(["modal-retract"]);
    setTimeout(() => {
      // Removed class "disabled"
      setFirstBtnClasses([]);
      setSecBtnClasses([]);
      setThrdBtnClasses([]);
    }, 1500);

    let about = document.getElementById("about");
    about.classList.toggle("visible");
  }

  return (
    <>
      <div className="screen main-screen">
        <div id="about">
          <div
            onClick={closeAbout}
            onKeyDown={closeAbout}
            role="button"
            className="close-button"
          ></div>
          <p>
            This page is currently under construction... Click to upper right
            hand circle to close this modal.
          </p>
        </div>
        <div className="dashboard">
          <StartPairsButton
            name={showOptions ? "PAIRS" : "START"}
            classes={firstBtnClasses}
            setClasses={setFirstBtnClasses}
            flipped={props.flipped}
            setFlipped={props.setFlipped}
          />
          <OptionButton
            setClasses={[
              setFirstBtnClasses,
              setSecBtnClasses,
              setThrdBtnClasses
            ]}
            setShowOptions={setShowOptions}
            name={showOptions ? "BACK" : "OPTIONS"}
            classes={secondBtnClasses}
            flipped={props.flipped}
          />
          <AboutTimeButton
            name={showOptions ? "MEMORIZE" : "ABOUT"}
            classes={thirdBtnClasses}
            setClasses={[
              setFirstBtnClasses,
              setSecBtnClasses,
              setThrdBtnClasses
            ]}
            flipped={props.flipped}
          />
        </div>
      </div>
    </>
  );
}
