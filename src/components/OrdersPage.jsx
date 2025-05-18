import React, { useState, useEffect } from "react";
import Window from "../external_comonets/window/window";
import axios from "axios";

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios
      .get("/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  };

  return (
    <div className="main">
      <div className="container">
        <Window header="הזמנות" record={orders} />
      </div>
    </div>
  );
}

export default OrdersPage;
