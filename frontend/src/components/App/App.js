import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import PageNotFound from "../../pages/PageNotFound";
import Profile from "../../pages/Profile";
import Product from "../../pages/Product";
import Order from "../../pages/Order";
import { Route, Routes } from "react-router-dom";
import UserAuth from "../ProtectedRoute/UserAuth";
import AdminAuth from "../ProtectedRoute/AdminAuth";
import Layout from "../Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*  public routed */}
        <Route index element={<Home />}></Route>
        <Route path="/auth/login" element={<Login />}></Route>
        <Route path="/auth/signup" element={<Signup />}></Route>

        {/*  user protected routed  */}
        <Route element={<UserAuth />}>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/order" element={<Order />}></Route>
        </Route>
        {/*  admin protected routed  */}
        <Route element={<AdminAuth />}>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/product" element={<Product />}></Route>
        </Route>
        {/*  missing routed */}
        <Route path="*" element={<PageNotFound />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
