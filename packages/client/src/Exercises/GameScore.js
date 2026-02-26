import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { playagainAction } from "../redux/actions/BauCuaActions";
import { useSpring, animated } from "@react-spring/web";
export default function GameScore(props) {
  let totalScore = useSelector((state) => state.BauCuaReducer.totalScore);
  const dispatch = useDispatch();
  const styles = useSpring({
    loop: true,
    to: [
      { opacity: 1, color: "#5771D7" },
      { opacity: 0, color: "rgb(22,201,208)" },
    ],
    from: { opacity: 0, color: "red" },
  });
  const handlePlayAgain = () => {
    dispatch(playagainAction());
  };
  return (
    <div>
      <animated.h3 className="text-center display-4" style={styles}>
        GAME BẦU CUA CYBERLEARN
      </animated.h3>

      <div className="text-center mt-5">
        <span className="p-3 text-white bg-danger fs-5 rounded-3">
          Tiền thưởng :{" "}
          <span className="text-warning">{totalScore.toLocaleString()}$</span>
        </span>
      </div>

      <div className="text-center mt-5">
        <button
          className="btn btn-success p-3 text-white fs-5 rounded-3"
          onClick={() => {
            handlePlayAgain();
          }}
        >
          Chơi lại
        </button>
      </div>
    </div>
  );
}
