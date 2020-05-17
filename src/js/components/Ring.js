import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

export default function Ring({ deg, option }) {
  //   const [x, setX] = useState(0);
  //   const [y, setY] = useState(0);
  const [animation, setAnimation] = useState(null);
  const ring = useRef(null);

  useEffect(() => {
    let vh = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    let dist = 0.08 * vh;

    let tmp = ring.current.animate(
      [
        { transform: `translate(0px, 0px)` },
        {
          transform: `rotate(${deg -
            90}deg) translate(${dist}px) rotate(${(deg - 90) * -1}deg)`
        }
      ],
      {
        fill: "forwards",
        duration: 750
      }
    );

    setAnimation(tmp);
    tmp.cancel();
  }, []);

  function click() {
    console.log(animation);
    animation.play();
  }

  return (
    <div ref={ring} onClick={click} className="ring">
      {option}
    </div>
  );
}

Ring.propTypes = {
  deg: PropTypes.number.isRequired,
  option: PropTypes.number.isRequired
};
