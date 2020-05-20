import React, { useState } from "react";
import MenuButton from "./MenuButton";

export default function OptionButton(props) {
  function onClick() {
    props.setClasses.forEach(setClass => setClass(["full-roll", "disabled"]));
    setTimeout(() => {
      props.setShowOptions(flag => ~flag);
    }, 750);
    setTimeout(() => {
      props.setClasses.forEach(setClass => setClass([]));
    }, 1500);
  }

  console.log("rendering option button");
  return (
    <MenuButton name={props.name} onClick={onClick} classes={props.classes} />
  );
}
