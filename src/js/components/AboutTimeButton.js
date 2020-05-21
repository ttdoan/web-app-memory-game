import React, { useEffect, useState, useRef } from "react";
import MenuButton from "./MenuButton";
import Ring from "./Ring";

let memorizeTime = [5, 10, 15];

export default function AboutTimeButton(props) {
  const self = useRef(null);
  const [circleMovable, setCircleMovable] = useState(false);

  function onClick() {
    switch (props.name) {
      case "ABOUT":
        props.setClasses.forEach((setClass, idx) => {
          if (idx == 2) setClass(["disabled", "modal-overlay"]);
          else setClass(["disabled"]);
        });
        revealAbout();
        break;

      case "MEMORIZE":
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

  function onMouseDown() {
    if (props.name == "MEMORIZE") {
      props.setClasses[2](["expand-options"]);
    }
  }

  function onTransitionEnd() {
    if (props.name == "MEMORIZE") {
      let btnWidth = Math.floor(
        Math.max(
          document.documentElement.clientHeight,
          window.innerHeight || 0
        ) * 0.08
      );

      let info = self.current.getBoundingClientRect();
      if (Math.floor(info.width) === btnWidth)
        props.setClasses[2](["expand-options", "expand-complete"]);
      else props.setClasses[2](["expand-options"]);
    }
  }

  console.log("rendering about/memorize button");
  return (
    <div ref={self} className="button-container">
      <MenuButton
        circleMovable={circleMovable}
        name={props.name}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onTransitionEnd={onTransitionEnd}
        classes={props.classes}
      />
      {memorizeTime.map((time, idx) => {
        let deg = (360 / memorizeTime.length) * idx;
        return (
          <Ring
            key={time}
            option={time}
            deg={deg}
            id={idx}
            setCircleMovable={setCircleMovable}
            setParentClass={props.setClasses[2]}
          />
        );
      })}
    </div>
  );
}
