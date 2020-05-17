import React, { useState } from "react";
import MenuButton from "./MenuButton";
import OptionButton from "./OptionButton";
import AboutTimeButton from "./AboutTimeButton";

export default function Dashboard() {
  const [firstBtnClasses, setFirstBtnClasses] = useState([]);
  const [secondBtnClasses, setSecBtnClasses] = useState([]);
  const [thirdBtnClasses, setThrdBtnClasses] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  function closeAbout() {
    // Removed class "disabled"
    setFirstBtnClasses([]);
    setSecBtnClasses([]);
    // Add class for modal retraction animation
    setThrdBtnClasses(["modal-retract"]);
    setTimeout(() => {
      setThrdBtnClasses([]);
    }, 1500);

    let about = document.getElementById("about");
    about.classList.toggle("visible");
  }

  return (
    <>
      <div id="about">
        <div onClick={closeAbout} className="close-button"></div>
        <p>Thank you for trying my game!</p>
      </div>
      <div className="dashboard">
        <MenuButton name="START" classes={firstBtnClasses} />
        <OptionButton
          setClasses={[setFirstBtnClasses, setSecBtnClasses, setThrdBtnClasses]}
          setShowOptions={setShowOptions}
          name={showOptions ? "BACK" : "OPTIONS"}
          classes={secondBtnClasses}
        />
        <AboutTimeButton
          setClasses={[setFirstBtnClasses, setSecBtnClasses, setThrdBtnClasses]}
          name={showOptions ? "MEMORIZE" : "ABOUT"}
          classes={thirdBtnClasses}
        />
      </div>
    </>
  );
}
