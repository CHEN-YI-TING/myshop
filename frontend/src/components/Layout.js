import { Outlet } from "react-router-dom";
import "./App/App.css";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { AuthProvider } from "../contexts/AuthContext";
const Layout = () => {
  return (
    <main className="App">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;
