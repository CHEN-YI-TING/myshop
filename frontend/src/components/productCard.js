import React, { useState, useEffect } from "react";
import CardDetails from "../components/CardDetails";
import Grid from "@mui/material/Grid";

function ProductCard() {
  const [productObj, setProductObj] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products", {
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setProductObj(data));
  }, []);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={3}
      sx={{ width: "70%" }}
    >
      {productObj.map((product) => {
        return (
          <Grid item xs={12} sm={12} md={3} key={product.id}>
            <CardDetails product={product} key={product.id} />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ProductCard;
