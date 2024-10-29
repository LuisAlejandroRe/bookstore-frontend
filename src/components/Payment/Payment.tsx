import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import "./Payment.css";
import { auth } from "../../firebase";
import { useCart } from "../../context/CartContext";
import client from "../../api/client";
import { StripeCardElementChangeEvent } from "@stripe/stripe-js";
import Loader from "../Loader/Loader";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";

function Payment() {
  const { state, dispatch } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProcessing(true);
    setError(null);

    try {
      if (!stripe || !elements) return setError("Error al procesar pago");

      const card = elements.getElement(CardElement);
      if (!card) return setError("Error al procesar pago");

      const token = await auth.currentUser?.getIdToken();
      const response = await client.post(
        "/payment",
        {
          total: state.totalAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        response.data.body.clientSecret,
        {
          payment_method: {
            card,
          },
        }
      );
      if (error) return setError(error.message ?? "Error al procesar pago");
      if (!paymentIntent) return setError("Error al procesar pago");

      await client.post(
        "/order",
        {
          order: {
            items: state.items,
            paymentId: paymentIntent.id,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSucceeded(true);
      dispatch({
        type: "CLEAR_CART",
      });

      navigate("/orders");
    } catch (error) {
      console.log(error);
      setError("Error al procesar pago");
    } finally {
      setProcessing(false);
    }
  };

  const handleChange = (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error("Error al iniciar sesión:", (error as Error).message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment">
      {loading && <Loader />}
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{state.items.length} productos</Link>)
        </h1>

        {/* Payment section - delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Dirección</h3>
          </div>
          <div className="payment__address">
            <p>{currentUser?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/*Payment section -  Review Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Revisión de productos y entrega</h3>
          </div>
          <div className="payment__items">
            {state.items.map((book) => (
              <CheckoutProduct key={book.id} book={book} />
            ))}
          </div>
        </div>

        {/*Payment section - Payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          {currentUser ? (
            <div className="payment__details">
              <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange} />
                <div className="payment__priceContainer">
                  <CurrencyFormat
                    renderText={(value) => <h3>Order Total: {value}</h3>}
                    decimalScale={2}
                    value={state.totalAmount}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                  <button disabled={processing || disabled || succeeded}>
                    <span>
                      {processing ? <p>Procesando...</p> : "Comprar ahora"}
                    </span>
                  </button>
                </div>

                {error && <div>{error}</div>}
              </form>
            </div>
          ) : (
            <div className="payment__login">
              <form>
                <label>E-mail</label>
                <input
                  type="email"
                  placeholder="e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Contraseña</label>
                <input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" onClick={login}>
                  Continuar
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Payment;
