import React, { useState, useEffect } from "react";
import CardDetails from "../components/CardDetails";

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
        return <CardDetails product={product} key={product.id} />;
      })}
    </div>
  );
}

export default ProductCard;
