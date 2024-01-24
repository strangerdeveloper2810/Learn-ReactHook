import React from "react";
import "../../assets/CSS/ExGame.css";
import GameScore from "../../Components/GameScore";
import ListItemGame from "../../Components/ListItemGame";
import ListDice from "../../Components/ListDice";
const Home = () => {
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
};

export default Home;
