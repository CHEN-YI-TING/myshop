import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const UserAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.user ? <Outlet /> : <Navigate to="auth/login" />;
};

export default UserAuth;

/* import { Navigate } from "react-router-dom";

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

export default UserRoute; */
