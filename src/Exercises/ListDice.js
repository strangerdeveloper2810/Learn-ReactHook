import React from "react";
import Dice from "./Dice";
import { useSelector } from "react-redux";

export default function ListDice(props) {
  let arrDice = useSelector((state) => state.BauCuaReducer.arrDice);
  return (
    <div className="mt-5 ms-5">
      <div
        className="bg-white"
        style={{ width: 300, height: 300, borderRadius: 150 }}
      >
        <div className="row">
          <div className="col-12 text-center" style={{ marginTop: "75px" }}>
            <Dice diceItem={arrDice[0]} />
          </div>

          <div className="col-6 text-end mt-5">
            <Dice diceItem={arrDice[1]} />
          </div>

          <div className="col-6 mt-5">
            <Dice diceItem={arrDice[2]} />
          </div>
        </div>

        <button
          className="btn btn-info position-relative top-50 start-50 fs-1 rounded-4 text-white"
          style={{ marginLeft: "-40px", marginTop: "-45px" }}
        >
          Xốc
        </button>
      </div>
    </div>
  );
}
