import "./navbar.css";
import ReorderIcon from "@mui/icons-material/Reorder";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <div>
      <div className="Navbar">
        <div className="leftSide">
          <div className="title">
            <Link to="/">Myshop</Link>
          </div>
        </div>
        <div className="rightSide">
          <div className="links" id={showLinks ? "hidden" : ""}>
            <Link to="/auth/signup">註冊</Link>
            <Link to="/auth/login">登入</Link>
            <Link to="/">登出</Link>
            <Link to="/profile">個人頁面</Link>
            <Link to="/product">產品管理</Link>
          </div>
          <button
            className="toggle"
            onClick={() => {
              setShowLinks(!showLinks);
            }}
          >
            <ReorderIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
