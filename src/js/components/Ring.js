import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

export default function Ring(props) {
  function onTransitionEnd() {
    let info = ring.current.getBoundingClientRect();
    if (x === Math.floor(info.x) && y === Math.floor(info.y)) {
      props.setButtonClass(["expand-options"]);
    } else props.setCircleMovable(true);
  }

  function onMouseUp(e) {
    e.stopPropagation();

    console.log("inside ring mouseup");
    props.removeMouseUpListener();

    props.setOwnClasses([]);

    let circle = document.querySelector(".button-circle.active");
    let infoRing = ring.current.getBoundingClientRect();
    let diffX = infoRing.x - x;
    let diffY = infoRing.y - y;
    circle.style.left = props.circlePos.left + diffX + "px";
    circle.style.top = props.circlePos.top + diffY + "px";

    // TODO: need to set to redux configuration
    props.confirmOption(props.option);

    props.setCircleMovable(false);
    circle.classList.toggle("flash");
    props.setButtonClass(classes => [...classes, "disabled"]);
    // Add delay to ring transition for flash animation to finish.
    props.setOwnClasses(["delay"]);
    // Remove the onMouseMove listener so circle cannot move on mousemove.
    props.setCircleMovable(false);
    setTimeout(() => {
      // Remove the "ring-expand" class.
      props.setOwnClasses([]);
      // Remove inline style for position so circle can transition back to original position.
      circle.style.left = null;
      circle.style.top = null;
      // Remove the "active" class from circle so it can transition back to original position.
      props.setCircleClasses([]);
      props.setButtonClass(classes =>
        classes.filter(
          cls => cls == "expand-options" || cls == "expand-complete"
        )
      );
    }, 750);
  }

  const ring = useRef(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    let info = ring.current.getBoundingClientRect();
    setX(Math.floor(info.x));
    setY(Math.floor(info.y));

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

  return (
    <div
      ref={ring}
      onMouseUp={onMouseUp}
      onTransitionEnd={onTransitionEnd}
      className={
        "ring" +
        ` mem-ring-${props.id}` +
        (props.flipped ? " flipped" : "") +
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
