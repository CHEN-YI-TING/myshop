import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import "../components/Home/home.css";
import DeleteIcon from "@mui/icons-material/Delete";
import "../components/Home/home.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { CartListContext } from "../contexts/CartListContext";

function Order() {
  const [creditCartMode, setCreditCartMode] = useState(true);

  let navigate = useNavigate();
  const {
    cartList,
    setCartList,
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

  const createOrder = () => {
    fetch("http://localhost:5000/order", {
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
        console.log(data);
        localStorage.removeItem("cartList");
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //pay validation

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
          <div className="totalPrice">{`你的訂單總共的價格為 ${totalPrice} 元,確認好再下單`}</div>

          <div>
            {!creditCartMode && (
              <>
                <button className="orderBtn" onClick={createOrder}>
                  請先輸入信用卡驗證
                </button>
              </>
            )}
          </div>
          <div>
            {creditCartMode && (
              <>
                <button className="orderBtn" onClick={createOrder}>
                  下訂單
                </button>
              </>
            )}
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default Order;
