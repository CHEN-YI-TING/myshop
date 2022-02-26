import React, { createContext, useEffect, useState } from "react";

//create an context object
export const CartListContext = createContext();

//create the provider and its functionality --> provider
const CartListProvider = (props) => {
  const [cartList, setCartList] = useState(() => {
    const localData = localStorage.getItem("cartList");
    return localData ? JSON.parse(localData) : [];
  });
  const [totalPrice, setTotalPrice] = useState(0);

  //for the pages that we want to access the context object's value--->consumer
  const addCart = async ({ product }) => {
    let data = await JSON.parse(localStorage.getItem("cartList"));
    if (data === null) {
      let newObj = {
        id: product.id,
        title: product.title,
        price: product.price,
        qty: 1,
      };
      let newArr = [newObj];
      setCartList(newArr);
      localStorage.setItem("cartList", JSON.stringify(newArr));
    }

    if (data !== null) {
      let find = await data.find((cartItem) => cartItem.id === product.id);
      if (find === undefined) {
        let newObj = {
          id: product.id,
          title: product.title,
          price: product.price,
          qty: 1,
        };
        let newArr = [...cartList, newObj];
        let sortArr = newArr.sort((a, b) => {
          if (a.id > b.id) return 1;
          else if (b.id > a.id) return -1;
          else return 0;
        });
        setCartList(sortArr);
        localStorage.setItem("cartList", JSON.stringify(sortArr));
      } else {
        alert("你已加入購物車");
      }
    }
  };

  const increment = async (id) => {
    const data = await JSON.parse(localStorage.getItem("cartList"));
    const productId = id;
    let find = await data.find((item) => item.id === productId);
    let other = await data.filter((item) => item.id !== productId);
    let updateList = {
      id: find.id,
      title: find.title,
      price: find.price,
      qty: find.qty + 1,
    };
    const newList = [...other, updateList];
    let sortList = newList.sort((a, b) => {
      if (a.id > b.id) return 1;
      else if (b.id > a.id) return -1;
      else return 0;
    });
    setCartList(sortList);
    localStorage.setItem("cartList", JSON.stringify(sortList));
  };

  const decrement = async (id) => {
    const data = await JSON.parse(localStorage.getItem("cartList"));
    const productId = id;
    let find = await data.find((item) => item.id === productId);
    let other = await data.filter((item) => item.id !== productId);
    let updateList = {
      id: find.id,
      title: find.title,
      price: find.price,
      qty: find.qty - 1,
    };
    const newList = [...other, updateList];
    //check if data item < 0
    if (updateList.qty <= 0) {
      let newList = [...other];
      let sortList = newList.sort((a, b) => {
        if (a.id > b.id) return 1;
        else if (b.id > a.id) return -1;
        else return 0;
      });
      setCartList(sortList);
      localStorage.setItem("cartList", JSON.stringify(sortList));
    } else {
      let sortList = newList.sort((a, b) => {
        if (a.id > b.id) return 1;
        else if (b.id > a.id) return -1;
        else return 0;
      });
      setCartList(sortList);
      localStorage.setItem("cartList", JSON.stringify(sortList));
    }
  };

  const deleteCartItem = async (id) => {
    const data = await JSON.parse(localStorage.getItem("cartList"));
    const productId = id;
    const newList = await data.filter((item) => item.id !== productId);
    setCartList(newList);
    localStorage.setItem("cartList", JSON.stringify(newList));
  };

  const countTotal = async () => {
    const data = await JSON.parse(localStorage.getItem("cartList"));
    if (!data) {
      setTotalPrice(0);
    } else {
      let total = 0;
      data.forEach((item) => {
        total += item.price * item.qty;
      });
      setTotalPrice(total);
    }
  };

  const clearCart = async () => {
    localStorage.removeItem("cartList");
    setCartList([]);
  };

  return (
    <CartListContext.Provider
      value={{
        cartList,
        setCartList,
        addCart,
        clearCart,
        increment,
        decrement,
        deleteCartItem,
        countTotal,
        totalPrice,
      }}
    >
      {props.children}
    </CartListContext.Provider>
  );
};

export default CartListProvider;
