import React, { createContext, useState } from "react";

export const CartListContext = createContext();

const CartListProvider = (props) => {
  const [cartList, setCartList] = useState([]);

  const addCart = async (id, count) => {
    const cartId = await localStorage.getItem("cartId");
    if (cartId == undefined || null) {
      fetch("http://localhost:5000/order/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("cartId", data.cartId);
        });
    } else {
      const cartItem = { productId: id, totalCount: count, cartId: cartId };
      if (cartItem.totalCount === 0) {
        console.log("請決定數量");
        return "請決定數量";
      } else {
        fetch("http://localhost:5000/order/add", {
          method: "POST",
          body: JSON.stringify(cartItem),
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then((data) => {
            setCartList(data);
          });
      }
    }
  };

  return (
    <CartListContext.Provider value={{ cartList, addCart, setCartList }}>
      {props.children}
    </CartListContext.Provider>
  );
};

export default CartListProvider;
