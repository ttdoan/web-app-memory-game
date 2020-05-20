import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

export default function MenuButton(props) {
  const self = useRef(null);

  function onClick() {
    props.onClick(["roll", "disable"]);
  }

  return (
    //   <button
    //     className={
    //       "menu-button " + (props.classes ? props.classes.join(" ") : "")
    //     }
    //     onClick={onClick}
    //   >
    //     {props.name}
    //   </button>
    // );
    <div
      ref={self}
      className={
        "menu-button " + (props.classes ? props.classes.join(" ") : "")
      }
      onClick={onClick}
      onMouseDown={props.onMouseDown}
      onAnimationEnd={props.onAnimationEnd}
      onTransitionEnd={props.onTransitionEnd}
    >
      <span>{props.name}</span>
    </div>
  );
}

MenuButton.propTypes = {
  handleClick: PropTypes.func.isRequired
};
