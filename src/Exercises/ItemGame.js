import React from "react";
import { useDispatch } from "react-redux";
import { betScoreActions } from "../redux/actions/BauCuaActions";

export default function ItemGame(props) {
  const { item } = props;
  const dispatch = useDispatch();
  return (
    <div className="mt-3 ms-3">
      <img src={item.img} alt={item.ma} className="w-75" />

      <div className="bg-success mt-2 pb-2 text-center rounded-3 w-75">
        <button
          className="btn btn-danger me-3"
          onClick={() => {
            dispatch(betScoreActions(item, 1));
          }}
        >
          <i className="fa fa-plus"></i>
        </button>
        <span className="mt-2 text-warning fs-3">{item.scoreBet}</span>
        <button
          className="btn btn-danger ms-3"
          onClick={() => {
            dispatch(betScoreActions(item, -1));
          }}
        >
          -
        </button>
      </div>
    </div>
  );
}
