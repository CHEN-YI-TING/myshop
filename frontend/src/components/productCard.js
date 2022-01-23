import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Order from "../pages/Order";
import CartList from "./CartList";

function ProductCard({ product, setCartList, cartList }) {
  let navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState({ productId: "", count: 0 });

  const addCount = async (id) => {
    cart.push({ productId: id });
    setCart(cart);
    setCount({ productId: id, count: cart.length });
  };

  const removeCount = async (id) => {
    cart.pop({ productId: id });
    setCart(cart);
    setCount({ productId: id, count: cart.length });
  };

  const createCart = async () => {
    fetch("http://localhost:5000/order/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("cartId", data.cartId);
      });
  };

  const addCart = async (id, count) => {
    const cartId = await localStorage.getItem("cartId");
    if (cartId == undefined || null) {
      createCart();
    } else {
      const cartItem = { productId: id, totalCount: count, cartId: cartId };
      if (cartItem.totalCount === 0) {
        console.log("請決定數量");
        return "請決定數量";
      } else {
        fetch("http://localhost:5000/order/add", {
          method: "POST",
          body: JSON.stringify(cartItem),
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then((data) => {
            setCartList(data);
            // navigate("/");
          });
      }
    }
  };

  return (
    <div>
      <Card elevation={3}>
        <CardHeader
          title={product.title}
          subheader={`價格: ${product.price}元`}
        ></CardHeader>
        <CardMedia component="img" height="194" image={`${product.imgUrl}`} />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {product.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "left" }}>
          <AddIcon
            onClick={() => {
              addCount(product.id);
            }}
          />
          <RemoveIcon
            onClick={() => {
              removeCount(product.id);
            }}
          />
          {count.count}
        </CardActions>
        <CardActions sx={{ justifyContent: "right" }}>
          <IconButton
            onClick={() => {
              addCart(product.id, count.count);
            }}
          >
            <ShoppingCartIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}

export default ProductCard;
