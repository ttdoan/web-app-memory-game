import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

export default function Ring(props) {
  const ring = useRef(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    let info = ring.current.getBoundingClientRect();
    setX(Math.floor(info.x));
    setY(Math.floor(info.y));

    let style = document.getElementById("mem-ring-ss");
    style.sheet
      .insertRule(`.expand-options.expand-complete:active ~ .mem-ring-${props.id} {
      transform: rotate(${props.deg}deg) translate(0, -9vh) rotate(-${props.deg}deg) rotate(360deg)
    }`);
  }, []);

  function onTransitionEnd() {
    let info = ring.current.getBoundingClientRect();
    if (x === Math.floor(info.x) && y === Math.floor(info.y))
      props.setParentClass(["expand-options"]);
  }

  return (
    <div
      ref={ring}
      onTransitionEnd={onTransitionEnd}
      className={"ring" + ` mem-ring-${props.id}`}
    >
      {props.option}
    </div>
  );
}

Ring.propTypes = {
  deg: PropTypes.number.isRequired,
  option: PropTypes.number.isRequired
};
