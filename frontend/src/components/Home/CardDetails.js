import React, { useContext } from "react";
//css
import "./cartdetail.css";
//state
import { CartListContext } from "../../contexts/CartListContext";

function CardDetails({ product }) {
  //state
  const { addCart } = useContext(CartListContext);

  return (
    <div>
      <div className="card-container">
        {/*  <img
          src={product.imgUrl}
          className="card-img"
        >{`${product.imgUrl}`}</img> */}
        <h2 className="card-title"> {product.title}</h2>
        <span className="card-price">{`價格: ${product.price}元`}</span>

        <div className="card-content">{product.description}</div>
        <div>
          <button
            className="addCart"
            onClick={() => {
              addCart({ product });
            }}
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardDetails;

{
  /* <button
            onClick={() => {
              addCart(product.id,product.title);
            }}
          >
            加入購物車
          </button> */
}
