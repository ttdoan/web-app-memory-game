import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import MenuButton from "./MenuButton";
import Ring from "./Ring";

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
  // Object that contains the following properties:
  //  left   - Value of property "left"
  //  top    - Value of property "top"
  //  x      - X-coordinate of the circle when button has rolled up
  //  y      - Y-coordinate of the circle when button has rolled up
  //  width  - Width of the circle
  //  height - Height of the circle
  //
  // This is used to calculate the position of circle for mouse
  // movement and option selection in Ring class.
  const [circlePos, setCirclePos] = useState();
  const [posAlreadySet, setPosAlreadySet] = useState(false);
  const [ringClasses, setRingClasses] = useState([]);
  const [prevWidth, setPrevWidth] = useState(0);

  function onMouseDown() {
    console.log("ON MOUSE DOWN");
    if (props.optionSelect) {
      props.setOwnClasses(["expand-options", "active"]);
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
    props.setOwnClasses(classes =>
      classes.filter(cls => cls == "expand-options" || cls == "expand-complete")
    );
  }

  function onTransitionEnd() {
    if (props.optionSelect) {
      let currWidth = Math.floor(self.current.getBoundingClientRect().width);
      // One onTransitionEnd event is fired for every property. We only care when
      // the width of the button changes.
      if (prevWidth != currWidth) {
        if (currWidth === btnWidth) {
          props.setOwnClasses(["expand-options", "active", "expand-complete"]);
          // Add "ring-expand" class for ring transition animation.
          setRingClasses(["ring-expand"]);
          if (!posAlreadySet) {
            setPosAlreadySet(true);
            setCirclePos(pos => {
              let info = circleRef.getBoundingClientRect();
              return {
                ...pos,
                x: info.x,
                y: info.y,
                width: info.width,
                height: info.height
              };
            });
          }
        } else props.setOwnClasses(["expand-options"]);
      }
      setPrevWidth(currWidth);
    }
  }

  function onMouseMove(e) {
    if (circleMovable) {
      let diffX = circlePos.x - e.clientX;
      let diffY = circlePos.y - e.clientY;
      circleRef.style.left =
        circlePos.left - diffX - circlePos.width / 2 + "px";
      circleRef.style.top = circlePos.top - diffY - circlePos.height / 2 + "px";
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

  // console.log("rendering selectoptions button");
  return (
    <div ref={self} className="button-container">
      <MenuButton
        circleMovable={circleMovable}
        name={props.name}
        onClick={props.onClick}
        onMouseDown={onMouseDown}
        onTransitionEnd={onTransitionEnd}
        classes={props.classes}
        setCircle={setCircleRef}
        circleClasses={circleClasses}
      />
      {props.optionList.map((time, idx) => {
        let deg = (360 / props.optionList.length) * idx;
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
            setButtonClass={props.setOwnClasses}
            removeMouseUpListener={removeMouseUpListener}
          />
        );
      })}
    </div>
  );
}

SelectOptionsButton.propTypes = {
  optionList: PropTypes.array.isRequired,
  confirmOption: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  setOwnClasses: PropTypes.func.isRequired,
  optionSelect: PropTypes.bool.isRequired
};
