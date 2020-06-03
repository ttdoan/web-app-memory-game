import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useEventListener } from "./../utily-functions";

export default function Ring(props) {
  function onTransitionEnd() {
    if (!props.flipped) {
      console.log("on ring transition end");
      // On rare occasions, getBoundingClientRect() returns coordinates of the
      // ring that are off by a small amount, causing setCircleMovable(true),
      // which causes the event listener mousemove to be added.
      let errTolerance = 0.014;
      let info = ring.current.getBoundingClientRect();
      if (
        Math.abs(x - info.x) < errTolerance &&
        Math.abs(y - info.y) < errTolerance
      )
        // TODO: Do i need disabled here...? Setting disabled here will cause user not
        // be able to touch menu button once rings come back to original position
        // props.setButtonClass(["expand-options", "disabled"]);
        props.setButtonClass(["expand-options"]);
      else props.setCircleMovable(true);
    }
  }

  function onMouseUp(e) {
    if (props.circleMovable) {
      // Stop event bubbling so listener on window won't execute.
      e.stopPropagation();

      console.log("inside ring mouseup");
      // Remove the mouseup event listener from window.
      props.removeMouseUpListener();

      let circle = document.querySelector(".button-circle.active");
      let infoRing = ring.current.getBoundingClientRect();
      let diffX = infoRing.x - x;
      let diffY = infoRing.y - y;
      circle.style.left = props.circlePos.left + diffX + "px";
      circle.style.top = props.circlePos.top + diffY + "px";

      // Set redux configuration
      props.confirmOption(props.option);

      props.setCircleMovable(false);
      circle.classList.toggle("flash");
      props.setButtonClass(classes => [...classes, "disabled"]);
      // Add delay to ring transition for flash animation to finish.
      props.setOwnClasses(["delay"]);
      // Remove the onMouseMove listener so circle cannot move on mousemove.
      props.setCircleMovable(false);

      // Add a timeout to wait for flash animation for option selection to finish.
      setTimeout(() => {
        // Remove the "ring-expand" class so the rings will transition back to original position.
        props.setOwnClasses([]);
        // Remove inline style for position so circle can transition back to original position.
        circle.style.left = null;
        circle.style.top = null;
        // Remove the "active" class from circle so it can transition back to original position.
        props.setCircleClasses([]);
        props.setButtonClass(classes =>
          classes.filter(
            cls =>
              cls == "expand-options" ||
              cls == "expand-complete" ||
              cls == "disabled"
          )
        );
      }, 750);
    }
  }

  function onTouchEnd(e) {
    console.log("calling touchend on ring");
    if (props.circleMovable) {
      e.preventDefault();

      onMouseUp(e);
    }
  }

  const ring = useRef(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    let info = ring.current.getBoundingClientRect();
    setX(info.x);
    setY(info.y);

    let style = document.getElementById("mem-ring-ss");
    // Dynamically add classes to ring for animation based on its degree.
    style.sheet
      .insertRule(`.expand-options.expand-complete ~ .ring-expand.mem-ring-${props.id} {
      transform: rotate(${props.deg}deg) translate(0, -9vh) rotate(-${props.deg}deg) rotate(360deg)
    }`);
    style.sheet
      .insertRule(`.expand-options.expand-complete ~ .mem-ring-${props.id}.delay {
      transition: transform 750ms ease 750ms;
    }`);
  }, []);

  useEventListener("mouseup", onMouseUp, ring.current);
  useEventListener("touchend", onTouchEnd, ring.current);

  return (
    <div
      ref={ring}
      // onMouseUp={onMouseUp}
      onTransitionEnd={onTransitionEnd}
      className={
        "ring" +
        ` mem-ring-${props.id}` +
        (props.flipped ? " flipped disabled" : "") +
        (props.ownClasses.length != 0 ? " " + props.ownClasses.join(" ") : "")
      }
    >
      {props.option}
    </div>
  );
}

Ring.propTypes = {
  deg: PropTypes.number.isRequired,
  option: PropTypes.number.isRequired,
  confirmOption: PropTypes.func.isRequired
};
