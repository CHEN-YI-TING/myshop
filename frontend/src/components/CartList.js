import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import { Button, Drawer } from "@mui/material";
import { Typography } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";

function CartList({ cartList, setCartList }) {
  // const [cartStatus,setCartStatus] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/order/getAll", {
      headers: {
        "Content-Type": "application/json",
        cartId: localStorage.getItem("cartId"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCartList(data);
      });
    //cartList();
  }, []);

  const deleteCartItem = () => {
    fetch("http://localhost:5000/order/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  };

  /*  useEffect(() => {
    fetch("http://localhost:5000/order/getAll", {
      headers: {
        "Content-Type": "application/json",
        cartId: localStorage.getItem("cartId"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCartList(data);
      });
  }, [cartList]); */
  return (
    <div>
      <List>
        <Paper elevation={3} sx={{ margin: "50px", padding: "25px" }}>
          <Typography variant="h5" align="center">
            購物車清單
          </Typography>
          {cartList.map((list) => (
            <ListItem key={list.productId}>
              <ListItemText primary={` 產品名稱: ${list.productId} `} />
              <ListItemText primary={` 總共數量: ${list.totalCount} `} />
              <ListItemButton edge="end">
                <DeleteIcon
                  onClick={() => {
                    deleteCartItem(list.productId);
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <Button>結帳</Button>
        </Paper>
      </List>
    </div>
  );
}

export default CartList;
