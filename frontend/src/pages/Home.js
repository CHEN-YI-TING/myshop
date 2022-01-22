import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ProductCard from "../components/productCard";
import Container from "@mui/material/Container";

function Home() {
  const [productObj, setProductObj] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/products", {
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setProductObj(data));
    // session
    fetch("http://localhost:5000/order/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cartId: localStorage.getItem("cartId"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("cartId", data.cartId);
      });
  }, []);

  return (
    <Container>
      <Grid container spacing={4}>
        {productObj.map((product, key) => {
          return (
            <Grid item key={key} xs={12} md={6} lg={3}>
              <ProductCard product={product}></ProductCard>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default Home;
