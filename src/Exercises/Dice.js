import React, { Fragment } from "react";

export default function Dice(props) {
  const { diceItem } = props;
  return (
    <Fragment>
      <div className="scene">
        <div className="cube">
          <img
            src={diceItem.img}
            alt={diceItem.id}
            className="cube__face front"
          />

          <img
            src="./gameBauCua/bau.png"
            alt="item__game"
            className="cube__face back"
          />

          <img
            src="./gameBauCua/ga.png"
            alt="item__game"
            className="cube__face left"
          />

          <img
            src="./gameBauCua/ca.png"
            alt="item__game"
            className="cube__face right"
          />

          <img
            src="./gameBauCua/tom.png"
            alt="item__game"
            className="cube__face top"
          />

          <img
            src="./gameBauCua/nai.png"
            alt="item__game"
            className="cube__face bottom"
          />
        </div>
      </div>
    </Fragment>
  );
}
