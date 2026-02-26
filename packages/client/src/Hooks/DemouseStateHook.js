import React, { useState } from "react";

export default function DemouseStateHook(props) {
  let [like, setLike] = useState({
    like: 0,
  });
  return (
    <div className="container">
      <h3 className="text-success text-center mt-3">useState Hook</h3>
      <div
        className="card text-white bg-dark bg-gradient"
        style={{ width: "250px", height: "500px" }}
      >
        <img
          className="card-img-top"
          src="https://picsum.photos/200/300"
          alt="Title"
        />
        <div className="card-body">
          <h5 className="card-title">
            Số lượt thả tim: {like.like}{" "}
            <i className="fa fa-heart text-danger"></i>
          </h5>
          <button
            className="btn btn-info"
            onClick={() => {
              setLike({
                like: like.like + 1,
              });
            }}
          >
            <i className="fa fa-heart text-danger"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
