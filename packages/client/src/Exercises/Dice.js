import { animated, useSpring } from "@react-spring/web";
import React, { Fragment } from "react";
export default function Dice(props) {
  const { diceItem } = props;

  const [propsDice, setSpring] = useSpring(() => ({
    from: {
      xyz: [0, 0, 0],
    },
    to: {
      xyz: [1800, 1800, 1800],
    },

    config: {
      duration: 5000,
    },
    reset: true,
  }));
  setSpring({ xyz: [360, 360, 360] });
  
  // setSpring.start();
  // setSpring.set({ xyz: [360, 360, 360] })

  

  return (
    <Fragment>
      <div className="scene ml-5">
        <animated.div
          className="cube"
          style={{
            transform: propsDice.xyz.to(
              (x, y, z) =>
                `translateZ(-12px) rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`
            ),
          }}
        >
          <div className="cube__face front">
            <img
              src={diceItem.img}
              style={{ width: "100%" }}
              alt={diceItem.id}
            />
          </div>
          <div className="cube__face back">
            <img
              src="./gameBauCua/cua.png"
              style={{ width: "100%" }}
              alt="dice"
            />
          </div>
          <div className="cube__face right">
            <img
              src="./gameBauCua/tom.png"
              style={{ width: "100%" }}
              alt="dice"
            />
          </div>
          <div className="cube__face left">
            <img
              src="./gameBauCua/ca.png"
              style={{ width: "100%" }}
              alt="dice"
            />
          </div>
          <div className="cube__face top">
            <img
              src="./gameBauCua/ga.png"
              style={{ width: "100%" }}
              alt="dice"
            />
          </div>
          <div className="cube__face bottom">
            <img
              src="./gameBauCua/nai.png"
              style={{ width: "100%" }}
              alt="dice"
            />
          </div>
        </animated.div>
      </div>
    </Fragment>
  );
}
