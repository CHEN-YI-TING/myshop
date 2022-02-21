import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

function ChangePwd() {
  const [newPwd, setNewPwd] = useState("");
  const [oldPwd, setOldPwd] = useState("");
  const newSuc = document.querySelector(".newSuc");
  const oldErr = document.querySelector(".oldErr");
  let navigate = useNavigate();
  const editPassword = async (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/auth/changePwd", {
      mode: "cors",
      method: "PATCH",
      body: JSON.stringify({ oldPassword: oldPwd, password: newPwd }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          oldErr.textContent = data.error;
          newSuc.textContent = "";
          console.log(data);
        } else {
          console.log(data);
          oldErr.textContent = "";
          newSuc.textContent = data.success;
        }
        setNewPwd("");
        setOldPwd("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <form onSubmit={editPassword}>
        <div className="changePwd">
          <div className="pwt_title">修改密碼</div>
          <div className="oldErr"></div>
          <div className="pwd_txt">
            <label>舊密碼 : </label>
            <input
              type="password"
              placeholder="請輸入舊密碼...."
              required
              name="oldPwd"
              value={oldPwd}
              onChange={(e) => {
                setOldPwd(e.target.value);
              }}
            />
          </div>

          <div className="pwd_txt">
            <label>新密碼 : </label>
            <input
              type="password"
              placeholder="請輸入新密碼...."
              required
              name="newPwd"
              value={newPwd}
              onChange={(e) => {
                setNewPwd(e.target.value);
              }}
            />
          </div>
          <div className="newSuc"></div>
          <button type="submit" className="pwdBtn">
            更改密碼
          </button>
        </div>
      </form>
    </>
  );
}

export default ChangePwd;
