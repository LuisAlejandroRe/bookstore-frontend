import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function Subtotal() {
  const navigate = useNavigate();
  const { state } = useCart();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value: string) => (
          <>
            <p>
              Subtotal ({state.items.length} items):
              <strong>{` ${value}`}</strong>
            </p>
          </>
        )}
        decimalScale={2}
        value={state.totalAmount}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      {state.items.length > 0 && (
        <button onClick={() => navigate("/payment")}>Proceder al pago</button>
      )}
    </div>
  );
}

export default Subtotal;
