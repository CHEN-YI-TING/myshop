import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";

function Order() {
  const [orderList, setOrderList] = useState([]);
  const [totalPrice, setTotalPrice] = useState({ totalPrice: 0 });
  const [orderResult, setOrderResult] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5000/order/getAll", {
      headers: {
        "Content-Type": "application/json",
        cartId: localStorage.getItem("cartId"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        let currentTotalPrice = 0;
        for (let i = 0; i < data.length; i++) {
          let dataObj = {
            totalPrice: data[i].totalCount * data[i].product.price,
            productId: data[i].productId,
            quantity: data[i].totalCount,
          };
          orderResult.push(dataObj);
          currentTotalPrice += data[i].totalCount * data[i].product.price;
        }
        setOrderResult(orderResult);
        setTotalPrice({ totalPrice: currentTotalPrice });
        setOrderList(data);
      });
  }, []);

  const createOrder = () => {
    fetch("http://localhost:5000/order", {
      method: "POST",
      body: JSON.stringify({
        orderArray: orderResult,
        allPrice: totalPrice.totalPrice,
      }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div>
      <List>
        <Paper elevation={3} sx={{ margin: "50px", padding: "25px" }}>
          <Typography variant="h5" align="center">
            你的訂單
          </Typography>
          {orderList.map((list) => (
            <ListItem key={list.productId}>
              <ListItemText primary={` 名稱: ${list.product.title} `} />
              <ListItemText primary={` 價格: ${list.product.price} `} />
              <ListItemText primary={` 數量: ${list.totalCount} `} />
              <ListItemText
                primary={` 總共價格: ${list.totalCount * list.product.price} `}
              />
            </ListItem>
          ))}
          <ListItemText primary={` 總價為: ${totalPrice.totalPrice} `} />
          <Button onClick={createOrder}>下訂單</Button>
        </Paper>
      </List>
    </div>
  );
}

export default Order;
