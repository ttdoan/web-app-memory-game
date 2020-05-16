import React, { useState } from "react";
import MenuButton from "./MenuButton";
import OptionButton from "./OptionButton";
import AboutTimeButton from "./AboutTimeButton";

export default function Dashboard() {
  const [classes, setClasses] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  return (
    <>
      <div id="about">
        <div className="close-button"></div>
        <p>Thank you for trying my game!</p>
      </div>
      <div className="dashboard">
        <MenuButton name="START" classes={classes} />
        <OptionButton
          setClasses={setClasses}
          setShowOptions={setShowOptions}
          name={showOptions ? "BACK" : "OPTIONS"}
          classes={classes}
        />
        <div className="button-container">
          <AboutTimeButton
            name={showOptions ? "MEMORIZE TIME" : "ABOUT"}
            classes={classes}
          />
        </div>
      </div>
    </>
  );
}
