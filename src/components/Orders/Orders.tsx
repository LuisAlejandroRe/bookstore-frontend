import { useEffect, useState } from "react";
import "./Orders.css";
import Order from "../Order/Order";
import Loader from "../Loader/Loader";
import { IOrder } from "../../types";
import client from "../../api/client";
import { auth } from "../../firebase";

function Orders() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const token = await auth.currentUser?.getIdToken();
        const res = await client.get("/order", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data.body.orders as IOrder[]);
      } catch (error: any) {
        console.log(error);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="orders">
      {loading && <Loader />}
      <h1>Your Orders</h1>

      <div className="orders__order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
