import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

// TODO: for some reason, onMouseMove changed... so need to store
// original image of function to remove event listener correctly...
// Need to find out why...
let func = null;

export default function MenuButton(props) {
  const circle = useRef(null);

  function onClick() {
    props.onClick(["roll", "disable"]);
  }

  useEffect(() => {
    props.setCircle(circle.current);
  }, []);

  return (
    <div
      className={
        "menu-button" +
        (props.flipped ? " flipped" : "") +
        (props.classes ? " " + props.classes.join(" ") : "")
      }
      role="button"
      onClick={onClick}
      onKeyDown={onclick}
      onMouseDown={props.onMouseDown}
      onAnimationEnd={props.onAnimationEnd}
      onTransitionEnd={props.onTransitionEnd}
    >
      <div
        ref={circle}
        className={
          "button-circle" +
          (props.circleClasses.length != 0
            ? " " + props.circleClasses.join(" ")
            : "")
        }
      ></div>
      <span>{props.name}</span>
    </div>
  );
}

MenuButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  circleClasses: PropTypes.array,
  setCircle: PropTypes.func
};

MenuButton.defaultProps = {
  circleMovable: false,
  circleClasses: [],
  setCircle: () => {}
};
