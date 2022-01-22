import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PageNotFound from "../pages/PageNotFound";
import Profile from "../pages/Profile";
import Product from "../pages/Product";
import Order from "../pages/Order";
import "../App.css";
import ReorderIcon from "@mui/icons-material/Reorder";

function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  return (
    <div>
      <Router>
        <div className="Navbar">
          <div className="leftSide"></div>
          <div className="rightSide">
            <div className="links" id={showLinks ? "hidden" : ""}>
              <Link to="/auth/signup">註冊</Link>
              <Link to="/auth/login">登入</Link>
              <Link to="/">首頁</Link>
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
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/auth/login" exact element={<Login />}></Route>
          <Route path="/auth/signup" exact element={<Signup />}></Route>
          <Route path="/profile" exact element={<Profile />}></Route>
          <Route path="/order" exact element={<Order />}></Route>
          <Route path="/product" exact element={<Product />}></Route>
          <Route path="/*" exact element={<PageNotFound />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default Navbar;
