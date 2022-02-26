import React from "react";
import "./login.css";

function loginError() {
  const close = () => {
    window.close();
  };
  return (
    <>
      <div className="success">
        <div className="success_title">註冊失敗</div>
        <div className="success_content">
          <p>問題為................</p>
          <button className="success_btn" onClick={close}>
            關閉
          </button>
        </div>
      </div>
    </>
  );
}

export default loginError;
