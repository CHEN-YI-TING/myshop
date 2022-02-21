import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./profile.css";

function OrderDetail() {
  const [detail, setDetail] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    (function getOrder() {
      let url = `http://localhost:5000/order/details/${id}`;

      fetch(url, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setDetail(data);
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, [id]);
  return (
    <div className="detail">
      <div className="detail_title">{`訂單 ${id} 裡有下列產品 `}</div>
      {detail.map((detail) => {
        return (
          <div key={detail.productId}>
            <table>
              <thead>
                <tr>
                  <th>{`productId`}</th>
                  <th>{`數量`}</th>
                  <th>{`總共價格`}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{detail.productId}</td>
                  <td>{detail.quantity}</td>
                  <td>{detail.totalPrice}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}

export default OrderDetail;
