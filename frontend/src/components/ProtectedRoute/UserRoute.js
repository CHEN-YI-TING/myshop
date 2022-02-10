import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

function UserRoute({ children, isAuth, setIsAuth }) {
  useEffect(() => {
    checkData(setIsAuth);
  }, []);

  async function checkData(setIsAuth) {
    let url = `http://localhost:5000/auth/checkUser`;
    let response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!response.ok) throw new Error(response.statusText);
    let user = await response.json();
    if (user !== null) {
      return setIsAuth(true);
    } else {
      return setIsAuth(false);
    }
  }

  return isAuth ? children : <Navigate to={"/auth/login"} />;
}

export default UserRoute;

/*   fetch("http://localhost:5000/auth/checkUser", {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  })
    .then(async (userData) => {
      let user = await userData.json();
      if (user !== null) {
        await setIsAuth(true);
      } else {
        await setIsAuth(false);
      }
    })
    .catch((err) => {
      console.log(err);
    }); */
