import React, { useState, useCallback } from "react";
import ChilduseCallbackHook from "./ChilduseCallbackHook";
export default function DemouseCallBackHook(props) {
  let [like, setLike] = useState(1);
  const renderNotifycation = () => {
    return `Bạn đã thả ${like} ♥️!`;
  }

  const callBackRenderNotifycation = useCallback(renderNotifycation, [like]);
  return (
    <div className="container mt-5">
      Like: {like} <i className="fa fa-heart text-danger"></i>
      <br />
      <small>{renderNotifycation()}</small>
      <br />
      <button
        className="btn btn-success"
        onClick={() => {
          setLike(like + 1);
        }}
      >
        <i className="fa fa-heart text-danger"></i>
      </button>
      <br />
      <ChilduseCallbackHook renderNotifycation={callBackRenderNotifycation}/>
    </div>
  );
}
