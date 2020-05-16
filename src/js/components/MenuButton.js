import React from "react";
import PropTypes from "prop-types";

export default function MenuButton(props) {
  function onClick() {
    props.handleClick(["roll", "disable"]);
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
      className={
        "menu-button " + (props.classes ? props.classes.join(" ") : "")
      }
      onClick={onClick}
    >
      <span>{props.name}</span>
    </div>
  );
}

MenuButton.propTypes = {
  handleClick: PropTypes.func.isRequired
};
