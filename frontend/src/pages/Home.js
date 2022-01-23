import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ProductCard from "../components/productCard";
import CartList from "../components/CartList";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

function Home() {
  let navigate = useNavigate();
  const [productObj, setProductObj] = useState([]);
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products", {
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setProductObj(data));
  }, []);

  return (
    <Box>
      <Box sx={{ float: "right" }}>
        <CartList cartList={cartList} setCartList={setCartList}></CartList>
      </Box>
      <Container fixed>
        <Typography
          sx={{ marginTop: 10, marginBottom: 10 }}
          variant="h2"
          align="center"
        >
          這裡是首頁
        </Typography>

        <Grid container spacing={4}>
          {productObj.map((product, key) => {
            return (
              <Grid item key={key} xs={12} md={6} lg={4}>
                <ProductCard
                  product={product}
                  setCartList={setCartList}
                ></ProductCard>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;
