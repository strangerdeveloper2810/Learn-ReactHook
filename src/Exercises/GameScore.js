import React from "react";

export default function GameScore(props) {
  return (
    <div>
      <h3 className="text-center text-success display-4">
        GAME BẦU CUA CYBERLEARN
      </h3>

      <div className="text-center mt-5">
        <span className="p-3 text-white bg-danger fs-5 rounded-3">
          Tiền thưởng : <span className="text-warning">100$</span>
        </span>
      </div>

      <div className="text-center mt-5">
        <span className="p-3 text-white bg-success fs-5 rounded-3">
          Chơi lại
        </span>
      </div>
    </div>
  );
}
