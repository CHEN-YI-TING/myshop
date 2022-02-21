import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./profile.css";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  //pagination
  const [pageNumber, setPageNumber] = useState(0);
  const orderPerPage = 3;
  const pagesVisited = pageNumber * orderPerPage;
  const displayOrders = orders
    .slice(pagesVisited, pagesVisited + orderPerPage)
    .map((order) => {
      return (
        <div
          className="orderDetails"
          key={order.id}
          onClick={() => {
            navigate(`/profile/${order.id}`);
          }}
        >
          <table>
            <thead>
              <tr>
                <th>{`訂單編號`}</th>
                <th>{`總共花費`}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{order.id}</td>
                <td>{order.totalPrice}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    });

  //因為orders不一定整除
  const pageCount = Math.ceil(orders.length / orderPerPage);
  //改變頁數
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  let navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5000/order/orders", {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data !== null && data !== undefined) {
          setOrders(data);
        } else {
          setOrders([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {orders.length === 0 && `目前沒有任何訂單`}
      {orders.length !== 0 && (
        <>
          <div className="orderHistory">{displayOrders}</div>
          <div className="pagination">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBtn"}
              previousClassName={"previousBtn"}
              nextLinkClassName={"nextBtn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
        </>
      )}
    </>
  );
}

export default OrderHistory;
