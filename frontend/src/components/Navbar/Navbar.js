import "./navbar.css";
import ReorderIcon from "@mui/icons-material/Reorder";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  const { admin, user } = useAuth();

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
                (<Link to="/">登出</Link>)
              </>
            ) : (
              <>
                ( <Link to="/auth/login">登入</Link>
                <Link to="/auth/signup">註冊</Link>)
              </>
            )}

            {admin && (
              <>
                (<Link to="/product">產品管理</Link>
                <Link to="/admin">管理者頁面</Link>)
              </>
            )}
            {user && (
              <>
                (<Link to="/profile">使用者頁面</Link>)
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
