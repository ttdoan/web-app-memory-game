import React, { useState } from "react";
import MenuButton from "./MenuButton";

export default function AboutTimeButton(props) {
  // const [classes, setClasses] = useState([]);

  function handleClick() {
    switch (props.name) {
      case "ABOUT":
        console.log("PRESSING ABOUT");
        // setClasses(["modal-overlay"]);
        props.setClass(["modal-overlay"]);
        revealAbout();
        break;

      case "MEMORIZE TIME":
        break;

      default:
        throw `Invalid button name: ${props.name}`;
    }
  }

  function revealAbout() {
    setTimeout(() => {
      document.getElementById("about").classList.toggle("visible");
    }, 1200);
  }

  return (
    <MenuButton
      name={props.name}
      handleClick={handleClick}
      // classes={[...props.classes, ...classes]}
      classes={props.classes}
    />
  );
}
