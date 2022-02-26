import React from "react";
import { Link } from "react-router-dom";
import "./pagenotfound.css";

function PageNotFound() {
  return (
    <div className="error-container">
      <div className="not-found">
        <h2>Sorry</h2>
        <p>404錯誤</p>
        <Link to="/">點擊返回首頁</Link>
      </div>
    </div>
  );
}

export default PageNotFound;
