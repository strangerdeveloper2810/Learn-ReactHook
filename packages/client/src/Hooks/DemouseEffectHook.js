import React, { useState, useEffect } from "react";
// import ChilduseEffectHook from "./ChilduseEffectHook";

export default function DemouseEffectHook() {
  let [number, setNumber] = useState(1);
  let [like, setLike] = useState(1);

  //   useEffect là hàm chạy sau khi giao diện render, thay cho didMount và didUpdate trong mọi trường hợp

  // Cách viết thay thế cho component didMount
  useEffect(() => {
    console.log("didMount");
  }, []);

  //   Cách viết thay thế cho component didUpdate
//   useEffect(() => {
//     console.log("didUpdate khi number và like thay đổi");
//   }, [number]); // number là giá trị nếu bị thay đổi sau render thì useEffect này sẽ chạy

  //   Cách viết thay thế cho didUpdate và willunmount

  useEffect(() => {
    console.log("didUpdate khi number và like thay đổi");
    return () => {
      console.log("willUnmount");
    };
  }, [number, like]);

  console.log("render");
  return (
    <div className="container">
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
            Số lượt thả tim: {number}
            <i className="fa fa-heart text-danger"></i>
          </h5>
        </div>
      </div>
      <button
        className="btn btn-success"
        onClick={() => {
          setNumber(number + 1);
        }}
      >
        +
      </button>

      <hr />

      <button
        className="btn btn-danger"
        onClick={() => {
          setLike(like + 1);
        }}
      >
        X
      </button>
      {/* {like === 1 ? <ChilduseEffectHook /> : "   "} */}
    </div>
  );
}
