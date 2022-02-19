import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import PageNotFound from "../../pages/PageNotFound";
import Profile from "../../pages/Profile";
import Admin from "../../pages/Admin";
import Product from "../../pages/Product";
import Order from "../../pages/Order";
import { Navigate, Route, Routes } from "react-router-dom";
//protected routes
import UserProtected from "../ProtectRoutes/UserProtected";
import AdminProtected from "../ProtectRoutes/AdminProtected";
import { useAuth } from "../../contexts/AuthContext";
import Layout from "../Layout";

function RequireAuth({ children }) {
  const auth = useAuth();
  console.log(auth);
  const user = 0;
  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*  public routed */}
        <Route index element={<Home />}></Route>
        <Route path="/auth/login" element={<Login />}></Route>
        <Route path="/auth/signup" element={<Signup />}></Route>

        {/*  user protected routed  */}

        <Route
          path="/profile"
          element={
            <UserProtected>
              <Profile />
            </UserProtected>
          }
        ></Route>
        <Route
          path="/order"
          element={
            <UserProtected>
              <Order />
            </UserProtected>
          }
        ></Route>

        {/*  admin protected routed  */}

        <Route
          path="/admin"
          element={
            <AdminProtected>
              <Admin />
            </AdminProtected>
          }
        ></Route>
        <Route
          path="/product"
          element={
            <AdminProtected>
              <Product />
            </AdminProtected>
          }
        ></Route>

        {/*  missing routed */}
        <Route path="*" element={<PageNotFound />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
