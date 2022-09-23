import React from "react";
import {useSelector} from "react-redux";
export default function GameScore(props) {
  let totalScore = useSelector(state => state.BauCuaReducer.totalScore);
  return (
    <div>
      <h3 className="text-center text-success display-4">
        GAME BẦU CUA CYBERLEARN
      </h3>

      <div className="text-center mt-5">
        <span className="p-3 text-white bg-danger fs-5 rounded-3">
          Tiền thưởng : <span className="text-warning">{totalScore.toLocaleString()}$</span>
        </span>
      </div>

      <div className="text-center mt-5">
        <button className="btn btn-success p-3 text-white fs-5 rounded-3">
          Chơi lại
        </button>
      </div>
    </div>
  );
}
