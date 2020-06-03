import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import ButtonCircle from "./ButtonCircle";
import { useEventListener } from "./../utily-functions";

export default function MenuButton(props) {
  const self = useRef(null);

  function onClick() {
    props.onClick(["roll", "disable"]);
  }

  useEventListener("mousedown", props.onMouseDown, self.current);
  useEventListener("touchstart", props.onTouchStart, self.current);

  return (
    <div
      ref={self}
      className={
        "menu-button" +
        (props.flipped ? " flipped disabled" : "") +
        (props.classes.length != 0 ? " " + props.classes.join(" ") : "")
      }
      role="button"
      onClick={onClick}
      onKeyDown={onclick}
      // onMouseDown={props.onMouseDown}
      // onTouchStart={props.onTouchStart}
      onAnimationEnd={props.onAnimationEnd}
      onTransitionEnd={props.onTransitionEnd}
    >
      <ButtonCircle classes={props.circleClasses} setCircle={props.setCircle} />
      <span>{props.name}</span>
    </div>
  );
}

MenuButton.propTypes = {
  circleClasses: PropTypes.array,
  setCircle: PropTypes.func
};

MenuButton.defaultProps = {
  circleMovable: false,
  circleClasses: [],
  setCircle: () => {}
};
