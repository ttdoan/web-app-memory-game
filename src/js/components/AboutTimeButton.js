import React, { useEffect, useState, useRef } from "react";
import MenuButton from "./MenuButton";
import Ring from "./Ring";

let memorizeTime = [5, 10, 15];
let func = null;
const btnWidth = Math.floor(
  Math.max(document.documentElement.clientHeight, window.innerHeight || 0) *
    0.08
);

export default function AboutTimeButton(props) {
  const self = useRef(null);
  const [circleMovable, setCircleMovable] = useState(false);
  const [ringClasses, setRingClasses] = useState([]);
  const [prevWidth, setPrevWidth] = useState(0);

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
    console.log("ON MOUSE DOWN");
    if (props.name == "MEMORIZE") {
      props.setClasses[2](["expand-options", "active"]);
      console.log("ADDING MOUSEUP EVENT ON WINDOW...");
      window.addEventListener("mouseup", onMouseUp);
      func = onMouseUp;
    }
  }

  function removeMouseUpListener() {
    console.log("ATTEMPTING TO REMOVE MOUSEUP LISTENER...");
    if (func === onMouseUp) console.log("THEY ARE EQUAL");
    else console.log("THEY ARE NOT EQUAL");
    window.removeEventListener("mouseup", func);
  }

  function onMouseUp() {
    console.log("inside abouttime button mouseup");
    window.removeEventListener("mouseup", onMouseUp);
    setCircleMovable(false);
    setRingClasses([]);
    props.setClasses[2](classes =>
      classes.filter(cls => cls == "expand-options" || cls == "expand-complete")
    );
  }

  function onTransitionEnd() {
    if (props.name == "MEMORIZE") {
      let currWidth = Math.floor(self.current.getBoundingClientRect().width);
      // One onTransitionEnd event is fired for every property. We only care when
      // the width of the button changes.
      if (prevWidth != currWidth) {
        if (currWidth === btnWidth) {
          props.setClasses[2](["expand-options", "active", "expand-complete"]);
          setRingClasses(["ring-expand"]);
        } else props.setClasses[2](["expand-options"]);
      }
      setPrevWidth(currWidth);
    }
  }

  useEffect(() => {
    self.current.addEventListener("drop-circle", () => {
      console.log("I GOT THE EVENT");
    });
  }, []);

  // console.log("rendering about/memorize button");
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
            ownClasses={ringClasses}
            setOwnClasses={setRingClasses}
            setClasses={setRingClasses}
            circleMovable={circleMovable}
            setCircleMovable={setCircleMovable}
            setButtonClass={props.setClasses[2]}
            removeMouseUpListener={removeMouseUpListener}
          />
        );
      })}
    </div>
  );
}
