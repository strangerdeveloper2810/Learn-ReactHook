import React, { useState, useMemo } from "react";
import ChilduseMemoHook from "./ChilduseMemoHook";

export default function DemouseMemoHook(props) {
  let [like, setLike] = useState(1);

  //   Khá giống với useCallback, useCallback là truyền 1 hàm và return hàm đó(thay đổi hay không thay đổi là tùy thuộc vào bạn truyền tham số thứ 2 hay không.), còn useMemo là truyền 1 giá trị và return về giá trị đó (thay đổi hay không thay đổi là tùy thuộc vào bạn truyền tham số thứ 2 hay không.) Tham số thứ 2 ở đây có thể là state của component đó

  // Cách 1
  //   let cart = [
  //     { id: 1, name: "Iphone", price: 1000 },
  //     { id: 2, name: "HTC Phone", price: 2000 },
  //     { id: 3, name: "LG Phone", price: 3000 },
  //   ];
  //   const cartMemo = useMemo(()=> cart, []);

  //   Cách 2
  const renderCart = () => {
    let cart = [
      { id: 1, name: "Iphone", price: 1000 },
      { id: 2, name: "HTC Phone", price: 2000 },
      { id: 3, name: "LG Phone", price: 3000 },
    ];
    return cart;
  };
  const cartMemo = useMemo(renderCart, []);
  return (
    <div className="container mt-5">
      like: {like} <i className="fa fa-heart text-danger"></i>
      <br />
      <br />
      <button
        className="btn btn-info"
        onClick={() => {
          setLike(like + 1);
        }}
      >
        <i className="fa fa-heart text-danger"></i>
      </button>
      <br />
      <br />
      <ChilduseMemoHook cart={cartMemo} />
    </div>
  );
}
