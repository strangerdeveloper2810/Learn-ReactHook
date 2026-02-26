import React, { useState, useRef } from "react";

export default function DemouseRefHook(props) {
  let inputUsername = useRef(null);
  let inputPassword = useRef(null);
  let [userLogin, setUserLogin] = useState({
    username: ""
  });

  let userName = useRef("");
  const handleLogin = () => {
    console.log("userName", userName.current);
    console.log("userLogin", userLogin.username);
    userName.current = "abc";
    setUserLogin({
        username: userName.current,
    });
  };
  return (
    <div className="container">
      <h3 className="text-start text-success">Login</h3>

      <div className="form-group">
        <span>Username</span>
        <input type="text" ref={inputUsername} name="username" className="form-control" />
      </div>

      <div className="form-group">
        <span>Password</span>
        <input type="password" ref={inputPassword} name="password" className="form-control" />
      </div>

      <div className="form-group mt-3">
        <button
          className="btn btn-info"
          type="button"
          onClick={() => {
            handleLogin();
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
