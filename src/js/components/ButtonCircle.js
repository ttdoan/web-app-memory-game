import React, { useRef, useEffect } from "react";

export default function ButtonCircle(props) {
  const self = useRef(null);

  useEffect(() => {
    props.setCircle(self.current);
  }, []);

  return (
    <div
      ref={self}
      className={
        "button-circle" +
        (props.classes.length != 0 ? " " + props.classes.join(" ") : "")
      }
    ></div>
  );
}
