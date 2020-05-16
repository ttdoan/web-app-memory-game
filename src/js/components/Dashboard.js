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
    // let ele = document.querySelector(".modal-overlay");
    // ele.classList.add("modal-retract");
    // ele.classList.remove("modal-overlay");
    setThrdBtnClasses(["modal-retract"]);
    // setTimeout(() => {
    //   // ele.classList.remove("modal-retract");
    //   setThrdBtnClasses(["modal-retract"]);
    // }, 750);

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
        <div className="button-container">
          <AboutTimeButton
            setClass={setThrdBtnClasses}
            name={showOptions ? "MEMORIZE TIME" : "ABOUT"}
            classes={thirdBtnClasses}
          />
        </div>
      </div>
    </>
  );
}
