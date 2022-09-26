import React from "react";
import Dice from "./Dice";
import { useSelector, useDispatch } from "react-redux";
import { playgameAction } from "../redux/actions/BauCuaActions";

export default function ListDice(props) {
  let arrDice = useSelector((state) => state.BauCuaReducer.arrDice);
  const dispatch = useDispatch();

  const handlePlayGame = () => {
    dispatch(playgameAction());
  };
  return (
    <div className="mt-5 ms-5">
      <div
        className="bg-white"
        style={{ width: 300, height: 300, borderRadius: 150, paddingLeft: 10 }}
      >
        <div className="row">
          <div className="col-12 text-center" style={{ marginLeft: 88 }}>
            <Dice diceItem={arrDice[0]} />
          </div>
        </div>

        <div className="row" style={{ marginTop: -20, marginLeft: 10 }}>
          <div className="col-4 text-end">
            <Dice diceItem={arrDice[1]} />
          </div>

          <div className="col-4 text-end">
            <Dice diceItem={arrDice[2]} />
          </div>
        </div>
      </div>
      <div style={{ marginLeft: "26%", marginTop: "10%" }}>
        <button
          className="btn btn-success rounded-3 fs-4"
          onClick={() => {
            handlePlayGame();
          }}
        >
          Xốc
        </button>
      </div>
    </div>
  );
}
