import React, { useState, useEffect } from "react";
import CardDetails from "./CardDetails";
import "./home.css";

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
    <div>
      {productObj.map((product) => {
        return (
          <div key={product.id}>
            <CardDetails product={product} key={product.id} />
          </div>
        );
      })}
    </div>
  );
}

export default ProductCard;
