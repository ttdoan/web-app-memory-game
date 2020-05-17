import React, { useEffect, useState, useRef } from "react";
import MenuButton from "./MenuButton";
import Ring from "./Ring";

let memorizeTime = [5, 10, 15];

export default function AboutTimeButton(props) {
  const self = useRef(null);

  function handleClick() {
    switch (props.name) {
      case "ABOUT":
        props.setClasses.forEach((setClass, idx) => {
          if (idx == 2) setClass(["disabled", "modal-overlay"]);
          else setClass(["disabled"]);
        });
        revealAbout();
        break;

      case "MEMORIZE":
        props.setClasses[2](["memorize"]);
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

  useEffect(() => {
    self.current.addEventListener("mousedown", () => {
      console.log("down");
    });

    self.current.addEventListener("mouseup", () => {
      console.log("up");
    });
  }, []);

  console.log("rendering about/memorize button");
  return (
    <div ref={self} className="button-container">
      <MenuButton
        name={props.name}
        handleClick={handleClick}
        classes={props.classes}
      />
      {memorizeTime.map((time, idx) => {
        let deg = (360 / memorizeTime.length) * idx;
        return <Ring key={time} option={time} deg={deg} />;
      })}
    </div>
  );
}
