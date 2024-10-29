import "./Order.css";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import { IOrder } from "../../types";

function Order({ order }: { order: IOrder }) {
  return (
    <div className="order">
      <h2>Order</h2>
      <p>
        {new Date(order.created * 1000).toLocaleDateString()} -{" "}
        {new Date(order.created * 1000).toLocaleTimeString()}
      </p>
      <p className="order__id">
        <small>{order.paymentId}</small>
      </p>
      {order.items.map((item) => (
        <CheckoutProduct key={item.id} book={item} hideButton={true} />
      ))}
      <CurrencyFormat
        renderText={(value) => (
          <h3 className="order__total">Order Total: {value}</h3>
        )}
        decimalScale={2}
        value={order.amount}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  );
}

export default Order;
