//component
import ProductCard from "../components/Home/productCard";
import CartList from "../components/Home/CartList";
import "../components/Home/home.css";

//state
import CartListProvider from "../contexts/CartListContext";

function Home() {
  return (
    <div className="home-container">
      <div className="page-title">這裡是首頁</div>
      <CartListProvider>
        <div className="cart-layout">
          <div className="left-side">
            <ProductCard />
          </div>
          <div className="right-side">
            <CartList />
          </div>
        </div>
      </CartListProvider>
    </div>
  );
}

export default Home;
