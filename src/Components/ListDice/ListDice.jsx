import React from "react";
import Dice from "./Dice";
import { useSelector, useDispatch } from "react-redux";
import { playgameAction } from "../../redux/actions/BauCuaActions";

export default function ListDice(props) {
  let arrDice = useSelector((state) => state.BauCuaReducer.arrDice);
  const dispatch = useDispatch();

  const handlePlayGame = () => {
    dispatch(playgameAction());
  };

  const handlePlayMusic = () => {
    let audio = new Audio("./media/2.mp3");
    audio.play();
  };
  return (
    <div className="mt-5 ms-5">
      <div
        className="bg-white"
        style={{ width: 300, height: 300, borderRadius: 150, paddingLeft: 10 }}
      >
        <div className="row">
          <div className="col-12 text-center" style={{ marginLeft: 120 }}>
            <Dice diceItem={arrDice[0]} />
          </div>
        </div>

        <div className="row">
          <div
            className="col-4 text-end"
            style={{ marginTop: -20, marginLeft: 70 }}
          >
            <Dice diceItem={arrDice[1]} />
          </div>

          <div className="col-4 text-end" style={{ marginTop: -20 }}>
            <Dice diceItem={arrDice[2]} />
          </div>
        </div>
      </div>
      <div style={{ marginLeft: "10%", marginTop: "10%" }}>
        <button
          className="btn btn-success rounded-3 fs-4 me-3"
          onClick={() => {
            handlePlayGame();
          }}
        >
          Xốc
        </button>

        <button
          className="btn btn-secondary rounded-3 fs-4"
          onClick={() => {
            handlePlayMusic();
          }}
        >
          Play Music
        </button>
      </div>
    </div>
  );
}
