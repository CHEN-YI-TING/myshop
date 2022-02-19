import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CartListContext } from "../../contexts/CartListContext";

function CartList() {
  let navigate = useNavigate();
  const { cartList, deleteCartItem, increment, decrement } =
    useContext(CartListContext);

  return (
    <div>
      <h5> 購物車清單</h5>
      {cartList.map((list) => (
        <div className="cartList" key={list.id}>
          <div className="listText">{` 產品名稱: ${list.title} `}</div>
          <div className="listText">{` 總共數量: ${list.qty} `}</div>
          <button
            onClick={() => {
              increment(list.id);
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              decrement(list.id);
            }}
          >
            -
          </button>
          <div className="deleteBtn">
            <DeleteIcon
              onClick={async () => {
                const productId = await list.id;
                deleteCartItem(productId);
              }}
            />
          </div>
        </div>
      ))}
      <Button
        onClick={() => {
          navigate("/order");
        }}
      >
        結帳
      </Button>
    </div>
  );
}

export default CartList;
