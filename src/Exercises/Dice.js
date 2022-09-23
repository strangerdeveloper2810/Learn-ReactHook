import React, { Fragment } from "react";

export default function Dice(props) {
  const {diceItem} = props;
  return (
    <Fragment>
      <img src={diceItem.img} alt={diceItem.ma} style={{ width: 50 }} className="ms-2  "/>
    </Fragment>
  );
}
