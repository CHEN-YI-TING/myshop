import React, { useState, useEffect } from "react";
import CardDetails from "./CardDetails";
import "./home.css";

function ProductCard() {
  const [productObj, setProductObj] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products", {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.products);
        setProductObj(data.products);
        setLikedProducts(
          data.likedProducts.map((liked) => {
            return liked.productId;
          })
        );
      });
  }, []);

  return (
    <div>
      {productObj.map((product) => {
        return (
          <div key={product.id}>
            <CardDetails
              product={product}
              productObj={productObj}
              setProductObj={setProductObj}
              likedProducts={likedProducts}
              setLikedProducts={setLikedProducts}
              key={product.id}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ProductCard;
