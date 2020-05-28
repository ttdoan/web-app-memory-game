import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import MenuButton from "./MenuButton";
import Ring from "./Ring";

let memorizeTime = [5, 10, 15];

// TODO: for some reason, onMouseMove changed... so need to store
// original image of function to remove event listener correctly...
// Need to find out why...
let onMouseUpRef = null;
let onMouseMoveRef = null;
const btnWidth = Math.floor(
  Math.max(document.documentElement.clientHeight, window.innerHeight || 0) *
    0.08
);

export default function SelectOptionsButton(props) {
  const self = useRef(null);
  const [circleRef, setCircleRef] = useState(null);
  const [circleMovable, setCircleMovable] = useState(false);
  const [circleClasses, setCircleClasses] = useState([]);
  const [circlePos, setCirclePos] = useState();
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
      onMouseUpRef = onMouseUp;
    }
  }

  function removeMouseUpListener() {
    console.log("ATTEMPTING TO REMOVE MOUSEUP LISTENER...");
    if (onMouseUpRef === onMouseUp) console.log("THEY ARE EQUAL");
    else console.log("THEY ARE NOT EQUAL");
    window.removeEventListener("mouseup", onMouseUpRef);
  }

  function onMouseUp() {
    console.log("inside abouttime button mouseup");
    window.removeEventListener("mouseup", onMouseUp);
    setCircleMovable(false);
    setCircleClasses([]);
    setRingClasses([]);
    circleRef.style.left = null;
    circleRef.style.top = null;
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

  function onMouseMove(e) {
    if (circleMovable) {
      let info = circleRef.getBoundingClientRect();
      circleRef.style.left = e.clientX - window.innerWidth / 2 + "px";
      circleRef.style.top = e.clientY - (window.innerHeight / 4) * 3 + "px";
    }
  }

  useEffect(() => {
    console.log();
    if (circleMovable) {
      console.log("ADDING EVENT LISTENER...");
      window.addEventListener("mousemove", onMouseMove);
      setCircleClasses(["active"]);
      onMouseMoveRef = onMouseMove;
    } else {
      console.log("REMOVING EVENT LISTENER...");
      window.removeEventListener("mousemove", onMouseMoveRef);
    }
  }, [circleMovable]);

  useEffect(() => {
    if (circleRef) {
      console.log("SETTING CIRCLE POSITION");
      let info = window.getComputedStyle(circleRef);
      let pos = {};
      // Strip the "px" at the end of the property values.
      let val = info.getPropertyValue("left");
      val = Number(val.substring(0, val.length - 2));
      pos["left"] = val;
      val = info.getPropertyValue("top");
      val = Number(val.substring(0, val.length - 2));
      pos["top"] = val;
      setCirclePos(pos);
    }
  }, [circleRef]);

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
        setCircle={setCircleRef}
        circleClasses={circleClasses}
      />
      {memorizeTime.map((time, idx) => {
        let deg = (360 / memorizeTime.length) * idx;
        return (
          <Ring
            key={time}
            option={time}
            deg={deg}
            id={idx}
            confirmOption={props.confirmOption}
            ownClasses={ringClasses}
            setOwnClasses={setRingClasses}
            circleMovable={circleMovable}
            setCircleMovable={setCircleMovable}
            setCircleClasses={setCircleClasses}
            circlePos={circlePos}
            setButtonClass={props.setClasses[2]}
            removeMouseUpListener={removeMouseUpListener}
          />
        );
      })}
    </div>
  );
}

SelectOptionsButton.propTypes = {
  optionList: PropTypes.array.isRequired,
  confirmOption: PropTypes.func.isRequired
};
