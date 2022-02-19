import React, { useContext } from "react";
//css
import "./home.css";
//state
import { CartListContext } from "../../contexts/CartListContext";

function CardDetails({ product }) {
  //state
  const { addCart } = useContext(CartListContext);

  return (
    <div className="cart_container">
      {/*   <div className="card-img"><img src={product.imgUrl}></img></div> */}
      <div className="img">{product.imgUrl}</div>
      <div className="title"> {product.title}</div>
      <div className="price">{`價格: ${product.price}元`}</div>
      <div className="content">{product.description}</div>
      <div className="btn">
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
