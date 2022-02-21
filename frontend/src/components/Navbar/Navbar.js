import "./navbar.css";
import ReorderIcon from "@mui/icons-material/Reorder";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  const { admin, user, setUser, setAdmin } = useAuth();

  let navigate = useNavigate();

  const logout = () => {
    fetch("http://localhost:5000/auth/logout", {
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(false);
        setAdmin(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(`登出失敗 錯誤資訊為 ${err}`);
      });
  };

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
            {admin || user ? (
              <>
                <button className="logout" onClick={logout}>
                  登出
                </button>
              </>
            ) : (
              <>
                <Link to="/auth/login">登入</Link>
                <Link to="/auth/signup">註冊</Link>
              </>
            )}

            {admin && (
              <>
                <Link to="/product">產品管理</Link>
                <Link to="/admin">管理者頁面</Link>
              </>
            )}
            {user && (
              <>
                <Link to="/profile/personal">使用者頁面</Link>
              </>
            )}
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
