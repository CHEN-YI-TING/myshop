import React, { useState, useEffect, useContext } from "react";
import { CartListContext } from "../contexts/CartListContext";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "../components/Home/home.css";

function Order() {
  let navigate = useNavigate();
  const {
    cartList,
    setCartList,
    clearCart,
    deleteCartItem,
    increment,
    decrement,
    countTotal,
    totalPrice,
  } = useContext(CartListContext);

  useEffect(() => {
    countTotal();
  }, [cartList]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cartList"));
    setCartList(data);
  }, []);

  return (
    <div>
      <Paper elevation={2} sx={{ margin: "10px", padding: "30px" }}>
        <div className="cartListContainer">
          <div className="cart_title"> 你的訂單</div>

          {cartList.map((list) => (
            <div className="cartList" key={list.id}>
              <table>
                <thead>
                  <tr>
                    <th>{`名稱`}</th>
                    <th>{`價格`}</th>
                    <th>{`增加`}</th>
                    <th>{`數量`}</th>
                    <th>{`減少`}</th>
                    <th>{`總價`}</th>
                    <th>{`刪除`}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> {list.title} </td>
                    <td>{list.price}</td>
                    <td>
                      <AddIcon
                        className="cartBtn"
                        onClick={() => {
                          increment(list.id);
                        }}
                      />
                    </td>
                    <td>{list.qty}</td>
                    <td>
                      <RemoveIcon
                        className="cartBtn"
                        onClick={() => {
                          decrement(list.id);
                        }}
                      />
                    </td>
                    <td>{list.qty * list.price}</td>
                    <td>
                      <div className="deleteBtn">
                        <DeleteIcon
                          onClick={async () => {
                            const productId = await list.id;
                            deleteCartItem(productId);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
          <div className="totalPrice">
            {`你的訂單總共的價格為 ${totalPrice} 元`}
            <button className="orderBtn" onClick={clearCart}>
              清除購物車
            </button>
          </div>

          <div>
            <button
              className="orderBtn"
              onClick={() => {
                navigate("/checkout/stripe");
              }}
            >
              下訂單
            </button>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default Order;
