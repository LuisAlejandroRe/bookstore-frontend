import "./Product.css";
import { useCart } from "../../context/CartContext";
import AddShoppingCartIcon from "../../../public/icons/add-to-cart.svg";
import { Book } from "../../types";

interface Props {
  book: Book;
}

function Product({ book }: Props) {
  const { dispatch } = useCart();

  const addToBasket = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        ...book,
        quantity: 1,
      },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{book.name}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{book.price}</strong>
        </p>
        <div className="product__rating">
          {Array.from({ length: book.rating }, () => (
            <p>⭐</p>
          ))}
        </div>
      </div>

      <img src={book.image} alt={book.name} />

      <button onClick={addToBasket} className="flex flex-col items-center">
        <span>Añadir al carrito </span>
        <img src={AddShoppingCartIcon} alt="" className="w-5" />
      </button>
    </div>
  );
}

export default Product;
