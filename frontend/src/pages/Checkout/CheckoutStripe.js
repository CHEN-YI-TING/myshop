import React, { useContext, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { CartListContext } from "../../contexts/CartListContext";
import "./checkout.css";

function CheckoutStripe() {
  const SERVER_API_URL = "http://localhost:5000";
  const { cartList, totalPrice } = useContext(CartListContext);
  const stripe = useStripe();
  const [email, setEmail] = useState("");

  const createOrder = async () => {
    if (cartList == [] || totalPrice === 0) {
      alert("購物車裡沒有產品.....");
    } else {
      fetch(`${SERVER_API_URL}/order`, {
        method: "POST",
        body: JSON.stringify({
          orderArray: cartList,
          allPrice: totalPrice,
        }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          /*   navigate(`/profile/${data.orderId}`); */
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    const line_items = await cartList.map((item) => {
      return {
        quantity: item.qty,
        price_data: {
          currency: "usd",
          unit_amount: item.price * 100,
          product_data: {
            name: item.title,
          },
        },
      };
    });

    await fetch(`${SERVER_API_URL}/checkout`, {
      method: "POST",
      body: JSON.stringify({
        line_items: line_items,
        customer_email: email,
      }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then(async (res) => {
        const data = await res.json();
        return data;
      })
      .then((data) => {
        console.log(data);
        const sessionId = data.sessionId;
        stripe.redirectToCheckout({ sessionId });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="checkout_container">
      <form className="checkout_form" onSubmit={handleCheckout}>
        <div className="checkout_h2">總數和金額</div>
        <div>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="請輸入你的電子郵件..."
            value={email}
            className="checkout_input"
          />
        </div>
        <div className="checkout_content">
          <button type="submit" className="checkout_btn" onClick={createOrder}>
            結帳
          </button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutStripe;
