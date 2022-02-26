import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { CartListContext } from "../../contexts/CartListContext";
import "./home.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function CartList() {
  let navigate = useNavigate();
  const { cartList, deleteCartItem, increment, decrement, setCartList } =
    useContext(CartListContext);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cartList"));
    if (data === null) setCartList([]);
    if (data === true) {
      setCartList(data);
    }
  }, []);

  return (
    <div className="cartListContainer">
      <div className="cart_title"> 購物車清單</div>
      {cartList.map((list) => (
        <div className="cartList" key={list.id}>
          <table>
            <thead>
              <tr>
                <th>{`名稱`}</th>
                <th>{`價格`}</th>
                <th>{`增加`}</th>
                <th>{`數量`}</th>
                <th>{`減少`}</th>
                <th>{`總價`}</th>
                <th>{`刪除`}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> {list.title} </td>
                <td>{list.price}</td>
                <td>
                  <AddIcon
                    className="cartBtn"
                    onClick={() => {
                      increment(list.id);
                    }}
                  />
                </td>
                <td>{list.qty}</td>
                <td>
                  <RemoveIcon
                    className="cartBtn"
                    onClick={() => {
                      decrement(list.id);
                    }}
                  />
                </td>
                <td>{list.qty * list.price}</td>
                <td>
                  <div className="deleteBtn">
                    <DeleteIcon
                      onClick={async () => {
                        const productId = await list.id;
                        deleteCartItem(productId);
                      }}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}

      <button
        className="orderBtn"
        onClick={() => {
          navigate("/checkout");
        }}
      >
        結帳
      </button>
    </div>
  );
}

export default CartList;
