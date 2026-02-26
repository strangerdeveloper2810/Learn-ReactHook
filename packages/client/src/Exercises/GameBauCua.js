import React from "react";
import GameScore from "./GameScore";
import ListDice from "./ListDice";
import ListItemGame from "./ListItemGame";
import "./assets/CSS/ExGame.css";


export default function GameBauCua(props) {
  return (
    <div className="container-fluid" id="exGame">
      <GameScore />
      <div className="row">
        <div className="col-8">
          <ListItemGame />
        </div>

        <div className="col-4">
          <ListDice />
        </div>
      </div>
     
    </div>
  );
}
