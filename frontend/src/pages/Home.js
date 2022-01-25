import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ProductCard from "../components/productCard";
import CartList from "../components/CartList";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import CartListProvider from "../contexts/CartListContext";

function Home() {
  const productCart = {
    border: "1px solid green",
    padding: "10px",
    margin: "10px",
  };

  const cartList = {
    float: "right",
  };
  return (
    <Box>
      <Typography
        sx={{ marginTop: 5, marginBottom: 5 }}
        variant="h2"
        align="center"
      >
        這裡是首頁
      </Typography>

      <CartListProvider>
        <Box sx={productCart}>
          <ProductCard />
        </Box>
        <Box>
          <CartList sx={cartList} />
        </Box>
      </CartListProvider>
    </Box>
  );
}

export default Home;
