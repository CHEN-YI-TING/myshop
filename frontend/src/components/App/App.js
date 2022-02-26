import Home from "../../pages/Home";
import Login from "../../pages/Login/Login";
import LoginSuccess from "../../pages/Login/LoginSuccess";
import LoginError from "../../pages/Login/LoginError";
import Signup from "../../pages/Signup";
import PageNotFound from "../../pages/PageNotFound/PageNotFound";
import Profile from "../../pages/Profile";
import Personal from "../Profile/Personal";
import ChangePwd from "../Profile/ChangePwd";
import OrderHistory from "../Profile/OrderHistory";
import OrderDetail from "../Profile/OrderDetail";
import Admin from "../../pages/Admin/Admin";
import Product from "../../pages/Product/Product";
import Order from "../../pages/Order";
import Checkout from "../../pages/Checkout/Checkout";
import CheckoutStripe from "../../pages/Checkout/CheckoutStripe";
import CheckoutSuccess from "../../pages/Checkout/CheckoutSuccess";
import CheckoutCanceled from "../../pages/Checkout/CheckoutCanceled";
import { Navigate, Route, Routes } from "react-router-dom";
//protected routes
/* import UserProtected from "../ProtectRoutes/UserProtected";
import AdminProtected from "../ProtectRoutes/AdminProtected"; */
import Layout from "../Layout";

import { useAuth } from "../../contexts/AuthContext";

function App() {
  const { user, admin } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*  public routed */}
        <Route index element={<Home />}></Route>
        <Route path="/auth/login" element={<Login />}></Route>
        <Route
          path="/auth/login/google/success"
          element={<LoginSuccess />}
        ></Route>
        <Route path="/auth/login/google/error" element={<LoginError />}></Route>
        <Route path="/auth/signup" element={<Signup />}></Route>

        {/*  user protected routed  */}

        {user && (
          <>
            <Route path="/profile" element={<Profile />}>
              <Route path="personal" element={<Personal />} />
              <Route path="changePwd" element={<ChangePwd />} />
              <Route path="orderHistory" element={<OrderHistory />} />
              <Route path=":id" element={<OrderDetail />} />
            </Route>
            <Route path="/checkout" element={<Checkout />}>
              <Route index element={<Order />} />
              <Route path="stripe" element={<CheckoutStripe />} />
              <Route path="success" element={<CheckoutSuccess />} />
              <Route path="canceled" element={<CheckoutCanceled />} />
            </Route>
          </>
        )}

        {/*  admin protected routed  */}

        {admin && (
          <>
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="/product" element={<Product />}></Route>
          </>
        )}

        {/*  missing routed */}
        <Route path="*" element={<PageNotFound />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
