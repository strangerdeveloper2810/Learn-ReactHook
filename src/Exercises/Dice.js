import React, { Fragment } from "react";

export default function Dice(props) {
  const { diceItem } = props;
  return (
    <Fragment>
      <div className="scene">
        <div className="cube">
          <img
            className="ml-3 cube__face front"
            style={{ width: 50 }}
            src={diceItem.hinhAnh}
            alt={diceItem.id}
          />
          <img
            className="ml-3 cube__face back"
            style={{ width: 50 }}
            src="./gameBauCua/bau.png"
            alt="bau"
          />
          <img
            className="ml-3 cube__face left"
            style={{ width: 50 }}
            src="./gameBauCua/ga.png"
            alt="ga"
          />
          <img
            className="ml-3 cube__face right"
            style={{ width: 50 }}
            src="./gameBauCua/ca.png"
            alt="ca"
          />
          <img
            className="ml-3 cube__face front"
            style={{ width: 50 }}
            src="./gameBauCua/tom.png"
            alt="tom"
          />
          <img
            className="ml-3 cube__face front"
            style={{ width: 50 }}
            src="./gameBauCua/nai.png"
            alt="nai"
          />
          <img
            className="ml-3 cube__face front"
            style={{ width: 50 }}
            src="./gameBauCua/cua.png"
            alt="cua"
          />
        </div>
      </div>
    </Fragment>
  );
}
