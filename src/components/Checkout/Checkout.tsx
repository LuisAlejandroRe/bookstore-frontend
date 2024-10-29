import "./Checkout.css";
import Subtotal from "../Subtotal/Subtotal";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

function Checkout() {
  const { state } = useCart();
  const { currentUser } = useAuth();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <div>
          <div className="checkout__title">
            <h3>Hola, {currentUser ? currentUser.email : "Invitado"}</h3>
            <h2>
              {state.items.length > 0 ? "Tu carrito" : "El carrito está vacío"}
            </h2>
          </div>

          {state.items.map((book) => (
            <CheckoutProduct key={book.id} book={book} />
          ))}
        </div>
      </div>

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
