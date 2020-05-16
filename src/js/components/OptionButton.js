import React, { useState } from "react";
import MenuButton from "./MenuButton";

export default function OptionButton(props) {
  function handleClick() {
    props.setClasses.forEach(setClass => setClass(["full-roll", "disabled"]));
    setTimeout(() => {
      props.setShowOptions(flag => ~flag);
    }, 750);
    setTimeout(() => {
      // props.setClasses([]);
      props.setClasses.forEach(setClass => setClass([]));
    }, 1500);
  }

  return (
    <MenuButton
      name={props.name}
      handleClick={handleClick}
      classes={props.classes}
    />
  );
}
