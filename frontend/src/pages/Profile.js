import React from "react";
import "../components/Profile/profile.css";
import { Link, Outlet } from "react-router-dom";

function Profile() {
  return (
    <div className="profile">
      <div className="profileNav">
        <Link to="/profile/personal">個人資訊</Link>
        <Link to="/profile/orderHistory">訂單歷史</Link>
      </div>
      <Outlet />
    </div>
  );
}

export default Profile;
