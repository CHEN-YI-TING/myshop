import React, { useContext } from "react";
import { CartListContext } from "../../contexts/CartListContext";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import "./home.css";

function CardDetails({
  product,
  productObj,
  setProductObj,
  likedProducts,
  setLikedProducts,
}) {
  const { addCart } = useContext(CartListContext);

  const likeProduct = (productId) => {
    fetch("http://localhost:5000/like", {
      method: "POST",
      body: JSON.stringify({ productId: productId }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setProductObj(
          productObj.map((product) => {
            if (product.id == productId) {
              //check if created is true
              if (data.created) {
                return { ...product, likes: [...product.likes, 0] };
              } else {
                const likesArray = product.likes;
                likesArray.pop();
                return { ...product, likes: likesArray };
              }
            } else {
              return product;
            }
          })
        );

        if (likedProducts.includes(productId)) {
          setLikedProducts(
            likedProducts.filter((id) => {
              return id != productId;
            })
          );
        } else {
          setLikedProducts([...likedProducts, productId]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        <ThumbUpIcon
          //check if user has liked before?
          className={
            likedProducts.includes(product.id) ? "unlikeBtn" : "likeBtn"
          }
          onClick={() => {
            likeProduct(product.id);
          }}
        ></ThumbUpIcon>
        <label>{product.likes.length}</label>
      </div>
    </div>
  );
}

export default CardDetails;
