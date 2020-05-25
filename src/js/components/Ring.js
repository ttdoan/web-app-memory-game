import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

export default function Ring(props) {
  function onTransitionEnd() {
    let info = ring.current.getBoundingClientRect();
    if (x === Math.floor(info.x) && y === Math.floor(info.y)) {
      props.setButtonClass(["expand-options"]);
      console.log("setting circle to false");
      props.setCircleMovable(false);
    } else props.setCircleMovable(true);
  }

  function onMouseUp(e) {
    e.stopPropagation();

    console.log("inside ring mouseup");
    props.removeMouseUpListener();

    props.setOwnClasses([]);

    let circle = document.querySelector(".button-circle.active");
    let info = ring.current.getBoundingClientRect();
    // circle.style.left = info.x + "px";
    // circle.style.top = info.y + "px";

    circle.classList.toggle("flash");
    console.log(circle);
    // circle.className += "flash";
    // props.setButtonClass(classes => [...classes, "delay", "disabled"]);
    props.setButtonClass(classes => [...classes, "disabled"]);
    props.setOwnClasses(["delay"]);
    props.setCircleMovable(false);
    setTimeout(() => {
      props.setOwnClasses([]);
      // circle.classList.toggle("flash");
      // props.setButtonClass(classes => classes.filter(cls => cls != "active"));
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
    // style.sheet
    //   .insertRule(`.expand-options.expand-complete.delay ~ .mem-ring-${props.id} {
    //   transition: transform 750ms ease 750ms;
    // }`);
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
        (props.ownClasses.length != 0 ? " " + props.ownClasses.join(" ") : "")
      }
    >
      {props.option}
    </div>
  );
}

Ring.propTypes = {
  deg: PropTypes.number.isRequired,
  option: PropTypes.number.isRequired
};
