import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

// TODO: for some reason, onMouseMove changed... so need to store
// original image of function to remove event listener correctly...
// Need
let func = null;

export default function MenuButton(props) {
  function onClick() {
    props.onClick(["roll", "disable"]);
  }

  function onMouseMove(e) {
    if (props.circleMovable) {
      let info = circle.current.getBoundingClientRect();
      // console.log(`X: ${circle.current.getBoundingClientRect().x}`);
      // console.log(`CLIENTX: ${e.clientX}`);
      // console.log(`PAGEX: ${e.pageX}`);
      // console.log(`Y: ${circle.current.getBoundingClientRect().y}`);
      // console.log(`CLIENTY: ${e.clientY}`);
      // console.log(`PAGEY: ${e.pageY}`);

      // TODO: need to fix... When circle is able to move, then calculate difference between
      // current position of mouse and the circle and then keep the distance constant...
      // TODO: also need to add mouseup listener for when user releases mouse...
      circle.current.style.left = e.clientX - window.innerWidth / 2 + "px";
      circle.current.style.top =
        e.clientY - (window.innerHeight / 4) * 3 + "px";
    }
  }

  const circle = useRef(null);

  useEffect(() => {
    console.log();
    if (props.circleMovable) {
      console.log("ADDING EVENT LISTENER...");
      window.addEventListener("mousemove", onMouseMove);
      func = onMouseMove;
    } else {
      console.log("REMOVING EVENT LISTENER...");
      window.removeEventListener("mousemove", func);
      circle.current.style.left = null;
      circle.current.style.top = null;
    }
  }, [props.circleMovable]);

  return (
    <div
      className={
        "menu-button " + (props.classes ? props.classes.join(" ") : "")
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
        className={"button-circle" + (props.circleMovable ? " active" : "")}
      ></div>
      <span>{props.name}</span>
    </div>
  );
}

MenuButton.defaultProps = {
  circleMovable: false
};

MenuButton.propTypes = {
  handleClick: PropTypes.func.isRequired
};
