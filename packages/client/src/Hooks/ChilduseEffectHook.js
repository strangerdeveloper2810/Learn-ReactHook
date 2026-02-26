import React, {useState ,useEffect } from "react";

export default function ChilduseEffectHook() {
    let [like, setLike] = useState(1);
  useEffect(()=>{
    console.log("didUpdate Of ChilduseEffectHook");
    return ()=>{
        console.log("willUnmount of ChilduseEffectHook");
    }
  },[like]);
  
  console.log("render ChilduseEffectHooks");
  return (
    <div
      className="card text-start"
      style={{ width: "250px"}}
    >
      <img
        className="card-img-top"
        src="https://picsum.photos/200/300"
        alt="Title"
      />
    </div>
  );
}
