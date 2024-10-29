import "./CheckoutProduct.css";
import { useCart } from "../../context/CartContext";
import { CartItem } from "../../types";

interface Props {
  book: CartItem;
}

function CheckoutProduct({ book }: Props) {
  const { dispatch } = useCart();

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: { id: book.id },
    });
  };

  return (
    <div className="checkoutProduct">
      <img
        className="checkoutProduct__image"
        src={book.image}
        alt={book.name}
      />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{book.name}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{book.price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array.from({ length: book.rating }, () => (
            <p>⭐</p>
          ))}
        </div>
        <button onClick={removeFromBasket}>Quitar del carrito</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
