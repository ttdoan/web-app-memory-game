import React, { useState } from "react";
import StartPairsButton from "./StartPairsButton";
import OptionButton from "./OptionButton";
import AboutTimeButton from "./AboutTimeButton";

export default function Dashboard() {
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
    <div className="screen">
      <div id="about">
        <div onClick={closeAbout} className="close-button"></div>
        <p>Thank you for trying my game!</p>
      </div>
      <div className="dashboard">
        {/* <MenuButton name="START" classes={firstBtnClasses} /> */}
        <StartPairsButton
          name={showOptions ? "PAIRS" : "START"}
          classes={firstBtnClasses}
          setClasses={setFirstBtnClasses}
        />
        <OptionButton
          setClasses={[setFirstBtnClasses, setSecBtnClasses, setThrdBtnClasses]}
          setShowOptions={setShowOptions}
          name={showOptions ? "BACK" : "OPTIONS"}
          classes={secondBtnClasses}
        />
        <AboutTimeButton
          name={showOptions ? "MEMORIZE" : "ABOUT"}
          classes={thirdBtnClasses}
          setClasses={[setFirstBtnClasses, setSecBtnClasses, setThrdBtnClasses]}
        />
      </div>
    </div>
  );
}
