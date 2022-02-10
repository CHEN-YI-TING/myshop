import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import { Button, Drawer } from "@mui/material";
import { Typography } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";
import { CartListContext } from "../contexts/CartListContext";
import Grid from "@mui/material/Grid";

function CartList() {
  let navigate = useNavigate();
  const { cartList, setCartList } = useContext(CartListContext);
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
  }, []);

  const deleteCartItem = (productId) => {
    fetch("http://localhost:5000/order/delete", {
      method: "DELETE",
      body: JSON.stringify({ productId: productId }),
      headers: {
        "Content-Type": "application/json",
        cartId: localStorage.getItem("cartId"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCartList(data);
      });
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        float: "right",
        position: "fixed",
        top: "15%",
        right: "-5%",
        width: "35%",
      }}
    >
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
                  onClick={async () => {
                    const productId = await list.productId;
                    deleteCartItem(productId);
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <Button
            onClick={() => {
              navigate("/order");
            }}
          >
            結帳
          </Button>
        </Paper>
      </List>
    </Grid>
  );
}

export default CartList;
